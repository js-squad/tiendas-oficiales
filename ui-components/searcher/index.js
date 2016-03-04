(function ( root, factory ) {
  if (eval('typeof module') === 'object' && module.exports ) {
        module.exports = function(utils, ui) {
            return factory({}, undefined, utils, ui);
        };
    } else {
        root.app.uiComponents = {};
        factory( root.app.uiComponents, root, root.app.components.utils, root.app.components.ui );
    }
})(typeof global !== "undefined" ? global : this.window || this.global, function ( uiComponents, global, utils, ui) {
    'use strict';
    function onSearchButtonClicked(searchInput, searchListener) {
        searchListener(searchInput.value);
    }

    function onSearchKeyPressed(searchInput, searchListener, event) {
        if(event.keyCode === 13) {
            searchListener(searchInput.value);
        }
    }

    function getDomListeners(nodes, listeners) {

        return [
            {
                node     : nodes.searchButton,
                listeners: {
                    click: onSearchButtonClicked.bind(
                        undefined,
                        nodes.searchInput,
                        listeners.search
                    )
                }
            }, {
                node : nodes.searchInput,
                listeners: {
                    keypress: onSearchKeyPressed.bind(
                        undefined,
                        nodes.searchInput,
                        listeners.search
                        )
                }
            }
        ];
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

    function Searcher(nodes, listeners) {

        ensureNodes(nodes);
        ensureListeners(listeners);

        this._domListeners = getDomListeners(nodes, listeners);
        ui.registerDomListeners(this._domListeners);
    }

    Searcher.prototype.destroy = function() {

        ui.unregisterDomListeners(this._domListeners);
    };

    uiComponents.Searcher = Searcher;

    return Searcher;
});