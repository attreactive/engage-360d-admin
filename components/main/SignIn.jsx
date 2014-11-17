/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");
var LinkedStateMixin = require('attreactive-mixins/lib/common/LinkedStateMixin');
var ValidationMixin = require('attreactive-mixins/lib/form/ValidationMixin');
var validationConstraints = require('attreactive-validator/lib/validationConstraints');
var Spin = require('engage-360d-spin/components/Spin');

var SignIn = React.createClass({
  mixins: [LinkedStateMixin, ValidationMixin],

  getInitialState: function() {
    return {
      username: '',
      password: '',
      error: false,
      waiting: false
    };
  },

  getValidationConfig: function() {
    return {
      username: {
        notEmpty: validationConstraints.notEmpty()
      },
      password: {
        notEmpty: validationConstraints.notEmpty()
      }
    };
  },

  render: function() {
    return (
      <div className="signin">
        <section>
          <div className="signinpanel">
            <div className="row">
              <div className="col-md-7">
                <div className="signin-info">
                  <div className="logopanel">
                    <h1>
                      <span>[</span>
                      <b>{this.props.title}</b>
                      <span>]</span>
                    </h1>
                  </div>
                  <h5><strong>Добро пожаловать в панель управления сайтом!</strong></h5>
                  <strong>Для получения авторизационнных данных обратитесь по&nbsp;адресу&nbsp;<a href={'mailto:' + this.props.signUpEmail}>{this.props.signUpEmail}</a></strong>
                </div>
              </div>
              <div className="col-md-5">
                <form onSubmit={this._handleSubmit}>
                  <h4 className="nomargin">Авторизация</h4>
                  {this.state.error &&
                    <div className="alert alert-danger">Ошибка авторизации</div>
                  }
                  <input type="text" className="form-control uname" placeholder="Имя пользователя" valueLink={this.linkState('username')} />
                  <input type="password" className="form-control pword" placeholder="Пароль" valueLink={this.linkState('password')} />
                  <button className="btn btn-success btn-block" disabled={this.validity.invalid || this.state.waiting}>
                    {this.state.waiting ?
                      <Spin /> :
                      'Войти'
                    }
                  </button>
                </form>
              </div>
            </div>
            <div className="signup-footer">
              <div className="pull-left">
                {this.props.copyright}
              </div>
              <div className="pull-right">
                Создано в <a href={this.props.creatorUrl} target="_blank">{this.props.creatorName}</a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  },

  _handleSubmit: function(event) {
    event.preventDefault();

    if (this.validity.invalid || this.state.waiting) return;

    this.setState({
      error: false,
      waiting: true
    });

    this.props.adminSetup.getAuthorizationManager().signIn({
      _username: this.state.username,
      _password: this.state.password
    })
      .then(null, function() {
        this.setState({
          error: true,
          waiting: false
        });
      }.bind(this));
  }
});

module.exports = SignIn;
