# symfonyCollectionJs
A jquery plugin to dynamically create elements of a symfony form collection.

I created this plugin because the common Js plugin had a bug that didn't let me place the button to add an element wherever I wanted. I wanted to be able to add dynamically elements, but that's not done yet. Soon...

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
        post_add:               function($new_elem) { return true; },
        post_delete:            function($delete_elem) { return true; },
        other_btn_add_selector: null,
        btn_add_selector:       '.collection-add',
        btn_delete_selector:    '.collection-delete',
        btn_up_selector:        '.collection-up',
        btn_down_selector:      '.collection-down',
    };
~~~~

# Requirement

Symfony (2 or more)
Jquery (1.12.4 or more should be fine, unclear)