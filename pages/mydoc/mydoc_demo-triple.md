---
title: Demo triple
keywords: symfony, demo, collection, javascript, js, form
last_updated: December 12, 2022
tags: [getting_started, demo, triple]
summary: "A demo with triple nesting. But it could be more"
sidebar: mydoc_sidebar
permalink: demo-triple.html
folder: mydoc
---

<style>
	.buttons {
		display: inline-block;
		padding: 3px;
	}

	#demo-triple-1 {
		background-color: #347DBE;
	}

	.sub-collection-root {
		background-color: #28a745;
	}

	.sub-sub-collection-root {
		background-color: #c82333;
	}

	#demo-triple-1, .sub-collection-root, .sub-sub-collection-root, .collection-elem, .sub-collection-elem, .sub-sub-collection-elem  {
		padding: 9.5px;
		border: 1px solid #ccc;
    	border-radius: 4px;
	}

	.collection-elem, .sub-collection-elem, .sub-sub-collection-elem {
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
        <div class="sub-collection-root" data-prototype="&lt;div class=&quot;sub-collection-elem&quot;&gt;
        &lt;div&gt;This is a sub collection element
        &lt;div class=&quot;sub-buttons&quot;&gt;
            &lt;button class=&quot;sub-collection-elem-add btn btn-success&quot;&gt;+&lt;/button&gt;
            &lt;button class=&quot;sub-collection-elem-remove btn btn-success&quot;&gt;-&lt;/button&gt;
            &lt;button class=&quot;sub-collection-elem-up btn btn-success&quot;&gt;up&lt;/button&gt;
            &lt;button class=&quot;sub-collection-elem-down btn btn-success&quot;&gt;down&lt;/button&gt;
        &lt;/div&gt;&lt;/div&gt;
        &lt;textarea class=&quot;form-control&quot; placeholder=&quot;A textarea&quot; id=&quot;form_collection___name____subcollection___subname___mytextarea&quot; name=&quot;form[collection][__name__][subcollection][__subname__][mytextarea]&quot;&gt;&lt;/textarea&gt;
        &lt;div class=&quot;sub-sub-collection-root&quot; data-prototype=&quot;&amp;lt;div class=&amp;quot;sub-sub-collection-elem&amp;quot;&amp;gt;
        &amp;lt;div&amp;gt;This is a sub sub collection element
        &amp;lt;div class=&amp;quot;sub-sub-buttons&amp;quot;&amp;gt;
            &amp;lt;button class=&amp;quot;sub-sub-collection-elem-add btn btn-danger&amp;quot;&amp;gt;+&amp;lt;/button&amp;gt;
            &amp;lt;button class=&amp;quot;sub-sub-collection-elem-remove btn btn-danger&amp;quot;&amp;gt;-&amp;lt;/button&amp;gt;
            &amp;lt;button class=&amp;quot;sub-sub-collection-elem-up btn btn-danger&amp;quot;&amp;gt;up&amp;lt;/button&amp;gt;
            &amp;lt;button class=&amp;quot;sub-sub-collection-elem-down btn btn-danger&amp;quot;&amp;gt;down&amp;lt;/button&amp;gt;
        &amp;lt;/div&amp;gt;&amp;lt;/div&amp;gt;
        &amp;lt;input class=&amp;quot;form-control&amp;quot; placeholder=&amp;quot;A checkbox&amp;quot; type=&amp;quot;checkbox&amp;quot; id=&amp;quot;form_collection___name____subcollection___subname____subsubcollection___subsubname___mycheckbox&amp;quot; name=&amp;quot;form[collection][__name__][subcollection][__subname__][subsubcollection][__subsubname__][mycheckbox]&amp;quot;&amp;gt;
    &amp;lt;/div&amp;gt;&quot;&gt;&lt;/div&gt;
    &lt;/div&gt;"></div>
    </div> -->


<!-- <div class="sub-collection-elem">
        <div>This is a sub collection element
        <div class="sub-buttons">
            <button class="sub-collection-elem-add btn btn-success">+</button>
            <button class="sub-collection-elem-remove btn btn-success">-</button>
            <button class="sub-collection-elem-up btn btn-success">up</button>
            <button class="sub-collection-elem-down btn btn-success">down</button>
        </div></div>
        <textarea class="form-control" placeholder="A textarea" id="form_collection___name____subcollection___subname___mytextarea" name="form[collection][__name__][subcollection][__subname__][mytextarea]"></textarea>
        <div class="sub-sub-collection-root" data-prototype="&lt;div class=&quot;sub-sub-collection-elem&quot;&gt;
        &lt;div&gt;This is a sub sub collection element
        &lt;div class=&quot;sub-sub-buttons&quot;&gt;
            &lt;button class=&quot;sub-sub-collection-elem-add btn btn-danger&quot;&gt;+&lt;/button&gt;
            &lt;button class=&quot;sub-sub-collection-elem-remove btn btn-danger&quot;&gt;-&lt;/button&gt;
            &lt;button class=&quot;sub-sub-collection-elem-up btn btn-danger&quot;&gt;up&lt;/button&gt;
            &lt;button class=&quot;sub-sub-collection-elem-down btn btn-danger&quot;&gt;down&lt;/button&gt;
        &lt;/div&gt;&lt;/div&gt;
        &lt;input class=&quot;form-control&quot; placeholder=&quot;A checkbox&quot; type=&quot;checkbox&quot; id=&quot;form_collection___name____subcollection___subname____subsubcollection___subsubname___mycheckbox&quot; name=&quot;form[collection][__name__][subcollection][__subname__][subsubcollection][__subsubname__][mycheckbox]&quot;&gt;
    &lt;/div&gt;"></div>
    </div> -->


<!-- <div class="sub-sub-collection-elem">
        <div>This is a sub sub collection element
        <div class="sub-sub-buttons">
            <button class="sub-sub-collection-elem-add btn btn-danger">+</button>
            <button class="sub-sub-collection-elem-remove btn btn-danger">-</button>
            <button class="sub-sub-collection-elem-up btn btn-danger">up</button>
            <button class="sub-sub-collection-elem-down btn btn-danger">down</button>
        </div></div>
        <input class="form-control" placeholder="A checkbox" type="checkbox" id="form_collection___name____subcollection___subname____subsubcollection___subsubname___mycheckbox" name="form[collection][__name__][subcollection][__subname__][subsubcollection][__subsubname__][mycheckbox]">
    </div> -->


<div id="demo-triple-1" data-prototype="&lt;div class=&quot;collection-elem&quot;&gt;
        &lt;div&gt;This is a collection element
        &lt;div class=&quot;buttons&quot;&gt;
            &lt;button class=&quot;collection-elem-add btn btn-primary&quot;&gt;+&lt;/button&gt;
            &lt;button class=&quot;collection-elem-remove btn btn-primary&quot;&gt;-&lt;/button&gt;
            &lt;button class=&quot;collection-elem-up btn btn-primary&quot;&gt;up&lt;/button&gt;
            &lt;button class=&quot;collection-elem-down btn btn-primary&quot;&gt;down&lt;/button&gt;
        &lt;/div&gt;&lt;/div&gt;
        &lt;input class=&quot;form-control&quot; placeholder=&quot;An input&quot; type=&quot;text&quot; id=&quot;form_collection___name___myinput&quot; name=&quot;form[collection][__name__][myinput]&quot;&gt;
        &lt;div class=&quot;sub-collection-root&quot; data-prototype=&quot;&amp;lt;div class=&amp;quot;sub-collection-elem&amp;quot;&amp;gt;
        &amp;lt;div&amp;gt;This is a sub collection element
        &amp;lt;div class=&amp;quot;sub-buttons&amp;quot;&amp;gt;
            &amp;lt;button class=&amp;quot;sub-collection-elem-add btn btn-success&amp;quot;&amp;gt;+&amp;lt;/button&amp;gt;
            &amp;lt;button class=&amp;quot;sub-collection-elem-remove btn btn-success&amp;quot;&amp;gt;-&amp;lt;/button&amp;gt;
            &amp;lt;button class=&amp;quot;sub-collection-elem-up btn btn-success&amp;quot;&amp;gt;up&amp;lt;/button&amp;gt;
            &amp;lt;button class=&amp;quot;sub-collection-elem-down btn btn-success&amp;quot;&amp;gt;down&amp;lt;/button&amp;gt;
        &amp;lt;/div&amp;gt;&amp;lt;/div&amp;gt;
        &amp;lt;textarea class=&amp;quot;form-control&amp;quot; placeholder=&amp;quot;A textarea&amp;quot; id=&amp;quot;form_collection___name____subcollection___subname___mytextarea&amp;quot; name=&amp;quot;form[collection][__name__][subcollection][__subname__][mytextarea]&amp;quot;&amp;gt;&amp;lt;/textarea&amp;gt;
        &amp;lt;div class=&amp;quot;sub-sub-collection-root&amp;quot; data-prototype=&amp;quot;&amp;amp;lt;div class=&amp;amp;quot;sub-sub-collection-elem&amp;amp;quot;&amp;amp;gt;
        &amp;amp;lt;div&amp;amp;gt;This is a sub sub collection element
        &amp;amp;lt;div class=&amp;amp;quot;sub-sub-buttons&amp;amp;quot;&amp;amp;gt;
            &amp;amp;lt;button class=&amp;amp;quot;sub-sub-collection-elem-add btn btn-danger&amp;amp;quot;&amp;amp;gt;+&amp;amp;lt;/button&amp;amp;gt;
            &amp;amp;lt;button class=&amp;amp;quot;sub-sub-collection-elem-remove btn btn-danger&amp;amp;quot;&amp;amp;gt;-&amp;amp;lt;/button&amp;amp;gt;
            &amp;amp;lt;button class=&amp;amp;quot;sub-sub-collection-elem-up btn btn-danger&amp;amp;quot;&amp;amp;gt;up&amp;amp;lt;/button&amp;amp;gt;
            &amp;amp;lt;button class=&amp;amp;quot;sub-sub-collection-elem-down btn btn-danger&amp;amp;quot;&amp;amp;gt;down&amp;amp;lt;/button&amp;amp;gt;
        &amp;amp;lt;/div&amp;amp;gt;&amp;amp;lt;/div&amp;amp;gt;
        &amp;amp;lt;input class=&amp;amp;quot;form-control&amp;amp;quot; placeholder=&amp;amp;quot;A checkbox&amp;amp;quot; type=&amp;amp;quot;checkbox&amp;amp;quot; id=&amp;amp;quot;form_collection___name____subcollection___subname____subsubcollection___subsubname___mycheckbox&amp;amp;quot; name=&amp;amp;quot;form[collection][__name__][subcollection][__subname__][subsubcollection][__subsubname__][mycheckbox]&amp;amp;quot;&amp;amp;gt;
    &amp;amp;lt;/div&amp;amp;gt;&amp;quot;&amp;gt;&amp;lt;/div&amp;gt;
    &amp;lt;/div&amp;gt;&quot;&gt;&lt;/div&gt;
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
const tripleRoot = document.getElementById('demo-triple-1');
formCollection(tripleRoot, {
	btn_add_selector:     '.collection-elem-add',
	btn_delete_selector:  '.collection-elem-remove',
	btn_up_selector:  '.collection-elem-up',
	btn_down_selector:  '.collection-elem-down',
	call_post_add_on_init:  true,
	post_add:	function(new_elem, context) {
		const tripleSubRoot = new_elem.querySelectorAll('.sub-collection-root');
		formCollection(tripleSubRoot, {
			btn_add_selector:     '.sub-collection-elem-add',
			btn_delete_selector:  '.sub-collection-elem-remove',
			btn_up_selector:  '.sub-collection-elem-up',
			btn_down_selector:  '.sub-collection-elem-down',
			prototype_name:     '__subname__',
			call_post_add_on_init:  true,
			post_add:	function(new_elem, context) {
				const tripleSubSubRoot = new_elem.querySelectorAll('.sub-sub-collection-root')
				formCollection(tripleSubSubRoot, {
					btn_add_selector:     '.sub-sub-collection-elem-add',
					btn_delete_selector:  '.sub-sub-collection-elem-remove',
					btn_up_selector:  '.sub-sub-collection-elem-up',
					btn_down_selector:  '.sub-sub-collection-elem-down',
					call_post_add_on_init:  false,
					prototype_name:     '__subsubname__'
				});

				formCollection(tripleSubSubRoot, 'add'); // to init with one element
			}
		});

		formCollection(tripleSubRoot, 'add'); // to init with one element
	}
});

formCollection(tripleRoot, 'add'); // to init with one element
```

</div>
    <div role="tabpanel" class="tab-pane" id="demo-triple-1-jquery" markdown='1'>

```js
const $tripleRoot = $('#demo-triple-1');
$tripleRoot.formCollection({
	btn_add_selector:     '.collection-elem-add',
	btn_delete_selector:  '.collection-elem-remove',
	btn_up_selector:  '.collection-elem-up',
	btn_down_selector:  '.collection-elem-down',
	call_post_add_on_init:  true,
	post_add:	function($new_elem, context) {
		const $tripleSubRoot = $new_elem.find('.sub-collection-root');
		$tripleSubRoot.formCollection({
			btn_add_selector:     '.sub-collection-elem-add',
			btn_delete_selector:  '.sub-collection-elem-remove',
			btn_up_selector:  '.sub-collection-elem-up',
			btn_down_selector:  '.sub-collection-elem-down',
			prototype_name:     '__subname__',
			call_post_add_on_init:  true,
			post_add:	function($new_elem, context) {
				const $tripleSubSubRoot = $new_elem.find('.sub-sub-collection-root')
				$tripleSubSubRoot.formCollection({
					btn_add_selector:     '.sub-sub-collection-elem-add',
					btn_delete_selector:  '.sub-sub-collection-elem-remove',
					btn_up_selector:  '.sub-sub-collection-elem-up',
					btn_down_selector:  '.sub-sub-collection-elem-down',
					call_post_add_on_init:  false,
					prototype_name:     '__subsubname__'
				});

				$tripleSubSubRoot.formCollection('add'); // to init with one element
			}
		});

		formCollection(tripleSubRoot, 'add'); // to init with one element
	}
});

$tripleRoot.formCollection('add'); // to init with one element
```

</div>
</div>
</div>
(The design is purely an example, you're responsible of it)

<script src="https://cdn.jsdelivr.net/npm/symfony-collection-js@4.3.1/dist/symfonyCollectionJs.min.js" integrity="sha256-96Lcx06vADOwwjV0CW7BlC92yedSb7898vE2ErDUj38=" crossorigin="anonymous"></script>
<script src="./js/mydoc_demo-triple.js"></script>