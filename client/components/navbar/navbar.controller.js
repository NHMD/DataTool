'use strict';

angular.module('specifyDataCleanerApp')
	.controller('NavbarCtrl', function($rootScope, $scope, $location, Auth, Collection, Discipline, Icons) {
		$scope.menu = [{
			'title': 'Data sets',
			'link': '/datasets'
		}, {
			'title': 'Tree upload',
			'link': '/tree-upload'
		}];

		$scope.isCollapsed = true;
		$scope.isLoggedIn = Auth.isLoggedIn;
		$scope.isAdmin = Auth.isAdmin;
		$scope.getCurrentUser = Auth.getCurrentUser;
		$scope.user;
		$scope.logout = function() {
			$scope.collections = undefined;
			Auth.logout();
			$location.path('/login');
		};

		$scope.isActive = function(route) {
			return route === $location.path();
		};

		$scope.getCurrentUser(function(user) {
			$scope.user = user;
			$scope.collections = Collection.getFromSpecifyuser();
			
		});

		$scope.$watch(Auth.isLoggedIn, function(newval, oldval) {
		
				$scope.collections = Collection.getFromSpecifyuser();
				$scope.collections.$promise.then(function() {
					$rootScope.fields.selectedCollection = $scope.collections[0];
				});

		})

		$rootScope.fields = {
			selectedCollection: undefined
		};

		$scope.getCollectionLabel = function(collection) {
			var imgpath = Icons.discipline.get(collection.discipline.Type);
			return '<img src="' + imgpath + '" class="specify-icon-24"> ' + collection.CollectionName;
		};


	});
