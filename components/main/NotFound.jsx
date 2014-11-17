/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");

var NotFound = React.createClass({
  render: function() {
    return (
      <section className="notfound">
        <div className="notfoundpanel">
          <h1>404!</h1>
          <h3>Запрашиваимая вами страница не найдена!</h3>
          <h4>Запрашиваимая вами страница, возможно, удалена, переименована или не доступна.</h4>
        </div>
      </section>
    );
  }
});

module.exports = NotFound;
