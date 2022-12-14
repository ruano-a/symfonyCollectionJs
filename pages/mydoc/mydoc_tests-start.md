---
title: Tests start
keywords: symfony, demo, collection, javascript, js, form
last_updated: December 12, 2022
tags: [getting_started, test]
summary: "How to start the tests"
sidebar: mydoc_sidebar
permalink: tests-start.html
folder: mydoc
---

# How to start the tests

The simplest way is to open the page index_with_jquery.html or index_without_jquery.html in the test folder. 
It starts the tests on opening.

For more detailed informations, such as the test coverage, you'll need to install the dependencies:

# Install with yarn
```sh
yarn install
```

# Or install with npm
```sh
npm install
```

Then start the tests :

```sh
yarn test
```

You can find the test coverage informations in the 'coverage' folder.

# Notes for Internet explorer
Some of the tests fail on Internet explorer (tested on IE11, works fine on Edge). It's because the tests are particularly stricts, and IE seems to render things slightly differently (different order of attributes, and different encoding on quotes); but it still works fine.