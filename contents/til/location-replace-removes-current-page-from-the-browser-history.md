---
title: location.replace() removes current page from the browser history
date: '2022-10-13T04:00:00.000Z'
description: >-
  Found out about this after clicking an exteral link in a page and not being
  able to go back to the source. How could a link behave like that? Turns out
  that it was a button with location.replace() for its onClick event.
---


# `location.replace()` removes current page from the browser history

Found out about this after clicking an exteral link in a page and not being able
to go back to the source. How could a link behave like that? Turns out that it
was a button with `location.replace()` for its `onClick` event.

Thats why you should use anchors for links instead of buttons.
[Or a div][div].

[div]: https://heydonworks.com/article/reinventing-the-hyperlink/ "Reinveinting the Hyperlink | heydonworks"
