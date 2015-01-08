'use strict';

angular.module('specifyDataCleanerApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, Collection, Discipline, Icons) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },
	{
	      'title': 'Data sets',
	      'link': '/datasets'
	    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };

		if($scope.isLoggedIn()){
			$scope.collections = Collection.query();
		}
	
	
//	$scope.collections = Collection.query();
    $scope.selectedIcon = '';
    
     $scope.icons = [
       {value: 'Gear', label: '<i class="fa fa-gear"></i> Gear'},
       {value: 'Globe', label: '<i class="fa fa-globe"></i> Globe'},
       {value: 'Heart', label: '<i class="fa fa-heart"></i> Heart'},
       {value: 'Camera', label: '<i class="fa fa-camera"></i> Camera'}
     ];
	
  });