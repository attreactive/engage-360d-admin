/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");
var PageBlockMixin = require('./PageBlockMixin');

var UnsubscribingBlock = React.createClass({
  mixins: [PageBlockMixin],

  render: function() {
    return (
      <div className="panel">
        <div className="panel-heading">
          <div className="panel-btns">
            <a href="#" className="panel-close" onClick={this.props.remove}>×</a>
          </div>
          <h3 className="panel-title">Блок "Отписка от рассылки"</h3>
        </div>
      </div>
    );
  }
});

module.exports = UnsubscribingBlock;
