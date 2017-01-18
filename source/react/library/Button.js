import React from 'react';
import classnames from 'classnames';
import Icon from './Icon';

const propTypes = {
  className: React.PropTypes.string,
  size: React.PropTypes.string,
  secondary: React.PropTypes.bool,
  transparent: React.PropTypes.bool,
  icon: React.PropTypes.string,
  floating: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  processing: React.PropTypes.bool,
  block: React.PropTypes.bool,
  onClick: React.PropTypes.func,
  label: React.PropTypes.string,
  type: React.PropTypes.string,
  href: React.PropTypes.string,
  dropdownMenu: React.PropTypes.object,
  children: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.element,
  ]),
};

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(e) {
    if (this.props.disabled) {
      e.preventDefault();
    } else if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  renderDropdown() {
    return this.props.dropdownMenu;
  }

  render() {
    const {
      children,
      label,
      type,
      secondary,
      transparent,
      disabled,
      processing,
      block,
      size,
      href,
      className,
      floating,
      dropdownMenu,
    } = this.props;

    let button;
    let content;
    let icon;
    let menu;

    const cssClass = classnames(className, 'rc-button', {
      'rc-button-block': block,
      'rc-button-processing': processing,
      'rc-floating-action-button': floating,
      'rc-button-secondary': secondary,
      'rc-button-transparent': transparent,
      'rc-button-split': dropdownMenu,
      [`rc-button-${size}`]: size,
    });

    const btnProps = {
      type,
      href,
      disabled,
      onClick: this.onClick,
      className: cssClass,
    };

    if (dropdownMenu) {
      menu = this.renderDropdown();
    }

    const loader = processing ? <Icon height="100%" width="100%" type="loader" /> : null;

    if (children || label) {
      content = <span className="rc-button-content">{ children || label }</span>;
    }

    if (this.props.icon) {
      const iconSize = this.props.size === 'small' ? '15px' : '20px';

      icon = <Icon height={ iconSize } width={ iconSize } type={ this.props.icon } />;
    }

    if (type) {
      button = <button { ...btnProps }>{ icon } { content }{ loader }{ menu }</button>;
    } else {
      button = <a { ...btnProps }>{ icon } { content }{ loader }{ menu }</a>;
    }

    return button;
  }
}

Button.propTypes = propTypes;

export default Button;
