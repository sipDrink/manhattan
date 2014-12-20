angular.module('app.main.drinkMenu', [])
	.config(function($stateProvider) {
	    $stateProvider
	      .state('app.main.drinkMenu', {
	        url: '/drinkMenu',
	        templateUrl: 'app/main/drinkMenu/drinkMenu.tpl.html',
	        controller: 'InventoryCtrl as inventories'
	      });
	})
	.controller('InventoryCtrl', function($scope, $state, $actions){
	});