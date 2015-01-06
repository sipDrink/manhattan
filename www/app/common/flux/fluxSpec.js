describe('Module: app.common.flux', function(){
  var $scope, $rootScope, flux, $actions, $store;
  beforeEach(module('app.common.flux'));
  beforeEach(module('flux'));
  beforeEach(module('pubnub.angular.service'));
  beforeEach(module('LocalStorageModule'));
  beforeEach(module('ngGeodist'));
  

  beforeEach(inject(function($injector){
    $rootScope = $injector.get('$rootScope');
    $scope = $rootScope.$new();
    flux = $injector.get('flux');
    $actions = $injector.get('$actions');
    $store = $injector.get('$store');
  }));

  it('should have add, delete, edit drinks methods', function(){
    expect($actions).to.have.property('addDrink');
    expect($actions).to.have.property('deleteDrink');
    expect($actions).to.have.property('editDrink');
  });

  it('should have cancelEdit and confirmEdit methods', function(){
    expect($actions).to.have.property('cancelEdit');
    expect($actions).to.have.property('confirmEdit');
  });

  it('should have changeOrderStatus method', function(){
    expect($actions).to.have.property('changeOrderStatus');
  });

  it('should delete a drink', function(){
    var drink = { name: '2012 Caynus Cabernet Sauvignon', category: 'Wine', price:18 }
    $actions.deleteDrink(drink, 0);
    var drinks = $store.getDrinks();
    expect(drinks['wine'].indexOf(drink)).to.equal(-1);
    console.log(drinks['wine']);
  });
});