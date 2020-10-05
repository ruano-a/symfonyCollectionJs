# symfonyCollectionJs
A jquery plugin to dynamically create elements of a symfony form collection.

I created this plugin because the common Js plugin had a bug that didn't let me place the button to add an element wherever I wanted.  And I wanted to be able to add dynamically elements.

# install with yarn
```sh
yarn add symfony-collection-js
```

# or install with npm
```sh
npm install symfony-collection-js
```

# basic usage

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
$('.collection').formCollection();
~~~~

# options 
~~~~
var defaults =  {
        max_elems:              100,
        call_post_add_on_init:  false,
        post_add:               function($new_elem, context) { return true; },
        post_delete:            function($delete_elem, context) { return true; },
        post_up:                function($elem, $switched_elem) { return true; },
        post_down:              function($elem, $switched_elem) { return true; },
        other_btn_add:          null,
        btn_add_selector:       '.collection-add',
        btn_delete_selector:    '.collection-delete',
        btn_up_selector:        '.collection-up',
        btn_down_selector:      '.collection-down'
        prototype_name:         '__name__'
    };
~~~~
In post_up and post_down, $switched_elem is the moved elem that the user didn't click on.
prototype_name should probably be changed if you use nested collection (in the FormType too, with the same value).

Note that the buttons are not created by the plugin but have to already exist.

# Other functionalities

Add an empty element:
~~~~
$('.collection').formCollection('add');
~~~~

Delete an element with its index (starting from 0):
~~~~
$('.collection').formCollection('delete', 2);
~~~~

Clear every element (doesn't call post_delete):
~~~~
$('.collection').formCollection('clear');
~~~~

Refresh the attributes of every elements from the index given (starting from 0). You might need this in specific cases, such as with drag and drop:
~~~~
$('.collection').formCollection('refreshAttributes', 0);
~~~~

The context argument in post_add and post_delete will have of this values, depending on how it's called:
~~~~
$.fn.formCollection.POST_ADD_CONTEXT = {
    BTN_ADD:        4,
    OTHER_BTN_ADD:  8,
    INIT:           15,
    ADD_METHOD:     16
};
$.fn.formCollection.POST_DELETE_CONTEXT = {
    BTN_DELETE:     23,
    DELETE_METHOD:  42
};
~~~~

# how to start the tests

Just open the page index.html in the test folder. It starts the tests on opening.

# any advanced example ?

Yes ! in example/triply_nested_collection.html

# Requirement

Symfony (2 or more) 
Jquery (1.12.4 or more should be fine, unclear)

# Note
This should theoretically work with unlimited nested collection. However if you encounter an issue, let me know.
For advances features, you should use the plugin of ninsuo.
