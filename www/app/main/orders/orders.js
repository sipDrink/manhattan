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
  .controller('OrdersCtrl', function($scope, $actions, $store,
                                     $ionicSlideBoxDelegate) {
    var status = ['paidFor', 'processed', 'redeemed'];
    var statusInts = {
      'paidFor': 0,
      'processed': 1,
      'redeemed': 2
    };

    var updateOrders = function() {
      $scope.orders = $store.getOrders();
      if ($scope.orders && $scope.orders.length > 0) {
        $scope.orders.forEach(function (order) {
          order.status = statusInts[order.status];
        });
      }
    };

    $scope.$on('orders:changed', function() {
      updateOrders();
    });

    //resize slider when switching to Order view 
    $scope.$on('$ionicView.beforeEnter', function() { 
      $ionicSlideBoxDelegate.$getByHandle('slideHandle').update();
     });

    $scope.changeStatus = function(orderIndex, index) {
      $actions.changeOrderStatus(orderIndex, status[index]);
    };
  });
