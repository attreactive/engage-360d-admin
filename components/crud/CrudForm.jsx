/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");
var ResourceFormMixin = require('attreactive-admin/lib/mixins/ResourceFormMixin');
var LinkedStateMixin = require("attreactive-mixins/lib/common/LinkedStateMixin");
var LargeSpin = require('engage-360d-spin/components/LargeSpin');
var cx = require('react/lib/cx');

var CrudForm = React.createClass({
  mixins: [LinkedStateMixin, ResourceFormMixin],

  ErrorMessagesComponent: React.createClass({
    render: function() {
      return (
        <label className="error">{this.props.messages.shift()}</label>
      );
    }
  }),

  render: function() {
    if (this.state.error) {
      return <span>Error</span>;
    }

    if (this.state.loading) {
      return (
        <div>
          {this.renderTitle()}
          <LargeSpin />
        </div>
      );
    }

    return (
      <div>
        {this.renderTitle()}
        <div className="contentpanel">
          {this.renderForm()}
        </div>
      </div>
    );
  },

  renderTitle: function() {
    return (
      <div className="pageheader">
        <h2>
          <i className={"fa fa-" + this.getMetadata().icon}></i>
          <b>{this.getTitle()}</b>
          <span>{this.state.newItem ? 'Создание' : 'Редактирование'}</span>
        </h2>
        <div className="breadcrumb-wrapper">
          <span className="label">Вы находитесь тут:</span>
          <ol className="breadcrumb">
            <li><a href="#!/">Панель управления</a></li>
            <li><a href={"#!" + this.getListingUrl()}>{this.getTitle()}</a></li>
            <li className="active">{this.state.newItem ? 'Создание' : 'Редактирование'}</li>
          </ol>
        </div>
      </div>
    );
  },

  renderForm: function() {
    var properties = this.state.newItem ?
      this.getCreateFormProperties() :
      this.getEditFormProperties();

    return (
      <form onSubmit={this.save}>
        <div className="panel">
          <div className="panel-body panel-body-nopadding">
            <div className="form-horizontal form-bordered">
              {properties.map(this.renderField)}
            </div>
          </div>
          <div className="panel-footer">
            <div className="row">
              <div className="col-sm-6 col-sm-offset-3">
                <button className="btn btn-primary">Сохранить</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  },

  renderField: function(property) {
    var validity = this.validity[property.getId()];

    var classes = cx({
      'form-group': true,
      'has-error': this.isErrorMessageVisible(property.getId())
    });

    return (
      <div className={classes}>
        <label className="col-sm-3 control-label">{property.getTitle()}</label>
        <div className="col-sm-6">
          {this.renderControl(property)}
          {this.renderErrorMessage(property.getId())}
        </div>
      </div>
    );
  }
});

module.exports = CrudForm;
