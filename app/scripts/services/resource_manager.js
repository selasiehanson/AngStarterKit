var app = angular.module("angularStarterKitApp");
window.app = app
app.service("ResMgr", ['$q', '$http', '$rootElement', function ($q, $http, $rootElement) {
  return {
    models: {},
    getName: function(model) {
      return model.underscore().singularize().camelize();
    },
    getModel: function (model, config) {
      config = config || {};
      config.name = model = this.getName(model);
      if(!config.url) config.url           = model.underscore().pluralize();
      if(!config.key) config.key           = config.url.singularize();
      if(!config.display) config.display   = model.underscore().titleize();
      if(!config.displays) config.displays = config.url.titleize();
      return config;
    },
    register: function (model, api_url, params, config) {
      model = this.getName(model);
      params = params || {id: '@id'};
      config = config || {};
      api_url = api_url || 'api/' + model.toLowerCase().pluralize() + '/:id'
      console.log(api_url)
      if(!this.models[model]) {
        console.log('-----Registering------')
        var y = app.factory(model, ['$resource', function ($resource) {
          var x = $resource(api_url, params, {      
            query: { method: 'GET', isArray: false },
            update: { method: 'PUT' }
          });
          console.log("this is our resource");
          console.log(x);
          return x;
        }]);
        window.y = y
        console.log(app._invokeQueue);
        this.models[model] = this.getModel(model, config);
        this.models[model]["api_url"] = api_url;
        // this.models[model]["klass"] = $rootElement.injector().get(model);
        // this.models[model]["klass"] = angular.injector(['ng', 'angularStarterKitApp']).get(model);
      }
      return this.models[model];
    },
    query: function (model, data, callback) {
      return this.get(model, data, callback);
    },
    get: function (model, data, callback) {
      var d = $q.defer();
      model = this.getName(model);
      this.models[model]["klass"].get(data, function (res) {
        res.success? d.resolve(res) : d.reject(res);
        callback && callback(res);
      });
      return d.promise;
    },
    create: function (model, data, callback) {
      var d = $q.defer();
      model = this.getName(model);
      new this.models[model]["klass"](data).$save(function (res) {
        res.success? d.resolve(res) : d.reject(res);
        callback && callback(res);
      });
      return d.promise;
    },
    update: function (model, data, callback) {
      var d = $q.defer();
      model = this.getName(model);
      new this.models[model]["klass"](data).$update(function (res) {
        res.success? d.resolve(res) : d.reject(res);
        callback && callback(res);
      });
      return d.promise;
    },
    delete: function (model, data, callback) {
      var d = $q.defer();
      model = this.getName(model);
      new this.models[model]["klass"](data).$delete(function (res) {
        res.success? d.resolve(res) : d.reject(res);
        callback && callback(res);
      });
      return d.promise;
    }
  };
}]);
