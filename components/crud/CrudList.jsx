/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");
var ResourceListingMixin = require('attreactive-admin/lib/mixins/ResourceListingMixin');
var LinkedStateMixin = require("attreactive-mixins/lib/common/LinkedStateMixin");
var LargeSpin = require('engage-360d-spin/components/LargeSpin');
var Select = require('../form/Select');
var cx = require("react/lib/cx");

var CrudList = React.createClass({
  mixins: [LinkedStateMixin, ResourceListingMixin],

  getLimitOptions: function() {
    return [
      {value: 10, text: '10'},
      {value: 25, text: '25'},
      {value: 50, text: '50'}
    ];
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
          {this.renderTable()}
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
          <span>Список</span>
        </h2>
        <div className="breadcrumb-wrapper">
          <span className="label">Вы находитесь тут:</span>
          <ol className="breadcrumb">
            <li><a href="#!/">Панель управления</a></li>
            <li className="active">{this.getTitle()}</li>
          </ol>
        </div>
      </div>
    );
  },

  renderTable: function() {
    var valueLink = {
      value: this.state.limit,
      requestChange: function (value) {
        this.setState({
          page: 1,
          limit: value
        });
      }.bind(this)
    };

    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="table-responsive">
            <div className="dataTables_wrapper">
              <div className="dataTables_length">
                <label>
                  Отображать&nbsp;
                  <Select type="value" valueLink={valueLink} options={this.getLimitOptions()} />
                  &nbsp;записей
                </label>
              </div>
              <div className="dataTables_filter">
                <label>Поиск: <input type="text" valueLink={this.linkState('filter')} /></label>
              </div>
              <table className="table dataTable">
                <thead>
                  <tr>
                    {this.renderHead()}
                  </tr>
                </thead>
                <tbody>
                  {this.renderBody()}
                </tbody>
              </table>
              <div className="dataTables_info">
                Отображены с {this.getFirstItemNumber()} по {this.getLastItemNumber()} из {this.getItemsLength()} записей
              </div>
              {this.renderPagination()}
            </div>
          </div>
        </div>
      </div>
    );
  },

  renderPagination: function () {
    return (
      <div className="dataTables_paginate paging_two_button">
        <a onClick={this.showPrevPage} className={this.isTherePrevPage() ? "paginate_enabled_previous" : "paginate_disabled_previous"}>Назад</a>
        <a onClick={this.showNextPage} className={this.isThereNextPage() ? "paginate_enabled_next" : "paginate_disabled_next"}>Вперед</a>
      </div>
    );
  },

  isThereNextPage: function () {
    return this.state.page * this.state.limit < this.getFilteredItems().length;
  },

  isTherePrevPage: function () {
    return this.state.page > 1;
  },

  showNextPage: function () {
    if (this.isThereNextPage()) {
      this.setState({page: this.state.page + 1});
    }
  },

  showPrevPage: function () {
    if (this.isTherePrevPage()) {
      this.setState({page: this.state.page - 1});
    }
  },

  renderHead: function() {
    return this.getListingProperties().map(function(property, index) {
      var style = {
        width: property.isLinkable() ? '100%' : 'auto',
        paddingRight: '20px'
      };

      return (
        <th onClick={this.changeSorting.bind(this, property)} className="sorting" key={index}
            style={style}>{property.getTitle()}</th>
      );
    }.bind(this));
  },

  changeSorting: function (property) {
    property = property.getId();
    if (this.state.sortingProperty === null) {
      this.setState({
        sortingProperty: property
      });
    } else if (this.state.sortingProperty != property) {
      this.setState({
        sortingProperty: property,
        sortingDirection: 'asc'
      });
    } else {
      this.setState({
        sortingDirection: this.state.sortingDirection === 'asc' ? 'desc' : 'asc'
      });
    }
  },

  renderBody: function() {
    var page = this.state.page;
    var limit = this.state.limit;
    var items = this.getFilteredItems();
    var property = this.state.sortingProperty;

    if (property) {
      property = this.props.resource.getProperties().filter(function(p) {
        return p.getId() == property;
      }).shift();

      items.sort(function (a, b) {
        return property.getFormatter().compare(
          a[property.getId()],
          b[property.getId()],
          property.getDependency(),
          property.getDependency()?
            this.state.dependencies[property.getDependency().getId()]
            : undefined
        );
      }.bind(this));

      if (this.state.sortingDirection === "desc") {
        items.reverse();
      }
    }

    items = items.slice((page - 1) * limit, page * limit);

    return items.map(function(item, index) {
      var classes = cx({
        'gradeA': true,
        'odd': index % 2 == 0,
        'even': index % 2 == 1
      });

      return (
        <tr className={classes} key={index}>
          {this.getListingProperties().map(function(property, index) {
            var value = this.readFormattedValue(property, item);

            if (property.isLinkable()) {
              if (!value) {
                value = <i>No title</i>;
              }

              value = (
                <a href={'#!' + this.getViewUrl(item)}>{value}</a>
              );
            }

            return (
              <td key={index}>{value}</td>
            );
          }, this)}
        </tr>
      );
    }, this);
  }
});

module.exports = CrudList;
