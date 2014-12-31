angular.module('app.main.drinkMenu', [
	'app.main.drinkMenu.create',
	'app.main.drinkMenu.drink'
	])
	.config(function($stateProvider) {
	  $stateProvider
	    .state('app.main.drinkMenu', {
	      url: '/drinkMenu',
	      views:{
	     	'menuContent':{
		       templateUrl: 'app/main/drinkMenu/drinkMenu.tpl.html',
		       controller: 'DrinkMenuCtrl as drinkMenu'
	      	}
	      }
	    });
	})
	.controller('DrinkMenuCtrl', function($scope, $store, $actions, $ionicModal, $log){

    $store.bindTo($scope, function() {
      $scope.opts = $store.getListOpts();
      $scope.drinks = $store.getDrinks();
    });

    //calling actions from the view
    $scope.toggleDelete = function(){
      $actions.toggleDelete();
    };

    $scope.toggleReorder = function(){
      $actions.toggleReorder();
    };

    $scope.addDrink = function(){
      $actions.addDrink();
    };

    $scope.moveItem = function(item, fromIndex, toIndex) {
      $actions.moveItem(item, fromIndex, toIndex);
    };

    $scope.deleteDrink = function(index) {
      $actions.deleteDrink(index);
      $log.log($scope.drinks);
		};

    $ionicModal.fromTemplateUrl('app/main/drinkMenu/drink/drink.tpl.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.editDrink = function(index) {
      $scope.modal.show();
      $scope.target= $scope.drinks[index];
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
    };

    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });

    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });

    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });

  });