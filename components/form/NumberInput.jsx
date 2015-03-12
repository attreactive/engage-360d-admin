/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");

var NumberInput = React.createClass({
  render: function() {
    var valueLink = {
      value: this.props.valueLink.value,
      requestChange: function(number) {
        number = Number(number.replace(/[^0-9]+/g, ''));
        this.props.valueLink.requestChange(number);
      }.bind(this)
    };

    return this.transferPropsTo(
      <input type="text"
             className="form-control"
             valueLink={valueLink}
             placeholder={this.props.property.getTitle()}
             onBlur={this.props.setErrorMessageInputBlured} />
    );
  }
});

module.exports = NumberInput;
