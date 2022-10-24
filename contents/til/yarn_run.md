---
title: "`yarn run` displays all available commands"
description: "`yarn run` will display all available binary scripts and user
defined scripts from the `package.json` file. Also, the same works for `npm
run`."
date: "2022-09-27"
---

# `yarn run` displays all available commands

`yarn run` will display all available binary scripts and user defined scripts
from the `package.json` file. Also, the same works for `npm run`.

## Example

For the following `package.json` (only scripts):

```json
"scripts": {
  "build": "build-storybook",
  "lint": "eslint --ext js,jsx,ts,tsx .",
  "storybook": "start-storybook --no-open -p 6006"
},
```

It will look something like that:

```
$ yarn run
yarn run v1.22.19
info Commands available from binary scripts: autoprefixer, build-storybook, eslint, start-storybook, storybook-server, tailwind, tailwindcss, tsc, tsserver, acorn, ansi-html, ansi-to-html, atob, browserslist, c8, chrome-debug, color-support, cssesc, cypress, default-browser-id, detect, detect-port, detective, errno, esbuild, escodegen, esgenerate, eslint-config-prettier, esparse, esvalidate, extract-zip, handlebars, he, html-minifier-terser, husky, import-local-fixture, is-ci, is-docker, jest, js-yaml, jsesc, json5, lhci, lighthouse, lint-staged, loose-envify, lz-string, miller-rabin, mime, mkdirp, nanoid, next, node-which, opener, parser, prettier, ps-tree, qrcode, raven, rc, react-docgen, regjsparser, rimraf, sane, semver, server-test, sha.js, smokehouse, sshpk-conv, sshpk-sign, sshpk-verify, start-server-and-test, start-test, strip-indent, terser, tree-kill, turbo, uglifyjs, uuid, wait-on, watch, webpack, webpack-bundle-analyzer, x-default-browser
info Project commands
   - build
      build-storybook
   - lint
      eslint --ext js,jsx,ts,tsx .
   - storybook
      start-storybook --no-open -p 6006
question Which command would you like to run?:
```
