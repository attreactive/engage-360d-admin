/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");

var Input = React.createClass({
  render: function() {
    return this.transferPropsTo(
      <input type="text"
             className="form-control"
             placeholder={this.props.property.getTitle()}
             onBlur={this.props.setErrorMessageInputBlured} />
    );
  }
});

module.exports = Input;
