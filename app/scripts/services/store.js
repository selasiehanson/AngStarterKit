'use strict';

/**
 * @ngdoc service
 * @name app.Store
 * @description
 * # Store
 * Service in the app.
 */
angular.module('app')
  .service('Store', function Store() {
    this.store = {};
    var self = this;

    // create key value pair in to store records of a particular type
    function create(model, data) {
      data = data || [];
      self.store[model] = {
        data: data
      };
    }

    // find a record in the store
    function find(model, id) {
      var result = self.store[model].data.filter(function(x) {
        return x.id === id;
      });
      return result[0];
    }

    // add a new record to the store
    function insert(model, data) {
      merge(model, data);
    }

    function insertBatch(model, data) {
      data = data || [];
      data.forEach(function(x) {
        insert(model, x);
      });
    }

    // update our record in the store
    function update(model, data) {

    }

    // remove record from the store
    function remove(model, id) {

    }

    function all(model) {
      if (!model) {
        throw ('Please specify a model');
      }
      return self.store[model].data;
    }

    /*
     *PRIVATE FUNCTIONS
     */

    function merge(model, data) {
      checkTableExists(model);
      if (typeof(data) === 'object') {
        createOrModify(model, data);
      } else if (angular.isArray(data) === 'array') {
        data.forEach(function(x) {
          createOrModify(model, x);
        });
      }
    }

    function createOrModify(model, data) {
      if (data.id) {
        var oldObject = find(model, data.id);
        if (oldObject) {
          for (var i in oldObject) {
            // reassign fields
            oldObject[i] = data[i];
          }
        } else {
          self.store[model].data.push(data);
        }
      } else {
        var ids = self.store[model].data.map(function(x) {
          return x.id;
        });
        var lastId = getMaxOfArray(ids);
        if (lastId < 0) {
          lastId = 0
        }
        data.id = lastId + 1;
        self.store[model].data.push(data);
      }
    }

    function tables() {
      return self.store;
    }

    function tableNames() {
      var tables = self.store;
      var out = [];
      for (var i in tables) {
        out.push(i);
      }
      return out;
    }

    function checkTableExists(model) {
      if (!self.store[model]) {
        throw ('Store does not contain any table with the name ' + model);
      }
    }

    function getMaxOfArray(numArray) {
      return Math.max.apply(null, numArray);
    }

    return {
      create: create,
      find: find,
      insert: insert,
      insertBatch: insertBatch,
      update: update,
      remove: remove,
      tables: tables,
      tableNames: tableNames,
      all: all
    };
    // AngularJS will instantiate a singleton by calling "new" on this function

  });