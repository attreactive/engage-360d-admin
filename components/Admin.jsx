/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");
var Topbar = require('./main/Topbar');
var Sidebar = require('./main/Sidebar');
var SignIn = require('./main/SignIn');
var NotFound = require('./main/NotFound');
var cloneWithProps = require('react/lib/cloneWithProps');

require('../css/style.default.css');

var Admin = React.createClass({
  getDefaultProps: function() {
    return {
      title: 'Engage'
    };
  },

  componentWillMount: function() {
    this.props.adminSetup.getAuthorizationManager().addChangeListener(this._handleChange);
    this.props.adminSetup.getRouter().addChangeListener(this._handleChange);
  },

  componentWillUnmount: function() {
    this.props.adminSetup.getAuthorizationManager().removeChangeListener(this._handleChange);
    this.props.adminSetup.getRouter().removeChangeListener(this._handleChange);
  },

  render: function() {
    var adminSetup = this.props.adminSetup;

    if (!adminSetup.getAuthorizationManager().isAuthorized()) {
      return this.transferPropsTo(<SignIn />);
    }

    var pageFactory = adminSetup.getRouter().getCurrentRouteHandler();

    if (!pageFactory) {
      return this.transferPropsTo(<NotFound />);
    }

    var page = pageFactory();

    var menu = this.props.menu.map(function(menu) {
      return {
        title: menu.title,
        menu: menu.menu.compile(adminSetup.getRouter().getCurrentLocation())
      };
    });

    page = cloneWithProps(page, {
      adminSetup: this.props.adminSetup
    });

    return (
      <section>
        <div className="leftpanel">
          <div className="logopanel">
              <h1><span>[</span><b>{this.props.title}</b><span>]</span></h1>
          </div>
          <Sidebar menu={menu} />
        </div>
        <div className="mainpanel">
          <Topbar auth={this.props.adminSetup.getAuthorizationManager()} />
          {page}
        </div>
      </section>
    );
  },

  _handleChange: function() {
    this.forceUpdate();
  }
});

module.exports = Admin;
