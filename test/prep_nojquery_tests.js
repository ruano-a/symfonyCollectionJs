/* 
 * my own jQuery <3 
 * (useful to keep the same code in tests.js regardless of the presence of jQuery,
 * and not to restart from scratch)
*/
var µ = function(param) {
  var createNode = function(html) { // equivalent of JQuery(html)
      var div = document.createElement('div');
      div.innerHTML = html.trim();

      if (div.childNodes.length > 1)
        return div.childNodes;
      return div.firstChild; 
  };

  var getEvent = function(eventName) {
      if (typeof(Event) === 'function') {
          return new Event(eventName);
      }
      var event = document.createEvent('Event');
      event.initEvent(eventName, true, true);
      return event;
  };

  var addMethods = function(result) {

    result.eq = function(i) {
      return addMethods([result[i]]);
    };

    result.clone = function() {
      return addMethods([result[0].cloneNode(true)]);
    };

    result.find = function(selector) {
      return addMethods(result[0].querySelectorAll(selector));
    };

    result.html = function(value) {
      if (typeof value === 'undefined')
        return result[0].innerHTML; // affects the first one
      for (var i = 0; i < result.length; i++) {
        result[i].innerHTML = value;
      }
      return result;
    };

    result.remove = function() {
      var ret = [];
      while (result.length > 0) { // each removed child is removed from the original set too. so this works best
        ret.push(result[0]);
        result[0].parentNode.removeChild(result[0]);
      }
      return addMethods(ret);
    };

    result.prop = function(key, value) {
      if (typeof value === 'undefined') {
        if (typeof result[0][key] !== 'undefined')
          return result[0][key]; // check the property before attributes
        return result[0].getAttribute(key); // otherwise, get the attribute
      }
      for (var i = 0; i < result.length; i++) {
        result[i][key] = value; // to check
      }
      return result;
    };

    result.click = function() { // only triggers, doesn't set a listener, because there's no need here
      for (var i = 0; i < result.length; i++) {
        result[i].dispatchEvent(getEvent('click'));
      }
      return result;
    };

    result.children = function() {
      return addMethods(result[0].children);
    };

    result.append = function(element) {
      if (typeof element === 'string') // should be html
        element = createNode(element);
      for (var i = 0; i < result.length; i++) {
        if (element instanceof NodeList || Array.isArray(element))
        {
          for (var j = 0; j < element.length; j++) {
            result[i].appendChild(element[i]);
          }
        }
        else
          result[i].appendChild(element);
      }
      return result;
    };

    result.val = function(value) {
      if (typeof value === 'undefined')
        return result[0].value; // affects the first one
      for (var i = 0; i < result.length; i++) {
        result[i].value = value;
      }
      return result;
    };

    result.formCollection = function(options, param) { // only use in tests without jQuery
      return formCollection(result, options, param);
    };

    return result;
  }

  var result = null;
  if (typeof param === 'string')
    result = document.querySelectorAll(param);
  else if (param instanceof Node)
    result = [param]; // should always be a set
  else if (param instanceof NodeList || Array.isArray(param))
    result = param;
  result = addMethods(result);

  return result;
}