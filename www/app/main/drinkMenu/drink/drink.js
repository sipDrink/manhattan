angular.module('app.main.drinkMenu.drink', [])
.config(function($stateProvider) {
  $stateProvider
    .state('app.main.drink', {
      url: '/drinkMenu/:drinkId',
      views: {
        'menuContent': {
          templateUrl: 'app/main/drinkMenu/drink/drink.tpl.html',
          controller: 'DrinkCtrl'
        }
      }
    });
})
.controller('DrinkCtrl', function($scope, $actions, $store, $stateParams){
 
});
