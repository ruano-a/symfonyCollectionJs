jQuery.fn.extend({
  formCollection: function(options) {
     var defaults =  {
        max_elems:              100,
        post_add:               function($new_elem) { return true; },
        post_delete:            function($delete_elem) { return true; },
        other_btn_add_selector: null,
        btn_add_selector:       '.collection-add',
        btn_delete_selector:    '.collection-delete',
        btn_up_selector:        '.collection-up',
        btn_down_selector:      '.collection-down',
    };
    var settings = $.extend(true, {}, defaults, options);
    return $(this).each(function(){
        var prototype = $(this).data('prototype');
        var n = $(this).children().length;
        var $collection_root = $(this);

        var create_elem = function() {
           var newForm = prototype;
           newForm = newForm.replace(/__name__/g, n);
           $newForm = $(newForm);
           init_elem($newForm);
           return ($newForm);
       };

       var add_elem_down = function ($elem) {
           if (n >= settings.max_elems)
               return false;
           var $new_elem = create_elem();
           $elem.after($new_elem);
           n++;
           return ($new_elem);
       };

       var delete_elem = function ($elem) {
           $elem.remove();
           n--;
       };

       var move_elem_up = function ($elem) {
           $prev = $elem.prev();
           if (!$prev)
               return false;
           $prev.before($elem);
       };

       var move_elem_down = function ($elem) {
           $next = $elem.next();
           if (!$next)
               return false;
           $next.after($elem);
       };

       var init_elem = function($elem) {
           $elem.find(settings.btn_add_selector).click(function(){
              var $new_elem = add_elem_down($elem);
              settings.post_add($new_elem);
          });
           $elem.find(settings.btn_delete_selector).click(function(){
              delete_elem($elem);
              settings.post_delete($elem);
          });
           $elem.find(settings.btn_up_selector).click(function(){
              move_elem_up($elem);
          });
           $elem.find(settings.btn_down_selector).click(function(){
              move_elem_down($elem);
          });
       };

       var init_existing = function(){
           $collection_root.children().each(function() {
              init_elem($(this));
          });
       };

       init_existing();
       if (settings.other_btn_add_selector)
       {
           $(settings.other_btn_add_selector).click(function(){
              var $new_elem = create_elem();
              $collection_root.append($new_elem);
              n++;
              settings.post_add($new_elem);
          });
       }
   });
}
});