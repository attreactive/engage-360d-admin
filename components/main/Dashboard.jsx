/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");

var Dashboard = React.createClass({
  render: function() {
    return (
      <div>
        <div className="pageheader">
          <h2>
            <i className="fa fa-dashboard"></i>
            <b>Панель управления</b>
            <span>Добро пожаловать</span>
          </h2>
          <div className="breadcrumb-wrapper">
            <span className="label">Вы находитесь тут:</span>
            <ol className="breadcrumb">
              <li className="active">Панель управления</li>
            </ol>
          </div>
        </div>
        <div className="contentpanel">
          Пустота
        </div>
      </div>
    );
  }
});

module.exports = Dashboard;
