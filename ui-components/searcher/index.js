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

    function onSearchButtonClicked(searchInput, searchListener) {
        searchListener(searchInput.value);
    }

    function onSearchKeyPressed(searchInput, searchListener, event) {
        if(event.keyCode === 13) {
            searchListener(searchInput.value);
        }
    }


    // it should return an array like the following
    // [
    //     {
    //         node: node1,
    //         listeners: {
    //             eventName1: listenerWithPartialApplication1
    //         }
    //     },
    //     {
    //         node: node2,
    //         listeners: {
    //             eventName2: listenerWithPartialApplication2
    //         }
    //     }
    // ]
    // the first node should be the one corresponding to the search button
    // the first event name should be the 'click' event and its
    // listener should be 'onSearchButtonClicked' with partial application
    // of the search input node and the 'listeners.search' parameters, in that order

    // the second node should be the one corresponding to the search input
    // the second event name should be the 'keypress' event and its
    // listener should be 'onSearchKeyPressed' with partial application
    // of the 'listeners.keypress' parameter
    function getDomListeners(nodes, listeners) {
    }

    function ensureListeners(listeners) {

        var eventNames = [ "search" ];

        utils.ensureIsObjectAndHasMethods(
            eventNames,
            "listeners",
            listeners
        );
    }

    function ensureNodes(nodes) {

        var requiredNodes = {
            searchButton: "BUTTON",
            searchInput : "INPUT"
        };

        ui.ensureNodesAreElementsWithTags(
            requiredNodes,
            nodes
        );
    }


    // it should save the 'listeners' parameters as internal
    // state of the instance
    // it should also register those listeners into the DOM
    // hint: the ui module has a util method for registering listeners
    // hint2: use the result of the internal method 'getDomListeners'
    // to invoke the ui method
    function Searcher(nodes, listeners) {

        ensureNodes(nodes);
        ensureListeners(listeners);

        //// add code here ////
    }

    // it should remove the listeners added on the constructor
    // hint: the ui module has a util method for removing listeners
    Searcher.prototype.destroy = function() {
    };

    // it should return the value of the component
    // hint: which node has value?
    Searcher.prototype.getValue = function() {
    };

    uiComponents.Searcher = Searcher;
});