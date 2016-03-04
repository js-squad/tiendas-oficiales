(function ( root, factory ) {
  if (eval('typeof module') === 'object' && module.exports ) {
        module.exports = function(utils) {
            return factory({}, undefined, utils);
        };
    } else {
        factory( root.app.components.api = {}, root, root.app.components.utils );
    }
})(typeof global !== "undefined" ? global : this.window || this.global, function ( exports, global, utils) {
    'use strict';
    var ML_SEARCH_URL = 'https://api.mercadolibre.com/sites/MLA/search';

    exports.search = function(options) {
        var qs = {
          limit: options.limit,
          q: options.data,
          offset: options.offset,
          official_store_id: 'all',
          price: options.price
        };

        var url = new URL(ML_SEARCH_URL);
        url.search = utils.getQueryStr(qs);
        console.log(url.toString());
        return new Promise(function(resolve, reject){
          fetch(url.toString()).then(function(response) {
            if(response.status !== 200) {
              return reject(Error('There was an error. Response:' + response.status));
            }

            return response.json();
          }).then(function(responseJSON){
            var result = {
              results: responseJSON.results
            };

            if(responseJSON.paging.offset + responseJSON.paging.limit < responseJSON.paging.total) {
              result.next = {
                offset: responseJSON.paging.offset + responseJSON.paging.limit,
                limit: responseJSON.paging.limit,
                data: options.data
              };
            }

            resolve(result);
          }).catch(function(err) {
            console.log('There was an error.', err);
            reject(err);
          });
        });
    };
    return exports;
});