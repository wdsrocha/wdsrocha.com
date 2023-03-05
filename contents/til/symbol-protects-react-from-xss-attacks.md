---
title: "Symbol protects React from XSS attacks"
date: "2022-10-29T04:00:00.000Z"
lastUpdate: "2022-11-01T04:00:00.000Z"
description: "If your server has a hole that lets the user store an arbitrary
JSON object while the client code expects a string, React would be vulnerable to
an XSS attack."
published: true
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

If the browser doesen't support Symbols (what??), React could use an arbitrary
value instead. The chosen value was the nummber `0xeac7`. Why this number?
[It has a special property][1].

[1]: https://github.com/facebook/react/pull/4832/files#r39431415
