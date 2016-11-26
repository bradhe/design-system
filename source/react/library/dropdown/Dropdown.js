import React from 'react';
import DropdownMenu from './DropdownMenu';

const propTypes = {
  onChange: React.PropTypes.func,
  options: React.PropTypes.array,
  hint: React.PropTypes.string,
  label: React.PropTypes.string,
  multiple: React.PropTypes.bool,
  required: React.PropTypes.bool,
  selected: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.array,
  ]),
};

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    const selected = Array.isArray(props.selected) ? props.selected : [props.selected];

    this.state = { selected };

    this.onChange = this.onChange.bind(this);
  }

  onChange(selected) {
    this.setState({ selected }, () => {
      if (this.props.onChange) {
        this.props.onChange(selected);
      }
    });
  }

  getOptions() {
    return this.props.options.map((o) => {
      let obj;

      if (typeof o === 'string') {
        obj = { id: o, value: o };
      } else {
        obj = o;
      }

      return obj;
    });
  }

  renderDropdownMenu(button) {
    const options = this.getOptions();

    return (
      <DropdownMenu
        width="260px"
        margin={ -60 }
        hint={ this.props.hint }
        multiple={ this.props.multiple }
        target={ button }
        onChange={ this.onChange }
        options={ options }
        selected={ this.state.selected }
        required={ this.props.required }
      />
    );
  }

  renderLabel() {
    const options = this.getOptions();
    const selected = options.filter(e => this.state.selected.indexOf(e.id) >= 0);
    const values = selected.map(s => s.value);
    let label;

    if (this.props.label) {
      label = this.props.label;
    } else {
      if (values.length > 1) {
        const lastIndex = values.length - 1;
        values[lastIndex] = `and ${values[lastIndex]}`;
      }

      if (values.length === 2) {
        label = values.join(' ');
      } else {
        label = values.join(', ');
      }

      if (!label) {
        label = 'Select One';
      }
    }

    return <span className="rc-dropdown-label">{ label }</span>;
  }

  render() {
    const label = this.renderLabel();
    const button = <a href="/dropdown">{ label }</a>;
    const dropdownMenu = this.renderDropdownMenu(button);

    return (
      <span className="rc-dropdown">
        { dropdownMenu }
      </span>
    );
  }
}

Dropdown.propTypes = propTypes;

export default Dropdown;
