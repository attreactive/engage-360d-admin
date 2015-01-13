/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var $ = require('jquery');
var React = require("react");
var PageBlockMixin = require('./PageBlockMixin');

var AboutOwnCalculations = React.createClass({
  mixins: [PageBlockMixin],

  addDocument: function() {
    this.state.documents.unshift({
      uri: '',
      name: ''
    });
    this.props.update(this.state);
    window.scrollTo(0, $(this.refs.panel.getDOMNode()).offset().top);
  },

  render: function() {
    return (
      <div className="panel" ref="panel">
        <div className="panel-heading">
          <div className="panel-btns">
            <a href="#" className="panel-close" onClick={this.props.remove}>×</a>
          </div>
          <h3 className="panel-title">Расчет собственных средств</h3>
        </div>
        <div className="panel-body">
          {this.state.documents.map(function(doc, index) {
            var uriLink = {
              value: doc.uri,
              requestChange: function(content) {
                doc.uri = content;
                this.props.update(this.state);
              }.bind(this)
            };

            var nameLink = {
              value: doc.name,
              requestChange: function(content) {
                doc.name = content;
                this.props.update(this.state);
              }.bind(this)
            };

            var remove = function() {
              this.state.documents.splice(index, 1);
              this.props.update(this.state);
            }.bind(this);

            return (
              <div style={{marginTop: 20}}>
                <div className="form-horizontal">
                  <div className="form-group">
                    <label className="col-sm-2 control-label">Название</label>
                    <div className="col-sm-3">
                      <input type="text" className="form-control" valueLink={nameLink} />
                    </div>
                    <label className="col-sm-1 control-label">Uri</label>
                    <div className="col-sm-4">
                      <input type="text" className="form-control" valueLink={uriLink} />
                    </div>
                    <div className="col-sm-2">
                      <button className="btn btn-primary" onClick={remove}>Удалить</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          }, this)}
        </div>
        <div className="panel-footer">
          <button className="btn btn-primary" onClick={this.addDocument}>Добавить документ</button>
        </div>
      </div>
    );
  }
});

module.exports = AboutOwnCalculations;
