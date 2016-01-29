(function ( root, factory ) {
  if ( typeof module === "object" && module.exports ) {
        // Node, or CommonJS-Like environments
        // Intentionally returning a factory method
        module.exports = function(app) {
            return factory(app);
        };
    } else {
        // Browser globals
        factory( root.app.uiComponents, root, root.app.components.utils, root.app.components.ui );
    }
})( typeof global !== "undefined" ? global : this.window || this.global, function ( uiComponents, global, utils, ui) {

    // it should return an object like
    // {
    //     min:value1,
    //     max:value2
    // }
    // with the corresponding values for the nodes
    function getValue(nodes) {
    }

    function onFilterButtonClicked(nodes, filterListener) {

        filterListener(getValue(nodes));
    }

    // it should return an object like
    // [{
    //     node: referenceToTheNode,
    //     listeners: {
    //         nameOfTheEvent: listener
    //     }
    // }]
    // the only listener should be the 'click' event
    // and it should have a partial application
    // with the 'nodes' and 'listeners.filter', in that order, as parameters
    function getDomListeners(nodes, listeners) {
    }

    function ensureListeners(listeners) {

        var eventNames = [ "filter" ];

        utils.ensureIsObjectAndHasMethods(
            eventNames,
            "listeners",
            listeners
        );
    }

    function ensureNodes(nodes) {

        var requiredNodes = {
            filterButton: "BUTTON",
            minInput    : "INPUT",
            maxInput    : "INPUT"
        };

        ui.ensureNodesAreElementsWithTags(
            requiredNodes,
            nodes
        );
    }


    // it should save the parameters 'nodes' and 'listeners'
    // as internal properties of the instance for later use
    // it should also register the corresponding listeners to the DOM
    // hint: the ui module has a util method to do that
    // hint2: use the internal 'getDomListeners' method to use the previous hint
    function RangeFilter(nodes, listeners) {
        ensureNodes(nodes);
        ensureListeners(listeners);

        //// add code here ////
    }

    // it should unregister every listeners RangeFilter added
    // hint: the module ui has a util method useful for that
    RangeFilter.prototype.destroy = function() {
    };


    // it should clear all the inputs of RangeFilter
    RangeFilter.prototype.clear = function() {
    };

    // it should return the invocation of 'getValue' with the internal
    // nodes
    RangeFilter.prototype.getValue = function() {
    };

    uiComponents.RangeFilter = RangeFilter;
});