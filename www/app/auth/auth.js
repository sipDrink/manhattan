angular.module('app.auth', [])
.config(function($stateProvider) {
  $stateProvider
    .state('app.auth', {
      url: '/auth',
      templateUrl: 'app/auth/auth.tpl.html',
      controller: 'AuthCtrl as auth'
    });
})
.controller('AuthCtrl', function($scope) {
  this.signIn = function() {
    console.log('signing in');
  };
})