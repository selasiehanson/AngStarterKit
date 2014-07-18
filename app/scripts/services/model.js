'use strict';

/**
 * @ngdoc service
 * @name angularStarterKitApp.Model
 * @description
 * # Model
 * Service in the angularStarterKitApp.
 */
angular.module('angularStarterKitApp')
  .service('Model', function Model(Store, ResMgr) {
    this.delimeter = '::';
    this.namespace = 'App';
    this.transforms = {};
    this.url = '';
    // adapters ['SIMPLE_REST_ADAPTER', 'EMBEDDED_REST_ADAPTER', 'LOCAL_ADAPTER']
    this.adapter = 'SIMPLE_REST_ADAPTER';
    var self = this;

    window[this.namespace] = {};

    //base model class
    function Model(params) {
      if (typeof(params) !== 'object') {
        throw ("Arguments to model must be of type object. eg {name: 'Peter', age: 23}");
      }

      //todo check if field has been defined
      var transformedData = serialize(this._classParams.name, angular.copy(params));
      for (var i in transformedData) {
        this[i] = transformedData[i];
      }

      //todo: this should be a proper data transformer
      this._data = params;
    }

    // todo: dynmaically create $resource object

    Model.prototype.create = function(params) {
      params = params || {};
      console.log('creating model');
    };

    Model.prototype.save = function() {
      //push data into store
      // console.log('saving model');
      // console.log(this._data)
      // Store.insert(this._classParams.name, this._data);
      save(self.adapter, this._classParams.name, this._data);
    };

    function save(restAdaperType, model, data) {
      if (restAdaperType === 'SIMPLE_REST_ADAPTER') {
        Store.insert(model, data);
      } else {
        //save to server before saving to store

      }
    }

    Model.prototype.update = function() {
      console.log('updating model');
    };

    Model.prototype.delete = function() {
      console.log('removing model');
    };

    // MIGHT NOT BE NECESSARY
    Model.prototype.toJson = function() {
      // body...
    };

    Model.prototype.fromJson = function() {

    }

    function klass(model, options) {
      if (typeof(options) !== 'object') {
        throw ('pass in an object to describe your model');
      }
      options = angular.extend({
        id: 'attr::int'
      }, options);

      self.transforms[getModelName(model)] = {
        klass: getModelName(model),
        fields: options
      };

      window[self.namespace][model] = function(params) {
        this._classParams = {
          name: getModelName(model),
          endpoint: model.toString().pluralize()
        };
        Model.call(this, params);
      };
      window[self.namespace][model].prototype = Object.create(Model.prototype);

      window[self.namespace][model].all = function() {
        console.log('querying objects');
        var all = Store.all(getModelName(model));
        console.log(all);
        var out = all.map(function(x) {
          return new window[self.namespace][model](x);
        });

        return out;
      }

      window[self.namespace][model].find = function(id) {
        Store.find(getModelName(model), id);
      }

      //Register the model as an agular resource
      console.log(model)
      window.ResMgr = ResMgr;
      ResMgr.register(model);
      // create the model but with no data
      Store.create(getModelName(model));
    }


    function attr(field, data, type) {
      //todo: cast field to type or do typechecking
      return data[field];
    }

    function belongsTo(field, value) {
      var model = getModelName(field);
      checkModelExist(model);
      return Store.find(model, value);
    }

    function hasOne(field, model) {

    }

    function hasMany(field, values) {
      values = values || [];
      var model = getModelName(field);
      checkModelExist(model);
      var out = [];
      values.forEach(function(value) {
        var child = Store.find(model, value);
        if (child)
          out.push(child);
      });

      return out;
    }

    function getModelName(name) {
      return self.namespace + '.' + name.singularize().camelize();
    }

    function checkModelExist(model) {
      if (!self.transforms[model]) {
        throw ('Model ' + model + ' does not exist')
      }
    }

    function deserialize(model, data) {

    }

    function serialize(model, data) {
      var fields = self.transforms[model].fields;
      var out = {}
      for (var key in fields) {
        var relationShips = fields[key].split(self.delimeter);
        var field = relationShips[0];
        switch (field) {
          case 'attr':
            out[key] = attr(key, data, relationShips[1]);
            break;
          case 'belongsTo':
            out[key] = belongsTo(key, data[key]);
            break;
          case 'hasOne':
            out[key] = hasOne(key, data[key]);
            break;
          case 'hasMany':
            out[key] = hasMany(key, data[key]);
            break;
        }
      }
      return out;
    }

    function insert(model, data) {
      Store.insert(model, data);
    }

    return {
      klass: klass,
      transforms: self.transforms,
      // transformData: transformData,
      insert: insert
    };
  });