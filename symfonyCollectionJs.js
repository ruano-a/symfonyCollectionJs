jQuery.fn.extend({
    formCollection: function(options, param) {
        var settings;
        var selector = this.selector;
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

            var create_elem = function() {
                var newForm = prototype;
                newForm = newForm.replace(/__name__/g, n);
                $newForm = $(newForm);
                init_elem($newForm);
                return ($newForm);
            };

            var add_elem_down = function($elem) {
                if (n >= settings.max_elems)
                    return false;
                var $new_elem = create_elem();
                $elem.after($new_elem);
                n++;
                return ($new_elem);
            };

            var add_elem_bottom = function() {
                var $new_elem = create_elem();
                $collection_root.append($new_elem);
                n++;
                settings.post_add($new_elem);
            };

            var delete_elem = function($elem) {
                $elem.remove();
                n--;
            };

            var move_elem_up = function($elem) {
                $prev = $elem.prev();
                if (!$prev)
                    return false;
                $prev.before($elem);
            };

            var move_elem_down = function($elem) {
                $next = $elem.next();
                if (!$next)
                    return false;
                $next.after($elem);
            };

            switch (options) {
                case 'add':
                    add_elem_bottom();
                    break;
                case 'clear':
                    $collection_root.empty();
                    break;
                case 'remove':
                    $collection_root.children().eq(param).remove();
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