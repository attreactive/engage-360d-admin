/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");
var PageBlockMixin = require('./PageBlockMixin');
var CKEditor = require('../fields/CKEditor');

var TextPageBlock = React.createClass({
  mixins: [PageBlockMixin],

  render: function() {
    var link = {
      value: this.state.content,
      requestChange: function(content) {
        this.props.update({
          content: content
        });
      }.bind(this)
    };

    return (
      <div className="panel">
        <div className="panel-heading">
          <div className="panel-btns">
            <a href="#" className="panel-close" onClick={this.props.remove}>×</a>
          </div>
          <h3 className="panel-title">Текстовый блок</h3>
        </div>
        <div className="panel-body">
          <CKEditor valueLink={link}
                    fileBrowser={this.props.meta && this.props.meta.fileBrowser}
                    fileBrowserBrowseUrl={this.props.meta && this.props.meta.fileBrowserBrowseUrl}
                    fileBrowserImageBrowseUrl={this.props.meta && this.props.meta.fileBrowserImageBrowseUrl} />
        </div>
      </div>
    );
  }
});

module.exports = TextPageBlock;
