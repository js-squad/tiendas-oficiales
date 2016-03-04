(function ( root, factory ) {
  if (eval('typeof module') === 'object' && module.exports ) {
        module.exports = function() {
            return factory({});
        };
    } else {
        root.app.components = {}; // <- extend
        factory( root.app.components.utils = {}, root );
    }
})( typeof global !== "undefined" ? global : this.window || this.global, function ( exports, global) {
    'use strict';
    function isObject(thing) {

        return thing !== null && typeof thing === "object";
    }

    function ensureIsArray(name, value) {

        if (Array.isArray(value)) {
            throw new Error(
                "Expected " + name + " to be an array, " +
                "but instead is: " + typeof value
            );
        }
    }

    function ensureIsObject(name, value) {

        if (!isObject(value)) {
            throw new Error(
                "Expected " + name + " to be an object, " +
                "but instead is: " + typeof value
            );
        }
    }

    function ensureObjectHasProperty(propName, objectName, object) {

        if (!(propName in object)) {
            throw new Error(
                "Expected " + objectName +
                " to contain a property: " + propName
            );
        }
    }

    function ensureObjectHasMethod(methodName, objectName, object) {
        if (typeof object[methodName] !== "function") {
            throw new Error(
                "Expected " + objectName + " property " + methodName +
                " to be a function, but instead is: " + typeof object[methodName]
            );
        }
    }

    function ensureIsObjectAndHasMethods(methodNames, objectName, object) {

        ensureIsObject(objectName, object);

        methodNames.forEach(function(curMethodName) {
            ensureObjectHasMethod(curMethodName, objectName, object);
        });
    }

    // it receives an object and returns the string representation of the
    // object in a valid format to be used as querystring
    function getQueryStr(obj) {
        var str = [];
        Object.keys(obj).forEach(function(key) {
          if(typeof obj[key] === 'undefined') {
            return;
          }
          str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
        });
        return str.join("&");
    }

    function apiResultToHTML (apiElement) {
        var itemHTML = '<li class="list-item"><div class="item-segment item-image">\
          <div class="inner-item-segment">\
            <img class="item-img" src="{{item.thumbnail}}" alt="">\
          </div>\
        </div>\
        <div class="item-segment item-name">\
          <div class="inner-item-segment">\
            <a href="{{item.permalink}}">{{item.title}}</a>\
          </div>\
        </div>\
        <div class="item-segment item-price">\
          <div class="inner-item-segment">\
            ${{item.price}}\
          </div>\
        </div>\
        <div class="item-segment item-additional-info">\
          <div class="inner-item-segment">\
            <span>{{item.address.state_name}}</span>\
          </div>\
        </div></li>';

        return itemHTML.replace('{{item.thumbnail}}', apiElement.thumbnail)
            .replace('{{item.title}}', apiElement.title)
            .replace('{{item.price}}', apiElement.price)
            .replace('{{item.permalink}}', apiElement.permalink)
            .replace('{{item.address.state_name}}', apiElement.seller_address.state.name);
    }

    exports.isObject = isObject;
    exports.ensureIsArray = ensureIsArray;
    exports.ensureIsObject = ensureIsObject;
    exports.ensureObjectHasMethod = ensureObjectHasMethod;
    exports.ensureObjectHasProperty = ensureObjectHasProperty;
    exports.ensureIsObjectAndHasMethods = ensureIsObjectAndHasMethods;
    exports.getQueryStr = getQueryStr;
    exports.apiResultToHTML = apiResultToHTML;

    return exports;
});