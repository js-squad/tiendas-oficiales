(function ( root, factory ) {
  if ( typeof module === "object" && module.exports ) {
        // Node, or CommonJS-Like environments
        // Intentionally returning a factory method
        module.exports = function(app) {
            return factory(app);
        };
    } else {
        // Browser globals
        factory( root.app = {}, root );
    }
})( typeof global !== "undefined" ? global : this.window || this.global, function ( exports, global) {
    exports.init = function() {
      function insertResults(results){
          exports.components.ui.insertIntoNode(listItemContainer,
            results.map(exports.components.utils.apiResultToHTML).join(''));
      }
      var searchInput = document.querySelector('#searchInput');
      var searchButton = document.querySelector('#searchBtn');
      var listItemContainer = document.querySelector('#listItemContainer');
      var cursor = new app.components.Cursor;

      var rangeFilterNodes = {
          minInput: document.querySelector('#priceFilterMin'),
          maxInput: document.querySelector('#priceFilterMax'),
          filterButton: document.querySelector('#priceFilterBtn')
      };

      var rangeFilterListeners = {
          filter: function(ranges) {
              exports.components.ui.clearNodeInnerHTML(listItemContainer);
              exports.components.api.search({
                data: searcher.getValue(),
                price: ranges.min + '-' + ranges.max
              }).then(function(result) {
                insertResults(result.results);
              });
          }
      };

      var rangeFilter = new exports.uiComponents.RangeFilter(rangeFilterNodes, rangeFilterListeners);

      var searcherNodes = {
        searchButton: searchButton,
        searchInput: searchInput
      };

      var searcherListeners = {
        search: function(value) {
          exports.components.ui.clearNodeInnerHTML(listItemContainer);
          exports.components.api.search({
            data: value,
          }).then(function(result) {
            insertResults(result.results);
          });
        }
      };
      var searcher = new exports.uiComponents.Searcher(searcherNodes, searcherListeners);
    };

    document.addEventListener('DOMContentLoaded', exports.init.bind(exports));
});