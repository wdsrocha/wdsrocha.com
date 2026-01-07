#!/bin/bash

# Exit code 0: Skip build
# Exit code 1: Proceed with build
# Note: Netlify uses opposite exit codes from Vercel

echo "Checking if build should run..."

# Get the list of changed files
if git diff $CACHED_COMMIT_REF $COMMIT_REF --name-only; then
  CHANGED_FILES=$(git diff $CACHED_COMMIT_REF $COMMIT_REF --name-only)

  # Filter out docs and content files
  CODE_CHANGES=$(echo "$CHANGED_FILES" | grep -vE '^(contents/|.*\.md$|.*\.mdx$|\.tina/|public/images/|public/fonts/|LICENSE|\.gitignore|README\.md)')

  if [ -z "$CODE_CHANGES" ]; then
    echo "Only documentation/content files changed. Skipping build."
    exit 0
  fi
fi

echo "Code changes detected. Proceeding with build."
exit 1
