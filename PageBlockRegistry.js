function PageBlockRegistry() {
  this._components = {};
  this._componentsArray = [];
}

PageBlockRegistry.prototype.addPageBlockComponent = function(component) {
  this._components[component.type] = component;
  this._componentsArray.push(component);
};

PageBlockRegistry.prototype.getPageBlockComponent = function(id) {
  return this._components[id];
};

PageBlockRegistry.prototype.getAll = function() {
  return this._componentsArray;
};

module.exports = PageBlockRegistry;
