---
title: Usage on symfony
keywords: symfony, demo, collection, javascript, js, form
last_updated: December 12, 2022
tags: [getting_started, symfony]
summary: "Config in symfony to use it in the form"
sidebar: mydoc_sidebar
permalink: usage-symfony.html
folder: mydoc
---

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

Then on the client side, include the library either [with a package manager](/install-package.html) or [with a cdn](/install-cdn.html), and use the function like [in the demo](/index.html)