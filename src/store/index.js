import Firebase from 'firebase'
import { EventEmitter } from 'events'
import { Promise } from 'es6-promise'
import utils from '../utils/utils.js'

const itemsCache = Object.create(null)
const store = new EventEmitter()
const storiesPerPage = store.storiesPerPage = 30

let topStoryIds = []

export default store

/**
 * Fetch an item data with given id.
 *
 * @param {Number} id
 * @return {Promise}
 */

store.fetchItem = id => {
  return utils.getItem(id);
}

/**
 * Fetch the given list of items.
 *
 * @param {Array<Number>} ids
 * @return {Promise}
 */

store.fetchItems = opts => {
  return utils.search(opts);
}

/**
 * Fetch items for the given page.
 *
 * @param {Number} page
 * @return {Promise}
 */

store.fetchItemsByPage = page => {
  const start = (page - 1) * storiesPerPage
  const end = page * storiesPerPage
  const ids = topStoryIds.slice(start, end)
  return store.fetchItems(ids)
}

store.fetchDescription = id => {
  return utils.getDescription(id);
}
