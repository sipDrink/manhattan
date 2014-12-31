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

	  $scope.toggleDelete = function(){
  		$actions.toggleDelete();
	  };
	  
	  $scope.addDrink = function(){
		$actions.addDrink();
	  };

	  $scope.deleteDrink = function(index) {
	    $actions.deleteDrink(index);
	    console.log($scope.drinks);
	  };

	  $ionicModal.fromTemplateUrl('app/main/drinkMenu/drink/drink.tpl.html', {
	    scope: $scope,
	    animation: 'slide-in-up'
		}).then(function(modal) {
	    $scope.modal = modal;
	  });
	  
	  $scope.editDrink = function(index) {
	    $scope.target= $scope.drinks[index];
	    $scope.target.index = index;
	    $scope.modal.show();
	  };

  });
