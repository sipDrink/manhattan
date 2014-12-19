angular.module('app.auth', [])
  .config(function($stateProvider) {
    $stateProvider
      .state('app.auth', {
        url: '/auth',
        templateUrl: 'app/auth/auth.tpl.html',
        controller: 'AuthCtrl as auth'
      });
  })
  .controller('AuthCtrl', function($scope, $state, $actions, $dispatcher, $log, Auth) {
    this.signIn = function() {
      Auth.signin()
        .then(function(user) {
          // $dispatcher.kickstart(user);
          // $actions.updateMe(user);
//          $state.go('sip.main.bars.list');
          $log('signed in against Auth0');
        })
        .catch(function(err) {
          $log.error(err);
        });
    };

    this.signUp = function() {
      Auth.signup()
        .then(function(user) {
          $log('signed up with Auth0');
        })
        .catch(function(err) {
          $log.error(err);
        });
    }
  })
  .factory('Auth', function(localStorageService, jwtHelper, $ionicHistory, $actions, $q, $state, auth, $log, $mdSidenav) {

    var signup = function() {
      console.log('calling signup');
      var defer = $q.defer();
      auth.signup({
        popup: true,
        // Make the widget non closeable
        standalone: true,
        // This asks for the refresh token
        // So that the user never has to log in again
        authParams: {
          scope: 'openid offline_access'
        },
      }, function(profile, idToken, accessToken, state, refreshToken) {
        localStorageService.set('token', idToken);
        localStorageService.set('refreshToken', refreshToken);
        if (!profile.auth_key) {
          profile.auth_key = profile.identities[0].access_token;
          $log.log('auth_key', profile.auth_key);
        }

        $log.log('CHANNEL', profile.private_channel);
        localStorageService.set('profile', profile);
        $actions.receiveUser(profile);
        defer.resolve(profile);
        // $state.go('sip.main.bars.list');
      }, function(error) {
        defer.reject(error);
        $log.error("There was an error logging in", error);
      });
      return defer.promise;
    };

    var signin = function() {
      var defer = $q.defer();
      auth.signin({
        popup: true,
        // Make the widget non closeable
        standalone: true,
        // This asks for the refresh token
        // So that the user never has to log in again
        authParams: {
          scope: 'openid offline_access'
        },
        disableResetAction: false,
        disableSignupAction: false
      }, function(profile, idToken, accessToken, state, refreshToken) {
        localStorageService.set('token', idToken);
        localStorageService.set('refreshToken', refreshToken);
        if (!profile.auth_key) {
          profile.auth_key = profile.identities[0].access_token;
          $log.log('auth_key', profile.auth_key);
        }

        $log.log('CHANNEL', profile.private_channel);
        localStorageService.set('profile', profile);
        $actions.receiveUser(profile);
        defer.resolve(profile);
        // $state.go('sip.main.bars.list');
      }, function(error) {
        defer.reject(error);
        $log.error("There was an error logging in", error);
      });
      return defer.promise;
    };

    return {
      signup: signup,
      signin: signin
    };
  });
