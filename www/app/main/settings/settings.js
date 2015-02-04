angular.module('app.main.settings', [])
  .config(function($stateProvider) {
    $stateProvider
      .state('app.main.settings', {
        url: '/settings',
        views: {
          'menuContent': {
            templateUrl: 'app/main/settings/settings.tpl.html',
            controller: 'SettingsCtrl as Settings'
          }
        }
    });
  })
  .controller('SettingsCtrl', function($scope, $actions, $store, $log) {
    
  });
