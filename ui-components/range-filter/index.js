(function ( root, factory ) {
    if(eval('typeof module') === 'object' && module.exports) {
        module.exports = function(utils, ui) {
            return factory({}, undefined, utils, ui);
        };
    } else {
        factory( root.app.uiComponents, root, root.app.components.utils, root.app.components.ui );
    }
})( typeof global !== "undefined" ? global : this.window || this.global, function ( uiComponents, global, utils, ui) {
    'use strict';
    function getValue(nodes) {

        return {
            min: nodes.minInput.value,
            max: nodes.maxInput.value
        };
    }

    function onFilterButtonClicked(nodes, filterListener) {

        filterListener(getValue(nodes));
    }

    function getDomListeners(nodes, listeners) {

        return [
            {
                node     : nodes.filterButton,
                listeners: {
                    click: onFilterButtonClicked.bind(
                        undefined,
                        nodes,
                        listeners.filter
                    )
                }
            }
        ];
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

    function RangeFilter(nodes, listeners) {

        ensureNodes(nodes);
        ensureListeners(listeners);

        this._domListeners = getDomListeners(nodes, listeners);
        this._nodes        = nodes;

        ui.registerDomListeners(this._domListeners);
    }

    RangeFilter.prototype.destroy = function() {
        ui.unregisterDomListeners(this._domListeners);
    };

    RangeFilter.prototype.clear = function() {
        this._nodes.forEach(ui.clearInput);
    };

    RangeFilter.prototype.getValue = function() {
        return getValue(this._nodes);
    };

    uiComponents.RangeFilter = RangeFilter;

    return RangeFilter;
});