---
title: "Symbol protects React from XSS attacks"
slug: "symbol-protects-react-from-xss-attacks"
date: "2022-10-29"
description: "If your server has a hole that lets the user store an arbitrary
JSON object while the client code expects a string, React would be vulnerable to
an XSS attack."
---

# `Symbol` protects React from XSS attacks

> If your server has a hole that lets the user store an arbitrary JSON object
> while the client code expects a string, React would be vulnerable to an XSS
> attack.
>
> The fix in React 0.14 was to tag every React element with a Symbol.
> So even if the server has a security hole and returns JSON instead of text,
> that JSON can’t include `Symbol.for('react.element')`.

Source: <https://overreacted.io/why-do-react-elements-have-typeof-property/>

If the browser doesen't support Symbols (what??), React just uses an arbitrary
number instead. The chosen number is `0xeac7`. Why this number?
[It has a special property][1].

[1]: https://github.com/facebook/react/pull/4832/files#r39431415
