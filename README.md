# symfonyCollectionJs ![GitHub](https://img.shields.io/github/license/ruano-a/symfonyCollectionJs) ![Maintenance](https://img.shields.io/maintenance/yes/2022) ![GitHub last commit](https://img.shields.io/github/last-commit/ruano-a/symfonyCollectionJs) ![npm](https://img.shields.io/npm/dm/symfony-collection-js?label=npm%20downloads) [![](https://data.jsdelivr.com/v1/package/npm/symfony-collection-js/badge)](https://www.jsdelivr.com/package/npm/symfony-collection-js) [![codecov](https://codecov.io/gh/ruano-a/symfonyCollectionJs/branch/master/graph/badge.svg?token=Z93Y3NTP1Q)](https://codecov.io/gh/ruano-a/symfonyCollectionJs) ![npm bundle size](https://img.shields.io/bundlephobia/min/symfony-collection-js) ![Dependencies](https://badgen.net/bundlephobia/dependency-count/symfony-collection-js) ![Badge count](https://img.shields.io/badge/badge%20count-enough%20%3C3-blue)
A plugin working with and without jquery to dynamically create elements of a symfony form collection.

I created this plugin because the common Js plugin had a bug that didn't let me place the button to add an element wherever I wanted.  And I wanted to be able to add dynamically elements.

# Install with yarn
```sh
yarn add symfony-collection-js
```

# Or install with npm
```sh
npm install symfony-collection-js
```

# Or include with a CDN
cdnjs
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/symfonyCollectionJs/4.3.1/symfonyCollectionJs.min.js" integrity="sha512-dUYlObeLuqKRYgg0Ujzm79lSc6dcOanSv+MtO2BM2svxSpSN+foESdbi82TZj7ixneAdj7pUoKMmNURVKz52jw==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```
jsDelivr
```html
<script src="https://cdn.jsdelivr.net/npm/symfony-collection-js@4.3.1/dist/symfonyCollectionJs.min.js" integrity="sha256-96Lcx06vADOwwjV0CW7BlC92yedSb7898vE2ErDUj38=" crossorigin="anonymous"></script>
```

# Basic usage (Check [here](#can-i-use-this-package-without-symfony) to use without symfony)

Your collection container should have the prototype mentioned in the symfony documentation, and an id or a class. So in your form type:
~~~~
$builder->add('collectionProperty',   CollectionType::class, [
                ...
                'prototype' => true,
                'by_reference' => false,
                'attr' => array(
                    'class' => 'collection',
                    ),
                ...
            ]);
~~~~

And to init the collection element in javascript:
~~~~
$('.collection').formCollection(); // with jQuery
formCollection(document.querySelectorAll('.collection')); // in pure javascript with a selector
formCollection(document.getElementById('myId')); // in pure javascript with an id
~~~~

# Options 
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

# Other functionalities

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

# How to start the tests

[Check this](./test/README.md)

# Any advanced example?

Yes ! in the example folder, with and without jQuery, with and without loader.

# Can I use this package without symfony?

Absolutely, you only need to have the data-prototype attribute properly set.
We provide you with [this example](./example/simple_collection_example_without_symfony.php) in php, but you can do this in every language, and most likely with most frameworks.

# Is there a Symfony UX integration?

Yes! Just there : [UX Collection JS](https://github.com/tienvx/ux-collection-js)

# Requirement

Symfony 2 or more (For a normal usage, but you can use this without)

# Notes
If you're using this without jQuery, but with a loader (AMD, CommonJS, or anything), you MUST use a version on a branch / tag with "js-only" in the name! Otherwise it WILL NOT BUILD! (I didn't want to make several versions but tests ended showing that it was the best choice... Unless you have a better idea?)

This should theoretically work with unlimited nested collection. However if you encounter an issue, let me know.  
Don't hesitate to let me know if you're using this plugin, I'm super interested !  
For advances features, you should use the plugin of ninsuo.  
The file test/prep_nojquery_tests.js contains a homemade micro version of jQuery, I guess it can interest some people.
