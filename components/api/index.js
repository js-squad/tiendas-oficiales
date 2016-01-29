(function ( root, factory ) {
  if ( typeof module === "object" && module.exports ) {
        // Node, or CommonJS-Like environments
        // Intentionally returning a factory method
        module.exports = function(app) {
            return factory(app);
        };
    } else {
        // Browser globals
        factory( root.app.components.api = {}, root, root.app.components.utils );
    }
})( typeof global !== "undefined" ? global : this.window || this.global, function ( exports, global, utils) {
    var ML_SEARCH_URL = 'https://api.mercadolibre.com/sites/MLA/search';

  // it should receive a parameter 'options' with the keys 'limit', 'offset', 'price'
  // and 'data'. those keys should be used as querystring parameters to
  // send a request to ML_SEARCH_URL.
  // 'data' should map to the string being used for the search.
  // the method should return a promise
  // the result should look like the following:
  // {
  //   results: [
  //     elem1,
  //     elem2,
  //     ...
  //     elemN
  //   ],
  //   next: {
  //     data: str,
  //     limit: 100,
  //     offset: 0,
  //     price: 500-7000
  //   }
  // }
  // the values for the 'next' keys should be the same as the ones received
  // from the API except for the 'offset' key. the returned 'offset' key
  // should be equal to 'paging.offset' key
  // plus 'paging.limit' key (from the API response)
  // hint 1: use the 'URL' object to create an object representation of a url and
  // append the querystring (https://gist.github.com/a0viedo/13241ba70489d6e16805)
  // hint 2: use the fetch API to send a request (https://developers.google.com/web/updates/2015/03/introduction-to-fetch)
  // hint 3: use the utils method to get a string from a querystring object
    exports.search = function(options) {

      var qs = {
        limit: options.limit || '',
        offset: options.offset || '',
        price: options.price || '',
        data: options.data || '',
        official_store_id: 'all'
        //// add other keys here
      },
      url = new URL(ML_SEARCH_URL),
      response,
      promise;

      url.search = utils.getQueryStr(qs);

      promise = new Promise(function(resolve, reject){

        fetch(url.toString())
          .then(
            function(response) {
              if (response.status !== 200) {
                reject(Error('the response status was:' + response.status));
                return;
              }

              // Examine the text in the response
              response.json().then(function(data) {
                var result = {
                  results: data.results,
                  next: {
                    data: qs.data,
                    limit: data.paging.limit,
                    offset: data.paging.offset + data.paging.limit,
                    price: qs.price
                  }
                }

                resolve(result);
              });
            }
          )
          .catch(function(err) {
            reject(err);
          });

      });

      return promise;
    };
});