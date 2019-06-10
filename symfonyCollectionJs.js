jQuery.fn.extend({
    formCollection: function(options, param) {
        var settings;
        var selector = this.selector;
        var dataKey = 'collectionData';
        var placeHolderAlias = '__AttrName__';

        if (options === undefined || typeof options === 'object') {
            var defaults = {
                max_elems: 100,
                post_add: function($new_elem) {
                    return true;
                },
                post_delete: function($delete_elem) {
                    return true;
                },
                other_btn_add_selector: null,
                btn_add_selector: '.collection-add',
                btn_delete_selector: '.collection-delete',
                btn_up_selector: '.collection-up',
                btn_down_selector: '.collection-down',
            };
            settings = $.extend(true, {}, defaults, options);
            if (typeof globalSettings == 'undefined')
                globalSettings = {};
            globalSettings[selector] = settings; // to make them accessible on another call
        } else if (typeof options === 'string') {
            if ($.inArray(options, ['add', 'remove', 'clear']) === -1) {
                console.log('Invalid options');
                return false;
            }
            else if (options === 'remove' && param === undefined) {
                console.log('Missing index');
                return false;
            }
            else if (typeof globalSettings == 'undefined' || globalSettings[selector] === undefined) {
                console.log('Element not initialized');
                return false;
            }
            var settings = globalSettings[selector];
        }
        return $(this).each(function() {
            var prototype = $(this).data('prototype');
            var n = $(this).children().length;
            var $collection_root = $(this);

            var init_elem = function($elem) {
                $elem.find(settings.btn_add_selector).click(function() {
                    var $new_elem = add_elem_down($elem);
                    settings.post_add($new_elem);
                });
                $elem.find(settings.btn_delete_selector).click(function() {
                    delete_elem($elem);
                    settings.post_delete($elem);
                });
                $elem.find(settings.btn_up_selector).click(function() {
                    move_elem_up($elem);
                });
                $elem.find(settings.btn_down_selector).click(function() {
                    move_elem_down($elem);
                });
            };

            var getAttributesWithThisValue = function($elem, value) {
                var result = {};
                $.each($elem[0].attributes, function() {
                    if (this.value && this.value.indexOf(value) !== -1) {
                        result[this.name] = this.value.replace(/__name__/g, placeHolderAlias);
                    }
                });
                return (result);
            };

            var mark_elem_nodes = function($elem) {
                var attrs = getAttributesWithThisValue($elem, '__name__');
                if (!$.isEmptyObject(attrs))
                    $elem.attr('data-'+dataKey, JSON.stringify(attrs));
                $elem.find('[id*="__name__"], [name*="__name__"], [for*="__name__"]').each(function(){
                    attrs = getAttributesWithThisValue($(this), '__name__');
                    if (!$.isEmptyObject(attrs))
                        $(this).attr('data-'+dataKey, JSON.stringify(attrs));
                });

                return ($elem);
            };

            var update_index = function($elem, index) {
                var attrsToUpdate = $elem.attr('data-'+dataKey);
                attrsToUpdate = attrsToUpdate ? JSON.parse(attrsToUpdate) : null;
                $.each(attrsToUpdate, function(name, value) {
                    $elem.attr(name, value.replace(placeHolderAlias, index));
                });
                $elem.find('[data-'+dataKey+']').each(function(){
                    $node = $(this);
                    attrs = getAttributesWithThisValue($node, '__name__');
                    attrsToUpdate = $node.attr('data-'+dataKey);
                    attrsToUpdate = attrsToUpdate ? JSON.parse(attrsToUpdate) : null;
                    $.each(attrsToUpdate, function(name, value) {
                        $node.attr(name, value.replace(placeHolderAlias, index));
                    });
                });
            };

            // if i > to the max index, it doesn't cause problems
            var update_indexes_from = function(i) {
                $collection_root.children().slice(i).each(function(){
                    update_index($(this), i);
                    i++;
                });
            };

            var create_elem = function(index) {
                if (index === undefined)
                    index = n;
                var newFormHtml = prototype;
                var $newForm = mark_elem_nodes($(newFormHtml));
                //won't replace the ones in data since we put an alias
                newFormHtml = $newForm[0].outerHTML.replace(/__name__/g, index);
                $newForm = $(newFormHtml);
                init_elem($newForm);
                return ($newForm);
            };

            var add_elem_down = function($elem) {
                if (n >= settings.max_elems)
                    return false;
                var $new_elem = create_elem($elem.index() + 1);
                $elem.after($new_elem);
                n++;
                update_indexes_from($elem.index() + 2);
                return ($new_elem);
            };

            var add_elem_bottom = function() {
                var $new_elem = create_elem();
                $collection_root.append($new_elem);
                n++;
                settings.post_add($new_elem);
            };

            var delete_elem = function($elem) {
                var index = $elem.index();
                $elem.remove();
                n--;
                update_indexes_from(index);
            };

            var move_elem_up = function($elem) {
                $prev = $elem.prev();
                if (!$prev)
                    return false;
                newIndex = $prev.index();
                $prev.before($elem);
                update_index($elem, newIndex);
                update_index($prev, newIndex + 1);
            };

            var move_elem_down = function($elem) {
                $next = $elem.next();
                if (!$next)
                    return false;
                newIndex = $next.index();
                $next.after($elem);
                update_index($elem, newIndex);
                update_index($next, newIndex - 1);
            };

            switch (options) {
                case 'add':
                    add_elem_bottom();
                    break;
                case 'clear':
                    $collection_root.empty();
                    n = 0;
                    break;
                case 'remove':
                    $collection_root.children().eq(param).remove();
                    n--;
                    update_indexes_from(param);
                    break;
                default:
                    var init_existing = function() {
                        $collection_root.children().each(function() {
                            init_elem($(this));
                        });
                    };

                    init_existing();
                    if (settings.other_btn_add_selector) {
                        $(settings.other_btn_add_selector).click(function() {
                            add_elem_bottom();
                        });
                    }
            }
        });
    }
});