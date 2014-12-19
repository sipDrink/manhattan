/**
* sip.common.flux.mixins Module
*
* Store and Action mixins for resources
*/
angular.module('app.common.flux.mixins', [])
  .factory('UserMixin', function($actions, $dispatcher, $log, localStorageService) {
    // Mixin for user actions and state
    var UserMixin = {

    };

    return UserMixin;
  })
  .factory('BarMixin', function($actions, $dispatcher) {
    var BarMixin = {

    };

    return BarMixin;
  })
  .factory('StateMixin', function(localStorageService) {

    return {
      user: localStorageService.get('profile') || {},
      bars: []
    };
  });
