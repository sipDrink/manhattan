/**
* sip.common.streams Module
*
* Core PubNub service
*/
angular.module('app.common.flux', [
  'app.common.flux.mixins'
])
  .factory('$actions', function(flux) {
    console.log('actions flux factory loaded');
    return flux.actions([
      'receiveUser',
      'reset',
      'toggleDelete',
      'addDrink',
      'deleteDrink',
      'changeOrderStatus',
      'receiveOrder',
      'cancelEdit',
      'confirmEdit'
    ]);
  })
  .factory('$store', function(flux, $actions, $dispatcher, localStorageService, $log, ngGeodist, $filter, $timeout) {

    // here we return our store to be accessed by those taking in a $store obj
    return flux.store({
      // these actions will map to handlers with the same name that will be run
        // when an action is triggered
      actions: [
        $actions.receiveUser,
        $actions.reset,
        $actions.toggleDelete,
        $actions.addDrink,
        $actions.deleteDrink,
        $actions.changeOrderStatus,
        $actions.receiveOrder,
        $actions.cancelEdit,
        $actions.confirmEdit
      ],

      // these are the actual stores of the data in $store
      user: localStorageService.get('profile') || {},
      original:{},
      listOpts: {
        showDelete: false,
        shouldSwipe: true
      },
      //drinks are used for testing
      drinks: [
        { name: 'Grey Goose',category: 'Shot', price: 80 },
        { name: '2012 Caynus Cabernet Sauvignon', category: 'Wine', price:18 },
        { name: 'Captain Morgan', category: 'Rum', price:43 },
        { name: 'Fireball', category: 'Whisky', price: 32},
        { name: '2009 Doninus Napa Valley Bordeaux Blend', category: 'Wine', price:23}
      ],
      categories: [
        'Shot', 'Wine', 'Beer', 'Whisky', 'Scotch',
        'Cognac', 'Vodka', 'Tequila', 'Rum'
      ],
     
     //orders: {} are used for testing
     orders: [
       { drinks: [{ name: 'Grey Goose',category: 'Shot', price: 80, quantity: 4},
                  { name: '2012 Caynus Cabernet Sauvignon', category: 'Wine', price:18 , quantity: 3},
                  { name: 'Grey Goose',category: 'Shot', price: 80, quantity: 4},
                  { name: '2012 Caynus Cabernet Sauvignon', category: 'Wine', price:18, quantity: 1},
                  { name: 'Captain Morgan', category: 'Rum', price:43, quantity: 1},
                  { name: 'Fireball', category: 'Whisky', price: 32, quantity: 1}],
         customer: {name: 'Jessica'},
         _id: '1234a',
         status: 'paidFor'},
       { drinks: [{ name: 'Grey Goose',category: 'Shot', price: 80, quantity: 8},
                  { name: '2012 Caynus Cabernet Sauvignon', category: 'Wine', price:18 , quantity: 5}],
         customer: {name: 'Daniel'},
         _id: '1244a',
         status: 'paidFor'},
       { drinks: [{ name: 'Grey Goose',category: 'Shot', price: 80, quantity: 1},
                  { name: '2012 Caynus Cabernet Sauvignon', category: 'Wine', price:18, quantity: 4},
                  { name: 'Captain Morgan', category: 'Rum', price:43, quantity: 1},
                  { name: 'Fireball', category: 'Whisky', price: 32, quantity: 2}],
         customer: {name: 'Louie'},
         _id: '2234a',
         status: 'paidFor'},
       { drinks: [{ name: 'Grey Goose',category: 'Shot', price: 80, quantity: 4},
                  { name: '2012 Caynus Cabernet Sauvignon', category: 'Wine', price:18, quantity: 1},
                  { name: 'Captain Morgan', category: 'Rum', price:43, quantity: 1},
                  { name: 'Fireball', category: 'Whisky', price: 32, quantity: 1}],
         customer: {name: 'Wuwu'},
         _id: '3324a',
         status: 'paidFor'}
     ],

      //temp storage for timeouts to be executed for drink orders
      promises: {

      },

      reset: function() {
        $log.log('resetting $store');
        this.user = {};
        this.drinks = [];
        this.orders = [];
        this.categories = [];
        this.listOpts = {};
        this.emitChange();
      },

      /* CHANGE emitChange() to be more specific */
      /* for auth */
      receiveUser: function(profile) {
        // receives profile data from auth0 and sets it to $store.user
        _.extend(this.user, profile);
        localStorageService.set('profile', this.user);
        $log.log('receiving user data to store to ls.profile', this.user);
        this.emitChange();
      },

      /* for drinkMenu */
      toggleDelete: function(){
        this.listOpts.showDelete = !this.listOpts.showDelete;
        this.listOpts.showReorder = false;
        this.emitChange();
      },

      addDrink: function(){
        this.listOpts.showDelete = false;
        this.listOpts.showReorder = false;
        this.drinks.push({id: this.drinks.length});
        this.emitChange();
      },

      deleteDrink: function(index){
        this.drinks.splice(index, 1);
        this.emitChange();
      },
      
      /* for drink */
      confirmEdit: function(drink){
        var index = drink.index;
        this.drinks[index].name = drink.name;
        this.drinks[index].category = drink.category;
        this.drinks[index].price = drink.price;
        this.emitChange();
      },

      cancelEdit: function(){
        //the change won't be saved, but need to update the view
        this.emitChange();
      },

      /* for orders */
      changeOrderStatus: function(orderIndex, status) {

        var orderId = this.orders[orderIndex]._id;
        var self = this;

        //cancel timeout if it exists in our promises storage
        if(this.promises[orderId]){
          $timeout.cancel(this.promises[orderId]);
        }

        this.orders[orderIndex].status = status;

        this.emitChange();

        //save promise to temp storage in case if we want to cancel it later
        if(status === 'redeemed'){
          var timeout = $timeout(function() {
            self.orders.splice(orderIndex,1);
            delete self.promises[orderId]; //delete the promise if order is removed
            self.emitChange();
          }, 3000);
          this.promises[orderId] = timeout;
        }
      },

      receiveOrder: function(order) {
        this.orders.push(order);
        $log.log(this.orders);
        this.emit('order:added');
        this.emitChange();
      },

      /* GETTERS */
      exports: {
        getUser: function() {
          return this.user;
        },
        getListOpts: function(){
          return this.listOpts;
        },
        getDrinks: function(){
          return this.drinks;
        },
        getOrders: function(){
          return this.orders;
        },
        getCategories: function(){
          return this.categories;
        }

      }
    });
  })
  .factory('$dispatcher', function(PubNub, $rootScope, $log, CONFIG, $actions){
    // _alias should always be 'vendor' for this app
    var _alias = CONFIG.alias;
    var userGlobal = 'broadcast_user';
    // guarantees that the only messages the app acts on are directed at 'vendor'
    var _pnCb = function(message) {
      // $log.log('received message:', message);
      if (message.to === _alias) {
        _.forEach(message.actions, function(args, action) {
          $actions[action](args);
        });
      }
    };

    var pbFlux = {
      kickstart: function(user) {
        /*
          @auth - auth key created by server for each user
                  upon authentication.
        */
        PubNub.init({
          publish_key: 'pub-c-e7567c4a-b42c-4a6d-af64-b9e6db79424d',
          subscribe_key: 'sub-c-e72ce3bc-6960-11e4-8e76-02ee2ddab7fe',
          auth_key: user.auth_key,
          restore: true
        });
        pbFlux.sub(user.private_channel);
        // subscribe to global users channel
        // will be used for future features
        pbFlux.sub(userGlobal);
        $log.log('kickstart', user);
      },

      sub: function(channel) {
        $log.log('subscribing to ' +channel);
        PubNub.ngSubscribe({
          channel: channel,
          callback: _pnCb,
          error: function(e) {
            $log.error('error subscribing to channel:', channel, 'with error:', e);
          }
        });
      },

      pub: function(message, channel) {
        message.from = _alias;
        message.to = 'API';

        PubNub.ngPublish({
          channel: channel,
          message: message,
          callback: function() {
            $log.log('pubbed');
          }
        });
      }
    };

    return pbFlux;
  });
