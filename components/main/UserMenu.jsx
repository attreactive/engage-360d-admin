/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");
var cx = require('react/lib/cx');

function nodeIsSameOrContains(node, target) {
  if (node === target) {
     return true;
  }

  for (var i = 0; i < node.childNodes.length; i++) {
    var childNode = node.childNodes[i];

    if (nodeIsSameOrContains(childNode, target)) {
      return true;
    }
  }

  return false;
}

var UserMenu = React.createClass({
  getInitialState: function() {
    return {
      opened: false
    };
  },

  componentDidMount: function() {
    document.body.addEventListener('click', this._handleBodyClick);
  },

  componentWillUnmount: function() {
    document.body.removeEventListener('click', this._handleBodyClick);
  },

  render: function() {
    var classes = cx({
      "btn-group": true,
      "open": this.state.opened
    });

    return (
      <div className={classes}>
        <button type="button" className="btn btn-default dropdown-toggle" onClick={this._toggleDropdown}>
          Действия
          <span className="caret"></span>
        </button>
        <ul className="dropdown-menu dropdown-menu-usermenu pull-right">
          <li>
            <a href="#!/" onClick={this._handleSignOutClick}>
              <i className="glyphicon glyphicon-log-out"></i> Выйти
            </a>
          </li>
        </ul>
      </div>
    );
  },

  _toggleDropdown: function() {
    this.setState({opened: !this.state.opened});
  },

  _handleBodyClick: function(event) {
    var thisNode = this.getDOMNode();
    var targetNode = event.target;

    if (nodeIsSameOrContains(thisNode, targetNode)) {
      return;
    }

    this.setState({opened: false});
  },

  _handleSignOutClick: function() {
    this.props.auth.signOut();
  }
});

module.exports = UserMenu;
