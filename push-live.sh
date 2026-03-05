#!/bin/bash

# push-live.sh
# Git workflow automation tool for RigAccident.com

# --- Configuration ---
MAIN_BRANCH="main"
MAX_FILE_SIZE_KB=1024 # 1MB limit for safety
SENSITIVE_PATTERNS=("password" "api_key" "secret" "token" "credentials" "re_")

# --- UI Helpers ---
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

log_info() { echo -e "${GREEN}[INFO]${NC} $1"; }
log_warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# --- 1. Git Validation ---
if ! git rev-parse --is-inside-work-tree > /dev/null 2>&1; then
    log_error "This directory is not a Git repository. Aborting."
    exit 1
fi

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "$MAIN_BRANCH" ]; then
    log_error "You are currently on branch '$CURRENT_BRANCH'. This script only works on '$MAIN_BRANCH'. Aborting."
    exit 1
fi

# --- 2. Safety Checks (Large Files & Sensitive Data) ---
log_info "Running safety checks..."

# Check for large files staged/modified
LARGE_FILES=$(find . -type f -not -path '*/.*' -size +${MAX_FILE_SIZE_KB}k)
if [ ! -z "$LARGE_FILES" ]; then
    log_warn "The following files are larger than ${MAX_FILE_SIZE_KB}KB:"
    echo "$LARGE_FILES"
    read -p "Do you still want to proceed? (y/N) " confirm
    if [[ ! $confirm =~ ^[Yy]$ ]]; then
        log_error "Push aborted due to large files."
        exit 1
    fi
fi

# Check for sensitive strings in staged changes
log_info "Checking for sensitive data patterns..."
for pattern in "${SENSITIVE_PATTERNS[@]}"; do
    if git diff --staged | grep -qi "$pattern"; then
        log_warn "Potential sensitive data (pattern: $pattern) detected in staged changes."
        read -p "Is this intentional? (y/N) " confirm
        if [[ ! $confirm =~ ^[Yy]$ ]]; then
            log_error "Push aborted due to sensitive data concerns."
            exit 1
        fi
    fi
done

# --- 3. Linting ---
log_info "Running project linting checks..."
if [ -f "package.json" ]; then
    if npm run lint; then
        log_info "Linting passed successfully."
    else
        log_error "Linting failed. Please fix the errors above before pushing. Aborting."
        exit 1
    fi
else
    log_warn "No package.json found. Skipping linting checks."
fi

# --- 4. Git Workflow Automation ---
log_info "Staging all changes..."
git add .

# Check if there are changes to commit
if git diff --cached --quiet; then
    log_warn "No changes detected to commit. Aborting."
    exit 0
fi

TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
COMMIT_MSG="Auto-commit: $TIMESTAMP"

log_info "Committing changes: $COMMIT_MSG"
if ! git commit -m "$COMMIT_MSG"; then
    log_error "Git commit failed. Aborting."
    exit 1
fi

log_info "Pushing to remote $MAIN_BRANCH..."
if ! git push origin "$MAIN_BRANCH"; then
    log_error "Git push failed. Please check your network connection and credentials. Aborting."
    exit 1
fi

log_info "Successfully pushed to GitHub! Vercel deployment triggered."
