/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");
var $ = require("jquery");

var promise = null;
function load(callback) {
  if (window.CKEDITOR) return callback();

  var url = '//cdn.ckeditor.com/4.4.5/full/ckeditor.js';

  if (window.location.protocol.indexOf('https') == 0) {
    url = 'https:' + url;
  } else {
    url = 'http:' + url;
  }

  if (!promise) {
    promise = $.getScript(url);
  }

  promise.then(function() {
    promise = null;
    callback();
  });
}

var CKEditor = React.createClass({
  componentDidMount: function() {
    load(this._init);
  },

  _init: function() {
    this.editor = CKEDITOR.replace(this.refs.editor.getDOMNode());
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
