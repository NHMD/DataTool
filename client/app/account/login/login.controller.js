'use strict';

angular.module('specifyDataCleanerApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, $window, $cookieStore) {
    $scope.user = {};
    $scope.errors = {};

	var rememberMe = $cookieStore.get('rememberMe');
	if (rememberMe) {
		$scope.user.email = rememberMe.m;
		$scope.user.password = rememberMe.p;
		$scope.user.rememberMe = true;
	}
	
    $scope.login = function(form) {

		if ($scope.user.rememberMe) {
			$cookieStore.put('rememberMe', { 'm' : $scope.user.email, 'p' : $scope.user.password} );
		} else {
			$cookieStore.remove('rememberMe');
		}

      $scope.submitted = true;

      if(form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then( function() {
          // Logged in, redirect to home
          $location.path('/');
        })
        .catch( function(err) {
          $scope.errors.other = err.message;
        });
      }
    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };
  });
