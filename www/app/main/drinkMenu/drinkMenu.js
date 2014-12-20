angular.module('app.main.drinkMenu', [])
	.config(function($stateProvider) {
	    $stateProvider
	      .state('app.main.drinkMenu', {
	        url: '/drinkMenu',
	        templateUrl: 'app/main/drinkMenu/drinkMenu.tpl.html',
	        controller: 'DrinkMenuCtrl as drinkMenu'
	      });
	})
	.controller('DrinkMenuCtrl', function($scope, $state, $actions){
	});