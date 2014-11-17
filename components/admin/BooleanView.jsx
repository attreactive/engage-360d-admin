/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");

var BooleanView = React.createClass({
  render: function () {
    return (
      <i className={this.props.value ? "fa fa-check" : "glyphicon glyphicon-unchecked"}></i>
    );
  }
});

module.exports = BooleanView;
