import React from 'react';
import classnames from 'classnames';
import MenuItem from './MenuItem';

const propTypes = {
  options: React.PropTypes.array,
  selected: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.array,
    React.PropTypes.number,
  ]),
  multiple: React.PropTypes.bool,
  onChange: React.PropTypes.func,
};

const defaultProps = {
  selected: '',
};

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(selected) {
    this.props.onChange(selected);
  }

  render() {
    const { selected, options, multiple } = this.props;
    const className = classnames('rc-menu', {
      'rc-menu-multiple': multiple,
    });
    const jsx = [];

    options.forEach((option) => {
      jsx.push(
        <MenuItem
          key={ option.id }
          option={ option }
          selected={ selected.indexOf(option.id) >= 0 }
          onClick={ this.onChange }
          multiple={ multiple }
        />
      );
    });

    return <ul className={ className }>{ jsx }</ul>;
  }
}

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
