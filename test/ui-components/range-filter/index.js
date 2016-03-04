import tap, { test } from 'tap';
import rangeFilter from '../../../ui-components/range-filter/index.js';

const ui = {
  listenersRegistered: 0,
  ensureNodesAreElementsWithTags() {},
  registerDomListeners(arr) {},
  unregisterDomListeners(arr) {},
  clearInput(){}
};

const utils = {
  ensureIsObjectAndHasMethods(){}
};

const RangeFilter = rangeFilter(utils, ui);

test('should add the tests here', (t) => {

});