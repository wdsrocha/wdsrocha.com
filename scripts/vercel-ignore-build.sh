#!/bin/bash

# Exit code 0: Proceed with build
# Exit code 1: Skip build

echo "Checking if build should run..."

# Get the list of changed files
if git diff HEAD^ HEAD --name-only; then
  CHANGED_FILES=$(git diff HEAD^ HEAD --name-only)

  # Filter out docs and content files
  CODE_CHANGES=$(echo "$CHANGED_FILES" | grep -vE '^(contents/|.*\.md$|.*\.mdx$|\.tina/|public/images/|public/fonts/|LICENSE|\.gitignore|README\.md)')

  if [ -z "$CODE_CHANGES" ]; then
    echo "Only documentation/content files changed. Skipping build."
    exit 1
  fi
fi

echo "Code changes detected. Proceeding with build."
exit 0
