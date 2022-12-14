(function(){
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

					formCollection(tripleSubSubRoot, 'add');
			    }
			});

			formCollection(tripleSubRoot, 'add');
		}
	});
	
	formCollection(tripleRoot, 'add');
})();
