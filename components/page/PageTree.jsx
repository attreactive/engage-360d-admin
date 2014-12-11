
/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");
var ResourceListingMixin = require('attreactive-admin/lib/mixins/ResourceListingMixin');
var LargeSpin = require('engage-360d-spin/components/LargeSpin');

require('./PageTree.less');

var PageTree = React.createClass({
  mixins: [ResourceListingMixin],

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
          {this.renderTree()}
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

  openItem: function(item) {
    window.location.hash = '#!/pages/' + item.id;
  },

  renderTree: function() {
    var items = this.state.items.sort(function (a, b) {
      if (a.url === b.url) {
        return 0;
      }

      return a.url < b.url ? -1 : 1;
    });

    items.forEach(function(item) {
      var childRe = new RegExp('^' + item.url.replace(/\/$/, '') + '/[^/]+$');

      item.childs = items.filter(function(child) {
        if (childRe.test(child.url)) {
          child.parent = item;
          return true;
        } else {
          child.parent = child.parent || null;
          return false;
        }
      });
    });

    items.forEach(function(item) {
      item.level = 0;
      var parent = item.parent;
      while (parent) {
        item.level++;
        parent = parent.parent;
      }
    });

    return (
      <div>
        <table className="table table-bordered table-hover table-primary">
          <thead>
            <tr>
              <th>Заголовок</th>
              <th>Ссылка</th>
            </tr>
          </thead>
          <tbody>
            {items.map(function(item, index) {
              return (
                <tr style={{cursor: 'pointer'}} onClick={this.openItem.bind(this, item)}>
                  <td>
                    <div style={{paddingLeft: (20 * item.level)}}>
                      {item.title}
                    </div>
                  </td>
                  <td>
                    {item.url}
                  </td>
                </tr>
              );
            }, this)}
          </tbody>
        </table>
        {this.getResource().isCreationFormEnabled() &&
          <div className="panel-footer">
            <a className="btn btn-primary" href={'#!' + this.getResource().getCreationFormUrl()}>Создать</a>
          </div>
        }
      </div>
    );
  }
});

module.exports = PageTree;

