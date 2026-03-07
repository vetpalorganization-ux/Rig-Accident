#!/usr/bin/env bash
set -Eeuo pipefail
IFS=$'\n\t'

############################################################
# push-live.sh
# Intelligent Git Push + AI DevOps Assistant
#
# Enhancements:
# - Portable shebang for macOS/Linux via /usr/bin/env bash
# - Can run from ANY directory:
#     * Auto-detects nearest git repo from CWD
#     * Falls back to repo of script's directory
#     * Or accept --repo /path/to/repo
# - Graceful handling if npm is missing or scripts are absent
# - Pushes the CURRENT branch by default (was hardcoded to main)
############################################################

########################################
# Configuration
########################################

readonly DEFAULT_MAIN_BRANCH="main"
# Allowed branches regex list; keep 'main' default. Add more if needed.
readonly ALLOWED_BRANCHES=("main")
readonly MAX_FILE_SIZE_KB=1024

readonly AI_COMMIT_SCRIPT="$HOME/dev-tools/ai-commit.sh"

ENABLE_SECRET_ENTROPY_SCAN=true
ENABLE_AI_RISK_SCAN=true
NO_PUSH=false
REPO_PATH=""

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
# Colors & Logging
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
# Helpers
########################################

script_dir() {
  local src="${BASH_SOURCE[0]}"
  while [ -h "$src" ]; do # resolve symlink
    local dir
    dir="$(cd -P "$(dirname "$src")" && pwd)"
    src="$(readlink "$src")"
    [[ $src != /* ]] && src="$dir/$src"
  done
  cd -P "$(dirname "$src")" && pwd
}

find_git_root_from() {
  local start_dir="$1"
  local dir="$start_dir"
  while [ "$dir" != "/" ] && [ -n "$dir" ]; do
    if [ -d "$dir/.git" ]; then
      echo "$dir"
      return 0
    fi
    dir="$(cd "$dir/.." && pwd)"
  done
  return 1
}

has_cmd() { command -v "$1" >/dev/null 2>&1; }

########################################
# CLI Flags
########################################

for arg in "$@"; do
  case "$arg" in
    --no-push)
      NO_PUSH=true
      ;;
    --repo=*)
      REPO_PATH="${arg#*=}"
      ;;
    --repo)
      log_error "--repo requires a value, e.g. --repo=/path/to/repo"
      exit 1
      ;;
    -h|--help)
      cat <<EOF
Usage: push-live.sh [--no-push] [--repo=/path/to/repo] [--help]
  --no-push         Run all checks and build, but skip git push
  --repo=PATH       Explicit path to the repository root to operate on
  --help            Show this help and exit

Tips to run from anywhere:
  - Add this directory to your PATH or symlink it into ~/bin
  - Ensure it's executable: chmod +x push-live.sh
EOF
      exit 0
      ;;
    *)
      ;;
  esac
done

########################################
# Tool availability
########################################

if ! has_cmd git; then
  log_error "git is not installed or not in PATH"
  exit 127
fi

if ! has_cmd npm; then
  log_warn "npm not found; lint/build steps will be skipped if present"
fi

########################################
# Determine repository root (run from anywhere)
########################################

log_section "Locating repository"

REPO_ROOT=""

# 1) If --repo provided, validate and use
if [ -n "${REPO_PATH}" ]; then
  if [ -d "${REPO_PATH}" ]; then
    if git -C "${REPO_PATH}" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
      REPO_ROOT="$(cd "${REPO_PATH}" && git rev-parse --show-toplevel)"
    else
      log_error "Provided --repo is not a git repository: ${REPO_PATH}"
      exit 1
    fi
  else
    log_error "Provided --repo path does not exist: ${REPO_PATH}"
    exit 1
  fi
fi

# 2) Try current working directory chain
if [ -z "$REPO_ROOT" ]; then
  if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    REPO_ROOT="$(git rev-parse --show-toplevel)"
  else
    if root=$(find_git_root_from "$(pwd)" 2>/dev/null); then
      REPO_ROOT="$root"
    fi
  fi
fi

# 3) Try script's directory chain
if [ -z "$REPO_ROOT" ]; then
  SCRIPT_DIR="$(script_dir)"
  if git -C "$SCRIPT_DIR" rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    REPO_ROOT="$(git -C "$SCRIPT_DIR" rev-parse --show-toplevel)"
  else
    if root=$(find_git_root_from "$SCRIPT_DIR" 2>/dev/null); then
      REPO_ROOT="$root"
    fi
  fi
fi

if [ -z "$REPO_ROOT" ]; then
  log_error "Unable to locate a git repository. Run inside a repo or pass --repo=/path/to/repo."
  exit 1
fi

log_info "Repository: $REPO_ROOT"
cd "$REPO_ROOT"

########################################
# Git Validation
########################################

log_section "Git validation"

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
  log_warn "Current branch '$CURRENT_BRANCH' is not in allowed list"
  read -r -p "Proceed with deployment from '$CURRENT_BRANCH'? (y/N) " confirm
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

if [ -n "$LARGE_FILES" ]; then
  log_warn "Large files detected:"
  echo "$LARGE_FILES"
  read -r -p "Continue? (y/N) " confirm
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
    read -r -p "Continue anyway? (y/N) " confirm
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
      read -r -p "Continue anyway? (y/N) " confirm
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
    read -r -p "Continue? (y/N) " confirm
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

if [ -f "package.json" ] && has_cmd npm; then
  if npm run -s | grep -qE '^\s*lint\s'; then
    if npm run lint; then
      log_info "Lint passed"
    else
      log_error "Lint failed"
      exit 1
    fi
  else
    log_warn "No lint script defined in package.json"
  fi
else
  log_warn "No lint configuration or npm unavailable"
fi

########################################
# AI Risk Detection
########################################

if [ "$ENABLE_AI_RISK_SCAN" = true ]; then
  log_section "Change risk detection"

  DIFF_FILES=$(git diff --cached --name-only)

  if echo "$DIFF_FILES" | grep -E "auth|payment|database|migration|config" >/dev/null; then
    log_warn "High risk files modified"
    echo "$DIFF_FILES"
    read -r -p "Confirm deployment? (y/N) " confirm
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
  set +e
  COMMIT_MSG=$(OLLAMA_NO_MLX=1 "$AI_COMMIT_SCRIPT" 2>/dev/null)
  STATUS=$?
  set -e
  if [ $STATUS -ne 0 ] || [ -z "${COMMIT_MSG:-}" ]; then
    log_warn "AI commit tool failed or returned empty message; using fallback"
    TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
    COMMIT_MSG="chore: update project files ($TIMESTAMP)"
  fi
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

if [ -f "package.json" ] && has_cmd npm; then
  if npm run -s | grep -qE '^\s*build\s'; then
    if npm run build; then
      log_info "Build successful"
    else
      log_error "Build failed"
      exit 1
    fi
  else
    log_warn "No build script defined in package.json"
  fi
else
  log_warn "No build script or npm unavailable"
fi

########################################
# Push
########################################

log_section "Pushing to remote"

if [ "$NO_PUSH" = true ]; then
  log_warn "Skipping push due to --no-push flag"
else
  # Push the CURRENT branch by default; fallback to DEFAULT_MAIN_BRANCH if detached
  BRANCH_TO_PUSH="$CURRENT_BRANCH"
  if [ "$BRANCH_TO_PUSH" = "HEAD" ] || [ -z "$BRANCH_TO_PUSH" ]; then
    BRANCH_TO_PUSH="$DEFAULT_MAIN_BRANCH"
  fi
  if ! git push origin "$BRANCH_TO_PUSH"; then
    log_error "Push failed"
    exit 1
  fi
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
