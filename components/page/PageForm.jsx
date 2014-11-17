/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");
var ResourceFormMixin = require('attreactive-admin/lib/mixins/ResourceFormMixin');
var LinkedStateMixin = require("attreactive-mixins/lib/common/LinkedStateMixin");
var LargeSpin = require('engage-360d-spin/components/LargeSpin');
var cx = require('react/lib/cx');

var PageForm = React.createClass({
  mixins: [LinkedStateMixin, ResourceFormMixin],

  componentWillMount: function() {
    if (!this.state.item.pageBlocks) {
      this.setState({
        item: {
          pageBlocks: []
        }
      });
    }
  },

  ErrorMessagesComponent: React.createClass({
    render: function() {
      return (
        <label className="error">{this.props.messages.shift()}</label>
      );
    }
  }),

  prepareItem: function(page) {
    page.pageBlocks.forEach(function(pageBlock) {
      delete pageBlock.id;
    });

    return page;
  },

  addPageBlock: function(pageBlockMeta) {
    this.state.item.pageBlocks.push({
      type: pageBlockMeta.type,
      json: pageBlockMeta.initialJSON,
      keyword: ''
    });
    this.forceUpdate();
  },

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
          {this.renderPageBlocks()}
          <div className="panel">
            <div className="panel-heading">
              <h3 className="panel-title">Добавить новый блок</h3>
            </div>
            <div className="panel-body">
              {this.props.pageBlockRegistry.getAll().map(function(pageBlockMeta) {
                return (
                  <button className="btn btn-primary" onClick={this.addPageBlock.bind(this, pageBlockMeta)}>
                    {pageBlockMeta.title}
                  </button>
                );
              }, this)}
            </div>
          </div>
          <div className="panel">
            <div className="panel-body">
              <button className="btn btn-primary" onClick={this.save}>Сохранить</button>
            </div>
          </div>
        </div>
      </div>
    );
  },

  renderPageBlocks: function() {
    var pageBlockRegistry = this.props.pageBlockRegistry;

    return this.state.item.pageBlocks.map(function(pageBlock, index) {
      var pageBlockMeta = pageBlockRegistry.getPageBlockComponent(pageBlock.type);

      if (!pageBlockMeta) {
        return (
          <pre>
            {JSON.stringify({
              type: pageBlock.type,
              json: JSON.parse(pageBlock.json)
            }, null, 2)}
          </pre>
        );
      }

      var PageBlockComponent = pageBlockMeta.component;

      var update = function(json) {
        pageBlock.json = JSON.stringify(json);
        this.forceUpdate();
      }.bind(this);

      var remove = function(event) {
        event.preventDefault();
        this.state.item.pageBlocks.splice(index, 1);
        this.forceUpdate();
      }.bind(this);

      return (
        <PageBlockComponent pageBlock={pageBlock} update={update} remove={remove} meta={pageBlockMeta.meta} />
      );
    }, this);
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
              {properties.filter(function(property) {
                return property.getId() != 'pageBlocks';
              }).map(this.renderField)}
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

module.exports = PageForm;
