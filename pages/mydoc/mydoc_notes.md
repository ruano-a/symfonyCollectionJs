---
title: Notes
keywords: symfony, demo, collection, javascript, js, form
last_updated: December 12, 2022
tags: [getting_started, notes]
summary: "Diverse notes for users"
sidebar: mydoc_sidebar
permalink: notes.html
folder: mydoc
---

If you're using this without jQuery, but with a loader (AMD, CommonJS, or anything), you MUST use a version on a branch / tag with "js-only" in the name! Otherwise it WILL NOT BUILD! (I didn't want to make several versions but tests ended showing that it was the best choice... Unless you have a better idea?)

This should theoretically work with unlimited nested collection. However if you encounter an issue, let me know.
Don't hesitate to let me know if you're using this plugin, I'm super interested !
For advances features, you should use the plugin of ninsuo.
The file test/prep_nojquery_tests.js contains a homemade micro version of jQuery, I guess it can interest some people.
