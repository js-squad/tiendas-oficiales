import tap, { test } from 'tap';
import searcher from '../../../ui-components/searcher/index.js';

const ui = {
  ensureNodesAreElementsWithTags() {},
  registerDomListeners(arr) {
  },
  unregisterDomListeners(arr) {},
};

const utils = {
  ensureIsObjectAndHasMethods() {}
};

const Searcher = searcher(utils, ui);

test('should add the tests here', (t) => {

});