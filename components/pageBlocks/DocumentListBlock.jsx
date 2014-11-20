/**
 * Engage-360D Admin
 * @jsx React.DOM
 */

var React = require("react");
var PageBlockMixin = require('./PageBlockMixin');
var $ = require('jquery');
var LargeSpin = require('engage-360d-spin/components/LargeSpin');
var Select = require('../form/Select');

function move(array, old_index, new_index) {
    if (new_index >= array.length) {
        var k = new_index - array.length;
        while ((k--) + 1) {
            array.push(undefined);
        }
    }
    array.splice(new_index, 0, array.splice(old_index, 1)[0]);
    return array; // for testing purposes
};

var promise;
function loadDocuments() {
  if (!promise) {
    promise = $.getJSON('/api/documents')
      .then(function(data) {
        promise = null;
        return data;
      });
  }

  return promise;
}

var DocumentListBlock = React.createClass({
  mixins: [PageBlockMixin],

  getInitialState: function() {
    return {
      documents: [],
      newDocument: null,
      loading: true
    };
  },

  componentWillMount: function() {
    loadDocuments()
      .then(function(documents) {
        this.setState({
          documents: documents,
          loading: false
        })
      }.bind(this));
  },

  addNewDocument: function() {
    this.state.documentIds.push(this.state.newDocument);
    this.update();
  },

  update: function() {
    this.props.update({
      documentIds: this.state.documentIds
    });
  },

  render: function() {
    var documentsHash = this.state.documents.reduce(function(hash, doc) {
      hash[doc.id] = doc;
      return hash;
    }, {});

    var newDocumentLink = {
      value: this.state.newDocument,
      requestChange: function(newDocument) {
        this.setState({
          newDocument: newDocument
        });
      }.bind(this)
    };

    var newDocumentOptions = this.state.documents.filter(function(doc) {
      return this.state.documentIds.indexOf(doc.id) < 0;
    }.bind(this)).map(function(doc) {
      return {
        value: doc.id,
        text: doc.visibleName
      };
    });

    if (!this.state.loading) {
      this.state.documentIds = this.state.documentIds.filter(function(id) {
        return !!documentsHash[id];
      });  
    }

    return (
      <div className="panel">
        <div className="panel-heading">
          <div className="panel-btns">
            <a href="#" className="panel-close" onClick={this.props.remove}>×</a>
          </div>
          <h3 className="panel-title">Группа документов</h3>
        </div>
        <div className="panel-body">
          {this.state.loading && <LargeSpin />}
          {!this.state.loading &&
            <div>
              <table className="table">
                <tbody>
                  {this.state.documentIds.map(function(id, index, documentIds) {
                    var doc = documentsHash[id];

                    var up = function() {
                      move(this.state.documentIds, index, index-1);
                      this.update();
                    }.bind(this);
                    var down = function() {
                      move(this.state.documentIds, index, index+1);
                      this.update();
                    }.bind(this);
                    var remove = function() {
                      this.state.documentIds.splice(index, 1);
                      this.update();
                    }.bind(this);

                    return (
                      <tr>
                        <td>{doc.visibleName}</td>
                        <td style={{textAlign: 'right'}}>
                          <button className="btn btn-primary" disabled={index == 0} onClick={up}><i className="glyphicon glyphicon-chevron-up" /></button>
                          &nbsp;
                          <button className="btn btn-primary" disabled={index == documentIds.length - 1} onClick={down}><i className="glyphicon glyphicon-chevron-down" /></button>
                          &nbsp;
                          <button className="btn btn-danger" onClick={remove}><i className="glyphicon glyphicon-remove" /></button>
                        </td>
                      </tr>
                    );
                  }, this)}
                </tbody>
              </table>

              {newDocumentOptions.length > 0 &&
                <div className="form-horizontal form-bordered">
                  <div className="form-group">
                    <label className="col-sm-3 control-label">Добавить документ</label>
                    <div className="col-sm-4">
                      <Select valueLink={newDocumentLink} options={newDocumentOptions} type='value' style={{width: 300}} />
                    </div>
                    <div className="col-sm-2">
                      <button className="btn btn-primary" onClick={this.addNewDocument} disabled={!this.state.newDocument}>Добавить документ</button>
                    </div>
                  </div>
                </div>
              }
            </div>
          }
        </div>
      </div>
    );
  }
});

module.exports = DocumentListBlock;
