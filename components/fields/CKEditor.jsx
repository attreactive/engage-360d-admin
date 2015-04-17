/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");
var $ = require("jquery");

var promise = {};
var loaded = {};
function load(url, callback) {
  if (loaded[url]) return callback();

  if (url.slice(0, 2) == '//') {
    if (window.location.protocol.indexOf('https') == 0) {
      url = 'https:' + url;
    } else {
      url = 'http:' + url;
    }
  }

  if (!promise[url]) {
    promise[url] = $.getScript(url);
  }

  var cb = function() {
    loaded[url] = true;
    delete promise[url];
    callback();
  };

  promise[url].done(cb).fail(cb);
}

var CKEditor = React.createClass({
  componentDidMount: function() {
    if (this.props.fileBrowser) {
      load('//cdn.ckeditor.com/4.4.5/full/ckeditor.js', function() {
        load(this.props.fileBrowser, this._init);
      }.bind(this));
    } else {
      load('//cdn.ckeditor.com/4.4.5/full/ckeditor.js', this._init);
    }
  },

  _init: function() {
    this.editor = CKEDITOR.replace(this.refs.editor.getDOMNode());
    if (this.props.fileBrowser) {
      this.editor.config.filebrowserBrowseUrl = this.props.fileBrowserBrowseUrl;
      this.editor.config.filebrowserImageBrowseUrl = this.props.fileBrowserImageBrowseUrl;
      this.editor.config.removeDialogTabs = 'link:upload;image:upload';
    }
    this.editor.config.allowedContent = true;
    this.editor.config.extraAllowedContent = 'div(*)';
    this.editor.setData(this.props.valueLink.value);
    this.editor.on('change', function() {
      this.props.valueLink.requestChange(this.editor.getData());
    }.bind(this));
  },

  render: function() {
    return (
      <div style={{margin: '10px 0'}}>
        <div ref="editor" />
      </div>
    );
  }
});

module.exports = CKEditor;
