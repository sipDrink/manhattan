 /**
* app.main Module
*
* Description
*/
angular.module('app.main', [
  'app.main.drinkMenu'
])
.config(function($stateProvider) {
  $stateProvider
    .state('app.main', {
      url: '/main',
      abstract: true,
      templateUrl: 'app/main/main.tpl.html',
      controller: 'MainCtrl as main'
    });
})
.controller('MainCtrl', function($scope, $mdSidenav, $state, $dispatcher, $ionicPopover, $ionicHistory, $log, $rootScope, $store, Auth) {

  $dispatcher.kickstart($store.getUser());
  this.signout = function() {
    Auth.signout();
  };

  this.nav = function(what){
    $log.log('$mdSidenav ', what);
    $mdSidenav('left')[what]();
  };

  this.goAndClose = function(state) {
    this.nav('close');
    $state.go(state);
  };

  this.goBack = function(event) {
    $log.log('going back', event);
    $ionicHistory.goBack(event);
  };

  this.getPrevTitle = function() {
    return $ionicHistory.backTitle();
  };
})
.controller('LeftCtrl', function($scope, $ionicSideMenuDelegate){

  $scope.toggleLeft = function() {
  	console.log('toggle left');
    $ionicSideMenuDelegate.toggleLeft();
  };
})
