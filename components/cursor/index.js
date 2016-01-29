(function ( root, factory ) {
  if ( typeof module === "object" && module.exports ) {
        // Node, or CommonJS-Like environments
        // Intentionally returning a factory method
        module.exports = function(app) {
            return factory(app);
        };
    } else {
        // Browser globals
        factory( root.app.components, root );
    }
})( typeof global !== "undefined" ? global : this.window || this.global, function ( components, global) {
    function getLastIndex(array) {

        return array.length - 1;
    }

    function Cursor() {

        this._items = [];
    }

    Cursor.prototype.addItem = function (item) {

        this._items.push(item);
    };

    Cursor.prototype.hasItems = function () {

        return this._items.length > 0;
    };

    Cursor.prototype.isFirst = function() {

        this.ensureHasItems();

        return this._items.length === 1;
    };

    Cursor.prototype.ensureHasItems = function () {

        if (!this.hasItems()) {
            throw new Error("cursor has no items");
        }
    };

    Cursor.prototype.getItem = function() {

        this.ensureHasItems();

        return this._items[getLastIndex(this._items)];
    };

    Cursor.prototype.moveToFirst = function() {

        this.ensureHasItems();

        this._items = this._items.splice(1);

        return this.getItem();
    };

    Cursor.prototype.moveToPrev = function () {

        this.ensureHasItems();

        this._items = this._items.splice(-1);

        return this.getItem();
    };

    components.Cursor = Cursor;
    console.log(components);
});