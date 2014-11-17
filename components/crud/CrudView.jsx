/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");
var ResourceViewMixin = require('attreactive-admin/lib/mixins/ResourceViewMixin');
var LargeSpin = require('engage-360d-spin/components/LargeSpin');

var CrudView = React.createClass({
  mixins: [ResourceViewMixin],

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

    var buttons = [];

    this.getResource().getActions().forEach(function (action) {
      if (action.isVisible(this.state.item)) {
        buttons.push(
          <button className="btn btn-primary" onClick={this._getClickHandler(action.getAction())}><i className={action.getMetadata().icon}></i> {action.getTitle()}</button>
        );
      }
    }.bind(this));
    if (this.getResource().getEditFormProperties().length > 0) {
      buttons.push(
        <button className="btn btn-primary" onClick={this.editItem}><i className="fa fa-trash-o"></i> Изменить</button>
      );
    }
    buttons.push(
      <button className="btn btn-primary" onClick={this._deleteItem}><i className="fa fa-trash-o"></i> Удалить</button>
    );

    return (
      <div>
        {this.renderTitle()}
        <div className="contentpanel">
          <div className="panel">
            <div className="panel-heading">
              <div className="panel-title">{this.getItemTitle()}</div>
            </div>
            <div className="panel-body">
              <div className="btn-group">
                {buttons}
              </div>
              <br />
              <br />
              {this.getViewProperties().map(this.renderProperty)}
            </div>
          </div>
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
          <span>{this.getItemTitle()}</span>
        </h2>
        <div className="breadcrumb-wrapper">
          <span className="label">Вы находитесь тут:</span>
          <ol className="breadcrumb">
            <li><a href="#!/">Панель управления</a></li>
            <li><a href={'#!' + this.getListingUrl()}>{this.getTitle()}</a></li>
            <li className="active">{this.getItemTitle()}</li>
          </ol>
        </div>
      </div>
    );
  },

  renderProperty: function(property, index) {
    var value = this.readFormattedValue(property);

    return (
      <div className="row" key={index}>
        <div className="col-xs-3"><b>{property.getTitle()}</b></div>
        <div className="col-xs-9">{value}</div>
      </div>
    );
  },

  editItem: function() {
    window.location.hash = window.location.hash + '/edit';
  },

  _deleteItem: function() {
    if (!confirm('Вы точно хотите удалить ' + this.getItemTitle() + '?')) return;

    return this.deleteItem();
  },

  _getClickHandler: function (action) {
    return function () {
      this.setState({loading: true}, function() {
          action(this.state.item, this.getResource())
          .then(function(item) {
            this.reloadData();
          }.bind(this))
          .then(null, function() {
            this.setState({
              loading: false,
              error: true
            });
          }.bind(this));
      }.bind(this));
    }.bind(this);
  }
});

module.exports = CrudView;
