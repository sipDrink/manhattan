// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [
  'ionic',
  'app.common',
  'app.main',
  'app.auth',
  'ngMaterial',
  'ngCordova',
  'pubnub.angular.service',
  'ngResource', 'angular-jwt',
  'LocalStorageModule', 'flux',
  'auth0', 'ngGeodist'
  ])
  .config(function($stateProvider, $urlRouterProvider, authProvider) {

    $urlRouterProvider.otherwise('/main/drinkMenu');

    $stateProvider
      .state('app', {
        abstract: true, //not sure what this does yet
        url: '',
        template: '<ion-nav-view></ion-nav-view>',
        controller: 'AppController as app'
      });

    authProvider.init({
      domain: 'sipdrink.auth0.com',
      clientID: 'avcSZW5cgrgNHUm493pnRxIvCstzdnNs',
      loginState: 'app.auth'
    });

  })
  .controller('AppController', function($scope, $store, $log) {

    $store.bindTo($scope, function() {
      // sets AppController's $scope.user to $store.user
      this.user = $store.getUser();
      $log.log('AppController heard a change on $store');
    }.bind(this));

  })
  .run(function($ionicPlatform, $log, $state, auth) {
    auth.hookEvents();

    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });
