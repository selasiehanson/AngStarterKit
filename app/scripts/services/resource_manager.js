'use strict';
var app = angular.module('exrails.resourceManager', []);

app.service('ResMgr', ['$q', '$http', '$resource',
  function($q, $http, $resource) {
    return {
      models: {},
      getName: function(model) {
        model = model.replace('-', '_');
        model = model.underscore().split('_');
        model = model.slice(0, model.length - 1).join('_').camelize() + model[model.length - 1].classify();
        return model;
      },
      getUrl: function(model) {
        model = model.underscore().split('_');
        model = model.slice(0, model.length - 1).join('_').camelize() + model[model.length - 1].pluralize().camelize();
        return model.underscore();
      },
      getModel: function(model, config) {
        config = config || {};
        config.name = model = this.getName(model);
        if (!config.url) config.url = this.getUrl(model);
        if (!config.key) config.key = model.underscore();
        if (!config.display) config.display = model.underscore().titleize();
        if (!config.displays) config.displays = config.url.titleize();
        return config;
      },
      register: function(model, apiUrl, params, config) {
        model = this.getName(model);
        params = params || {
          id: '@id'
        };
        config = config || {};
        apiUrl = apiUrl || 'api/' + model.toLowerCase().pluralize() + '/:id';
        var collectionAsArray = (config.collectionAsArray === false) ? false : true;
        if (!this.models[model]) {
          var klass = $resource(apiUrl, params, {
            query: {
              method: 'GET',
              isArray: collectionAsArray
            },
            update: {
              method: 'PUT'
            }
          });
          app.factory(model, function() {
            return klass;
          });
          this.models[model] = this.getModel(model, config);
          this.models[model]['apiUrl'] = apiUrl;
          this.models[model]['klass'] = klass;
        }
        return this.models[model];
      },
      query: function(model, data, callback) {
        var d = $q.defer();
        model = this.getName(model);
        this.models[model]['klass'].query(data, function(response, headers) {
          response.error ? d.reject(response) : d.resolve(response);
          callback && callback(response, headers('_meta_total'));
        }, function(response) {
          console.log(response)
        });
        return d.promise;
      },
      get: function(model, data, callback) {
        var d = $q.defer();
        model = this.getName(model);
        this.models[model]['klass'].get(data, function(response, headers) {
          response.error ? d.reject(response) : d.resolve(response);
          callback && callback(response);
        }, function(response) {
          console.log(response)
        });
        return d.promise;
      },
      create: function(model, data, callback) {
        var d = $q.defer();
        model = this.getName(model);
        new this.models[model]['klass'](data).$save(function(response) {
          response.error ? d.reject(response) : d.resolve(response);
          callback && callback(response);
        }, function(response) {
          console.log(response)
        });
        return d.promise;
      },
      update: function(model, data, callback) {
        var d = $q.defer();
        model = this.getName(model);
        new this.models[model]['klass'](data).$update(function(response) {
          response.error ? d.reject(response) : d.resolve(response);
          callback && callback(response);
        }, function(response) {
          console.log(response)
        });
        return d.promise;
      },
      delete: function(model, data, callback) {
        var d = $q.defer();
        model = this.getName(model);
        new this.models[model]['klass'](data).$delete(function(response) {
          response.error ? d.reject(response) : d.resolve(response);
          callback && callback(response);
        }, function(response) {
          console.log(response)
        });
        return d.promise;
      }
    };
  }
]);