/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");
var UserMenu = require('./UserMenu');

var Topbar = React.createClass({
  render: function() {
    return (
      <div className="headerbar">
        <div className="header-right">
          <ul className="headermenu">
            <li>
              <UserMenu auth={this.props.auth} />
            </li>
          </ul>
        </div>
      </div>
    );
  }
});

module.exports = Topbar;
