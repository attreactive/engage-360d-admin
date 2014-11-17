/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");
var CheckboxMixin = require("attreactive-mixins/lib/fields/CheckboxMixin");

var Checkbox = React.createClass({
  mixins: [CheckboxMixin],
  render: function() {
    var metadata = this.props.property.getMetadata();

    return (
      <div className="checkbox block">
        <label>
          <input type="checkbox" checked={this.isChecked()}
              onClick={this._handleChange} />
          { metadata.checkboxLabel || '' }
        </label>
      </div>
    );
  }
});

module.exports = Checkbox;
