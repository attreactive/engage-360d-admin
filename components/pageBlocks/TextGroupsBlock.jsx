/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");
var PageBlockMixin = require('./PageBlockMixin');
var CKEditor = require('../fields/CKEditor');
var Select = require('../form/Select');

var TextGroupsBlock = React.createClass({
  mixins: [PageBlockMixin],

  addGroup: function() {
    this.state.text_blocks.push({
      title: '',
      text: ''
    })
    this.props.update(this.state);
  },

  render: function() {
    var typeLink = {
      value: this.state.type,
      requestChange: function(type) {
        this.state.type = type;
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
          <h3 className="panel-title">Группа текстовых блоков</h3>
        </div>
        <div className="panel-body">
          <div className="form-inline">
            <div className="form-group">
              <label className="control-label">Тип:</label>
              &nbsp;&nbsp;&nbsp;
              <Select valueLink={typeLink} options={typeOptions} type='value' style={{width: 300}} />
            </div>
          </div>

          {this.state.text_blocks.map(function(textGroup, index) {
            var titleLink = {
              value: textGroup.title,
              requestChange: function(content) {
                textGroup.title = content;
                this.props.update(this.state);
              }.bind(this)
            };

            var textLink = {
              value: textGroup.text,
              requestChange: function(content) {
                textGroup.text = content;
                this.props.update(this.state);
              }.bind(this)
            };

            var remove = function() {
              this.state.text_blocks.splice(index, 1);
              this.props.update(this.state);
            }.bind(this);

            return (
              <div style={{marginTop: 20}}>
                <div className="form-inline">
                  <div className="form-group">
                    <input type="text" className="form-control" valueLink={titleLink} style={{width: 700}} />
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary" onClick={remove}>Удалить</button>
                  </div>
                </div>
                <CKEditor valueLink={textLink} />
              </div>
            );
          }, this)}
        </div>
        <div className="panel-footer">
          <button className="btn btn-primary" onClick={this.addGroup}>Добавить группу</button>
        </div>
      </div>
    );
  }
});

module.exports = TextGroupsBlock;
