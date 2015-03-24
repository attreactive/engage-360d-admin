/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");
var $ = require('jquery');
require('jquery-ui');
require('../../vendor/jquery.fileupload.js');

var FileInput = React.createClass({
    getInitialState: function() {
      return {
        uploading: false
      }
    },

    componentDidMount: function() {
      this.attachHandler();
    },

    componentDidUpdate: function() {
      this.attachHandler();
    },

    attachHandler: function() {
      var authManager;
      if (this.props.adminSetup) {
        authManager = this.props.adminSetup.getAuthorizationManager();
      }

      if (this.refs.file) {
        var file = this.refs.file.getDOMNode();
        var url = '/api/old/files';
        if (authManager) {
          url += '?token=' + encodeURIComponent(authManager.getAuthorizationData().token);
        }

        $(file).fileupload({
          url: url,
          dataType: 'json',
          paramName: 'file',
          add: this.handleChange,
          done: this.handlePostRequest
        });
      }
    },

    handleChange: function(event, data) {
      if (this.props.setErrorMessageInputBlured) {
        this.props.setErrorMessageInputBlured();
      }
      data.submit();
      this.setState({uploading: true});
    },

    handlePostRequest: function(event, data) {
      var file = data.result.data;
      this.setState({uploading: false});
      this.props.valueLink.requestChange(file.url);
    },

    reset: function(event) {
      event.preventDefault();
      this.props.valueLink.requestChange(null);
    },

    render: function() {
        var spin, value, input;

        if (this.state.uploading) {
          spin = 'Uploading...';
        } else if (this.props.valueLink.value) {
          if (/\.(jpe?g|png)$/i.test(this.props.valueLink.value)) {
            value = (
              <div>
                <img src={this.props.valueLink.value} style={{maxWidth: 300, maxHeight: 300}} />
                <br />
                <a onClick={this.reset} href="#"><i className="fa fa-times" /> Удалить</a>
              </div>
            );
          } else {
            value = (
              <span>
                <a target="blank" href={this.props.valueLink.value}>{this.props.valueLink.value}</a>
                {' '}
                <a onClick={this.reset}><i className="fa fa-times" /></a>
              </span>
            );
          }
        } else {
          input = (
            <input className="form-control" name="file" type="file" ref="file" />
          );
        }

        return this.transferPropsTo(
          <div>
            {spin}
            {value}
            {input}
          </div>
        );
    }
});

module.exports = FileInput;
