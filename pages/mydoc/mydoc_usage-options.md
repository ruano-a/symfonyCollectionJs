---
title: Usage options
keywords: symfony, demo, collection, javascript, js, form
last_updated: December 12, 2022
tags: [getting_started, options]
summary: "What are the available options"
sidebar: mydoc_sidebar
permalink: usage-options.html
folder: mydoc
---

~~~~
var defaults =  {
        max_elems:              100,
        call_pre_add_on_init:   false,
        call_post_add_on_init:  false,
        pre_add:                function(context, index) { return true; },
        post_add:               function(new_elem, context, index) { return true; },
        pre_delete:             function(delete_elem, context, index) { return true; },
        post_delete:            function(delete_elem, context, index) { return true; },
        pre_up:                 function(elem, switched_elem, index) { return true; },
        post_up:                function(elem, switched_elem, index) { return true; },
        pre_down:               function(elem, switched_elem, index) { return true; },
        post_down:              function(elem, switched_elem, index) { return true; },
        other_btn_add:          null,
        btn_add_selector:       '.collection-add',
        btn_delete_selector:    '.collection-delete',
        btn_up_selector:        '.collection-up',
        btn_down_selector:      '.collection-down'
        prototype_name:         '__name__'
    };
~~~~
In pre_up, post_up, pre_down and post_down, switched_elem is the moved elem that the user didn't click on.  
prototype_name should probably be changed if you use nested collection (in the FormType too, with the same value).

Note that the buttons are not created by the plugin but have to already exist.