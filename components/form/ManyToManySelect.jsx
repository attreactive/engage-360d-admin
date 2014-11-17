/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");
var Select = require('./Select');

var ManyToManySelect = React.createClass({
  render: function() {
    var dependency = this.props.dependency;

    var options = this.props.dependencyItems.map(function(item) {
      return {
        value: item[dependency.getIdProperty()],
        text: dependency.stringify(item)
      }
    });

    var link = {
      value: this.props.valueLink.value ? this.props.valueLink.value[0] : null,
      requestChange: function(value) {
        this.props.valueLink.requestChange([value]);
        this.props.setErrorMessageInputBlured();
      }.bind(this)
    };

    return (
      <Select type="value"
              style={{width: 452}}
              options={options}
              valueLink={link} />
    );
  }
});

module.exports = ManyToManySelect;
