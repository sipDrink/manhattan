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
      }
    });
})
.controller('OrdersCtrol', function($scope, $actions, $store){
    $store.bindTo($scope, function(){
      //$scope.opts = $store.getListOpts();
      $scope.orders = $store.getOrders();
    });

    var status = ['paidFor', 'processed', 'redeemed'];

    $scope.changeStatus = function(order, index) {
      console.log(order, index);
      $actions.changeOrderStatus(order, status[index]);
    };

  });
