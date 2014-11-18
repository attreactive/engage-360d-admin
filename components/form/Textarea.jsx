/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");

var Textarea = React.createClass({
  render: function() {
    return this.transferPropsTo(
      <textarea type="text"
             className="form-control"
             onBlur={this.props.setErrorMessageInputBlured} />
    );
  }
});

module.exports = Textarea;
