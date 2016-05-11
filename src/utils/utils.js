const ML_SEARCH_URL = 'https://api.mercadolibre.com/sites/MLA/search';
const ML_ITEM_URL = 'https://api.mercadolibre.com/items/';
const ML_ITEM_DESCRIPTION_URL = 'https://api.mercadolibre.com/items/:id/description';

export default {
  getQueryStr(obj) {
      const str = [];
      Object.keys(obj).forEach((key) => {
        if(typeof obj[key] === 'undefined') {
          return;
        }
        str.push(`${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`);
      });
      return str.join('&');
  },
  search(options) {
    const qs = {
      limit: options.limit,
      q: options.data,
      offset: options.offset,
      official_store_id: 'all',
      price: options.price
    };

    const url = new URL(ML_SEARCH_URL);
    url.search = this.getQueryStr(qs);
    return fetch(url.toString()).then((response) => {
      if(response.status !== 200) {
        return Promise.reject(Error(`There was an error. Response:${response.status}`));
      }

      return response.json();
    }).then((responseJSON) => {
      const result = {
        results: responseJSON.results
      };

      if(responseJSON.paging.offset + responseJSON.paging.limit < responseJSON.paging.total) {
        result.next = {
          offset: responseJSON.paging.offset + responseJSON.paging.limit,
          limit: responseJSON.paging.limit,
          data: options.data
        };
      }
      return result;
    })
  },
  getItem(id) {
    return fetch(`${ML_ITEM_URL}${id}`).then((response)=> {
      if(response.status !== 200) {
        return Promise.reject(Error(`There was an error. Response:${response.status}`));
      }

      return response.json();
    });
  },
  getDescription(id) {
    return fetch(ML_ITEM_DESCRIPTION_URL.replace(':id', id)).then((response)=> {
      if(response.status !== 200) {
        return Promise.reject(Error(`There was an error. Response:${response.status}`));
      }

      return response.json();
    });
  }
}