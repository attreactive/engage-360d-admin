/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");
var PageBlockMixin = require('./PageBlockMixin');
var CKEditor = require('../fields/CKEditor');
var Select = require('../form/Select');

var AboutHistoryBlock = React.createClass({
  mixins: [PageBlockMixin],

  addYear: function() {
    this.state.years.push({
      year: '',
      text: ['', '']
    });
    this.props.update(this.state);
  },

  render: function() {
    return (
      <div className="panel">
        <div className="panel-heading">
          <div className="panel-btns">
            <a href="#" className="panel-close" onClick={this.props.remove}>×</a>
          </div>
          <h3 className="panel-title">Группа текстовых блоков</h3>
        </div>
        <div className="panel-body">
          <pre>{JSON.stringify(this.state)}</pre>

          {this.state.years.map(function(year, index) {
            var yearLink = {
              value: year.year,
              requestChange: function(content) {
                year.year = content;
                this.props.update(this.state);
              }.bind(this)
            };

            var leftTextLink = {
              value: year.text[0],
              requestChange: function(content) {
                year.text[0] = content;
                this.props.update(this.state);
              }.bind(this)
            };

            var rightTextLink = {
              value: year.text[1],
              requestChange: function(content) {
                year.text[1] = content;
                this.props.update(this.state);
              }.bind(this)
            };

            var remove = function() {
              this.state.years.splice(index, 1);
              this.props.update(this.state);
            }.bind(this);

            return (
              <div style={{marginTop: 20}}>
                <div className="form-inline">
                  <div className="form-group">
                    <input type="text" className="form-control" valueLink={yearLink} style={{width: 700}} />
                  </div>
                  <div className="form-group">
                    <button className="btn btn-primary" onClick={remove}>Удалить</button>
                  </div>
                </div>
                <CKEditor valueLink={leftTextLink} />
                <CKEditor valueLink={rightTextLink} />
              </div>
            );
          }, this)}
        </div>
        <div className="panel-footer">
          <button className="btn btn-primary" onClick={this.addYear}>Добавить год</button>
        </div>
      </div>
    );
  }
});

module.exports = AboutHistoryBlock;
