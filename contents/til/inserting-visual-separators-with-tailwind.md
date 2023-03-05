---
title: Inserting visual separators with Tailwind
date: '2023-03-05T22:13:10.905Z'
published: false
---

# Inserting visual separators with Tailwind

Tailwind allows to use [arbitrary values](https://tailwindcss.com/docs/hover-focus-and-other-states#using-arbitrary-variants "") to write selectors. Here is an example of a breadcrumb separated by the `>` character:

```javascript
<div class="[&>:not(:first-child):before]:content-['>_']">
  <span>Clothes</span>
  <span>Men's Clothes</span>
  <span>Shoes</span>
  <span>Current Page</span>
</div>
```

To reduce verbosity, you can [add the variant](https://tailwindcss.com/docs/plugins#adding-variants "") to you tailwind config file.

```javascript
// tailwind.config.js
const plugin = require("tailwindcss/plugin");

module.exports = {
  plugins: [
    plugin(({ addVariant }) =>
      addVariant("between", "&>:not(:first-child):before")
    ),
  ],
};
```

And you will be able to use it like any other existing variant.

```javascript
<div class="between:content-['>_']">
  <span>Clothes</span>
  <span>Men's Clothes</span>
  <span>Shoes</span>
  <span>Current Page</span>
</div>
```

[Sandbox.](https://play.tailwindcss.com/4xS3OI7p2m "")

## Accessibility concern

Keep in mind that the `:before` pseudo element is only used for decorative purposes so screen readers ignore them. If the content you want to display is actually meaningful, consider using JavaScript. [See the WAI-ARIA explanation](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/examples/breadcrumb/ "").
