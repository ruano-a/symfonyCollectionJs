var extend = function (a, b) {
    for (var key in b) {
        if (b.hasOwnProperty(key)) {
            a[key] = b[key];
        }
    }
    return a;
}

function initSimpleCollection(additionalSettings)
{
	var settings = {
		other_btn_add: 			'#collection-add-btn',
		btn_add_selector: 		'.collection-elem-add',
		btn_delete_selector: 	'.collection-elem-remove',
		btn_up_selector: 		'.collection-elem-up',
		btn_down_selector: 		'.collection-elem-down',
	};
	settings = extend(settings, additionalSettings);
	µ('#collection-root').formCollection(settings);
}

function initTripleCollection()
{
	µ('#collection-root').formCollection({
		other_btn_add: 			'#collection-add-btn',
		btn_add_selector: 		'.collection-elem-add',
		btn_delete_selector: 	'.collection-elem-remove',
		btn_up_selector: 		'.collection-elem-up',
		btn_down_selector: 		'.collection-elem-down',
		call_post_add_on_init: 	true,
		post_add:         		function(new_elem, context) {
			µ(new_elem).find('.sub-collection-root').formCollection({
				other_btn_add:      	µ(new_elem).find('.sub-collection-add-btn'), // don't give just a selector in this case !
				btn_add_selector:     	'.sub-collection-elem-add',
				btn_delete_selector:  	'.sub-collection-elem-remove',
				btn_up_selector:  		'.sub-collection-elem-up',
				btn_down_selector:  	'.sub-collection-elem-down',
				call_post_add_on_init:  true,
				prototype_name:     	'__subname__',
				post_add:         		function(new_elem, context) {
					µ(new_elem).find('.sub-sub-collection-root').formCollection({
						other_btn_add: 			µ(new_elem).find('.sub-sub-collection-add-btn'), // don't give just a selector in this case !
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
 *
 * subOrganization = [2, 3, 4] means : 3 subelements, the first has 2 subsub, the second has 3, the third has 4
 */
function guessCollectionElementResult(index, subOrganization)
{
	var html = '<div class="collection-elem">'
    +'<div>'
        +'<button class="collection-elem-add">+</button>'
        +'<button class="collection-elem-remove">-</button>'
        +'<button class="collection-elem-up">up</button>'
        +'<button class="collection-elem-down">down</button>'
    +'</div>'
    +'<h2>This is a collection element</h2>'
    +'<input type="text" id="form_collection_'+index+'_myinput" name="form[collection]['+index+'][myinput]">'
    +'<input type="text" id="form_collection_'+index+'_myotherinput" name="form[collection]['+index+'][myotherinput]">'
    +'<div class="sub-collection-root" data-prototype="<div class=&quot;sub-collection-elem&quot;><div><button class=&quot;sub-collection-elem-add&quot;>+</button><button class=&quot;sub-collection-elem-remove&quot;>-</button><button class=&quot;sub-collection-elem-up&quot;>up</button><button class=&quot;sub-collection-elem-down&quot;>down</button></div><h2>This is a subcollection element</h2><input type=&quot;date&quot; id=&quot;form_collection_'+index+'_subcollection___subname___begin&quot; name=&quot;form[collection]['+index+'][subcollection][__subname__][begin]&quot;><input type=&quot;date&quot; id=&quot;form_collection_'+index+'_subcollection___subname___end&quot; name=&quot;form[collection]['+index+'][subcollection][__subname__][end]&quot;><div class=&quot;sub-sub-collection-root&quot; data-prototype=&quot;&amp;lt;div&amp;#x20;class&amp;#x3D;&amp;quot;sub-sub-collection-elem&amp;quot;&amp;gt;&amp;#x0A;&amp;#x09;&amp;lt;div&amp;gt;&amp;#x0A;&amp;#x09;&amp;#x09;&amp;lt;button&amp;#x20;class&amp;#x3D;&amp;quot;sub-sub-collection-elem-add&amp;quot;&amp;gt;&amp;#x2B;&amp;lt;&amp;#x2F;button&amp;gt;&amp;#x0A;&amp;#x09;&amp;#x09;&amp;lt;button&amp;#x20;class&amp;#x3D;&amp;quot;sub-sub-collection-elem-remove&amp;quot;&amp;gt;-&amp;lt;&amp;#x2F;button&amp;gt;&amp;#x0A;&amp;#x09;&amp;#x09;&amp;lt;button&amp;#x20;class&amp;#x3D;&amp;quot;sub-sub-collection-elem-up&amp;quot;&amp;gt;up&amp;lt;&amp;#x2F;button&amp;gt;&amp;#x0A;&amp;#x09;&amp;#x09;&amp;lt;button&amp;#x20;class&amp;#x3D;&amp;quot;sub-sub-collection-elem-down&amp;quot;&amp;gt;down&amp;lt;&amp;#x2F;button&amp;gt;&amp;#x0A;&amp;#x09;&amp;lt;&amp;#x2F;div&amp;gt;&amp;#x0A;&amp;#x09;&amp;lt;h2&amp;gt;This&amp;#x20;is&amp;#x20;a&amp;#x20;sub-subcollection&amp;#x20;element&amp;lt;&amp;#x2F;h2&amp;gt;&amp;#x0A;&amp;#x09;&amp;lt;textarea&amp;#x20;id&amp;#x3D;&amp;quot;form_collection_'+index+'_subcollection___subname___subsubcollection___subsubname___firstblabla&amp;quot;&amp;#x20;name&amp;#x3D;&amp;quot;form&amp;#x5B;collection&amp;#x5D;&amp;#x5B;'+index+'&amp;#x5D;&amp;#x5B;subcollection&amp;#x5D;&amp;#x5B;__subname__&amp;#x5D;&amp;#x5B;subsubcollection&amp;#x5D;&amp;#x5B;__subsubname__&amp;#x5D;&amp;#x5B;firstblabla&amp;#x5D;&amp;quot;&amp;gt;&amp;lt;&amp;#x2F;textarea&amp;gt;&amp;#x0A;&amp;#x09;&amp;lt;textarea&amp;#x20;id&amp;#x3D;&amp;quot;form_collection_'+index+'_subcollection___subname___subsubcollection___subsubname___secondblabla&amp;quot;&amp;#x20;name&amp;#x3D;&amp;quot;form&amp;#x5B;collection&amp;#x5D;&amp;#x5B;'+index+'&amp;#x5D;&amp;#x5B;subcollection&amp;#x5D;&amp;#x5B;__subname__&amp;#x5D;&amp;#x5B;subsubcollection&amp;#x5D;&amp;#x5B;__subsubname__&amp;#x5D;&amp;#x5B;secondblabla&amp;#x5D;&amp;quot;&amp;gt;&amp;lt;&amp;#x2F;textarea&amp;gt;&amp;#x0A;&amp;lt;&amp;#x2F;div&amp;gt;&quot;></div><button class=&quot;sub-sub-collection-add-btn&quot;>Add sub sub element</button></div>">';
    if (typeof subOrganization !== 'undefined')
    {
    	for (var i = 0; i < subOrganization.length; i++) {
			html = html + guessCollectionSubElementResult(index, i, subOrganization[i]);
		};
    }
    return html + '</div><button class="sub-collection-add-btn">Add sub element</button>'
+'</div>';
}

/*
 * For the elements of the second collection, without subsubchild
 * We could use the replace function, but I prefer using a different functioning than in the plugin
 */
function guessCollectionSubElementResult(index, subindex, subsubelements)
{
	var html = '<div class="sub-collection-elem">'
	+'<div>'
		+'<button class="sub-collection-elem-add">+</button>'
		+'<button class="sub-collection-elem-remove">-</button>'
		+'<button class="sub-collection-elem-up">up</button>'
		+'<button class="sub-collection-elem-down">down</button>'
	+'</div>'
	+'<h2>This is a subcollection element</h2>'
	+'<input type="date" id="form_collection_'+index+'_subcollection_'+subindex+'_begin" name="form[collection]['+index+'][subcollection]['+subindex+'][begin]">'
	+'<input type="date" id="form_collection_'+index+'_subcollection_'+subindex+'_end" name="form[collection]['+index+'][subcollection]['+subindex+'][end]">'
	+'<div class="sub-sub-collection-root" data-prototype="<div class=&quot;sub-sub-collection-elem&quot;><div><button class=&quot;sub-sub-collection-elem-add&quot;>+</button><button class=&quot;sub-sub-collection-elem-remove&quot;>-</button><button class=&quot;sub-sub-collection-elem-up&quot;>up</button><button class=&quot;sub-sub-collection-elem-down&quot;>down</button></div><h2>This is a sub-subcollection element</h2><textarea id=&quot;form_collection_'+index+'_subcollection_'+subindex+'_subsubcollection___subsubname___firstblabla&quot; name=&quot;form[collection]['+index+'][subcollection]['+subindex+'][subsubcollection][__subsubname__][firstblabla]&quot;></textarea><textarea id=&quot;form_collection_'+index+'_subcollection_'+subindex+'_subsubcollection___subsubname___secondblabla&quot; name=&quot;form[collection]['+index+'][subcollection]['+subindex+'][subsubcollection][__subsubname__][secondblabla]&quot;></textarea></div>">';
	if (typeof subsubelements !== 'undefined')
	{
		for (var i = 0; i < subsubelements; i++) {
			html = html + guessCollectionSubSubElementResult(index, subindex, i);
		};
	}
	return html+'</div>'
	+'<button class="sub-sub-collection-add-btn">Add sub sub element</button>'
+'</div>';
}

/*
 * For the elements of the third collection
 * We could use the replace function, but I prefer using a different functioning than in the plugin
 */
function guessCollectionSubSubElementResult(index, subindex, subsubindex)
{
	return '<div class="sub-sub-collection-elem">'
        +'<div>'
            +'<button class="sub-sub-collection-elem-add">+</button>'
            +'<button class="sub-sub-collection-elem-remove">-</button>'
            +'<button class="sub-sub-collection-elem-up">up</button>'
            +'<button class="sub-sub-collection-elem-down">down</button>'
        +'</div>'
        +'<h2>This is a sub-subcollection element</h2>'
        +'<textarea id="form_collection_'+index+'_subcollection_'+subindex+'_subsubcollection_'+subsubindex+'_firstblabla" name="form[collection]['+index+'][subcollection]['+subindex+'][subsubcollection]['+subsubindex+'][firstblabla]"></textarea>'
        +'<textarea id="form_collection_'+index+'_subcollection_'+subindex+'_subsubcollection_'+subsubindex+'_secondblabla" name="form[collection]['+index+'][subcollection]['+subindex+'][subsubcollection]['+subsubindex+'][secondblabla]"></textarea>'
    +'</div>';
}

// note : should be used before any assert, to avoid any QUnit added elements
function getWholeHtmlExceptChildrenOf(exceptParentSelector, emptyTotally)
{
	µclonedDom = µ('html').clone();
	if (emptyTotally === true)
		µclonedDom.find(exceptParentSelector).html('');
	else
		µclonedDom.find(exceptParentSelector).children().remove();
	return µclonedDom.prop('outerHTML');
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
	µinputs = µ('.collection-elem:nth-child('+(n + 1)+') input');
	µinputs.eq(0).val(value1);
	µinputs.eq(1).val(value2);
}

/* date in format YYYY-MM-DD */
function fillSubElementN(n, subN, date1, date2)
{
	µinputs = µ('.collection-elem:nth-child('+(n + 1)+') .sub-collection-elem:nth-child('+(subN + 1)+') input');
	µinputs.eq(0).val(date1);
	µinputs.eq(1).val(date2);
}

/* date in format YYYY-MM-DD */
function fillSubSubElementN(n, subN, subSubN, value1, value2)
{
	µtextareas = µ('.collection-elem:nth-child('+(n + 1)+') .sub-collection-elem:nth-child('+(subN + 1)+
		') .sub-sub-collection-elem:nth-child('+(subSubN + 1)+') textarea');
	µtextareas.eq(0).val(value1);
	µtextareas.eq(1).val(value2);
}

/*
 * for the elements of the first collection
 * not modifying the subelements
 */
function assertElementNHasTheseValues(assert, n, value1, value2)
{
	µinputs = µ('.collection-elem:nth-child('+(n + 1)+') input');
	assert.equal(µinputs.eq(0).val(), value1);
	assert.equal(µinputs.eq(1).val(), value2);
}

/*
 * for the elements of the first collection
 * not modifying the subelements
 */
function assertSubElementNHasTheseValues(assert, n, subN, date1, date2)
{
	µinputs = µ('.collection-elem:nth-child('+(n + 1)+') .sub-collection-elem:nth-child('+(subN + 1)+') input');
	assert.equal(µinputs.eq(0).val(), date1);
	assert.equal(µinputs.eq(1).val(), date2);
}

/*
 * for the elements of the first collection
 * not modifying the subelements
 */
function assertSubSubElementNHasTheseValues(assert, n, subN, subsubN, value1, value2)
{
	µtextareas = µ('.collection-elem:nth-child('+(n + 1)+') .sub-collection-elem:nth-child('+(subN + 1)+
		') .sub-sub-collection-elem:nth-child('+(subsubN + 1)+') textarea');
	assert.equal(µtextareas.eq(0).val(), value1);
	assert.equal(µtextareas.eq(1).val(), value2);
}

function hasDuplicates(arr)
{
  return arr.some( function(item) {
    return arr.indexOf(item) !== arr.lastIndexOf(item);
  });
}

if (typeof window.__html__ !== 'undefined') {
  console.log('DEFINED')
  /*QUnit.testStart( details => {
    console.log( `Now running: ${details.module} ${details.name}` );
    var fixture = document.getElementById('qunit-fixture');
    fixture.innerHTML = window.__html__['test/base_fixtures'];
  });*/
  QUnit.config.fixture = window.__html__['test/base_fixtures'];
}

/* Note : in assert.equal, the expected is the 2nd param */
QUnit.module('Registration / initializing', function() {
  if (typeof jQuery !== 'undefined') { // only useful for the tests with jQuery
   	QUnit.test('Registration', function( assert ) {
    		assert.ok($.fn.formCollection, 'registered as a jQuery plugin');
    	});
  }

    QUnit.test('are public enums set and correct', function(assert) {
  		assert.ok(formCollection.POST_ADD_CONTEXT, 'POST_ADD_CONTEXT enum is set');
  		assert.ok(formCollection.POST_DELETE_CONTEXT, 'POST_DELETE_CONTEXT enum is set');
  		assert.ok(formCollection.POST_ADD_CONTEXT.BTN_ADD);
  		assert.ok(formCollection.POST_ADD_CONTEXT.OTHER_BTN_ADD);
  		assert.ok(formCollection.POST_ADD_CONTEXT.INIT);
  		assert.ok(formCollection.POST_ADD_CONTEXT.ADD_METHOD);
  		assert.ok(formCollection.POST_DELETE_CONTEXT.BTN_DELETE);
  		assert.ok(formCollection.POST_DELETE_CONTEXT.DELETE_METHOD);
  		var values = [
  			formCollection.POST_ADD_CONTEXT.BTN_ADD,
  			formCollection.POST_ADD_CONTEXT.OTHER_BTN_ADD,
  			formCollection.POST_ADD_CONTEXT.INIT,
  			formCollection.POST_ADD_CONTEXT.ADD_METHOD,
  			formCollection.POST_DELETE_CONTEXT.BTN_DELETE,
  			formCollection.POST_DELETE_CONTEXT.DELETE_METHOD
  		];
  		assert.false(hasDuplicates(values));
    });

    QUnit.test('initializing the collection should not alter the page', function(assert) {
    	var µpage = µ('html');
    	var htmlBefore = µpage.prop('outerHTML');
    	initTripleCollection();
      	assert.equal(µpage.prop('outerHTML'), htmlBefore);
    });
});

QUnit.module('Side add btn', function() {
    QUnit.test('other_btn_add should add an element on click', function(assert) {
    	initTripleCollection();
    	µ('#collection-add-btn').click();
      	assert.equal(removeSpacesBetweenTags(µ('#collection-root').html()).trim(), guessCollectionElementResult(0));
    });

    QUnit.test('other_btn_add should not modify the rest of the page on click', function(assert) {
    	initTripleCollection();
    	var htmlBefore = µ('html').prop('outerHTML');
    	µ('#collection-add-btn').click();
    	var htmlWithoutCollectionContent = getWholeHtmlExceptChildrenOf('#collection-root');
      	assert.equal(htmlWithoutCollectionContent, htmlBefore);
    });
});

QUnit.module('Add down', function() {
    QUnit.test('btn_add_selector should add an element on click after the element with the button', function(assert) {
    	initTripleCollection();
    	µ('#collection-add-btn').click();
    	µ('.collection-elem-add').eq(0).click();
      	assert.equal(µ('.collection-elem').length, 2); //there should be two elements
      	fillElementN(0, 'elem 0 input 0', 'elem 0 input 1');
      	fillElementN(1, 'elem 1 input 0', 'elem 1 input 1');
    	µ('.collection-elem-add').eq(0).click(); // we add an element between the existing one
      	assertElementNHasTheseValues(assert, 0, 'elem 0 input 0', 'elem 0 input 1');
      	assertElementNHasTheseValues(assert, 1, '', '');
      	assertElementNHasTheseValues(assert, 2, 'elem 1 input 0', 'elem 1 input 1');
      	var elementsHtml = guessCollectionElementResult(0) + guessCollectionElementResult(1) + guessCollectionElementResult(2);
      	assert.equal(removeSpacesBetweenTags(µ('#collection-root').html()).trim(), elementsHtml);
    });

    QUnit.test('btn_add_selector should not modify the rest of the page on click', function(assert) {
    	initTripleCollection();
    	var htmlBefore = µ('html').prop('outerHTML');
    	µ('#collection-add-btn').click();
    	µ('.collection-elem-add').eq(0).click();
    	µ('.collection-elem-add').eq(0).click();
    	µ('.collection-elem-add').eq(2).click(); // we add an element at the end
    	var htmlWithoutCollectionContent = getWholeHtmlExceptChildrenOf('#collection-root');
      	assert.equal(htmlWithoutCollectionContent, htmlBefore);
    });
});

QUnit.module('Removal', function() {
    QUnit.test('btn_delete_selector should remove an element on click', function(assert) {
    	initTripleCollection();
    	µ('#collection-add-btn').click();
    	µ('.collection-elem-add').eq(0).click();
    	µ('.collection-elem-add').eq(0).click();
      	fillElementN(0, 'elem 0 input 0', 'elem 0 input 1');
      	fillElementN(1, 'elem 1 input 0', 'elem 1 input 1');
      	fillElementN(2, 'elem 2 input 0', 'elem 2 input 1');
      	assert.equal(µ('.collection-elem').length, 3); //just in case
    	µ('.collection-elem-remove').eq(1).click(); // we erase the element in between
      	assert.equal(µ('.collection-elem').length, 2); //there should be two elements
      	assertElementNHasTheseValues(assert, 0, 'elem 0 input 0', 'elem 0 input 1');
      	assertElementNHasTheseValues(assert, 1, 'elem 2 input 0', 'elem 2 input 1');
    	µ('.collection-elem-remove').eq(0).click(); // we erase the first element
      	assert.equal(µ('.collection-elem').length, 1); //there should be one element
      	assertElementNHasTheseValues(assert, 0, 'elem 2 input 0', 'elem 2 input 1');
    	µ('.collection-elem-remove').eq(0).click(); // we erase the first element
      	assert.equal(µ('.collection-elem').length, 0); //there should be no element
    });

    QUnit.test('btn_delete_selector should not modify the rest of the page on click', function(assert) {
    	initTripleCollection();
    	var htmlBefore = µ('html').prop('outerHTML');
    	µ('#collection-add-btn').click();
    	µ('.collection-elem-add').eq(0).click();
    	µ('.collection-elem-add').eq(0).click();
    	µ('.collection-elem-remove').eq(1).click(); // we erase the element in between
    	µ('.collection-elem-remove').eq(1).click(); // we erase the element at the bottom
    	µ('.collection-elem-remove').eq(0).click(); // we erase the first element
    	var htmlWithoutCollectionContent = getWholeHtmlExceptChildrenOf('#collection-root');
      	assert.equal(µ('.collection-elem').length, 0); // just in case
      	assert.equal(htmlWithoutCollectionContent, htmlBefore);
    });
 });

QUnit.module('Move up', function() {
    QUnit.test('btn_up_selector should move an element up', function(assert) {
    	initTripleCollection();
    	µ('#collection-add-btn').click();
    	µ('.collection-elem-add').eq(0).click();
    	µ('.collection-elem-add').eq(0).click();
      	fillElementN(0, 'elem 0 input 0', 'elem 0 input 1');
      	fillElementN(1, 'elem 1 input 0', 'elem 1 input 1');
      	fillElementN(2, 'elem 2 input 0', 'elem 2 input 1');
      	assert.equal(µ('.collection-elem').length, 3); //just in case
    	µ('.collection-elem-up').eq(2).click(); // we move up the last element

      	assertElementNHasTheseValues(assert, 0, 'elem 0 input 0', 'elem 0 input 1');
      	assertElementNHasTheseValues(assert, 1, 'elem 2 input 0', 'elem 2 input 1');
      	assertElementNHasTheseValues(assert, 2, 'elem 1 input 0', 'elem 1 input 1');
    	µ('.collection-elem-up').eq(1).click(); // we move up the middle element
      	assertElementNHasTheseValues(assert, 0, 'elem 2 input 0', 'elem 2 input 1');
      	assertElementNHasTheseValues(assert, 1, 'elem 0 input 0', 'elem 0 input 1');
      	assertElementNHasTheseValues(assert, 2, 'elem 1 input 0', 'elem 1 input 1');
    });

    QUnit.test('btn_up_selector should not modify the rest of the page on click', function(assert) {
    	initTripleCollection();
    	var htmlBefore = µ('html').prop('outerHTML');
    	µ('#collection-add-btn').click();
    	µ('.collection-elem-add').eq(0).click();
    	µ('.collection-elem-add').eq(0).click();
      	fillElementN(0, 'elem 0 input 0', 'elem 0 input 1');
      	fillElementN(1, 'elem 1 input 0', 'elem 1 input 1');
      	fillElementN(2, 'elem 2 input 0', 'elem 2 input 1');
    	µ('.collection-elem-up').eq(2).click(); // we move up the last element
    	µ('.collection-elem-up').eq(1).click(); // we move up the middle element
    	var htmlWithoutCollectionContent = getWholeHtmlExceptChildrenOf('#collection-root');
      	assert.equal(htmlWithoutCollectionContent, htmlBefore);
    });
 });

QUnit.module('Move down', function() {
    QUnit.test('btn_down_selector should move an element down', function(assert) {
    	initTripleCollection();
    	µ('#collection-add-btn').click();
    	µ('.collection-elem-add').eq(0).click();
    	µ('.collection-elem-add').eq(0).click();
      	fillElementN(0, 'elem 0 input 0', 'elem 0 input 1');
      	fillElementN(1, 'elem 1 input 0', 'elem 1 input 1');
      	fillElementN(2, 'elem 2 input 0', 'elem 2 input 1');
      	assert.equal(µ('.collection-elem').length, 3); //just in case
    	µ('.collection-elem-down').eq(0).click(); // we move down the first element

      	assertElementNHasTheseValues(assert, 0, 'elem 1 input 0', 'elem 1 input 1');
      	assertElementNHasTheseValues(assert, 1, 'elem 0 input 0', 'elem 0 input 1');
      	assertElementNHasTheseValues(assert, 2, 'elem 2 input 0', 'elem 2 input 1');
    	µ('.collection-elem-down').eq(1).click(); // we move down the middle element
      	assertElementNHasTheseValues(assert, 0, 'elem 1 input 0', 'elem 1 input 1');
      	assertElementNHasTheseValues(assert, 1, 'elem 2 input 0', 'elem 2 input 1');
      	assertElementNHasTheseValues(assert, 2, 'elem 0 input 0', 'elem 0 input 1');
    });

    QUnit.test('btn_down_selector should not modify the rest of the page on click', function(assert) {
    	initTripleCollection();
    	var htmlBefore = µ('html').prop('outerHTML');
    	µ('#collection-add-btn').click();
    	µ('.collection-elem-add').eq(0).click();
    	µ('.collection-elem-add').eq(0).click();
      	fillElementN(0, 'elem 0 input 0', 'elem 0 input 1');
      	fillElementN(1, 'elem 1 input 0', 'elem 1 input 1');
      	fillElementN(2, 'elem 2 input 0', 'elem 2 input 1');
    	µ('.collection-elem-down').eq(0).click(); // we move down the last element
    	µ('.collection-elem-down').eq(1).click(); // we move down the middle element
    	var htmlWithoutCollectionContent = getWholeHtmlExceptChildrenOf('#collection-root');
      	assert.equal(htmlWithoutCollectionContent, htmlBefore);
    });
 });

QUnit.module('post_add', function() {
    QUnit.test('post_add is triggered after clicking on other_btn_add, btn_add_selector, and with the add method', function(assert) {
    	var test = false;
    	initSimpleCollection({
    		call_post_add_on_init: 	false,
    		post_add: 				function() {
    			test = true;
    		}
    	});
    	assert.false(test); // to check that the callback isn't triggered without reason
    	µ('#collection-add-btn').click(); // other_btn_add
    	assert.true(test, 'post_add called after click on other_btn_add');
    	test = false; // reset
    	µ('.collection-elem-add').eq(0).click(); // btn_add_selector
    	assert.true(test, 'post_add called after click on btn_add_selector');
    	test = false; // reset
    	µ('#collection-root').formCollection('add'); // add method
    	assert.true(test, 'post_add called after calling the add method');
    });

    QUnit.test('post_add is not triggered during init if call_post_add_on_init is false', function(assert) {
    	µ('#collection-root').append(guessCollectionElementResult(0)); // to preinit the content
    	µ('#collection-root').append(guessCollectionElementResult(1));
    	var test = false;
    	initSimpleCollection({
    		call_post_add_on_init: 	false,
    		post_add: 				function() {
    			test = true;
    		}
    	});
    	assert.false(test); // the callback shouldn't have been called
    });

    QUnit.test('post_add is triggered during init if call_post_add_on_init is true', function(assert) {
    	µ('#collection-root').append(guessCollectionElementResult(0)); // to preinit the content
    	µ('#collection-root').append(guessCollectionElementResult(1));
    	var test = false;
    	initSimpleCollection({
    		call_post_add_on_init: 	true,
    		post_add: 				function() {
    			test = true;
    		}
    	});
    	assert.true(test); // the callback should have been called
    });

    QUnit.test('the post_add context should have the right value', function(assert) {
    	µ('#collection-root').append(guessCollectionElementResult(0)); // to preinit the content
    	µ('#collection-root').append(guessCollectionElementResult(1));
    	var test = false;
    	initSimpleCollection({
    		call_post_add_on_init: 	true,
    		post_add: 				function(µnew_elem, context) {
    			test = context;
    		}
    	});
    	assert.equal(test, formCollection.POST_ADD_CONTEXT.INIT, 'correct context on init');
    	test = false; // reset
    	µ('#collection-add-btn').click(); //other_btn_add
    	assert.equal(test, formCollection.POST_ADD_CONTEXT.OTHER_BTN_ADD, 'correct context on other_btn_add');
    	test = false; // reset
    	µ('.collection-elem-add').eq(0).click(); //btn_add_selector
    	assert.equal(test, formCollection.POST_ADD_CONTEXT.BTN_ADD, 'correct context on btn_add_selector');
    	test = false; // reset
    	µ('#collection-root').formCollection('add');
    	assert.equal(test, formCollection.POST_ADD_CONTEXT.ADD_METHOD, 'correct context with add method');
    });

    QUnit.test('the post_add index should have the right value', function(assert) {
      µ('#collection-root').append(guessCollectionElementResult(0)); // to preinit the content
      µ('#collection-root').append(guessCollectionElementResult(1));
      var test = [];
      initSimpleCollection({
        call_post_add_on_init:  true,
        post_add:         function(µnew_elem, context, index) {
          test.push(index);
        }
      });
      assert.equal(test.length, 2, 'for a collection with 2 preinit elements, two indexes were given');
      assert.equal(test[0], 0, 'the given index for the first preinit element is correct');
      assert.equal(test[1], 1, 'the given index for the second preinit element is correct');
      test = []; // reset
      µ('#collection-add-btn').click(); //other_btn_add
      assert.equal(test[0], 2, 'correct index on other_btn_add');
      test = []; // reset
      µ('.collection-elem-add').eq(0).click(); //btn_add_selector
      assert.equal(test[0], 1, 'correct index on btn_add_selector');
      test = []; // reset
      µ('#collection-root').formCollection('add');
      assert.equal(test[0], 4, 'correct index with add method');
    });
 });

QUnit.module('post_delete', function() {
    QUnit.test('post_delete is triggered after clicking on btn_delete_selector and with the remove method', function(assert) {
    	var test = false;
    	initSimpleCollection({
    		post_delete: function() {
    			test = true;
    		}
    	});
    	assert.false(test); // to check that the callback isn't triggered without reason
    	µ('#collection-add-btn').click();
    	µ('.collection-elem-add').eq(0).click();
    	// now we have 2 elements
    	µ('.collection-elem-remove').eq(0).click(); // btn_delete_selector
    	assert.true(test, 'post_delete called after click on other_btn_add');
    	test = false; // reset
    	µ('#collection-root').formCollection('delete', 0); // delete method
    	assert.true(test, 'post_delete called after calling the remove method');
    });

    QUnit.test('the post_delete context has the right value', function(assert) {
    	var test = false;
    	initSimpleCollection({
    		post_delete: function(µdelete_elem, context) {
    			test = context;
    		}
    	});
    	assert.false(test); // to check that the callback isn't triggered without reason
    	µ('#collection-add-btn').click();
    	µ('.collection-elem-add').eq(0).click();
    	// now we have 2 elements
    	µ('.collection-elem-remove').eq(0).click(); // btn_delete_selector
    	assert.equal(test, formCollection.POST_DELETE_CONTEXT.BTN_DELETE, 'correct context on btn_delete_selector');
    	test = false; // reset
    	µ('#collection-root').formCollection('delete', 0); // delete method
    	assert.equal(test, formCollection.POST_DELETE_CONTEXT.DELETE_METHOD, 'correct context on delete method');
    });

    QUnit.test('the post_delete index has the right value', function(assert) {
      var test = false;
      initSimpleCollection({
        post_delete: function(µdelete_elem, context, index) {
          test = index;
        }
      });
      assert.false(test); // to check that the callback isn't triggered without reason
      µ('#collection-add-btn').click();
      µ('.collection-elem-add').eq(0).click();
      // now we have 2 elements
      µ('.collection-elem-remove').eq(1).click(); // btn_delete_selector
      assert.equal(test, 1, 'correct index on btn_delete_selector');
      test = false; // reset
      µ('#collection-root').formCollection('delete', 0); // delete method
      assert.equal(test, 0, 'correct index on delete method');
    });
});

QUnit.module('post_up', function() {
    QUnit.test('post_up is triggered after clicking on btn_up_selector', function(assert) {
      var test = false;
      initSimpleCollection({
        post_up: function(elem, switched_elem, index) {
          test = true;
        }
      });
      µ('#collection-add-btn').click();
      µ('.collection-elem-add').eq(0).click();
      // now we have 2 elements
      assert.false(test); // to check that the callback isn't triggered without reason
      µ('.collection-elem-up').eq(1).click(); // btn_up_selector
      assert.true(test, 'post_up called after click on btn_up_selector');
    });

    QUnit.test('the post_up elem and switched_elem are correct', function(assert) {
      var testElem = false;
      var testSwitchedElem = false;
      initSimpleCollection({
        post_up: function(elem, switched_elem, index) {
          testElem = elem;
          testSwitchedElem = switched_elem;
          assert.false(elem.isSameNode(switched_elem));
        }
      });
      µ('#collection-add-btn').click();
      µ('.collection-elem-add').eq(0).click();
      µ('.collection-elem-add').eq(0).click();
      µ('.collection-elem-add').eq(0).click();
      // now we have 4 elements
      assert.false(testElem); // to check that the callback isn't triggered without reason
      assert.false(testSwitchedElem); // to check that the callback isn't triggered without reason again
      var node2 = µ('#collection-root').children()[1];
      var node3 = µ('#collection-root').children()[2];
      µ('.collection-elem-up').eq(2).click(); // btn_up_selector
      assert.true(node3.isSameNode(testElem), 'correct elem on btn_up_selector');
      assert.true(node2.isSameNode(testSwitchedElem), 'correct elem on btn_up_selector');
    });

    QUnit.test('the post_up index has the right value', function(assert) {
      var test = false;
      initSimpleCollection({
        post_up: function(elem, switched_elem, index) {
          test = index;
        }
      });
      assert.false(test); // to check that the callback isn't triggered without reason
      µ('#collection-add-btn').click();
      µ('.collection-elem-add').eq(0).click();
      µ('.collection-elem-add').eq(0).click();
      µ('.collection-elem-add').eq(0).click();
      // now we have 4 elements
      µ('.collection-elem-up').eq(2).click(); // btn_up_selector
      assert.equal(test, 2, 'correct index with btn_up_selector');
    });
});

QUnit.module('post_down', function() {
    QUnit.test('post_down is triggered after clicking on btn_down_selector', function(assert) {
      var test = false;
      initSimpleCollection({
        post_down: function(elem, switched_elem, index) {
          test = true;
        }
      });
      µ('#collection-add-btn').click();
      µ('.collection-elem-add').eq(0).click();
      // now we have 2 elements
      assert.false(test); // to check that the callback isn't triggered without reason
      µ('.collection-elem-down').eq(0).click(); // btn_down_selector
      assert.true(test, 'post_down called after click on btn_down_selector');
    });

    QUnit.test('the post_down elem and switched_elem are correct', function(assert) {
      var testElem = false;
      var testSwitchedElem = false;
      initSimpleCollection({
        post_down: function(elem, switched_elem, index) {
          testElem = elem;
          testSwitchedElem = switched_elem;
          assert.false(elem.isSameNode(switched_elem));
        }
      });
      µ('#collection-add-btn').click();
      µ('.collection-elem-add').eq(0).click();
      µ('.collection-elem-add').eq(0).click();
      µ('.collection-elem-add').eq(0).click();
      // now we have 4 elements
      assert.false(testElem); // to check that the callback isn't triggered without reason
      assert.false(testSwitchedElem); // to check that the callback isn't triggered without reason again
      var node2 = µ('#collection-root').children()[1];
      var node3 = µ('#collection-root').children()[2];
      µ('.collection-elem-down').eq(1).click(); // btn_down_selector
      assert.true(node2.isSameNode(testElem), 'correct elem on btn_down_selector');
      assert.true(node3.isSameNode(testSwitchedElem), 'correct elem on btn_down_selector');
    });

    QUnit.test('the post_down index has the right value', function(assert) {
      var test = false;
      initSimpleCollection({
        post_down: function(elem, switched_elem, index) {
          test = index;
        }
      });
      assert.false(test); // to check that the callback isn't triggered without reason
      µ('#collection-add-btn').click();
      µ('.collection-elem-add').eq(0).click();
      µ('.collection-elem-add').eq(0).click();
      µ('.collection-elem-add').eq(0).click();
      // now we have 4 elements
      µ('.collection-elem-down').eq(2).click(); // btn_down_selector
      assert.equal(test, 2, 'correct index with btn_down_selector');
    });
});

QUnit.module('max_elems', function() {
    QUnit.test('max_elems should limit the number of child elements', function(assert) {
    	initSimpleCollection({
    		max_elems: 3
    	});
    	µ('#collection-add-btn').click();
    	µ('#collection-add-btn').click();
    	µ('#collection-add-btn').click();
    	µ('#collection-add-btn').click();
    	µ('.collection-elem-add').eq(0).click();
    	µ('#collection-root').formCollection('add'); // add method
    	assert.equal(µ('#collection-root').children().length, 3);
    });
});

function guessCollectionPrototypeElementResult(index)
{
	return '<div class="collection-prototype-element">'
        +'<textarea id="form_collection_'+index+'_firstblabla" name="form[collection]['+index+'][firstblabla]"></textarea>'
        +'<textarea id="form_collection_'+index+'_secondblabla" name="form[collection]['+index+'][secondblabla]"></textarea>'
    +'</div>';
}

/* Note : this is tested anyway with the triply nested collection, but a bonus separate test is always better*/
QUnit.module('prototype_name', function() {
    QUnit.test('prototype_name should allow to set a custom placeholder', function(assert) {
		µ('#collection-prototype-root').formCollection({
			other_btn_add: 	'#collection-prototype-add-btn',
			prototype_name: '__customproto__'
		});
    	µ('#collection-prototype-add-btn').click();
    	assert.equal(removeSpacesBetweenTags(µ('#collection-prototype-root').html()).trim(), guessCollectionPrototypeElementResult(0));
    });
});

QUnit.module('The method add (.formCollection(\'add\'))', function() {
    QUnit.test('The method add should add an element at the bottom', function(assert) {
    	initTripleCollection();
    	µ('#collection-add-btn').click();
    	µ('.collection-elem-add').eq(0).click();
      	fillElementN(0, 'elem 0 input 0', 'elem 0 input 1');
      	fillElementN(1, 'elem 1 input 0', 'elem 1 input 1');
      	µ('#collection-root').formCollection('add'); // we add an element at the bottom
      	assert.equal(µ('.collection-elem').length, 3); //there should be three elements
      	assertElementNHasTheseValues(assert, 0, 'elem 0 input 0', 'elem 0 input 1');
      	assertElementNHasTheseValues(assert, 1, 'elem 1 input 0', 'elem 1 input 1');
      	assertElementNHasTheseValues(assert, 2, '', '');
      	var elementsHtml = guessCollectionElementResult(0) + guessCollectionElementResult(1) + guessCollectionElementResult(2);
      	assert.equal(removeSpacesBetweenTags(µ('#collection-root').html()).trim(), elementsHtml);
    });

    QUnit.test('The method add should not modify the rest of the page', function(assert) {
    	initTripleCollection();
    	var htmlBefore = µ('html').prop('outerHTML');
    	µ('#collection-add-btn').click();
    	µ('.collection-elem-add').eq(0).click();
    	µ('.collection-elem-add').eq(0).click();
      	µ('#collection-root').formCollection('add'); // we add an element at the bottom
    	var htmlWithoutCollectionContent = getWholeHtmlExceptChildrenOf('#collection-root');
      	assert.equal(htmlWithoutCollectionContent, htmlBefore);
    });

    /*
     * There was a bug if we call formCollection('add') twice (typically with the prototype), so we call it twice here
     * Using two different collections check that they are independants two
     */
    QUnit.test('The method add has access to the settings given during init', function(assert) {
    	var count = 0;
    	initSimpleCollection({
    		post_add: function(){
    			count++;
    		}
    	});
    	µ('#collection-root').formCollection('add');
    	µ('#collection-root').formCollection('add');
      	µ('#collection-prototype-root').formCollection({
			other_btn_add: 	'#collection-prototype-add-btn',
			prototype_name: '__customproto__'
		});
    	µ('#collection-prototype-root').formCollection('add');
    	µ('#collection-prototype-root').formCollection('add');
      	assert.equal(count, 2);
    	var expectedPrototypeCollectionHtml = guessCollectionPrototypeElementResult(0) + guessCollectionPrototypeElementResult(1);
    	assert.equal(removeSpacesBetweenTags(µ('#collection-prototype-root').html()).trim(), expectedPrototypeCollectionHtml);
    });
});

QUnit.module('The method delete (.formCollection(\'delete\', index))', function() {
    QUnit.test('The method delete should delete the element at the specified index', function(assert) {
    	initTripleCollection();
    	µ('#collection-add-btn').click();
    	µ('.collection-elem-add').eq(0).click();
    	µ('.collection-elem-add').eq(0).click(); // 3 elements
      	fillElementN(0, 'elem 0 input 0', 'elem 0 input 1');
      	fillElementN(1, 'elem 1 input 0', 'elem 1 input 1');
      	fillElementN(2, 'elem 2 input 0', 'elem 2 input 1');
      	assert.equal(µ('.collection-elem').length, 3); // just in case
      	µ('#collection-root').formCollection('delete', 1); // we delete the middle element
      	assertElementNHasTheseValues(assert, 0, 'elem 0 input 0', 'elem 0 input 1');
      	assertElementNHasTheseValues(assert, 1, 'elem 2 input 0', 'elem 2 input 1');
      	var elementsHtml = guessCollectionElementResult(0) + guessCollectionElementResult(1);
      	assert.equal(removeSpacesBetweenTags(µ('#collection-root').html()).trim(), elementsHtml);

      	µ('#collection-root').formCollection('delete', 1); // we delete the bottom element
      	assertElementNHasTheseValues(assert, 0, 'elem 0 input 0', 'elem 0 input 1');
      	assert.equal(removeSpacesBetweenTags(µ('#collection-root').html()).trim(), guessCollectionElementResult(0));

      	µ('#collection-root').formCollection('delete', 0); // we delete the last
      	assert.equal(removeSpacesBetweenTags(µ('#collection-root').html()).trim(), '');
    });

    QUnit.test('The method delete should not modify the rest of the page', function(assert) {
    	initTripleCollection();
    	var htmlBefore = µ('html').prop('outerHTML');
    	µ('#collection-add-btn').click();
    	µ('.collection-elem-add').eq(0).click();
    	µ('.collection-elem-add').eq(0).click(); // 3 elements 
      	µ('#collection-root').formCollection('delete', 1); // we delete the middle element
      	µ('#collection-root').formCollection('delete', 0); // we delete the first element
      	µ('#collection-root').formCollection('delete', 0); // we delete the "new" first element
    	var htmlWithoutCollectionContent = getWholeHtmlExceptChildrenOf('#collection-root');
      	assert.equal(htmlWithoutCollectionContent, htmlBefore);
    });

    /*
     * There was a bug if we call formCollection('add') twice (typically with the prototype), so we call delete twice here
     * Using two different collections check that they are independants two
     */
    QUnit.test('The method delete has access to the settings given during init', function(assert) {
    	var count = 0;
    	initSimpleCollection({
    		post_delete: function(){
    			count++;
    		}
    	});
    	µ('#collection-add-btn').click();
    	µ('#collection-add-btn').click();
    	µ('#collection-root').formCollection('delete', 1);
    	µ('#collection-root').formCollection('delete', 0);
      	µ('#collection-prototype-root').formCollection({
			other_btn_add: 	'#collection-prototype-add-btn',
			prototype_name: '__customproto__'
		});
    	µ('#collection-prototype-add-btn').click();
    	µ('#collection-prototype-add-btn').click();
    	µ('#collection-prototype-add-btn').click();
    	µ('#collection-prototype-root').formCollection('delete', 1);
      	assert.equal(count, 2);
    	var expectedPrototypeCollectionHtml = guessCollectionPrototypeElementResult(0) + guessCollectionPrototypeElementResult(1);
    	assert.equal(removeSpacesBetweenTags(µ('#collection-prototype-root').html()).trim(), expectedPrototypeCollectionHtml);
    });
});

QUnit.module('The method clear (.formCollection(\'clear\'))', function() {
    QUnit.test('The method clear should delete every element', function(assert) {
    	initTripleCollection();
    	µ('#collection-add-btn').click();
    	µ('.collection-elem-add').eq(0).click();
    	µ('.collection-elem-add').eq(0).click(); // 3 elements
      	assert.equal(µ('.collection-elem').length, 3); // just in case
      	µ('#collection-root').formCollection('clear'); // we delete everything
      	assert.equal(removeSpacesBetweenTags(µ('#collection-root').html()).trim(), '');
    });

    QUnit.test('The method clear should not modify the rest of the page', function(assert) {
    	initTripleCollection();
    	var htmlBefore = getWholeHtmlExceptChildrenOf('#collection-root', true); // necessary because of spaces
    	µ('#collection-add-btn').click();
    	µ('.collection-elem-add').eq(0).click();
    	µ('.collection-elem-add').eq(0).click(); // 3 elements 
      	µ('#collection-root').formCollection('clear'); // we delete everything
    	var htmlWithoutCollectionContent = getWholeHtmlExceptChildrenOf('#collection-root', true);
      	assert.equal(htmlWithoutCollectionContent, htmlBefore);
    });

    // nothing to test related to params
});

/*
 * Note about nth-child:
 * .collection-elem:nth-child(1) input:nth-child(1) can't work because it doesn't look for the first input
 * in the collection-elem, it looks for the elem that is the first child of collection-elem and is an input,
 * which doesn't exist since the first child is an h2. nth-of-type does what we want here.
 */
QUnit.module('The method refreshAttributes (.formCollection(\'refreshAttributes\', from))', function() {
    QUnit.test('The method refreshAttributes should refresh the attributes with placeholder from the given index', function(assert) {
    	initTripleCollection();
    	µ('#collection-add-btn').click();
    	µ('.collection-elem-add').eq(0).click();
    	µ('.collection-elem-add').eq(0).click(); // 3 elements
      	assert.equal(µ('.collection-elem').length, 3); // just in case
      	µ('.collection-elem:nth-child(1) input:nth-of-type(1)').prop('name', 'blabla').prop('id', 'nothing');
      	µ('.collection-elem:nth-child(2) input:nth-of-type(1)').prop('name', 'hello').prop('id', 'bye');
      	µ('.collection-elem:nth-child(3) input:nth-of-type(1)').prop('name', 'foo').prop('id', 'bar');
      	// the first element shouldn't be affected since we refresh from the second
      	var firstElemHtml = removeSpacesBetweenTags(µ('.collection-elem:nth-child(1)').prop('outerHTML')).trim();
      	assert.notEqual(firstElemHtml, guessCollectionElementResult(0)); // just in case
      	µ('#collection-root').formCollection('refreshAttributes', 1); // we refresh attributes from the second
      	var expected = firstElemHtml + guessCollectionElementResult(1) + guessCollectionElementResult(2);
      	assert.equal(removeSpacesBetweenTags(µ('#collection-root').html()).trim(), expected);
    });

    QUnit.test('The method refreshAttributes should refresh the attributes with placeholder of sub collections too', function(assert) {
    	initTripleCollection();
    	µ('#collection-add-btn').click();
    	µ('.sub-collection-add-btn').eq(0).click();
    	µ('.sub-sub-collection-add-btn').eq(0).click(); // 1 elem with a sub elem with a sub sub elem
      	µ('textarea:nth-of-type(1)').prop('name', 'blabla').prop('id', 'nothing');
      	// the first element shouldn't be affected since we refresh from the second
      	var subsubElemHtml = removeSpacesBetweenTags(µ('.sub-sub-collection-elem').prop('outerHTML')).trim();
      	assert.notEqual(subsubElemHtml, guessCollectionSubSubElementResult(0, 0, 0)); // just in case
      	µ('#collection-root').formCollection('refreshAttributes', 0); // we refresh attributes from the first
      	var expected = guessCollectionElementResult(0, [1]);
      	assert.equal(removeSpacesBetweenTags(µ('#collection-root').html()).trim(), expected);
    });

    QUnit.test('The method refreshAttributes should not modify the rest of the page', function(assert) {
    	initTripleCollection();
    	var htmlBefore = µ('html').prop('outerHTML');
    	µ('#collection-add-btn').click();
    	µ('.collection-elem-add').eq(0).click();
    	µ('.collection-elem-add').eq(0).click(); // 3 elements 
      	µ('.collection-elem:nth-child(1) input:nth-of-type(1)').prop('name', 'blabla').prop('id', 'nothing');
      	µ('.collection-elem:nth-child(2) input:nth-of-type(1)').prop('name', 'hello').prop('id', 'bye');
      	µ('.collection-elem:nth-child(3) input:nth-of-type(1)').prop('name', 'foo').prop('id', 'bar');
      	µ('#collection-root').formCollection('refreshAttributes', 0); // we refresh attributes of each elem
    	var htmlWithoutCollectionContent = getWholeHtmlExceptChildrenOf('#collection-root');
      	assert.equal(htmlWithoutCollectionContent, htmlBefore);
    });

    // nothing to test related to params
});

function makeElementsTree(elementNumber, subElementsNumbers, subSubElementsNumbers)
{
	for (var i = 0; i < elementNumber; i++) {
    	µ('#collection-add-btn').click();
    	for (var j = 0; j < subElementsNumbers; j++) {
    		µ('.collection-elem').eq(i).find('.sub-collection-add-btn').click();
    		for (var k = 0; k < subSubElementsNumbers; k++) {
    			µ('.collection-elem').eq(i).find('.sub-collection-elem').eq(j).find('.sub-sub-collection-add-btn').click();
    		};
    	};
	};
}

function fillElementNChildren(n, prefix, year)
{
    fillSubElementN(n, 0, year+'-01-01', year+'-01-02');
    fillSubSubElementN(n, 0, 0, prefix+'a', prefix+'a');
   	fillSubSubElementN(n, 0, 1, prefix+'b', prefix+'b');
   	fillSubSubElementN(n, 0, 2, prefix+'c', prefix+'c');

    fillSubElementN(n, 1, year+'-02-01', year+'-02-02');
   	fillSubSubElementN(n, 1, 0, prefix+'d', prefix+'d');
   	fillSubSubElementN(n, 1, 1, prefix+'e', prefix+'e');
   	fillSubSubElementN(n, 1, 2, prefix+'f', prefix+'f');

   	fillSubElementN(n, 2, year+'-03-01', year+'-03-02');
   	fillSubSubElementN(n, 2, 0, prefix+'g', prefix+'g');
   	fillSubSubElementN(n, 2, 1, prefix+'h', prefix+'h');
   	fillSubSubElementN(n, 2, 2, prefix+'i', prefix+'i');
}

/* values bases on the ones specified in fillElementNChildren */
function assertElementNChildrenHaveTheseValues(assert, n, prefix, year)
{
	assertSubElementNHasTheseValues(assert, n, 0, year+'-01-01', year+'-01-02');
	assertSubSubElementNHasTheseValues(assert, n, 0, 0, prefix+'a', prefix+'a');
	assertSubSubElementNHasTheseValues(assert, n, 0, 1, prefix+'b', prefix+'b');
	assertSubSubElementNHasTheseValues(assert, n, 0, 2, prefix+'c', prefix+'c');

	assertSubElementNHasTheseValues(assert, n, 1, year+'-02-01', year+'-02-02');
	assertSubSubElementNHasTheseValues(assert, n, 1, 0, prefix+'d', prefix+'d');
	assertSubSubElementNHasTheseValues(assert, n, 1, 1, prefix+'e', prefix+'e');
	assertSubSubElementNHasTheseValues(assert, n, 1, 2, prefix+'f', prefix+'f');

	assertSubElementNHasTheseValues(assert, n, 2, year+'-03-01', year+'-03-02');
	assertSubSubElementNHasTheseValues(assert, n, 2, 0, prefix+'g', prefix+'g');
	assertSubSubElementNHasTheseValues(assert, n, 2, 1, prefix+'h', prefix+'h');
	assertSubSubElementNHasTheseValues(assert, n, 2, 2, prefix+'i', prefix+'i');
}

/* comparing the whole collections html is strict and hard to maintain, but it avoid bad surprises */
QUnit.module('collection nesting (3 levels)', function() {
    QUnit.test('a triply nested collection with correct parameters should have the right result', function(assert) {
		initTripleCollection();
    	makeElementsTree(3, 3, 3);
    	var expectedResult = guessCollectionElementResult(0, [3, 3, 3]) // 3 children with 3 children each
    							+ guessCollectionElementResult(1, [3, 3, 3])
    							+ guessCollectionElementResult(2, [3, 3, 3]);
      	assert.equal(removeSpacesBetweenTags(µ('#collection-root').html()).trim(), expectedResult);
	});

    QUnit.test('elements should move correctly, attributes of sub and sub sub elements should be updated after adding an element', function(assert) {
		initTripleCollection();
    	makeElementsTree(3, 3, 3);
    	
    	fillElementNChildren(1, '1', '2000'); // we fill sub elements and sub sub elements in the element 1
    	fillElementNChildren(2, '2', '2001'); // we fill sub elements and sub sub elements in the element 2
    	µ('.collection-elem-add').eq(1).click(); // add an element between the 1 and the 2
    	var expectedResult = guessCollectionElementResult(0, [3, 3, 3]) // 3 children with 3 children each
    							+ guessCollectionElementResult(1, [3, 3, 3])
    							+ guessCollectionElementResult(2) // the added element
    							+ guessCollectionElementResult(3, [3, 3, 3]);
    	assertElementNChildrenHaveTheseValues(assert, 1, '1', '2000');
    	assert.equal(µ('.collection-elem-add:nth-child(3) .sub-collection-elem').length, 0); // the added elem has no children
    	assertElementNChildrenHaveTheseValues(assert, 3, '2', '2001');
      	assert.equal(removeSpacesBetweenTags(µ('#collection-root').html()).trim(), expectedResult);
	});

    QUnit.test('elements should move correctly, attributes of sub and sub sub elements should be updated after removing an element', function(assert) {
		initTripleCollection();
    	makeElementsTree(3, 3, 3);
    	fillElementNChildren(0, '0', '2000'); // we fill sub elements and sub sub elements in the element 0
    	fillElementNChildren(2, '2', '2001'); // we fill sub elements and sub sub elements in the element 2
    	µ('.collection-elem-remove').eq(1).click(); // remove the second element
    	var expectedResult = guessCollectionElementResult(0, [3, 3, 3]) // 3 children with 3 children each
    							+ guessCollectionElementResult(1, [3, 3, 3]);
    	assertElementNChildrenHaveTheseValues(assert, 0, '0', '2000');
    	assertElementNChildrenHaveTheseValues(assert, 1, '2', '2001');
      	assert.equal(removeSpacesBetweenTags(µ('#collection-root').html()).trim(), expectedResult);
	});

    QUnit.test('elements should move correctly, attributes of sub and sub sub elements should be updated after moving an element up', function(assert) {
		initTripleCollection();
    	makeElementsTree(3, 3, 3);
    	
    	fillElementNChildren(0, '0', '1999'); // we fill sub elements and sub sub elements in the element 0
    	fillElementNChildren(1, '1', '2000'); // we fill sub elements and sub sub elements in the element 1
    	fillElementNChildren(2, '2', '2001'); // we fill sub elements and sub sub elements in the element 2
    	µ('.collection-elem-up').eq(1).click(); // move the middle element up
    	var expectedResult = guessCollectionElementResult(0, [3, 3, 3]) // 3 children with 3 children each
    							+ guessCollectionElementResult(1, [3, 3, 3])
    							+ guessCollectionElementResult(2, [3, 3, 3]);
    	assertElementNChildrenHaveTheseValues(assert, 0, '1', '2000');
    	assertElementNChildrenHaveTheseValues(assert, 1, '0', '1999');
    	assertElementNChildrenHaveTheseValues(assert, 2, '2', '2001');
      	assert.equal(removeSpacesBetweenTags(µ('#collection-root').html()).trim(), expectedResult);
	});

    QUnit.test('elements should move correctly, attributes of sub and sub sub elements should be updated after moving an element down', function(assert) {
		initTripleCollection();
    	makeElementsTree(3, 3, 3);
    	
    	fillElementNChildren(0, '0', '1999'); // we fill sub elements and sub sub elements in the element 0
    	fillElementNChildren(1, '1', '2000'); // we fill sub elements and sub sub elements in the element 1
    	fillElementNChildren(2, '2', '2001'); // we fill sub elements and sub sub elements in the element 2
    	µ('.collection-elem-down').eq(1).click(); // move the middle element up
    	var expectedResult = guessCollectionElementResult(0, [3, 3, 3]) // 3 children with 3 children each
    							+ guessCollectionElementResult(1, [3, 3, 3])
    							+ guessCollectionElementResult(2, [3, 3, 3]);
    	assertElementNChildrenHaveTheseValues(assert, 0, '0', '1999');
    	assertElementNChildrenHaveTheseValues(assert, 1, '2', '2001');
    	assertElementNChildrenHaveTheseValues(assert, 2, '1', '2000');
      	assert.equal(removeSpacesBetweenTags(µ('#collection-root').html()).trim(), expectedResult);
	});
});