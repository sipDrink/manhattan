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
    
    $scope.cancelEdit = function(){
      $actions.cancelEdit();
      $scope.closeModal();
    };

    $scope.confirmEdit = function(){
      $actions.confirmEdit($scope.target);
      $scope.closeModal();
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    //Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });
  });
