# symfonyCollectionJs [![](https://data.jsdelivr.com/v1/package/npm/symfony-collection-js/badge)](https://www.jsdelivr.com/package/npm/symfony-collection-js)
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
```html
<script src="https://cdn.jsdelivr.net/gh/ruano-a/symfonyCollectionJs@4.0.0/symfonyCollectionJs.min.js"></script>
```

# Basic usage

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
        call_post_add_on_init:  false,
        post_add:               function(new_elem, context) { return true; },
        post_delete:            function(delete_elem, context) { return true; },
        post_up:                function(elem, switched_elem) { return true; },
        post_down:              function(elem, switched_elem) { return true; },
        other_btn_add:          null,
        btn_add_selector:       '.collection-add',
        btn_delete_selector:    '.collection-delete',
        btn_up_selector:        '.collection-up',
        btn_down_selector:      '.collection-down'
        prototype_name:         '__name__'
    };
~~~~
In post_up and post_down, switched_elem is the moved elem that the user didn't click on.  
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

Clear every element (doesn't call post_delete):
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

The context argument in post_add and post_delete will have of this values, depending on how it's called:
~~~~
formCollection.POST_ADD_CONTEXT = {
    BTN_ADD:        4,
    OTHER_BTN_ADD:  8,
    INIT:           15,
    ADD_METHOD:     16
};
formCollection.POST_DELETE_CONTEXT = {
    BTN_DELETE:     23,
    DELETE_METHOD:  42
};
~~~~

# How to start the tests

## [Check this](./test/README.md)

# Any advanced example ?

Yes ! in the example folder, with and without jQuery, without and without loader.

# Requirement

Symfony (2 or more)

# Notes
If you're using this without jQuery, but with a loader (AMD, CommonJS, or anything), you MUST use a version on a branch / tag with "js-only" in the name! Otherwise it WILL NOT BUILD! (I didn't want to make several versions but tests ended showing that it was the best choice... Unless you have a better idea?)

This should theoretically work with unlimited nested collection. However if you encounter an issue, let me know.  
Don't hesitate to let me know if you're using this plugin, I'm super interested !  
For advances features, you should use the plugin of ninsuo.  
The file test/prep_nojquery_tests.js contains a homemade micro version of jQuery, I guess it can interest some people.
