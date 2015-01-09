angular.module('app.main.drinkMenu', [
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

	  $store.bindTo($scope, function(){
	  	$scope.opts = $store.getListOpts();
		$scope.drinks = $store.getDrinks();
		$scope.categories = $store.getCategories();
	  });

	  this.toggleDelete = function(){
  		$actions.toggleDelete();
	  };
	  
	  this.addDrink = function(drink){
      $actions.addDrink(drink);
      //clear input fields for next item
      $scope.$$childHead.$$childHead.drink = {
        category: '',
        name: '',
        price: ''
      };
	  };

	  this.deleteDrink = function(drink, index) {
	    $actions.deleteDrink(drink, index);
	  };

	  $ionicModal.fromTemplateUrl('app/main/drinkMenu/drink/drink.tpl.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
		}).then(function(modal) {
	    $scope.modal = modal;
	  });
	  
	  this.editDrink = function(drink, index) {
	    $actions.editDrink(drink, index);
	    $scope.target = drink;
	    $scope.modal.show();
	  };

  });
