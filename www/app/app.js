// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [
  'ionic',
  'app.common',
  'app.main',
  'app.auth',
  'app.main.menu',
  'ngMaterial',
  'ngCordova',
  'pubnub.angular.service',
  'ngResource', 'angular-jwt',
  'LocalStorageModule', 'flux',
  'auth0', 'ngGeodist'
  ])
.config(function($stateProvider, $urlRouterProvider, authProvider) {
  // $httpProvider.interceptors.push('jwtInterceptor');

  $urlRouterProvider.otherwise('/auth');
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
.controller('AppController', function($scope) {
  // $store.bindTo($scope, function() {
  //   this.user = $store.getUser();
  // }.bind(this));
})
.run(function($ionicPlatform, auth) {
  auth.hookEvents();

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
