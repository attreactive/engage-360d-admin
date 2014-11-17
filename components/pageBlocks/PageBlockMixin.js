var $ = require("jquery");

var PageBlockMixin = {
  getInitialState: function() {
    return this.getState(this.props.pageBlock.json);
  },

  componentWillReceiveProps: function(nextProps) {
    var state = this.getState(nextProps.pageBlock.json);
    this.setState(state);
  },

  getState: function (json) {
    var state;

    try {
      state = JSON.parse(json);
    } catch (e) {
    }

    return Object.prototype.toString.call(state) !== "[object Object]" ?
      {fakeState: state}
      : state;
  }
};

module.exports = PageBlockMixin;
