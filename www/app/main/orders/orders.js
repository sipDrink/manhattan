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
    var status = ['paidFor', 'processed', 'redeemed'];
    var statusInts = {
      'paidFor': 0,
      'processed': 1,
      'redeemed': 2
    };

    var updateOrders = function() {
      $scope.orders = $store.getOrders();
      $scope.orders.forEach(function(order) {
        order.status = statusInts[order.status];
      });
    };

    updateOrders();

    $scope.$on('order:added', function() {
      //$scope.opts = $store.getListOpts();
      updateOrders();
    });

    $scope.changeStatus = function(orderIndex, index) {
      console.log(orderIndex, index);
      // needs to:
        // setTimeout before changing orderStatus in store
        // setTimeout before calling $dispatcher.pub changes
      $actions.changeOrderStatus(orderIndex, status[index]);
    };



  });
