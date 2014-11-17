/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");
var cx = require("react/lib/cx");
var SelectMixin = require("attreactive-mixins/lib/fields/SelectMixin");
var LinkedStateMixin = require("attreactive-mixins/lib/common/LinkedStateMixin");

var Select = React.createClass({
  mixins: [LinkedStateMixin, SelectMixin],

  getDefaultProps: function() {
    return {
      search: false
    };
  },

  getInitialState: function() {
    return {
      filter: ''
    };
  },

  getFilteredOptions: function() {
    var options = this.getOptions();

    if (this.props.search) {
      var filter = this.state.filter.toLowerCase();

      if (filter.length > 0) {
        options = options.filter(function(option) {
          return option.text.toLowerCase().indexOf(filter) >= 0;
        }, this);
      }
    }

    return options;
  },

  renderOption: function(option, index) {
    return (
      <li className="active-result" onClick={option.clickHandler} key={index}>{option.text}</li>
    );
  },

  render: function() {
    var classes = cx({
      'chosen-container': true,
      'chosen-container-single': true,
      'chosen-container-single-nosearch': !this.props.search,
      'chosen-with-drop': this.isOpened()
    });

    return this.transferPropsTo(
      <div className={classes} title="">
         <a className="chosen-single" ref="head">
            <span dangerouslySetInnerHTML={{__html: this.getCurrentValueText() || '&nbsp;'}}></span>
            <div><b></b></div>
         </a>
         <div className="chosen-drop" ref="body">
            <div className="chosen-search">
              <input type="text" autoComplete="off" valueLink={this.linkState('filter')} />
            </div>
            <ul className="chosen-results">
               {this.getFilteredOptions().map(this.renderOption)}
            </ul>
         </div>
      </div>
    );
  }
});

module.exports = Select;
