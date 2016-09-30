import React from 'react';
import classnames from 'classnames';

const propTypes = {
  size: React.PropTypes.string,
  title: React.PropTypes.string,
  subtitle: React.PropTypes.string,
  children: React.PropTypes.object,
  height: React.PropTypes.string,
  selected: React.PropTypes.bool,
  className: React.PropTypes.string,
  onRemove: React.PropTypes.func,
  onClick: React.PropTypes.func,
};

class Card extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  onClick(e) {
    e.preventDefault();

    this.props.onClick(e);
  }

  onRemove(e) {
    e.preventDefault();

    if (this.props.onRemove) {
      this.props.onRemove(e);
    }
  }

  renderRemoveButton() {
    let jsx;

    if (this.props.onRemove) {
      jsx = (
        <div className="remove-corner">
          <a href="" className="rui-card-remove fa fa-close" onClick={ this.onRemove }>Remove</a>
        </div>
      );
    }

    return jsx;
  }

  renderContent() {
    const removeButton = this.renderRemoveButton();
    const { title, subtitle, children } = this.props;

    return (
      <div className="rui-card-content">
        { removeButton }
        { children }
        <div className="rui-card-title">{ title }</div>
        <span className="rui-card-subtitle">{ subtitle }</span>
      </div>
    );
  }

  render() {
    const { size, onRemove, height, selected } = this.props;
    const className = classnames('rui-card', {
      'rui-card-large': size === 'large',
      'rui-card-small': size === 'small',
      'rui-card-xs': size === 'xs',
      'rui-card-selected': selected,
      'rui-card-removable': onRemove,
    }, this.props.className);
    const content = this.renderContent();
    const styles = {};
    let jsx;

    if (height) {
      styles.height = height;
    }


    if (this.props.onClick) {
      jsx = (
        <a
          onClick={ this.onClick }
          href=""
          className={ className }
          style={ styles }
        >
          { content }
        </a>
      );
    } else {
      jsx = <div className={ className } style={ styles }>{ content }</div>;
    }

    return jsx;
  }
}

Card.propTypes = propTypes;

export default Card;
