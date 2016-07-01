/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-07-01
 * @author Liang <liang@maichong.it>
 */

import React from 'react';
import numeral from 'numeral';
import _round from 'lodash/round';
import { shallowEqual } from 'alaska-admin-view';

export default class BytesFieldView extends React.Component {

  static propTypes = {
    value: React.PropTypes.any,
    model: React.PropTypes.object,
    data: React.PropTypes.object,
    field: React.PropTypes.object,
    disabled: React.PropTypes.bool,
    errorText: React.PropTypes.string,
    onChange: React.PropTypes.func,
  };


  constructor(props) {
    super(props);
    this.state = {
      display: numeral(props.value).format('0,0')
    };
  }

  componentWillReceiveProps(nextProps) {
    let newState = {};
    if (nextProps.value) {
      newState.value = numeral(nextProps.value).format('0,0');
      if (this.focused) {
        //正在输入
        newState.display = nextProps.value;
      } else {
        //不在输入状态
        newState.display = newState.value;
      }
    }
    this.setState(newState);
  }

  shouldComponentUpdate(props, state) {
    return !shallowEqual(props, this.props, 'data', 'onChange', 'model') || !shallowEqual(state, this.state);
  }

  handleChange = (event) => {
    let display = event.target.value;
    this.setState({ display });
  };

  handleFocus = () => {
    this.focused = true;
  };

  handleBlur = () => {
    this.focused = false;
    let value = this.state.display;
    let unfomarted = numeral().unformat(value);
    if (isNaN(unfomarted)) {
      unfomarted = 0;
    }
    this.setState({ display: numeral(unfomarted).format('0,0') });
    if (unfomarted !== this.props.value) {
      this.props.onChange && this.props.onChange(unfomarted);
    }
  };

  render() {
    const {
      field,
      disabled,
      value,
      errorText,
      model
      } = this.props;
    let { help, unit, size, precision } = field;
    let className = 'form-group';
    if (errorText) {
      className += ' has-error';
      help = errorText;
    }
    let display = numeral().unformat(this.state.display) || 0;
    let units = ['', 'K', 'M', 'G', 'T', 'P', 'E'];
    while (display > size && units.length > 1) {
      display /= size;
      units.shift();
    }
    display = _round(display, precision) + units[0] + unit;
    let helpElement = help ? <p className="help-block">{help}</p> : null;
    let inputElement;
    if (field.static) {
      inputElement = <p className="form-control-static">{display}</p>;
    } else {
      inputElement = (<div className="input-group"><input
        type="text"
        className="form-control"
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        value={this.state.display}
        disabled={disabled}
      />
        <span className="input-group-addon">{display}</span>
      </div>);
    }

    let label = field.nolabel ? '' : field.label;

    if (field.horizontal === false) {
      let labelElement = label ? (
        <label className="control-label">{label}</label>
      ) : null;
      return (
        <div className={className}>
          {labelElement}
          {inputElement}
          {helpElement}
        </div>
      );
    }

    return (
      <div className={className}>
        <label className="col-sm-2 control-label">{label}</label>
        <div className="col-sm-10">
          {inputElement}
          {helpElement}
        </div>
      </div>
    );
  }
}
