function initSimpleCollection(call_post_add_on_init, post_add, post_delete, post_up, post_down)
{
	if (typeof post_add !== 'function')
		post_add = function ($new_elem, is_init) { return true; };
	if (typeof post_delete !== 'function')
		post_delete = function ($delete_elem) { return true; };
	if (typeof post_up !== 'function')
		post_up = function ($elem, $switched_elem) { return true; };
	if (typeof post_down !== 'function')
		post_down = function ($elem, $switched_elem) { return true; };
	if (typeof call_post_add_on_init === 'undefined')
		call_post_add_on_init = false;
	$('#collection-root').formCollection({
		other_btn_add: 			'#collection-add-btn',
		btn_add_selector: 		'.collection-elem-add',
		btn_delete_selector: 	'.collection-elem-remove',
		btn_up_selector: 		'.collection-elem-up',
		btn_down_selector: 		'.collection-elem-down',
		call_post_add_on_init: 	call_post_add_on_init,
		post_add:         		post_add,
		post_delete:         	post_delete,
		post_up:         		post_up,
		post_down:         		post_down
	});
}

function initTripleCollection()
{
	$('#collection-root').formCollection({
		other_btn_add: 			'#collection-add-btn',
		btn_add_selector: 		'.collection-elem-add',
		btn_delete_selector: 	'.collection-elem-remove',
		btn_up_selector: 		'.collection-elem-up',
		btn_down_selector: 		'.collection-elem-down',
		call_post_add_on_init: 	true,
		post_add:         		function($new_elem, is_init) {
			$new_elem.find('.sub-collection-root').formCollection({
				other_btn_add:      	'.sub-collection-add-btn',
				btn_add_selector:     	'.sub-collection-elem-add',
				btn_delete_selector:  	'.sub-collection-elem-remove',
				btn_up_selector:  		'.sub-collection-elem-up',
				btn_down_selector:  	'.sub-collection-elem-down',
				call_post_add_on_init:  true,
				prototype_name:     	'__subname__',
				call_post_add_on_init: 	true,
				post_add:         		function($new_answer_elem, is_init) {
					$new_elem.find('.sub-sub-collection-root').formCollection({
						other_btn_add: 			'.sub-sub-collection-add-btn',
						btn_add_selector: 		'.sub-sub-collection-elem-add',
						btn_delete_selector: 	'.sub-sub-collection-elem-remove',
						btn_up_selector: 		'.sub-sub-collection-elem-up',
						btn_down_selector: 		'.sub-sub-collection-elem-down',
						prototype_name: 		'__subsubname__'
					});
				}
			});
		}
	});
}

/*
 * For the elements of the first collection, without subchild
 * We could use the replace function, but I prefer using a different functioning than in the plugin
 */
function guessCollectionElementResult(index)
{
	return '<div class="collection-elem">'
    +'<div>'
        +'<button class="collection-elem-add">+</button>'
        +'<button class="collection-elem-remove">-</button>'
        +'<button class="collection-elem-up">up</button>'
        +'<button class="collection-elem-down">down</button>'
    +'</div>'
    +'<h2>This is a collection element</h2>'
    +'<input type="text" id="form_collection_'+index+'_myinput" name="form[collection]['+index+'][myinput]">'
    +'<input type="text" id="form_collection_'+index+'_myotherinput" name="form[collection]['+index+'][myotherinput]">'
    +'<div class="sub-collection-root" data-prototype="<div class=&quot;sub-collection-elem&quot;><div><button class=&quot;sub-collection-elem-add&quot;>+</button><button class=&quot;sub-collection-elem-remove&quot;>-</button><button class=&quot;sub-collection-elem-up&quot;>up</button><button class=&quot;sub-collection-elem-down&quot;>down</button></div><h2>This is a subcollection element</h2><input type=&quot;date&quot; id=&quot;form_collection_'+index+'_subcollection___subname___begin&quot; name=&quot;form[collection]['+index+'][subcollection][__subname__][begin]&quot;><input type=&quot;date&quot; id=&quot;form_collection_'+index+'_subcollection___subname___end&quot; name=&quot;form[collection]['+index+'][subcollection][__subname__][end]&quot;><div class=&quot;sub-sub-collection-root&quot; data-prototype=&quot;&amp;lt;div&amp;#x20;class&amp;#x3D;&amp;quot;sub-sub-collection-elem&amp;quot;&amp;gt;&amp;#x0A;&amp;#x09;&amp;lt;div&amp;gt;&amp;#x0A;&amp;#x09;&amp;#x09;&amp;lt;button&amp;#x20;class&amp;#x3D;&amp;quot;sub-sub-collection-elem-add&amp;quot;&amp;gt;&amp;#x2B;&amp;lt;&amp;#x2F;button&amp;gt;&amp;#x0A;&amp;#x09;&amp;#x09;&amp;lt;button&amp;#x20;class&amp;#x3D;&amp;quot;sub-sub-collection-elem-remove&amp;quot;&amp;gt;-&amp;lt;&amp;#x2F;button&amp;gt;&amp;#x0A;&amp;#x09;&amp;#x09;&amp;lt;button&amp;#x20;class&amp;#x3D;&amp;quot;sub-sub-collection-elem-up&amp;quot;&amp;gt;up&amp;lt;&amp;#x2F;button&amp;gt;&amp;#x0A;&amp;#x09;&amp;#x09;&amp;lt;button&amp;#x20;class&amp;#x3D;&amp;quot;sub-sub-collection-elem-down&amp;quot;&amp;gt;down&amp;lt;&amp;#x2F;button&amp;gt;&amp;#x0A;&amp;#x09;&amp;lt;&amp;#x2F;div&amp;gt;&amp;#x0A;&amp;#x09;&amp;lt;h2&amp;gt;This&amp;#x20;is&amp;#x20;a&amp;#x20;sub-subcollection&amp;#x20;element&amp;lt;&amp;#x2F;h2&amp;gt;&amp;#x0A;&amp;#x09;&amp;lt;textarea&amp;#x20;id&amp;#x3D;&amp;quot;form_collection_'+index+'_subcollection___subname___subsubcollection___subsubname___firstblabla&amp;quot;&amp;#x20;name&amp;#x3D;&amp;quot;form&amp;#x5B;collection&amp;#x5D;&amp;#x5B;'+index+'&amp;#x5D;&amp;#x5B;subcollection&amp;#x5D;&amp;#x5B;__subname__&amp;#x5D;&amp;#x5B;subsubcollection&amp;#x5D;&amp;#x5B;__subsubname__&amp;#x5D;&amp;#x5B;firstblabla&amp;#x5D;&amp;quot;&amp;gt;&amp;lt;&amp;#x2F;textarea&amp;gt;&amp;#x0A;&amp;#x09;&amp;lt;textarea&amp;#x20;id&amp;#x3D;&amp;quot;form_collection_'+index+'_subcollection___subname___subsubcollection___subsubname___secondblabla&amp;quot;&amp;#x20;name&amp;#x3D;&amp;quot;form&amp;#x5B;collection&amp;#x5D;&amp;#x5B;'+index+'&amp;#x5D;&amp;#x5B;subcollection&amp;#x5D;&amp;#x5B;__subname__&amp;#x5D;&amp;#x5B;subsubcollection&amp;#x5D;&amp;#x5B;__subsubname__&amp;#x5D;&amp;#x5B;secondblabla&amp;#x5D;&amp;quot;&amp;gt;&amp;lt;&amp;#x2F;textarea&amp;gt;&amp;#x0A;&amp;lt;&amp;#x2F;div&amp;gt;&quot;></div><button class=&quot;sub-sub-collection-add-btn&quot;>Add sub sub element</button></div>"></div>'
    +'<button class="sub-collection-add-btn">Add sub element</button>'
+'</div>';
}

// note : should be used before any assert, to avoid any QUnit added elements
function getWholeHtmlExceptChildrenOf(exceptParentSelector)
{
	$clonedDom = $('html').clone();
	$clonedDom.find(exceptParentSelector).children().remove();
	return $clonedDom.prop('outerHTML');
}

function removeSpacesBetweenTags(str)
{
	return str.replace(/>\s+</g, "><");
}

/*
 * for the elements of the first collection
 * not modifying the subelements
 */
function fillElementN(n, value1, value2)
{
	$inputs = $('.collection-elem').eq(n).find('input');
	$inputs.eq(0).val(value1);
	$inputs.eq(1).val(value2);
}

/*
 * for the elements of the first collection
 * not modifying the subelements
 */
function assertElementNHasTheseValues(assert, n, value1, value2)
{
	$inputs = $('.collection-elem').eq(n).find('input');
	assert.equal($inputs.eq(0).val(), value1);
	assert.equal($inputs.eq(1).val(), value2);
}

function hasDuplicates(arr)
{
	return new Set(arr).size !== arr.length; 
}

/* Note : in assert.equal, the expected is the 2nd param */
QUnit.module('Registration / initializing', function() {
 	QUnit.test('Registration', function( assert ) {
  		assert.ok($.fn.formCollection, 'registered as a jQuery plugin');
  	});

    QUnit.test('are public enums set and correct', function(assert) {
  		assert.ok($.fn.formCollection.POST_ADD_CONTEXT, 'POST_ADD_CONTEXT enum is set');
  		assert.ok($.fn.formCollection.POST_DELETE_CONTEXT, 'POST_DELETE_CONTEXT enum is set');
  		assert.ok($.fn.formCollection.POST_ADD_CONTEXT.BTN_ADD);
  		assert.ok($.fn.formCollection.POST_ADD_CONTEXT.OTHER_BTN_ADD);
  		assert.ok($.fn.formCollection.POST_ADD_CONTEXT.INIT);
  		assert.ok($.fn.formCollection.POST_ADD_CONTEXT.ADD_METHOD);
  		assert.ok($.fn.formCollection.POST_DELETE_CONTEXT.BTN_DELETE);
  		assert.ok($.fn.formCollection.POST_DELETE_CONTEXT.DELETE_METHOD);
  		var values = [
  			$.fn.formCollection.POST_ADD_CONTEXT.BTN_ADD,
  			$.fn.formCollection.POST_ADD_CONTEXT.OTHER_BTN_ADD,
  			$.fn.formCollection.POST_ADD_CONTEXT.INIT,
  			$.fn.formCollection.POST_ADD_CONTEXT.ADD_METHOD,
  			$.fn.formCollection.POST_DELETE_CONTEXT.BTN_DELETE,
  			$.fn.formCollection.POST_DELETE_CONTEXT.DELETE_METHOD
  		];
  		assert.false(hasDuplicates(values));
    });

    QUnit.test('initializing the collection should not alter the page', function(assert) {
    	var $page = $('html');
    	var htmlBefore = $page.prop('outerHTML');
    	initTripleCollection();
      	assert.equal($page.prop('outerHTML'), htmlBefore);
    });
 });

QUnit.module('Side add btn', function() {
    QUnit.test('other_btn_add should add an element on click', function(assert) {
    	initTripleCollection();
    	$('#collection-add-btn').click();
      	assert.equal(removeSpacesBetweenTags($('#collection-root').html()).trim(), guessCollectionElementResult(0));
    });

    QUnit.test('other_btn_add should not modify the rest of the page on click', function(assert) {
    	initTripleCollection();
    	var htmlBefore = $('html').prop('outerHTML');
    	$('#collection-add-btn').click();
    	var htmlWithoutCollectionContent = getWholeHtmlExceptChildrenOf('#collection-root');
      	assert.equal(htmlWithoutCollectionContent, htmlBefore);
    });
 });

QUnit.module('Add down', function() {
    QUnit.test('btn_add_selector should add an element on click after the element with the button', function(assert) {
    	initTripleCollection();
    	$('#collection-add-btn').click();
    	$('.collection-elem-add').eq(0).click();
      	assert.equal($('.collection-elem').length, 2); //there should be two elements
      	fillElementN(0, 'elem 0 input 0', 'elem 0 input 1');
      	fillElementN(1, 'elem 1 input 0', 'elem 1 input 1');
    	$('.collection-elem-add').eq(0).click(); // we add an element between the existing one
      	assertElementNHasTheseValues(assert, 0, 'elem 0 input 0', 'elem 0 input 1');
      	assertElementNHasTheseValues(assert, 1, '', '');
      	assertElementNHasTheseValues(assert, 2, 'elem 1 input 0', 'elem 1 input 1');
      	var elementsHtml = guessCollectionElementResult(0) + guessCollectionElementResult(1) + guessCollectionElementResult(2);
      	assert.equal(removeSpacesBetweenTags($('#collection-root').html()).trim(), elementsHtml);
    });

    QUnit.test('btn_add_selector should not modify the rest of the page on click', function(assert) {
    	initTripleCollection();
    	var htmlBefore = $('html').prop('outerHTML');
    	$('#collection-add-btn').click();
    	$('.collection-elem-add').eq(0).click();
    	$('.collection-elem-add').eq(0).click();
    	$('.collection-elem-add').eq(2).click(); // we add an element at the end
    	var htmlWithoutCollectionContent = getWholeHtmlExceptChildrenOf('#collection-root');
      	assert.equal(htmlWithoutCollectionContent, htmlBefore);
    });
 });

QUnit.module('Removal', function() {
    QUnit.test('btn_delete_selector should remove an element on click', function(assert) {
    	initTripleCollection();
    	$('#collection-add-btn').click();
    	$('.collection-elem-add').eq(0).click();
    	$('.collection-elem-add').eq(0).click();
      	fillElementN(0, 'elem 0 input 0', 'elem 0 input 1');
      	fillElementN(1, 'elem 1 input 0', 'elem 1 input 1');
      	fillElementN(2, 'elem 2 input 0', 'elem 2 input 1');
      	assert.equal($('.collection-elem').length, 3); //just in case
    	$('.collection-elem-remove').eq(1).click(); // we erase the element in between
      	assert.equal($('.collection-elem').length, 2); //there should be two elements
      	assertElementNHasTheseValues(assert, 0, 'elem 0 input 0', 'elem 0 input 1');
      	assertElementNHasTheseValues(assert, 1, 'elem 2 input 0', 'elem 2 input 1');
    	$('.collection-elem-remove').eq(0).click(); // we erase the first element
      	assert.equal($('.collection-elem').length, 1); //there should be one element
      	assertElementNHasTheseValues(assert, 0, 'elem 2 input 0', 'elem 2 input 1');
    	$('.collection-elem-remove').eq(0).click(); // we erase the first element
      	assert.equal($('.collection-elem').length, 0); //there should be no element
    });

    QUnit.test('btn_delete_selector should not modify the rest of the page on click', function(assert) {
    	initTripleCollection();
    	var htmlBefore = $('html').prop('outerHTML');
    	$('#collection-add-btn').click();
    	$('.collection-elem-add').eq(0).click();
    	$('.collection-elem-add').eq(0).click();
    	$('.collection-elem-remove').eq(1).click(); // we erase the element in between
    	$('.collection-elem-remove').eq(1).click(); // we erase the element at the bottom
    	$('.collection-elem-remove').eq(0).click(); // we erase the first element
    	var htmlWithoutCollectionContent = getWholeHtmlExceptChildrenOf('#collection-root');
      	assert.equal($('.collection-elem').length, 0); // just in case
      	assert.equal(htmlWithoutCollectionContent, htmlBefore);
    });
 });

QUnit.module('Move up', function() {
    QUnit.test('btn_up_selector should move an element up', function(assert) {
    	initTripleCollection();
    	$('#collection-add-btn').click();
    	$('.collection-elem-add').eq(0).click();
    	$('.collection-elem-add').eq(0).click();
      	fillElementN(0, 'elem 0 input 0', 'elem 0 input 1');
      	fillElementN(1, 'elem 1 input 0', 'elem 1 input 1');
      	fillElementN(2, 'elem 2 input 0', 'elem 2 input 1');
      	assert.equal($('.collection-elem').length, 3); //just in case
    	$('.collection-elem-up').eq(2).click(); // we move up the last element

      	assertElementNHasTheseValues(assert, 0, 'elem 0 input 0', 'elem 0 input 1');
      	assertElementNHasTheseValues(assert, 1, 'elem 2 input 0', 'elem 2 input 1');
      	assertElementNHasTheseValues(assert, 2, 'elem 1 input 0', 'elem 1 input 1');
    	$('.collection-elem-up').eq(1).click(); // we move up the middle element
      	assertElementNHasTheseValues(assert, 0, 'elem 2 input 0', 'elem 2 input 1');
      	assertElementNHasTheseValues(assert, 1, 'elem 0 input 0', 'elem 0 input 1');
      	assertElementNHasTheseValues(assert, 2, 'elem 1 input 0', 'elem 1 input 1');
    });

    QUnit.test('btn_up_selector should not modify the rest of the page on click', function(assert) {
    	initTripleCollection();
    	var htmlBefore = $('html').prop('outerHTML');
    	$('#collection-add-btn').click();
    	$('.collection-elem-add').eq(0).click();
    	$('.collection-elem-add').eq(0).click();
      	fillElementN(0, 'elem 0 input 0', 'elem 0 input 1');
      	fillElementN(1, 'elem 1 input 0', 'elem 1 input 1');
      	fillElementN(2, 'elem 2 input 0', 'elem 2 input 1');
    	$('.collection-elem-up').eq(2).click(); // we move up the last element
    	$('.collection-elem-up').eq(1).click(); // we move up the middle element
    	var htmlWithoutCollectionContent = getWholeHtmlExceptChildrenOf('#collection-root');
      	assert.equal(htmlWithoutCollectionContent, htmlBefore);
    });
 });

QUnit.module('Move down', function() {
    QUnit.test('btn_down_selector should move an element down', function(assert) {
    	initTripleCollection();
    	$('#collection-add-btn').click();
    	$('.collection-elem-add').eq(0).click();
    	$('.collection-elem-add').eq(0).click();
      	fillElementN(0, 'elem 0 input 0', 'elem 0 input 1');
      	fillElementN(1, 'elem 1 input 0', 'elem 1 input 1');
      	fillElementN(2, 'elem 2 input 0', 'elem 2 input 1');
      	assert.equal($('.collection-elem').length, 3); //just in case
    	$('.collection-elem-down').eq(0).click(); // we move down the first element

      	assertElementNHasTheseValues(assert, 0, 'elem 1 input 0', 'elem 1 input 1');
      	assertElementNHasTheseValues(assert, 1, 'elem 0 input 0', 'elem 0 input 1');
      	assertElementNHasTheseValues(assert, 2, 'elem 2 input 0', 'elem 2 input 1');
    	$('.collection-elem-down').eq(1).click(); // we move down the middle element
      	assertElementNHasTheseValues(assert, 0, 'elem 1 input 0', 'elem 1 input 1');
      	assertElementNHasTheseValues(assert, 1, 'elem 2 input 0', 'elem 2 input 1');
      	assertElementNHasTheseValues(assert, 2, 'elem 0 input 0', 'elem 0 input 1');
    });

    QUnit.test('btn_down_selector should not modify the rest of the page on click', function(assert) {
    	initTripleCollection();
    	var htmlBefore = $('html').prop('outerHTML');
    	$('#collection-add-btn').click();
    	$('.collection-elem-add').eq(0).click();
    	$('.collection-elem-add').eq(0).click();
      	fillElementN(0, 'elem 0 input 0', 'elem 0 input 1');
      	fillElementN(1, 'elem 1 input 0', 'elem 1 input 1');
      	fillElementN(2, 'elem 2 input 0', 'elem 2 input 1');
    	$('.collection-elem-down').eq(0).click(); // we move down the last element
    	$('.collection-elem-down').eq(1).click(); // we move down the middle element
    	var htmlWithoutCollectionContent = getWholeHtmlExceptChildrenOf('#collection-root');
      	assert.equal(htmlWithoutCollectionContent, htmlBefore);
    });
 });

QUnit.module('post_add', function() {
    QUnit.test('post_add is triggered after clicking on other_btn_add, btn_add_selector, and with the add method', function(assert) {
    	var test = false;
    	initSimpleCollection(false, function() {
    		test = true;
    	});
    	assert.false(test); // to check that the callback isn't triggered without reason
    	$('#collection-add-btn').click(); // other_btn_add
    	assert.true(test, 'post_add called after click on other_btn_add');
    	test = false; // reset
    	$('.collection-elem-add').eq(0).click(); // btn_add_selector
    	assert.true(test, 'post_add called after click on btn_add_selector');
    	test = false; // reset
    	$('#collection-root').formCollection('add'); // add method
    	assert.true(test, 'post_add called after calling the add method');
    });

    QUnit.test('post_add is not triggered during init if call_post_add_on_init is false', function(assert) {
    	$('#collection-root').append(guessCollectionElementResult(0)); // to preinit the content
    	$('#collection-root').append(guessCollectionElementResult(1));
    	var test = false;
    	initSimpleCollection(false, function() {
    		test = true;
    	});
    	assert.false(test); // the callback shouldn't have been called
    });

    QUnit.test('post_add is triggered during init if call_post_add_on_init is true', function(assert) {
    	$('#collection-root').append(guessCollectionElementResult(0)); // to preinit the content
    	$('#collection-root').append(guessCollectionElementResult(1));
    	var test = false;
    	initSimpleCollection(true, function() {
    		test = true;
    	});
    	assert.true(test); // the callback should have been called
    });

    QUnit.test('the post_add context should have the right value', function(assert) {
    	$('#collection-root').append(guessCollectionElementResult(0)); // to preinit the content
    	$('#collection-root').append(guessCollectionElementResult(1));
    	var test = false;
    	initSimpleCollection(true, function($new_elem, context) {
    		test = context;
    	});
    	assert.equal(test, $.fn.formCollection.POST_ADD_CONTEXT.INIT, 'correct context on init');
    	test = false; // reset
    	$('#collection-add-btn').click(); //other_btn_add
    	assert.equal(test, $.fn.formCollection.POST_ADD_CONTEXT.OTHER_BTN_ADD, 'correct context on other_btn_add');
    	test = false; // reset
    	$('.collection-elem-add').eq(0).click(); //btn_add_selector
    	assert.equal(test, $.fn.formCollection.POST_ADD_CONTEXT.BTN_ADD, 'correct context on btn_add_selector');
    	test = false; // reset
    	$('#collection-root').formCollection('add');
    	assert.equal(test, $.fn.formCollection.POST_ADD_CONTEXT.ADD_METHOD, 'correct context with add method');
    });
 });

QUnit.module('post_remove', function() {
    QUnit.test('post_remove is triggered after clicking on btn_delete_selector and with the remove method', function(assert) {
    	var test = false;
    	initSimpleCollection(false, null, function() {
    		test = true;
    	});
    	assert.false(test); // to check that the callback isn't triggered without reason
    	$('#collection-add-btn').click();
    	$('.collection-elem-add').eq(0).click();
    	// now we have 2 elements
    	$('.collection-elem-remove').eq(0).click(); // btn_delete_selector
    	assert.true(test, 'post_remove called after click on other_btn_add');
    	test = false; // reset
    	$('#collection-root').formCollection('delete', 0); // delete method
    	assert.true(test, 'post_remove called after calling the remove method');
    });

    QUnit.test('the post_remove context has the right value', function(assert) {
    	var test = false;
    	initSimpleCollection(false, null, function($delete_elem, context) {
    		test = context;
    	});
    	assert.false(test); // to check that the callback isn't triggered without reason
    	$('#collection-add-btn').click();
    	$('.collection-elem-add').eq(0).click();
    	// now we have 2 elements
    	$('.collection-elem-remove').eq(0).click(); // btn_delete_selector
    	assert.equal(test, $.fn.formCollection.POST_DELETE_CONTEXT.BTN_DELETE, 'correct context on btn_delete_selector');
    	test = false; // reset
    	$('#collection-root').formCollection('delete', 0); // delete method
    	assert.equal(test, $.fn.formCollection.POST_DELETE_CONTEXT.DELETE_METHOD, 'correct context on delete method');
    });
});
