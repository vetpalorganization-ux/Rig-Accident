#!/bin/bash

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

MAIN_BRANCH="main"
MAX_FILE_SIZE_KB=1024

AI_COMMIT_SCRIPT="$HOME/dev-tools/ai-commit.sh"

ENABLE_SECRET_ENTROPY_SCAN=true
ENABLE_AI_RISK_SCAN=true

SENSITIVE_PATTERNS=(
"password"
"api_key"
"secret"
"token"
"credentials"
"private_key"
"AKIA"
"BEGIN RSA PRIVATE KEY"
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

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [ "$CURRENT_BRANCH" != "$MAIN_BRANCH" ]; then
    log_error "Current branch: $CURRENT_BRANCH"
    log_error "This script only pushes $MAIN_BRANCH"
    exit 1
fi

########################################
# Large File Protection
########################################

log_section "Large file scan"

LARGE_FILES=$(find . -type f -not -path '*/.*' -size +${MAX_FILE_SIZE_KB}k)

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

    if git diff --staged | grep -qi "$pattern"; then

        log_warn "Possible secret detected: $pattern"

        read -p "Continue anyway? (y/N) " confirm

        if [[ ! $confirm =~ ^[Yy]$ ]]; then
            log_error "Push aborted"
            exit 1
        fi

    fi

done

########################################
# Optional Entropy Secret Detection
########################################

if [ "$ENABLE_SECRET_ENTROPY_SCAN" = true ]; then

log_section "Entropy based secret scan"

HIGH_ENTROPY=$(git diff --staged | grep -E "[A-Za-z0-9+/]{40,}")

if [ ! -z "$HIGH_ENTROPY" ]; then

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

if ! git commit -m "$COMMIT_MSG"; then
    log_error "Commit failed"
    exit 1
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
