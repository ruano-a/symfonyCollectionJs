require('./lib/symfonyCollectionJs.js');
// or require('symfonyCollectionJs.js'); if loaded with a package manager (and it should be)

$(document).ready(function(){
	$('#collection-root').formCollection({
		other_btn_add:      '#collection-add-btn',
		btn_add_selector:     '.collection-elem-add',
		btn_delete_selector:  '.collection-elem-remove',
		btn_up_selector:  '.collection-elem-up',
		btn_down_selector:  '.collection-elem-down',
		call_post_add_on_init:  true,
		post_add:         function(new_elem, context) {
			$(new_elem).find('.sub-collection-root').formCollection({
			   	other_btn_add:      $(new_elem).find('.sub-collection-add-btn'), // don't give just a selector in this case !
			    btn_add_selector:     '.sub-collection-elem-add',
			    btn_delete_selector:  '.sub-collection-elem-remove',
			   	btn_up_selector:  '.sub-collection-elem-up',
			   	btn_down_selector:  '.sub-collection-elem-down',
			   	call_post_add_on_init:  true,
			   	prototype_name:     '__subname__',
		    	call_post_add_on_init:  true,
			   	post_add:         function(new_elem, context) {
			   		$(new_elem).find('.sub-sub-collection-root').formCollection({
			     		other_btn_add:      $(new_elem).find('.sub-sub-collection-add-btn'), // don't give just a selector in this case !
			    		btn_add_selector:     '.sub-sub-collection-elem-add',
			    		btn_delete_selector:  '.sub-sub-collection-elem-remove',
			    		btn_up_selector:  '.sub-sub-collection-elem-up',
			    		btn_down_selector:  '.sub-sub-collection-elem-down',
			    		prototype_name:     '__subsubname__'
			    	});
			    }
			});
        }
    });
});