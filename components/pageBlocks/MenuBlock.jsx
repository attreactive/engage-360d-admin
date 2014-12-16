/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");
var cx = require("react/lib/cx");
var PageBlockMixin = require('./PageBlockMixin');
var Select = require('../form/Select');

require('./MenuBlock.less');

var MenuBlock = React.createClass({
  mixins: [PageBlockMixin],

  renderTree: function(items, level) {
    level = level || 1;
    var rowIndex = 0;

    var classes = cx({
      'MenuBlock': true,
      'MenuBlock-Level-Odd': level % 2 != 0,
      'MenuBlock-Level-Even': level % 2 == 0
    });

    classes += ' MenuBlock-Level-' + level;

    var addItem = function() {
      items.push({
        name: '',
        url: '',
        img: '',
        groupId: items.length % 4 % 2,
        children: []
      });
      this.props.update(this.state);
    }.bind(this);

    return (
      <div className={classes}>
        <table>
          <tbody>
            {items.reduce(function(rows, item, index) {
              var addChild = function() {
                item.children.push({
                  name: '',
                  url: '',
                  img: '',
                  children: []
                });
                this.props.update(this.state);
              }.bind(this);

              var removeItem = function() {
                items.splice(index, 1);
                this.props.update(this.state);
              }.bind(this);

              var createLink = function(key) {
                return {
                  value: item[key],
                  requestChange: function(value) {
                    item[key] = value;
                    this.props.update(this.state);
                  }.bind(this)
                };
              }.bind(this);

              rows.push(
                <tr key={rowIndex++}>
                  <td>
                    <div className="MenuBlock-Data">
                      <input valueLink={createLink('name')} className="form-control" placeholder="Название пункта меню" />
                    </div>
                  </td>
                  <td>
                    <div className="MenuBlock-Data">
                      <input valueLink={createLink('url')} className="form-control" placeholder="Ссылка" />
                    </div>
                  </td>
                  <td>
                    <div className="MenuBlock-Data">
                      <input valueLink={createLink('img')} className="form-control" placeholder="Изображение" />
                    </div>
                  </td>
                  <td className="MenuBlock-Actions">
                    <div className="MenuBlock-Data">
                      {level < this.props.meta.maxLevel &&
                        <button className="btn btn-primary" onClick={addChild}><i className="glyphicon glyphicon-plus" /></button>
                      }
                      &nbsp;
                      <button className="btn btn-danger" onClick={removeItem}><i className="glyphicon glyphicon-remove" /></button>
                    </div>
                  </td>
                </tr>
              );

              if (item.children.length > 0) {
                rows.push(
                  <tr key={rowIndex++}>
                    <td colSpan="4">{this.renderTree(item.children, level + 1)}</td>
                  </tr>
                );
              }

              return rows;
            }.bind(this), [])}
            <tr>
              <td colSpan="4" className="MenuBlock-Actions">
                <div className="MenuBlock-Data">
                  <button className="btn btn-primary" onClick={addItem}><i className="glyphicon glyphicon-plus" /></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );

  },

  render: function() {
    var bannerPageLink = {
      value: this.state.type,
      requestChange: function(type) {
        this.state.type = type;
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
          <h3 className="panel-title">Меню</h3>
        </div>
        <div className="panel-body">
          <div className="form-horizontal form-bordered">
            <div className="form-group">
              <label className="col-sm-3 control-label">Шаблон меню</label>
              <div className="col-sm-6">
                <Select valueLink={bannerPageLink} options={typeOptions} type='value' style={{width: 300}} />
              </div>
            </div>
            <div className="form-group">
              {this.renderTree(this.state.items)}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = MenuBlock;
