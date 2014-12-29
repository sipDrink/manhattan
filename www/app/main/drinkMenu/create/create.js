angular.module('app.main.drinkMenu.create', [])
  .config(function($stateProvider) {
      $stateProvider
        .state('app.main.create', {
          url: '/drinkMenu/create',
          views:{
            'menuContent':{
              templateUrl: 'app/main/drinkMenu/create/create.tpl.html',
              controller: 'CreateCtrl'
            }
          }
        });
  })
  .controller('CreateCtrl', function($scope, $actions, $store){
    $store.bindTo($scope, function(){
      $scope.categories = $store.getCategories();
      
    });
  });


