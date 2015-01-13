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
        controller: 'MainCtrl as main'/*,
        data: {
          requiresLogin: true
        }
        */
      });
  })
  .controller('MainCtrl', function($scope, $mdSidenav, $state, $dispatcher,
                                   $ionicPopover, $ionicHistory, $log,
                                   $rootScope, $store, Auth) {

    // $dispatcher.kickstart($store.getUser());
    this.signout = function() {
      Auth.signout();
    };

    this.activateItem = function(id) {
      this.active_order = '';
      this.active_menu = '';
      this.active_settings = '';
      switch (id) {
        case 1:  this.active_order = 'act';
          break;
        case 2:  this.active_menu = 'act';
          break;
        case 3:  this.active_settings = 'act';
          break;
      }
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
