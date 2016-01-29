(function ( root, factory ) {
  if ( typeof module === "object" && module.exports ) {
        // Node, or CommonJS-Like environments
        // Intentionally returning a factory method
        module.exports = function(app) {
            return factory(app);
        };
    } else {
        // Browser globals
        root.app.components = {}; // <- extend
        factory( root.app.components.utils = {}, root );
    }
})( typeof global !== "undefined" ? global : this.window || this.global, function ( exports, global) {

    // it should return true if the received parameter is an object
    // and is distinct to null or return false otherwise
    function isObject(thing) {
        return (typeof thing === "object") && (thing !== null);
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
    // if the value of a key in the received object is 'undefined',
    // should be avoided in the resulting string
    // example: getQueryStr({ a: 1, b:'hola'}); // -> 'a=1&b=hola'
    function getQueryStr(obj) {
        var aux = [];

        for (key in obj) {
            if (obj[key] !== undefined) {
                aux.push(key + '=' + obj[key]);
            }
        }
        return aux.join('&');
    }


    // it should return the HTML element filled up with the
    // correct values. each mapping is marked as
    // '{{item.propertyName}}' and should be replaced
    function apiResultToHTML (apiElement) {
        var itemHTML = '<li class="list-item"><div class="item-segment item-image">\
          <div class="inner-item-segment">\
            <img class="item-img" src="{{item.thumbnail}}" alt="">\
          </div>\
        </div>\
        <div class="item-segment item-name">\
          <div class="inner-item-segment">\
            <a href="">{{item.title}}</a>\
          </div>\
        </div>\
        <div class="item-segment item-price">\
          <div class="inner-item-segment">\
            ${{item.price}}\
          </div>\
        </div>\
        <div class="item-segment item-additional-info">\
          <div class="inner-item-segment">\
            <span>{{item.condition}}</span>\
            <span>{{item.seller_address.state.name}}</span>\
          </div>\
        </div></li>';

        //// add code here ////

        for (item in apiElement) {
            itemHTML = itemHTML.replace('{{item.' + item + '}}', apiElement[item] || '');
        }
        return itemHTML;
    }

    exports.isObject = isObject;
    exports.ensureIsArray = ensureIsArray;
    exports.ensureIsObject = ensureIsObject;
    exports.ensureObjectHasMethod = ensureObjectHasMethod;
    exports.ensureObjectHasProperty = ensureObjectHasProperty;
    exports.ensureIsObjectAndHasMethods = ensureIsObjectAndHasMethods;
    exports.getQueryStr = getQueryStr;
    exports.apiResultToHTML = apiResultToHTML;
});
