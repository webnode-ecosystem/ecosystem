#!/bin/sh
# Exit immediately if a command exits with a non-zero status.
set -e

# Sync typescript packages
pnpm exec nx sync --verbose

# Check if there are any changes in the working directory or untracked files.
# If git status --porcelain is not empty, it means `git add .` will likely stage something.
if [ -n "$(git status --porcelain)" ]; then
  git add .
  # Only commit if there are staged changes after `git add .`
  if ! git diff --cached --quiet; then
    git commit -m 'chore: synchronize projects'
  fi
fi