/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");
var CKEditorField = require('../fields/CKEditor');

var CKEditor = React.createClass({
  render: function() {
    return this.transferPropsTo(<CKEditorField />);
  }
});

module.exports = CKEditor;
