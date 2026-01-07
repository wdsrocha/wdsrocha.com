#!/bin/bash

CHANGED_FILES=$(git diff HEAD^ HEAD --name-only)

CODE_CHANGES=$(echo "$CHANGED_FILES" | grep -vE '^(contents/|.*\.md$|.*\.mdx$|\.tina/|public/images/|public/fonts/|LICENSE|\.gitignore|README\.md)')

if [ -z "$CODE_CHANGES" ]; then
  echo "Only documentation/content files changed. Skipping build."
  exit 1
fi

echo "Code changes detected. Proceeding with build."
exit 0
