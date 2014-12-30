 /**
* app.main Module
*
* Description
*/
angular.module('app.main', [
  'app.main.drinkMenu',
  'app.main.orders'
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

    this.signout = function() {
      Auth.signout();
    };

    // this.nav = function(what){
    //   $log.log('$mdSidenav ', what);
    //   $mdSidenav('left')[what]();
    // };

    // this.goAndClose = function(state) {
    //   this.nav('close');
    //   $state.go(state);
    // };

    // this.goBack = function(event) {
    //   $log.log('going back', event);
    //   $ionicHistory.goBack(event);
    // };

    // this.getPrevTitle = function() {
    //   return $ionicHistory.backTitle();
    // };
  });

