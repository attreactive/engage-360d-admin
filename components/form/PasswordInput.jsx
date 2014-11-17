/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");

var PasswordInput = React.createClass({
  render: function() {
    return this.transferPropsTo(
      <input type="password"
             className="form-control"
             placeholder={this.props.property.getTitle()}
             onBlur={this.props.setErrorMessageInputBlured} />
    );
  }
});

module.exports = PasswordInput;
