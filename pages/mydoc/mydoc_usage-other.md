---
title: Usage other
keywords: symfony, demo, collection, javascript, js, form
last_updated: December 12, 2022
tags: [getting_started]
summary: "Other functionalities"
sidebar: mydoc_sidebar
permalink: usage-other.html
folder: mydoc
---

Add an empty element:
~~~~
$('.collection').formCollection('add'); // with jQuery
formCollection(document.querySelectorAll('.collection'), 'add'); // in pure javascript with a selector
formCollection(document.getElementById('myId'), 'add'); // in pure javascript with an id
~~~~

Delete an element with its index (starting from 0):
~~~~
$('.collection').formCollection('delete', 2); // with jQuery
formCollection(document.querySelectorAll('.collection'), 'delete', 2); // in pure javascript with a selector
formCollection(document.getElementById('myId'), 'delete', 2); // in pure javascript with an id
~~~~

Clear every element (doesn't call pre_delete nor post_delete):
~~~~
$('.collection').formCollection('clear'); // with jQuery
formCollection(document.querySelectorAll('.collection'), 'clear'); // in pure javascript with a selector
formCollection(document.getElementById('myId'), 'clear'); // in pure javascript with an id
~~~~

Refresh the attributes of every elements from the index given (starting from 0). You might need this in specific cases, such as with drag and drop:
~~~~
$('.collection').formCollection('refreshAttributes', 0); // with jQuery
formCollection(document.querySelectorAll('.collection'), 'refreshAttributes', 0); // in pure javascript with a selector
formCollection(document.getElementById('myId'), 'refreshAttributes', 0); // in pure javascript with an id
~~~~

The context argument in pre_add, post_add, pre_delete, and post_delete will have one of these values, depending on how it's called:
~~~~
formCollection.ADD_CONTEXT = {
    BTN_ADD:        4,
    OTHER_BTN_ADD:  8,
    INIT:           15,
    ADD_METHOD:     16
};
formCollection.DELETE_CONTEXT = {
    BTN_DELETE:     23,
    DELETE_METHOD:  42
};
~~~~

If pre_add, pre_delete, pre_up, pre_down return false, the operation (add, delete, up, down) isn't executed (for pre_add, the return doesn't affect the initialization of existing elements).