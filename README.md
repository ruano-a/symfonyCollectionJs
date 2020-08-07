# symfonyCollectionJs
A jquery plugin to dynamically create elements of a symfony form collection.

I created this plugin because the common Js plugin had a bug that didn't let me place the button to add an element wherever I wanted.  And I wanted to be able to add dynamically elements.

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
        post_up:                function($elem, $switched_elem) { return true; },
        post_down:              function($elem, $switched_elem) { return true; },
        other_btn_add:          null,
        btn_add_selector:       '.collection-add',
        btn_delete_selector:    '.collection-delete',
        btn_up_selector:        '.collection-up',
        btn_down_selector:      '.collection-down'
        prototype_name_alias:      '__AttrName__',
        prototype_name:         '__name__'
    };
~~~~
In post_up and post_down, $switched_elem is the moved elem that the user didn't click on.
prototype_name_alias is used in internal to maintain indexes, you most likely won't need ever to change this parameter.
prototype_name should probably be changed if you use nested collection (in the FormType too, with the same value).

Note that the buttons are not created by the plugin but have to already exist.

# Other functionalities

Add an empty element:
~~~~
$('.collection').formCollection('add');
~~~~

Remove an element with its index (starting from 0):
~~~~
$('.collection').formCollection('remove', 2);
~~~~

Clear every element:
~~~~
$('.collection').formCollection('clear');
~~~~

# Requirement

Symfony (2 or more) 
Jquery (1.12.4 or more should be fine, unclear)

# Note
Currently, the indexes are maintained only in the attributes (id, name, for); since it is the common case. If you want to do more, you should use the callbacks.
I'm not that much a fan of how I maintained the indexes after a removal / add in middle / move. If someone has a better / simpler way, I'm interested (I didn't want to make the user add data in the form or something like that).

For advances features, you should use the plugin of ninsuo.
