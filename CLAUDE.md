# CLAUDE.md - AI Assistant Guide for wdsrocha.com

This document provides comprehensive guidance for AI assistants working on the wdsrocha.com codebase. It covers the architecture, conventions, workflows, and best practices specific to this project.

## Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Repository Structure](#repository-structure)
- [Development Workflow](#development-workflow)
- [Content Management](#content-management)
- [Code Conventions](#code-conventions)
- [Common Tasks](#common-tasks)
- [Important Patterns](#important-patterns)
- [Things to Avoid](#things-to-avoid)
- [Testing and Quality](#testing-and-quality)

---

## Project Overview

**wdsrocha.com** is a personal portfolio and blog built with Next.js, featuring:
- Static site generation (SSG) for optimal performance
- TinaCMS for content management
- Markdown-based blog posts with frontmatter
- RSS feed generation
- SEO optimization with sitemaps and meta tags
- Radix UI design system with Tailwind CSS

**Key Characteristics:**
- All content is pre-rendered at build time (no server-side rendering)
- Content stored as Markdown files in `contents/` directory
- Type-safe with TypeScript and Zod validation
- Deployed on Vercel (implied by configuration)

---

## Technology Stack

### Core Framework
- **Next.js 12**: React meta-framework for production
- **React 17.0.2**: UI library
- **TypeScript 4.4.4**: Type safety

### Content & CMS
- **TinaCMS 1.2.2**: Headless CMS with Git-based workflow
- **gray-matter 4.0.3**: Parse YAML frontmatter from markdown
- **remark 14.0.1**: Markdown processor
- **remark-html 15.0.0**: Markdown to HTML conversion
- **remark-prism 1.3.6**: Syntax highlighting with Prism

### Styling
- **Tailwind CSS 3.1.0**: Utility-first CSS framework
- **@tailwindcss/typography 0.5.7**: Prose styling for content
- **Radix UI Colors 0.1.7**: Semantic color system
- **windy-radix-palette 0.2.0**: Radix colors for Tailwind
- **windy-radix-typography 0.1.0**: Typography integration

### Utilities
- **Zod 3.20.6**: Schema validation and type inference
- **dayjs 1.11.6**: Date formatting
- **xmlbuilder2 3.0.2**: RSS feed generation
- **next-seo 5.5.0**: SEO meta tags
- **next-sitemap 3.1.29**: Sitemap generation

### Development Tools
- **ESLint**: Code linting (Next.js config)
- **Husky 8.0.1**: Git hooks
- **Prettier**: Code formatting (with Tailwind plugin)
- **@next/bundle-analyzer**: Bundle size analysis

---

## Repository Structure

```
/home/user/wdsrocha.com/
├── .tina/                      # TinaCMS configuration
│   ├── config.ts               # Schema and collection definitions
│   └── __generated__/          # Auto-generated TinaCMS files (do not edit)
│
├── .husky/                     # Git hooks
│   └── pre-push                # Runs lint + build before push
│
├── components/                 # React components (4 files)
│   ├── Layout.tsx              # Main layout wrapper with header/footer
│   ├── ContentRenderer.tsx     # Renders markdown HTML with prose styling
│   ├── Tag.tsx                 # Tag filtering button component
│   └── Analytics.tsx           # Google Analytics integration
│
├── contents/                   # Markdown content files
│   ├── blog/                   # Blog posts (9 published)
│   ├── drafts/                 # Unpublished content
│   ├── freestyle-app/          # App-specific pages (privacy policy)
│   └── home/                   # Home page content
│
├── lib/                        # Utility functions and data fetching
│   ├── posts.ts                # Post reading, parsing, validation
│   ├── rss.ts                  # RSS feed generation
│   ├── tina.ts                 # Simple page loading (non-blog)
│   ├── common.ts               # Date formatting utilities
│   ├── constants.ts            # BASE_URL constant
│   └── seo.config.ts           # Next-SEO configuration
│
├── pages/                      # Next.js routes
│   ├── _app.tsx                # App wrapper, global styles
│   ├── index.tsx               # Home page
│   ├── styles.css              # Custom CSS (background pattern)
│   ├── blog/
│   │   ├── index.tsx           # Blog listing with tag filtering
│   │   └── [name].tsx          # Individual blog post (dynamic route)
│   └── freestyle/
│       └── privacy/
│           └── index.tsx       # Privacy policy page
│
├── public/                     # Static assets
│   ├── [favicons]              # Various favicon sizes
│   ├── blog/feed.xml           # Generated RSS feed
│   ├── sitemap.xml             # Generated sitemap
│   ├── admin/                  # TinaCMS admin interface (generated)
│   └── til/                    # Blog post images
│
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.js          # Tailwind with Radix theme
├── next.config.js              # Next.js configuration
├── postcss.config.js           # PostCSS plugins
├── .eslintrc.json              # ESLint configuration
├── next-sitemap.config.js      # Sitemap generator config
├── environment.d.ts            # Environment variable types
└── README.md                   # Project documentation
```

### Key Directory Purposes

- **`.tina/`**: CMS configuration - defines 3 collections (Home, Blog Posts, Freestyle App)
- **`contents/`**: Source of truth for all content - Markdown files with YAML frontmatter
- **`pages/`**: Next.js file-based routing - automatically maps to URLs
- **`lib/`**: Core business logic - content loading, parsing, feed generation
- **`components/`**: Reusable React components
- **`public/`**: Static files served directly, includes generated feeds

---

## Development Workflow

### Environment Setup

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Create `.env` file with required variables:**
   ```env
   BASE_URL=http://localhost:3000
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   TINA_PUBLIC_CLIENT_ID=your-client-id
   TINA_TOKEN=your-secret-token
   ```

   **Environment Variables:**
   - `BASE_URL`: Site URL for canonical links and RSS
   - `NEXT_PUBLIC_GA_ID`: Google Analytics tracking ID
   - `TINA_PUBLIC_CLIENT_ID`: TinaCMS API client ID
   - `TINA_TOKEN`: TinaCMS authentication token

3. **Start development server:**
   ```bash
   yarn dev
   ```
   - Runs TinaCMS with file watching
   - Server: http://localhost:3000
   - Admin panel: http://localhost:3000/admin

### Available Scripts

```json
{
  "dev": "tinacms dev -c \"next-remote-watch blog\"",  // Development with hot reload
  "build": "tinacms build && next build",              // Production build
  "start": "tinacms build && next start",              // Production server
  "lint": "next lint",                                 // Run ESLint
  "analyze": "cross-env ANALYZE=true next build"       // Bundle size analysis
}
```

### Build Process

When you run `yarn build`:

1. **TinaCMS Build**: Generates schema and types in `.tina/__generated__/`
2. **Next.js Build**:
   - Runs `getStaticProps()` for all pages
   - Pre-renders all blog posts as static HTML
   - Generates RSS feed at `public/blog/feed.xml`
   - Creates sitemap at `public/sitemap.xml`
3. **Output**: Static files in `.next/` ready for deployment

### Git Hooks

**Pre-push hook** (`.husky/pre-push`):
```bash
yarn lint
yarn build
```

**What this means for you:**
- Code must pass linting before you can push
- Code must build successfully before you can push
- This ensures quality gate is met
- If adding new features, ensure they don't break the build

### Deployment

- Deployment is typically handled by Vercel
- Pushing to main/master branch triggers automatic deployment
- All pages are static - no server runtime needed
- Environment variables must be configured in Vercel dashboard

---

## Content Management

### TinaCMS Schema

The CMS defines **three collections** in `.tina/config.ts`:

#### 1. Home Collection
- **Path**: `contents/home/`
- **Fields**: `content` (rich-text), `description` (string)
- **Restrictions**: Cannot create/delete (single page only)

#### 2. Blog Posts Collection
- **Path**: `contents/blog/`
- **Fields**:
  - `title` (string, required): Blog post title
  - `date` (datetime, required): Creation date
  - `description` (string, optional): SEO description
  - `tags` (string array): Taggable categories
  - `content` (rich-text): Post body
  - `published` (boolean): Publication status
- **Auto-generated**: Filename from title (slugified)
- **Default values**: Current date, `published: false`

#### 3. Freestyle App Collection
- **Path**: `contents/freestyle-app/`
- **Fields**: `content`, `description`
- **Restrictions**: Cannot create/delete

### Content File Format

All content uses **YAML frontmatter + Markdown body**:

```markdown
---
title: "My Blog Post Title"
date: '2024-01-15T04:00:00.000Z'
description: 'A brief description for SEO and RSS'
published: true
tags:
  - TIL
  - JavaScript
---

# My Blog Post Title

Content goes here in **Markdown** format.

## Subheading

- List item 1
- List item 2

\`\`\`javascript
console.log('Code blocks work too!');
\`\`\`
```

### Working with Content

#### Creating a New Blog Post

**Option 1: Via TinaCMS (Recommended)**
1. Navigate to http://localhost:3000/admin
2. Click "Blog Posts" → "Create New"
3. Fill in title, content, tags
4. Set `published: true` when ready
5. Save - file is created in `contents/blog/`

**Option 2: Manually**
1. Create new `.md` file in `contents/blog/`
2. Use kebab-case filename: `my-new-post.md`
3. Add YAML frontmatter with all required fields
4. Write content in Markdown
5. Ensure `published: true` to make it visible

#### Publishing/Unpublishing Posts

- Set `published: true` in frontmatter to publish
- Set `published: false` to hide (moves to draft state)
- Only published posts appear on the site
- Unpublished posts are filtered out by `getPosts()` in `lib/posts.ts:104`

#### Adding Tags

- Tags are arrays of strings in frontmatter
- Tags are case-sensitive
- Tags are automatically sorted alphabetically
- All tags appear as filters on `/blog` page
- Common tags: "TIL", "JavaScript", "React", "CSS"

### Content Processing Pipeline

```
Markdown File (contents/blog/*.md)
    ↓
gray-matter (parse frontmatter)
    ↓
Zod validation (type safety)
    ↓
remark (markdown → AST)
    ↓
remark-html (AST → HTML)
    ↓
remark-prism (syntax highlighting)
    ↓
ContentRenderer component (with prose styling)
```

---

## Code Conventions

### TypeScript Patterns

#### 1. Functional Components with Explicit Props

```typescript
// ✅ GOOD - Explicit interface
interface Props {
  children?: React.ReactNode;
  title: string;
}

export const MyComponent = ({ children, title }: Props) => {
  return <div>{title}</div>;
};
```

#### 2. Zod Schema + Type Inference

```typescript
// ✅ GOOD - Single source of truth
const postScheme = z.object({
  title: z.string(),
  date: z.string().datetime(),
  published: z.boolean(),
}).strict();

export type Post = z.infer<typeof postScheme>;
```

**Why:** Runtime validation + compile-time types from one definition

#### 3. Type-Safe Data Fetching

```typescript
// ✅ GOOD - Infer types from getStaticProps
export const getStaticProps: GetStaticProps<{ post: Post }> = async ({ params }) => {
  const post = await getPostByFilename(`${params.name}.md`);
  return { props: { post } };
};

const Page: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ post }) => {
  // post is fully typed
};
```

### Component Patterns

#### Layout Component

```typescript
// components/Layout.tsx
export const Layout = ({ children }: Props) => {
  return (
    <div className="mx-auto flex h-screen max-w-4xl flex-col px-4 pt-4">
      <header className="flex flex-wrap items-center justify-between">
        {/* Header content */}
      </header>
      <main className="flex-1 overflow-auto pb-8">
        {children}
      </main>
      <footer className="border-t border-mauve-6 py-4">
        {/* Footer content */}
      </footer>
    </div>
  );
};
```

**Pattern:** All pages wrapped in Layout for consistent header/footer

#### Content Rendering

```typescript
// components/ContentRenderer.tsx
export const ContentRenderer = ({ children }: Props) => {
  return (
    <div
      className={classNames(
        "prose prose-mauve sm:prose-xl",
        "prose-a:text-primary-11 prose-a:underline-offset-4",
        "prose-code:rounded prose-code:bg-primary-3 prose-code:px-1",
      )}
      dangerouslySetInnerHTML={{ __html: children }}
    />
  );
};
```

**Pattern:** Use prose plugin for styled markdown content

### Styling Conventions

#### Tailwind Utility Classes

```typescript
// ✅ GOOD - Responsive, semantic classes
<div className="mx-auto flex h-screen max-w-4xl flex-col px-4 pt-4">

// ❌ AVOID - Inline styles
<div style={{ maxWidth: '896px', display: 'flex' }}>
```

#### Color System

```typescript
// ✅ GOOD - Use Radix semantic colors
<a className="text-primary-11 hover:text-primary-12">

// ✅ GOOD - Background colors
<div className="bg-mauve-3 text-mauve-11">

// ❌ AVOID - Arbitrary colors
<a className="text-pink-500">
```

**Color Scale:**
- `primary-1` to `primary-12`: Pink scale (main brand color)
- `mauve-1` to `mauve-12`: Neutral gray scale
- Lower numbers = backgrounds, higher numbers = foregrounds
- `primary-11` and `primary-12` for interactive elements
- `primary-3` for subtle backgrounds

#### Responsive Design

```typescript
// ✅ GOOD - Mobile-first with breakpoints
<div className="prose prose-mauve sm:prose-xl">

// Breakpoints: sm (640px), md (768px), lg (1024px)
```

### File Naming

- **Components**: PascalCase - `Layout.tsx`, `ContentRenderer.tsx`
- **Utilities**: camelCase - `posts.ts`, `common.ts`
- **Pages**: Next.js convention - `index.tsx`, `[name].tsx`
- **Content**: kebab-case - `my-blog-post.md`

### Import Organization

```typescript
// 1. External dependencies
import fs from "fs";
import matter from "gray-matter";
import { z } from "zod";

// 2. Internal utilities
import { markdownToHtml } from "./markdown";

// 3. Types
import type { Post } from "./types";
```

---

## Common Tasks

### Task 1: Adding a New Blog Post

```bash
# Option A: Use TinaCMS admin
# 1. Navigate to http://localhost:3000/admin
# 2. Create new blog post
# 3. Fill in fields and save

# Option B: Create file manually
touch contents/blog/my-new-post.md
```

**File content:**
```markdown
---
title: "My New Post"
date: '2024-01-15T04:00:00.000Z'
description: 'A brief description'
published: true
tags:
  - TIL
---

# My New Post

Content here.
```

**Build and verify:**
```bash
yarn build  # Ensure it builds
yarn dev    # Check http://localhost:3000/blog
```

### Task 2: Modifying Site Styles

**Global styles:**
- Edit `pages/styles.css` for body background pattern
- Edit `tailwind.config.js` for theme colors

**Component styles:**
- Use Tailwind utility classes
- Follow Radix color system (`primary-*`, `mauve-*`)

**Example: Change primary color**
```javascript
// tailwind.config.js
const primary = Object.entries(radixColors.blue) // Change from pink to blue
```

### Task 3: Adding a New Page

**1. Create page file:**
```bash
# For /about route
touch pages/about.tsx
```

**2. Add page component:**
```typescript
// pages/about.tsx
import type { NextPage } from "next";
import { Layout } from "../components/Layout";
import { NextSeo } from "next-seo";

const AboutPage: NextPage = () => {
  return (
    <Layout>
      <NextSeo title="About" />
      <h1>About</h1>
      {/* Content */}
    </Layout>
  );
};

export default AboutPage;
```

**3. Add to navigation (optional):**
```typescript
// components/Layout.tsx
<Link href="/about" passHref>
  <a>About</a>
</Link>
```

### Task 4: Updating Dependencies

```bash
# Check for outdated packages
yarn upgrade-interactive --latest

# Update specific package
yarn upgrade react@latest

# Test build after updates
yarn build
yarn dev
```

**Important:** Test thoroughly after updates, especially:
- Next.js (may require code changes)
- React (check for breaking changes)
- Tailwind CSS (may affect styling)

### Task 5: Adding a New Component

```bash
touch components/NewComponent.tsx
```

```typescript
// components/NewComponent.tsx
interface Props {
  title: string;
  children?: React.ReactNode;
}

export const NewComponent = ({ title, children }: Props) => {
  return (
    <div className="rounded-lg bg-mauve-3 p-4">
      <h2 className="text-xl font-semibold text-primary-11">{title}</h2>
      {children}
    </div>
  );
};
```

**Usage:**
```typescript
import { NewComponent } from "../components/NewComponent";

<NewComponent title="Hello">
  Content here
</NewComponent>
```

### Task 6: Modifying RSS Feed

**Edit RSS configuration:**
```typescript
// lib/rss.ts
const rssConfig = {
  title: "Wesley's Blog",  // Update title
  description: "...",       // Update description
  link: BASE_URL,
  // ... other fields
};
```

**RSS regenerates on every build** - test with:
```bash
yarn build
cat public/blog/feed.xml  # Verify output
```

### Task 7: Adding Environment Variables

**1. Define type:**
```typescript
// environment.d.ts
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MY_NEW_VAR: string;
    }
  }
}
```

**2. Add to `.env`:**
```env
MY_NEW_VAR=value
```

**3. Use in code:**
```typescript
const myVar = process.env.MY_NEW_VAR;
```

**4. Add to Vercel:**
- Go to project settings → Environment Variables
- Add `MY_NEW_VAR` with production value

---

## Important Patterns

### Pattern 1: Static Generation for All Pages

**All pages use `getStaticProps` or `getStaticPaths`:**

```typescript
// For list pages
export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();
  return { props: { posts } };
};

// For dynamic pages
export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getPosts();
  return {
    fallback: false,  // 404 if not in paths
    paths: posts.map(({ name }) => ({ params: { name } })),
  };
};
```

**Why:** Pre-renders at build time for maximum performance

### Pattern 2: Content Validation with Zod

**All content is validated before use:**

```typescript
const post = postScheme.parse(data, {
  errorMap: getContextualErrorMap(filename)
});
```

**Why:** Catches invalid content at build time, not runtime

### Pattern 3: Filtering Published Content

**Only show published posts:**

```typescript
// lib/posts.ts
export async function getPosts(): Promise<Post[]> {
  const posts = await Promise.all(promises);
  return posts
    .filter(post => post.published)  // Only published
    .sort((a, b) => a.date > b.date ? -1 : 1);  // Newest first
}
```

**Why:** Allows drafts to exist without showing on site

### Pattern 4: SEO for Every Page

**Every page includes Next-SEO:**

```typescript
import { NextSeo } from "next-seo";

<NextSeo
  title={`${title} | Blog`}
  description={description}
  canonical={`${BASE_URL}/blog/${name}`}
  twitter={{ cardType: "summary", handle: "@wdsrocha" }}
/>
```

**Why:** Consistent metadata for search engines and social sharing

### Pattern 5: Client-Side Filtering

**Blog tag filtering happens client-side:**

```typescript
const [selectedTags, setSelectedTags] = useState<string[]>([]);

const filteredPosts = posts.filter(post => {
  if (selectedTags.length === 0) return true;
  return post.tags?.some(tag => selectedTags.includes(tag));
});
```

**Why:** No server needed, instant filtering, all data already static

### Pattern 6: Markdown Processing

**Consistent markdown processing:**

```typescript
export async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html, { sanitize: false })
    .use(prism, { plugins: ["line-numbers"] })
    .process(markdown);
  return result.toString();
}
```

**Why:** Syntax highlighting, HTML conversion, consistent output

### Pattern 7: URL Slugification

**Custom slug function for filenames:**

```typescript
function customSlugify(text: string | undefined) {
  return (text ?? "")
    .normalize("NFKD")      // Unicode normalization
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\_/g, "-")
    .replace(/\-\-+/g, "-")
    .replace(/\-$/g, "");
}
```

**Why:** Handles accents, special characters, creates clean URLs

---

## Things to Avoid

### ❌ Don't Edit Generated Files

**Never manually edit:**
- `.tina/__generated__/*` - Auto-generated by TinaCMS
- `public/admin/*` - TinaCMS admin interface
- `.next/*` - Next.js build output

**Why:** These files are regenerated on every build and your changes will be lost.

### ❌ Don't Use Server-Side Rendering

```typescript
// ❌ AVOID - This project uses SSG only
export async function getServerSideProps() {
  // Don't use this
}
```

**Why:** All pages are static. Use `getStaticProps` instead.

### ❌ Don't Skip Content Validation

```typescript
// ❌ AVOID - Unvalidated content
const data = matter(file).data;
const post = data as Post;  // No validation!

// ✅ GOOD - Validated with Zod
const post = postScheme.parse(data);
```

**Why:** Invalid content will cause runtime errors on the site.

### ❌ Don't Use Arbitrary Colors

```typescript
// ❌ AVOID - Breaks design system
<div className="bg-pink-500 text-gray-900">

// ✅ GOOD - Use semantic Radix colors
<div className="bg-primary-3 text-mauve-12">
```

**Why:** Maintains consistent design system and accessibility.

### ❌ Don't Commit `.env` Files

```bash
# ❌ AVOID
git add .env

# ✅ GOOD - Already in .gitignore
```

**Why:** Contains secrets. Use `.env.example` for documentation.

### ❌ Don't Bypass Pre-push Hooks

```bash
# ❌ AVOID
git push --no-verify

# ✅ GOOD - Fix the issues
yarn lint  # Fix lint errors
yarn build  # Fix build errors
git push
```

**Why:** Hooks prevent broken code from being deployed.

### ❌ Don't Use Inline Styles

```typescript
// ❌ AVOID - Inline styles
<div style={{ padding: '16px', color: '#ff0000' }}>

// ✅ GOOD - Tailwind utilities
<div className="p-4 text-red-11">
```

**Why:** Breaks Tailwind's optimization and design consistency.

### ❌ Don't Create Unpublished Posts Without Intent

```markdown
---
title: "Test Post"
published: true  # ❌ Will show on production!
---
```

**Why:** Set `published: false` for drafts to prevent accidental publication.

### ❌ Don't Modify node_modules

```bash
# ❌ AVOID - Editing installed packages
vim node_modules/some-package/index.js
```

**Why:** Changes are lost on next install. Use patch-package if absolutely needed.

---

## Testing and Quality

### Linting

**Run ESLint:**
```bash
yarn lint

# Fix auto-fixable issues
yarn lint --fix
```

**ESLint configuration:**
- Uses `next/core-web-vitals` ruleset
- Enforces Next.js best practices
- Checks accessibility issues

### Build Validation

**Always build before pushing:**
```bash
yarn build
```

**What gets validated:**
- TypeScript compilation
- TinaCMS schema validation
- All content Zod validation
- RSS feed generation
- Sitemap generation
- Next.js static generation

**Common build errors:**

1. **Invalid frontmatter:**
   ```
   Error: Received 'undefined' for post 'my-post.md'
   ```
   Fix: Add missing required fields (title, date, published)

2. **Invalid date format:**
   ```
   Error: Invalid datetime
   ```
   Fix: Use ISO 8601 format: `'2024-01-15T04:00:00.000Z'`

3. **TypeScript errors:**
   ```
   Type 'string | undefined' is not assignable to type 'string'
   ```
   Fix: Handle undefined cases or use optional chaining

### Bundle Analysis

**Analyze bundle size:**
```bash
yarn analyze
```

**Opens bundle analyzer:**
- Shows size of each dependency
- Identifies large imports
- Helps optimize bundle

### Manual Testing Checklist

Before pushing major changes:

- [ ] Home page loads (`/`)
- [ ] Blog index loads (`/blog`)
- [ ] Individual blog posts load (`/blog/[name]`)
- [ ] Tag filtering works on blog index
- [ ] RSS feed is valid (`/blog/feed.xml`)
- [ ] Sitemap is generated (`/sitemap.xml`)
- [ ] No console errors
- [ ] Mobile responsive (check at 375px width)
- [ ] Links work correctly
- [ ] Code syntax highlighting works

### Content Quality Checks

Before publishing a blog post:

- [ ] Title is descriptive and matches H1
- [ ] Date is in correct ISO format
- [ ] Description is concise (under 160 chars for SEO)
- [ ] Tags are relevant and properly capitalized
- [ ] Content has no typos
- [ ] Code blocks have proper language tags
- [ ] `published: true` is set
- [ ] Images (if any) are in `public/til/` and referenced correctly
- [ ] Post builds successfully

---

## Quick Reference

### File Locations Quick Guide

| What | Where |
|------|-------|
| Blog posts | `contents/blog/*.md` |
| Home page content | `contents/home/home.md` |
| Components | `components/*.tsx` |
| Page routes | `pages/**/*.tsx` |
| Utilities | `lib/*.ts` |
| TinaCMS config | `.tina/config.ts` |
| Tailwind config | `tailwind.config.js` |
| Environment vars | `.env` (create this) |
| RSS feed (generated) | `public/blog/feed.xml` |
| Sitemap (generated) | `public/sitemap.xml` |

### Command Quick Reference

| Task | Command |
|------|---------|
| Start dev server | `yarn dev` |
| Build for production | `yarn build` |
| Run production server | `yarn start` |
| Lint code | `yarn lint` |
| Analyze bundle | `yarn analyze` |
| Install dependencies | `yarn install` |
| Add dependency | `yarn add package-name` |
| Add dev dependency | `yarn add -D package-name` |

### URL Quick Reference

| Page | Local URL | Production URL |
|------|-----------|----------------|
| Home | http://localhost:3000 | https://www.wdsrocha.com |
| Blog index | http://localhost:3000/blog | https://www.wdsrocha.com/blog |
| Blog post | http://localhost:3000/blog/post-name | https://www.wdsrocha.com/blog/post-name |
| TinaCMS admin | http://localhost:3000/admin | https://www.wdsrocha.com/admin |
| RSS feed | http://localhost:3000/blog/feed.xml | https://www.wdsrocha.com/blog/feed.xml |

### Key Function Reference

| Function | File | Purpose |
|----------|------|---------|
| `getPosts()` | lib/posts.ts | Get all published posts |
| `getPostByFilename()` | lib/posts.ts | Get single post by filename |
| `getAllTags()` | lib/posts.ts | Get unique tags from all posts |
| `markdownToHtml()` | lib/posts.ts | Convert markdown to HTML |
| `generateRssFeed()` | lib/rss.ts | Generate RSS feed XML |
| `formatDate()` | lib/common.ts | Format dates for display |

---

## Additional Resources

### External Documentation

- **Next.js**: https://nextjs.org/docs
- **TinaCMS**: https://tina.io/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Radix Colors**: https://www.radix-ui.com/colors
- **Zod**: https://zod.dev

### Project-Specific Docs

- **README.md**: Basic setup instructions
- **package.json**: Available scripts and dependencies
- **.tina/config.ts**: CMS schema and configuration

### Getting Help

- Check build errors carefully - they usually point to the exact issue
- Run `yarn lint` to catch common mistakes
- Use `yarn build` to validate everything before pushing
- Review this CLAUDE.md when unsure about conventions

---

**Last Updated**: 2026-01-07
**Version**: 1.0.0
