(function(){
	const basicRoot = document.getElementById('demo-simple-basic')
	formCollection(basicRoot, {
		btn_add_selector:     '.collection-elem-add',
		btn_delete_selector:  '.collection-elem-remove',
		btn_up_selector:  '.collection-elem-up',
		btn_down_selector:  '.collection-elem-down',
	});
	formCollection(basicRoot, 'add');

	//formCollection(document.getElementById('demo-simple-basic'));
})();
