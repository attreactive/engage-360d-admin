/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");
var PageBlockMixin = require('./PageBlockMixin');
var Select = require('../form/Select');

var SubscriptionBlock = React.createClass({
  mixins: [PageBlockMixin],

  render: function() {
    var typeLink = {
      value: this.state.view,
      requestChange: function(view) {
        this.state.view = view;
        this.props.update(this.state);
      }.bind(this)
    };

    var typeOptions = this.props.meta.knownTypes;

    return (
      <div className="panel">
        <div className="panel-heading">
          <div className="panel-btns">
            <a href="#" className="panel-close" onClick={this.props.remove}>×</a>
          </div>
          <h3 className="panel-title">Блок "Подписка на рассылку"</h3>
        </div>
        <div className="panel-body">
          <div className="form-inline">
            <div className="form-group">
              <label className="control-label">Тип:</label>
              &nbsp;&nbsp;&nbsp;
              <Select valueLink={typeLink} options={typeOptions} type='value' style={{width: 300}} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SubscriptionBlock;
