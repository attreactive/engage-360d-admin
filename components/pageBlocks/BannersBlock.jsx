/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");
var PageBlockMixin = require('./PageBlockMixin');
var CKEditor = require('../fields/CKEditor');
var FileInput = require('../form/FileInput');
var Select = require('../form/Select');

var BannersBlock = React.createClass({
  mixins: [PageBlockMixin],

  addGroup: function() {
    this.state.banners.push({
      image: null,
      title: '',
      buttonText: 'Подробнее',
      url: "/"
    })
    this.props.update(this.state);
  },

  render: function() {
    var bannerPageLink = {
      value: this.state.bannerPage,
      requestChange: function(bannerPage) {
        this.state.bannerPage = bannerPage;
        this.props.update(this.state);
      }.bind(this)
    };

    var typeOptions = this.props.meta.knownTypes;

    return (
      <div className="panel">
        <div className="panel-heading">
          <div className="panel-btns">
            <a href="#" className="panel-close" onClick={this.props.remove}>×</a>
          </div>
          <h3 className="panel-title">Баннеры</h3>
        </div>
        <div className="panel-body">
          <div className="form-horizontal form-bordered">
            <div className="form-group">
              <label className="col-sm-3 control-label">Шаблон баннера</label>
              <div className="col-sm-6">
                <Select valueLink={bannerPageLink} options={typeOptions} type='value' style={{width: 300}} />
              </div>
            </div>
          </div>

          {this.state.banners.map(function(textGroup, index) {
            var imageLink = {
              value: textGroup.image,
              requestChange: function(content) {
                textGroup.image = content;
                this.props.update(this.state);
              }.bind(this)
            };

            var titleLink = {
              value: textGroup.title,
              requestChange: function(content) {
                textGroup.title = content;
                this.props.update(this.state);
              }.bind(this)
            };

            var buttonTextLink = {
              value: textGroup.buttonText,
              requestChange: function(content) {
                textGroup.buttonText = content;
                this.props.update(this.state);
              }.bind(this)
            };

            var urlLink = {
              value: textGroup.url,
              requestChange: function(content) {
                textGroup.url = content;
                this.props.update(this.state);
              }.bind(this)
            };

            var remove = function() {
              this.state.banners.splice(index, 1);
              this.props.update(this.state);
            }.bind(this);

            return (
              <div style={{marginTop: 20}}>
                <div className="form-horizontal form-bordered">
                  <div className="form-group">
                    <label className="col-sm-3 control-label">Баннер №{index + 1}</label>
                    <div className="col-sm-6">
                      <input type="text" className="form-control mb15" valueLink={titleLink} style={{width: 500}} placeholder="Заголовок" />
                      <FileInput valueLink={imageLink} className="mb15" />
                      <input type="text" className="form-control mb15" valueLink={buttonTextLink} style={{width: 500}} placeholder="Текст кнопки" />
                      <input type="text" className="form-control mb15" valueLink={urlLink} style={{width: 500}} placeholder="Ссылка" />
                      {this.state.banners.length > 1 &&
                        <button className="btn btn-danger" onClick={remove}>Удалить баннер</button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            );
          }, this)}
        </div>
        {(typeof this.props.meta.limit != "number" || this.state.banners.length < this.props.meta.limit) &&
          <div className="panel-footer">
            <button className="btn btn-primary" onClick={this.addGroup}>Добавить баннер</button>
          </div>
        }
      </div>
    );
  }
});

module.exports = BannersBlock;
