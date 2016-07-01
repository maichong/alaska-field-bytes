/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-07-01
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import _round from 'lodash/round';

export default class BytesFieldCell extends React.Component {

  shouldComponentUpdate(props) {
    return props.value != this.props.value;
  }

  render() {
    const { value, field } = this.props;
    let display = value || '';
    if (display) {
      let { unit, size, precision } = field;
      let units = ['', 'K', 'M', 'G', 'T', 'P', 'E'];
      while (display > size && units.length > 1) {
        display /= size;
        units.shift();
      }
      display = _round(display, precision) + units[0] + unit;
    }
    return (
      <div>{display}</div>
    );
  }
}
