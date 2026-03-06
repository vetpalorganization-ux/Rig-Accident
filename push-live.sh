#!/bin/bash
set -Eeuo pipefail
IFS=$'\n\t'

############################################################
# push-live.sh
# Intelligent Git Push + AI DevOps Assistant
#
# Works with:
# TRAE
# VS Code
# Cursor
# JetBrains
# Terminal workflows
#
# Optional tools:
# ollama
# ~/dev-tools/ai-commit.sh
############################################################

########################################
# Configuration
########################################

readonly MAIN_BRANCH="main"
readonly ALLOWED_BRANCHES=("main")  # Add more like "release/.*" if desired
readonly MAX_FILE_SIZE_KB=1024

readonly AI_COMMIT_SCRIPT="$HOME/dev-tools/ai-commit.sh"

ENABLE_SECRET_ENTROPY_SCAN=true
ENABLE_AI_RISK_SCAN=true

# Content-level secret patterns (regex, case-insensitive)
SENSITIVE_PATTERNS=(
  "\\bpassword\\b"
  "\\bapi[_-]?key\\b"
  "\\bsecret\\b"
  "\\btoken\\b"
  "\\bcredentials?\\b"
  "\\bprivate[_-]?key\\b"
  "AKIA[0-9A-Z]{16}"
  "BEGIN RSA PRIVATE KEY"
)

# Filename-level indicators (regex, case-insensitive)
FILENAME_SENSITIVE_PATTERNS=(
  "\\.env(\\.|$)"
  "id_rsa"
  "private"
  "secret"
  "credentials"
)

########################################
# Colors
########################################

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[1;34m'
NC='\033[0m'

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }
log_section() { echo -e "${BLUE}== $1 ==${NC}"; }

########################################
# Git Validation
########################################

log_section "Git validation"

if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    log_error "Not a git repository"
    exit 1
fi

REPO_ROOT=$(git rev-parse --show-toplevel)
cd "$REPO_ROOT"

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Branch policy: allow a list with confirm if not matched
is_allowed=false
for b in "${ALLOWED_BRANCHES[@]}"; do
  if [[ "$CURRENT_BRANCH" =~ ^$b$ ]]; then
    is_allowed=true
    break
  fi
done

if [ "$is_allowed" = false ]; then
    log_warn "Current branch: $CURRENT_BRANCH is not in allowed list"
    read -p "Proceed with deployment from '$CURRENT_BRANCH'? (y/N) " confirm
    if [[ ! $confirm =~ ^[Yy]$ ]]; then
        log_error "Push aborted due to branch policy"
        exit 1
    fi
fi

########################################
# Large File Protection
########################################

log_section "Large file scan"

LARGE_FILES=$(find . \
  -path './.git' -prune -o \
  -path './node_modules' -prune -o \
  -path './.next' -prune -o \
  -path './out' -prune -o \
  -path './build' -prune -o \
  -type f -size +"${MAX_FILE_SIZE_KB}"k -print)

if [ ! -z "$LARGE_FILES" ]; then

    log_warn "Large files detected:"
    echo "$LARGE_FILES"

    read -p "Continue? (y/N) " confirm

    if [[ ! $confirm =~ ^[Yy]$ ]]; then
        log_error "Push cancelled"
        exit 1
    fi

fi

########################################
# Stage Files
########################################

log_section "Staging files"

git add .

if git diff --cached --quiet; then
    log_warn "No changes detected"
    exit 0
fi

########################################
# Sensitive Data Scan
########################################

log_section "Sensitive pattern scan"

for pattern in "${SENSITIVE_PATTERNS[@]}"; do

    if git diff --staged | grep -Eqi "$pattern"; then

        log_warn "Possible secret detected: $pattern"

        read -p "Continue anyway? (y/N) " confirm

        if [[ ! $confirm =~ ^[Yy]$ ]]; then
            log_error "Push aborted"
            exit 1
        fi

    fi

done

# Filenames scan (staged)
STAGED_FILES=$(git diff --cached --name-only || true)
if [ -n "${STAGED_FILES}" ]; then
  for pattern in "${FILENAME_SENSITIVE_PATTERNS[@]}"; do
    if echo "$STAGED_FILES" | grep -Eqi "$pattern"; then
      log_warn "Suspicious filename pattern detected: $pattern"
      echo "$STAGED_FILES" | grep -Ei "$pattern" || true
      read -p "Continue anyway? (y/N) " confirm
      if [[ ! $confirm =~ ^[Yy]$ ]]; then
        log_error "Push aborted"
        exit 1
      fi
    fi
  done
fi

########################################
# Optional Entropy Secret Detection
########################################

if [ "$ENABLE_SECRET_ENTROPY_SCAN" = true ]; then

log_section "Entropy based secret scan"

TEXT_EXTS='(js|jsx|ts|tsx|css|scss|sass|html|md|mdx|yml|yaml|json|sh|py|rb|go|rs|java|kt|mjs|cjs|conf|env|txt)$'
FILES_FOR_ENTROPY=$(git diff --cached --name-only | grep -E "$TEXT_EXTS" || true)

FOUND_ENTROPY=false
if [ -n "$FILES_FOR_ENTROPY" ]; then
  while read -r f; do
    [ -z "$f" ] && continue
    if git show ":$f" | grep -E "[A-Za-z0-9+/]{40,}" >/dev/null; then
      echo "High entropy content found in: $f"
      FOUND_ENTROPY=true
    fi
  done <<< "$FILES_FOR_ENTROPY"
fi

if [ "$FOUND_ENTROPY" = true ]; then
  log_warn "Possible high entropy secrets detected"
  read -p "Continue? (y/N) " confirm
  if [[ ! $confirm =~ ^[Yy]$ ]]; then
      log_error "Push aborted"
      exit 1
  fi
fi

fi

########################################
# Linting
########################################

log_section "Lint checks"

if [ -f "package.json" ]; then

    if npm run lint; then
        log_info "Lint passed"
    else
        log_error "Lint failed"
        exit 1
    fi

else
    log_warn "No lint configuration"
fi

########################################
# AI Risk Detection
########################################

if [ "$ENABLE_AI_RISK_SCAN" = true ]; then

log_section "Change risk detection"

DIFF_FILES=$(git diff --cached --name-only)

if echo "$DIFF_FILES" | grep -E "auth|payment|database|migration|config"; then

    log_warn "High risk files modified"

    echo "$DIFF_FILES"

    read -p "Confirm deployment? (y/N) " confirm

    if [[ ! $confirm =~ ^[Yy]$ ]]; then
        log_error "Push aborted"
        exit 1
    fi

fi

fi

########################################
# AI Commit Message
########################################

log_section "Commit message generation"

if [ -f "$AI_COMMIT_SCRIPT" ]; then

    COMMIT_MSG=$("$AI_COMMIT_SCRIPT")

else

    log_warn "AI commit tool not found"

    TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
    COMMIT_MSG="chore: update project files ($TIMESTAMP)"

fi

log_info "Commit: $COMMIT_MSG"

########################################
# Commit
########################################

# Support multi-line commit messages: first line title, rest body
COMMIT_TITLE="$(printf '%s\n' "$COMMIT_MSG" | head -n 1)"
COMMIT_BODY="$(printf '%s\n' "$COMMIT_MSG" | tail -n +2 || true)"

if [ -n "$COMMIT_BODY" ]; then
    if ! git commit -m "$COMMIT_TITLE" -m "$COMMIT_BODY"; then
        log_error "Commit failed"
        exit 1
    fi
else
    if ! git commit -m "$COMMIT_TITLE"; then
        log_error "Commit failed"
        exit 1
    fi
fi

########################################
# Build Verification
########################################

log_section "Build verification"

if [ -f "package.json" ]; then

    if npm run build; then
        log_info "Build successful"
    else
        log_error "Build failed"
        exit 1
    fi

else
    log_warn "No build script"
fi

########################################
# Push
########################################

log_section "Pushing to remote"

if ! git push origin "$MAIN_BRANCH"; then
    log_error "Push failed"
    exit 1
fi

########################################
# Deployment Summary
########################################

log_section "Deployment summary"

git log -1 --stat

########################################
# Optional Release Notes
########################################

log_section "Release notes"

git log -5 --pretty=format:"• %s"

log_info "Deployment complete"
