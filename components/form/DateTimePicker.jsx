/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");
var moment = require('moment');
var $ = require('jquery');
require('jquery-ui');

var DateTimePicker = React.createClass({
  componentDidMount: function() {
    $(this.refs.input.getDOMNode()).datepicker({
      dateFormat: 'dd.mm.yy',
      onSelect: this.changeDate
    });
  },

  changeDate: function(date) {
    var value = this.props.valueLink.value ?
      moment(this.props.valueLink.value, moment.ISO_8601) :
      moment({hour: 0, minute: 0});

    var newDate = moment(date, 'DD.MM.YYYY');
    value.year(newDate.year()).month(newDate.month()).date(newDate.date());

    this.props.valueLink.requestChange(value.utc().format());
  },

  changeHour: function(event) {
    var value = this.props.valueLink.value ?
      moment(this.props.valueLink.value, moment.ISO_8601) :
      moment();

    value.hour(event.target.value);

    this.props.valueLink.requestChange(value.utc().format());
  },

  changeMinute: function(event) {
    var value = this.props.valueLink.value ?
      moment(this.props.valueLink.value, moment.ISO_8601) :
      moment();

    value.minute(event.target.value);

    this.props.valueLink.requestChange(value.utc().format());
  },

  changeSeconds: function(event) {
    var value = this.props.valueLink.value ?
      moment(this.props.valueLink.value, moment.ISO_8601) :
      moment();

    value.seconds(event.target.value);

    this.props.valueLink.requestChange(value.utc().format());
  },

  render: function() {
    var value = this.props.valueLink.value ?
      moment(this.props.valueLink.value, moment.ISO_8601) :
      null;

    return (
      <div>
        <input ref="input"
          className="form-control"
          style={{width: 200, display: 'inline-block'}}
          value={value && value.format('DD.MM.YYYY')}
          onChange={function(){}} />
        <input type="number"
          className="form-control"
          style={{width: 50, display: 'inline-block', marginLeft: 10, textAlign: 'center'}}
          value={value && value.format('HH')}
          onChange={this.changeHour} />
        <input type="number"
          className="form-control"
          style={{width: 50, display: 'inline-block', marginLeft: 10, textAlign: 'center'}}
          value={value && value.format('mm')}
          onChange={this.changeMinute} />
        <input type="number"
          className="form-control"
          style={{width: 50, display: 'inline-block', marginLeft: 10, textAlign: 'center'}}
          value={value && value.format('ss')}
          onChange={this.changeSeconds} />
      </div>
    );
  }
});

module.exports = DateTimePicker;
