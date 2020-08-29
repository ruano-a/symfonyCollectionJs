jQuery.fn.extend({
    formCollection: function(options, param) {
        var settings;
        var selector = this.selector;
        var dataKey = 'collectionData';

        if (options === undefined || typeof options === 'object') {
            var defaults = {
                max_elems: 100,
                call_post_add_on_init: false,
                post_add: function($new_elem, is_init) {
                    return true;
                },
                post_delete: function($delete_elem) {
                    return true;
                },
                post_up: function($elem, $switched_elem) {
                    return true;
                },
                post_down: function($elem, $switched_elem) {
                    return true;
                },
                other_btn_add:          null,
                btn_add_selector:       '.collection-add',
                btn_delete_selector:    '.collection-delete',
                btn_up_selector:        '.collection-up',
                btn_down_selector:      '.collection-down',
                prototype_name_alias:   '__AttrName__',
                prototype_name:         '__name__'
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
                    settings.post_add($new_elem, false);
                });
                $elem.find(settings.btn_delete_selector).click(function() {
                    delete_elem($elem);
                    settings.post_delete($elem);
                });
                $elem.find(settings.btn_up_selector).click(function() {
                    $switched_elem = move_elem_up($elem);
                    if ($switched_elem) {
                        settings.post_up($elem, $switched_elem);
                    }
                });
                $elem.find(settings.btn_down_selector).click(function() {
                    $switched_elem = move_elem_down($elem);
                    if ($switched_elem) {
                        settings.post_down($elem, $switched_elem);
                    }
                });
            };

            var getAttributesWithThisValue = function($elem, value) {
                var result = {};
                var prototypeNameRegexp = new RegExp(settings.prototype_name, 'g');
                $.each($elem[0].attributes, function() {
                    if (this.value && this.value.indexOf(value) !== -1) {
                        result[this.name] = this.value.replace(prototypeNameRegexp, settings.prototype_name_alias);
                    }
                });
                return result;
            };

            var mark_elem_nodes = function($elem) {
                var attrs = getAttributesWithThisValue($elem, settings.prototype_name);
                if (!$.isEmptyObject(attrs))
                    $elem.attr('data-'+dataKey, JSON.stringify(attrs));
                $elem.find('[id*="'+settings.prototype_name+'"], [name*="'+settings.prototype_name+'"], [for*="'+settings.prototype_name+'"]').each(function(){
                    attrs = getAttributesWithThisValue($(this), settings.prototype_name);
                    if (!$.isEmptyObject(attrs))
                        $(this).attr('data-'+dataKey, JSON.stringify(attrs));
                });

                return $elem;
            };

            var update_index = function($elem, index) {
                var attrsToUpdate = $elem.attr('data-'+dataKey);
                attrsToUpdate = attrsToUpdate ? JSON.parse(attrsToUpdate) : null;
                $.each(attrsToUpdate, function(name, value) {
                    $elem.attr(name, value.replace(settings.prototype_name_alias, index));
                });
                $elem.find('[data-'+dataKey+']').each(function(){
                    $node = $(this);
                    attrs = getAttributesWithThisValue($node, settings.prototype_name);
                    attrsToUpdate = $node.attr('data-'+dataKey);
                    attrsToUpdate = attrsToUpdate ? JSON.parse(attrsToUpdate) : null;
                    $.each(attrsToUpdate, function(name, value) {
                        $node.attr(name, value.replace(settings.prototype_name_alias, index));
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
                var prototypeNameRegexp = new RegExp(settings.prototype_name, 'g');
                //won't replace the ones in data since we put an alias
                newFormHtml = $newForm[0].outerHTML.replace(prototypeNameRegexp, index);
                $newForm = $(newFormHtml);
                init_elem($newForm);
                return $newForm;
            };

            var add_elem_down = function($elem) {
                if (n >= settings.max_elems)
                    return false;
                var $new_elem = create_elem($elem.index() + 1);
                $elem.after($new_elem);
                n++;
                update_indexes_from($elem.index() + 2);
                return $new_elem;
            };

            var add_elem_bottom = function() {
                if (n >= settings.max_elems)
                    return false;
                var $new_elem = create_elem();
                $collection_root.append($new_elem);
                n++;
                settings.post_add($new_elem, false);
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

                return $prev;
            };

            var move_elem_down = function($elem) {
                $next = $elem.next();
                if (!$next)
                    return false;
                newIndex = $next.index();
                $next.after($elem);
                update_index($elem, newIndex);
                update_index($next, newIndex - 1);

                return $next;
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
                            if (settings.call_post_add_on_init)
                                settings.post_add($(this), true);
                        });
                    };

                    init_existing();
                    if (settings.other_btn_add) {
                        if (typeof settings.other_btn_add === 'string')
                            var $otherBtnAdd = $(settings.other_btn_add)
                        else if (settings.other_btn_add instanceof jQuery)
                            var $otherBtnAdd = settings.other_btn_add;
                        else
                        {
                            console.log('other_btn_add: bad value, can be a selector or a jQuery object.')
                            break;
                        }
                        $otherBtnAdd.click(function() {
                            add_elem_bottom();
                        });
                    }
            }
        });
    }
});
