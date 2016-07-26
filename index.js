/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-07-01
 * @author Liang <liang@maichong.it>
 */

'use strict';

const NumberField = require('alaska-field-number');

class BytesField extends NumberField {
  init() {
    let field = this;
    if (!field.filter && field.filter !== false) {
      field.filter = 'NumberFieldFilter';
    }
    if (!field.unit && field.unit !== '') {
      field.unit = 'B';
    }
    if (!field.precision && field.precision !== 0) {
      field.precision = 2;
    }
    if (!field.size) {
      field.size = 1024;
    }
  }
}

BytesField.views = {
  cell: {
    name: 'BytesFieldCell',
    path: __dirname + '/lib/cell.js'
  },
  view: {
    name: 'BytesFieldView',
    path: __dirname + '/lib/view.js'
  }
};

BytesField.plain = Number;
BytesField.options = ['min', 'max'];
BytesField.viewOptions = ['min', 'max', 'unit', 'size', 'precision'];

module.exports = BytesField;
