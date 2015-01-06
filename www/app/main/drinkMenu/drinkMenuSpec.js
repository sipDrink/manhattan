describe('Module: app.main.drinkMenu', function(){

  beforeEach(module('app.main.drinkMenu'));
  beforeEach(module('app.common.flux'));
  beforeEach(module('ionic'));
  beforeEach(module('flux'));
  beforeEach(module('pubnub.angular.service'));
  beforeEach(module('LocalStorageModule'));
  beforeEach(module('ngGeodist'));

  var $controller, $store, $actions, 
  $rootScope, $scope, caller;


  beforeEach(inject(function($injector){
    $controller = $injector.get('$controller');
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    $actions = $injector.get('$actions');
    $store = $injector.get('$store');

    var createController = function(){
      return  $controller('DrinkMenuCtrl', {
                $scope: $scope,
                $store: $store,
                $actions: $actions
              });
    };

    caller = createController();
  }));

  // describe('DrinkMenuCtrl.deleteDrink', function(){
  //   it('should delete a drink', function(){

  //     var drink = { name: '2012 Caynus Cabernet Sauvignon', category: 'Wine', price:18 };
  //     caller.deleteDrink(drink, 0);
  //     $scope.drinks = $store.getDrinks();
  //     expect($scope.drinks['wine'].indexOf(drink)).to.equal(-1);
  //     console.log($scope.drinks['wine']);
  //   });
  // });
});