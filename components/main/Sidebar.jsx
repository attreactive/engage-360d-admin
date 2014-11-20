/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");
var cx = require("react/lib/cx");

var Sidebar = React.createClass({
  renderChildMenuItem: function(item, index) {
    var classes = cx({
      'active': item.highlighted
    });

    return (
      <li key={index} className={classes}>
        <a href={"#!" + item.url}>
          <i className="fa fa-caret-right"></i>
          <span>{item.title}</span>
        </a>
      </li>
    );
  },

  renderChildMenu: function(childs) {
    return (
      <ul className="children" style={{display: 'block'}}>
        {childs.map(this.renderChildMenuItem)}
      </ul>
    );
  },

  renderMenuItem: function(item, index) {
    var classes = cx({
      'active': item.highlighted
    });

    return (
      <li className={classes} key={index}>
        <a href={'#!' + item.url}>
          <i className={"fa fa-" + item.icon}></i>
          <span>{item.title}</span>
        </a>
        {item.childs.length > 0 &&
          this.renderChildMenu(item.childs)
        }
      </li>
    );
  },

  renderMenuGroup: function(group) {
    return (
      <div>
        <h5 className="sidebartitle">{group.title}</h5>
        <ul className="nav nav-pills nav-stacked nav-bracket">
          {group.menu.map(this.renderMenuItem)}
        </ul>
      </div>
    );
  },

  render: function() {
    return (
      <div className="leftpanelinner">
        {this.props.menu.map(this.renderMenuGroup)}
      </div>
    );
  }
});

module.exports = Sidebar;
