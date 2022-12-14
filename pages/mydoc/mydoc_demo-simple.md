---
title: Demo simple
keywords: symfony, demo, collection, javascript, js, form
last_updated: December 12, 2022
tags: [getting_started, demo, simple]
summary: "A simple demo to show what it does."
sidebar: mydoc_sidebar
permalink: index.html
folder: mydoc
---

<style>
	.buttons {
		display: inline-block;
		padding: 3px;
	}

	#demo-simple-basic {
		background-color: #347DBE;
	}

	#demo-simple-basic, .collection-elem {
		padding: 9.5px;
		border: 1px solid #ccc;
    	border-radius: 4px;
	}

	.collection-elem {
		margin-top: 10px;
		background-color: white;
	}
</style>
<!-- <div class="collection-elem">
        <div>This is a collection element
        <div class="buttons">
            <button class="collection-elem-add btn btn-primary">+</button>
            <button class="collection-elem-remove btn btn-primary">-</button>
            <button class="collection-elem-up btn btn-primary">up</button>
            <button class="collection-elem-down btn btn-primary">down</button>
        </div></div>
        <input class="form-control" placeholder="An input" type="text" id="form_collection___name___myinput" name="form[collection][__name__][myinput]">
    </div> -->
<div id="demo-simple-basic" data-prototype="&lt;div class=&quot;collection-elem&quot;&gt;
        &lt;div&gt;This is a collection element
        &lt;div class=&quot;buttons&quot;&gt;
            &lt;button class=&quot;collection-elem-add btn btn-primary&quot;&gt;+&lt;/button&gt;
            &lt;button class=&quot;collection-elem-remove btn btn-primary&quot;&gt;-&lt;/button&gt;
            &lt;button class=&quot;collection-elem-up btn btn-primary&quot;&gt;up&lt;/button&gt;
            &lt;button class=&quot;collection-elem-down btn btn-primary&quot;&gt;down&lt;/button&gt;
        &lt;/div&gt;&lt;/div&gt;
        &lt;input class=&quot;form-control&quot; placeholder=&quot;An input&quot; type=&quot;text&quot; id=&quot;form_collection___name___myinput&quot; name=&quot;form[collection][__name__][myinput]&quot;&gt;
    &lt;/div&gt;"></div>

<br/>
Is done with:
<div>
<ul class="nav nav-tabs" role="tablist">
<li role="presentation" class="active"><a href="#demo-triple-1-js" aria-controls="demo-triple-1-js" role="tab" data-toggle="tab">JS</a></li>
<li role="presentation"><a href="#demo-triple-1-jquery" aria-controls="demo-triple-1-jquery" role="tab" data-toggle="tab">jQuery</a></li>
</ul>
  <div class="tab-content">
    <div role="tabpanel" class="tab-pane active" id="demo-triple-1-js" markdown='1'>

```js
const basicRoot = document.getElementById('demo-simple-basic');
formCollection(basicRoot, {
	btn_add_selector:     '.collection-elem-add',
	btn_delete_selector:  '.collection-elem-remove',
	btn_up_selector:  '.collection-elem-up',
	btn_down_selector:  '.collection-elem-down',
});
formCollection(basicRoot, 'add'); // to init with one element
```
</div>
    <div role="tabpanel" class="tab-pane" id="demo-triple-1-jquery" markdown='1'>

```js
const $basicRoot = $('#demo-simple-basic');
$basicRoot.formCollection({
	btn_add_selector:     '.collection-elem-add',
	btn_delete_selector:  '.collection-elem-remove',
	btn_up_selector:  '.collection-elem-up',
	btn_down_selector:  '.collection-elem-down',
});
$basicRoot.formCollection('add'); // to init with one element
```

</div>
</div>
</div>

(The design is purely an example, you're responsible of it)
<script src="https://cdn.jsdelivr.net/npm/symfony-collection-js@4.3.1/dist/symfonyCollectionJs.min.js" integrity="sha256-96Lcx06vADOwwjV0CW7BlC92yedSb7898vE2ErDUj38=" crossorigin="anonymous"></script>
<script src="/js/mydoc_demo-simple.js"></script>