'use strict';
function Model() {

}

Model.prototype.create = function() {
  console.log('creating model');
};

Model.prototype.save = function() {
  console.log('saving model');
};

function Employee() {
  Model.call(this);
}

Employee.prototype = Object.create(Model.prototype);