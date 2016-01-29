(function ( root, factory ) {
  if ( typeof module === "object" && module.exports ) {
        // Node, or CommonJS-Like environments
        // Intentionally returning a factory method
        module.exports = function(app) {
            return factory(app);
        };
    } else {
        // Browser globals
        factory( root.app.components.ui = {}, root, root.app.components.utils );
    }
})( typeof global !== "undefined" ? global : this.window || this.global, function ( exports, global, utils) {
    function getNodeTypeName(nodeType) {

        var nodeTypeNames = {};

        nodeTypeNames[Node.ELEMENT_NODE]           = "Element";
        nodeTypeNames[Node.TEXT_NODE]              = "Text";
        nodeTypeNames[Node.COMMENT_NODE]           = "Comment";
        nodeTypeNames[Node.DOCUMENT_NODE]          = "Document";
        nodeTypeNames[Node.DOCUMENT_TYPE_NODE]     = "DocumentType";
        nodeTypeNames[Node.DOCUMENT_FRAGMENT_NODE] = "DocumentFragment";

        return nodeTypeNames[nodeType];
    }

    function ensureNodeIsElement(node) {

        var nodeTypeName = getNodeTypeName(node.nodeType);

        if (nodeTypeName !== "Element") {
            throw new Error(
                "Expected node to be an element, " +
                "but instead is: " + nodeTypeName
            );
        }
    }

    function ensureElementTag(tagName, element) {

        if (element.tagName !== tagName) {
            throw new Error(
                "Expected element tag to be " + tagName +
                " , but instead is: " + element.tagName
            );
        }
    }

    function ensureNodesAreElementsWithTags(tagNames, nodes) {

        utils.ensureIsObject("nodes", nodes);

        Object.keys(tagNames).forEach(function(curNodeName) {

            utils.ensureObjectHasProperty(curNodeName, "nodes", nodes);

            var curNode = nodes[curNodeName];

            ensureNodeIsElement(nodes[curNodeName]);

            ensureElementTag(tagNames[curNodeName], curNode);
        });
    }

    function withDomListeners(operation, domListeners) {
        domListeners.forEach(function(curItem) {

            var curNode      = curItem.node;
            var curListeners = curItem.listeners;

            // add or remove, depending on 'operation', from curNode 
            // every listener in curListeners
        });
    }

    // it should clear the input element
    function clearInput(input) {
    }

    // it should receive a node an insert the received HTML 
    // as the inner HTML of the node
    function insertIntoNode(node, html) {
    }

    // it should clear the node inner HTML
    function clearNodeInnerHTML(node){
    }

    exports.getNodeTypeName = getNodeTypeName;
    exports.ensureNodeIsElement = ensureNodeIsElement;
    exports.ensureElementTag = ensureElementTag;
    exports.ensureNodesAreElementsWithTags = ensureNodesAreElementsWithTags;
    exports.registerDomListeners = withDomListeners.bind(undefined, 'add');
    exports.unregisterDomListeners = withDomListeners.bind(undefined, 'remove');
    exports.clearInput = clearInput;
    exports.insertIntoNode = insertIntoNode;
    exports.clearNodeInnerHTML = clearNodeInnerHTML;
});