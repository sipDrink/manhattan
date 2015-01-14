angular.module('app.auth', [])
  .config(function($stateProvider) {
    $stateProvider
      .state('app.auth', {
        url: '/auth',
        templateUrl: 'app/auth/auth.tpl.html',
        controller: 'AuthCtrl as auth'
      });
  })
  .controller('AuthCtrl', function($scope, $state, $actions, $dispatcher, $log,
                                   Auth) {
    this.signIn = function() {
      Auth.signin()
        .then(function(user) {
          // $dispatcher.kickstart(user);
          // $actions.updateMe(user);
          // $state.go('app.main.orders');
          $log.log('signed in against Auth0');
        })
        .catch(function(err) {
          $log.error(err);
        });
    };

  })
  .factory('Auth', function(localStorageService, jwtHelper, $ionicHistory,
                            $actions, $q, $state, auth, $log, $mdSidenav,
                            $dispatcher, $store) {

    var signin = function() {
      var defer = $q.defer();
      auth.signin({
        popup: true,
        // Make the widget non closeable
        standalone: true,
        // This asks for the refresh token
        // So that the user never has to log in again
        connection: ['Username-Password-Authentication'],
        authParams: {
          scope: 'openid offline_access'
        }
      }, function(profile, idToken, accessToken, state, refreshToken) {
        localStorageService.set('token', idToken);
        localStorageService.set('refreshToken', refreshToken);
        if (!profile.auth_key) {
          profile.auth_key = profile.user_id;
          // there should always be an auth_key property on what we get back from auth0
          // if there isnt:
            // set auth_key to 'auth0|####'
        }
        $actions.receiveUser(profile);
        // load bar data into $store
        $actions.loadDrink();
        $actions.loadOrders();
        $dispatcher.kickstart($store.getUser());
        $state.go('app.main.orders');
        defer.resolve(profile);
      }, function(error) {
        defer.reject(error);
        $log.error('There was an error logging in', error);

      });
      return defer.promise;
    };

    var signout = function() {
      auth.signout();
      $actions.reset();
      localStorageService.remove('profile');
      localStorageService.remove('token');
      localStorageService.remove('refreshToken');
      // $mdSidenav('left').close();
      $ionicHistory.clearCache();
      $state.go('app.auth');
    };

    return {
      signin: signin,
      signout: signout
    };
  });
