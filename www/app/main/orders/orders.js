angular.module('app.main.orders', [])
  .config(function($stateProvider) {
    $stateProvider
      .state('app.main.orders', {
        url: '/orders',
        views: {
          'menuContent': {
            templateUrl: 'app/main/orders/orders.tpl.html',
            controller: 'OrdersCtrl'
          }
        }
    });
  })
  .controller('OrdersCtrl', function($scope, $actions, $store){
    $store.bindTo($scope, function(){
      $scope.opts = $store.getListOpts();
      $scope.orders = $store.getOrders();
    });
  });
