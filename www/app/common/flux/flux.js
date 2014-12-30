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
     'toggleReorder',
     'addDrink',
     'deleteDrink'
    ]);
  })
  .factory('$store', function(flux, $actions, $dispatcher, localStorageService, $log, ngGeodist, $filter) {

    // here we return our store to be accessed by those taking in a $store obj
    return flux.store({
      // these actions will map to handlers with the same name that will be run
        // when an action is triggered
      actions: [
        $actions.receiveUser,
        $actions.reset,
        $actions.toggleDelete,
        $actions.toggleReorder,
        $actions.addDrink,
        $actions.deleteDrink
      ],

      // these are the actual stores of the data in $store
      user: localStorageService.get('profile') || {},
      listOpts:{
        showDelete: false,
        showReorder: false,
        shouldSwipe: true
      },
      //drinks are used for testing
      drinks:[
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

     // orders: {},
     //orders are used for testing
     orders:[
       { name: 'Grey Goose',category: 'Shot', price: 80 },
       { name: '2012 Caynus Cabernet Sauvignon', category: 'Wine', price:18 },
       { name: 'Captain Morgan', category: 'Rum', price:43 },
       { name: 'Fireball', category: 'Whisky', price: 32},
       { name: '2009 Doninus Napa Valley Bordeaux Blend', category: 'Wine', price:23}
     ],

      receiveUser: function(nUser) {
        _.extend(this.user, nUser);
        localStorageService.set('profile', this.user);
        this.emitChange();
      },

      reset: function() {
        this.user = {};
        // this.orders = {};
        this.emitChange();
      },

      /* for drinkMenu */
      toggleDelete: function(){
        this.listOpts.showDelete = !this.listOpts.showDelete;
        this.listOpts.showReorder = false;
        this.emitChange();
      },

      toggleReorder: function(){
        this.listOpts.showDelete = false;
        this.listOpts.showReorder = !this.listOpts.showReorder; 
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
  .factory('$dispatcher', function(PubNub, $rootScope, $log, CONFIG, $actions, $rootScope){
    // _alias should always be 'vendor' for this app
    var _alias = CONFIG.alias;
    var userGlobal = 'broadcast_user';
    // guarantees that the only messages the app acts on are directed at 'vendor'
    var _pnCb = function(message) {
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
        $log.log('kickstart');
      },

      sub: function(channel) {
        $log.log('subscribing to ' +channel);
        PubNub.ngSubscribe({
          channel: channel,
          callback: _pnCb,
          error: function(e) {
            $log.error(e);
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
