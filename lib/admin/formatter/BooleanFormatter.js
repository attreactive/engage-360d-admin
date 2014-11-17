var Formatter = require('attreactive-admin/lib/formatter/Formatter');
var BooleanView = require("../../../components/admin/BooleanView");

var BooleanFormatter = Formatter.extend({
  format: function(value) {
    if (typeof value !== 'boolean') return 'Invalid boolean';

    return BooleanView({value: value});
  },

  compare: function (a, b) {
    if (a === b) {
      return 0;
    }

    return a < b ? -1 : 1;
  }
});

module.exports = BooleanFormatter;
