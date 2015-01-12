angular.module('app.common', ['app.common.flux'])
  .constant('CONFIG', {
    alias: 'vendor' // used for PUBNUB channels
  });
