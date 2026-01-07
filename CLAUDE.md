# CLAUDE.md

## Project Overview

Personal blog built with Next.js 12 + TinaCMS. Content is markdown, code is TypeScript.

## Finding Your Way

**Content**: `/contents/` - All markdown files (blog posts, pages)
**Code**: `/lib/` - Core logic | `/pages/` - Routes | `/components/` - UI
**Config**: Check `package.json` scripts, `.tina/config.ts` for CMS schema

## Key Conventions

- Blog posts require frontmatter: `title`, `date`, `published`, `tags`
- Published posts: `published: true` in frontmatter
- Tags are case-sensitive and sorted alphabetically
- Markdown → HTML conversion happens in `lib/posts.ts`

## Before Committing

- Pre-push hook runs `lint` + `build` automatically
- Vercel skips builds for documentation-only changes (see `scripts/vercel-ignore-build.sh`)

## Tech Stack Discovery

Run `yarn dev` to see the stack in action. Check `package.json` for dependencies.
