angular.module('app.main.orders', [])
.config(function($stateProvider) {
  $stateProvider
    .state('app.main.orders', {
      url: '/orders',
      views: {
        'menuContent': {
          templateUrl: 'app/main/orders/orders.tpl.html',
          controller: 'OrdersCtrol'
        }
      }
    });
})
.controller('OrdersCtrol', function($scope, $actions, $store){

});
