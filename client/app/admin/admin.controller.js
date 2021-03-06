'use strict';

angular.module('specifyDataCleanerApp')
  .controller('AdminCtrl', ['$scope', '$http', '$modal', 'Auth', 'User', 'SpecifyUser', 
				function ($scope, $http, $modal, Auth, User, SpecifyUser) {

    // Use the User $resource to fetch all users
	$scope.users = User.query();

    $scope.delete = function(user) {
		User.remove({ id: user._id });
		angular.forEach($scope.users, function(u, i) {
			if (u === user) {
				$scope.users.splice(i, 1);
			}
		});
	};

	$scope.currentUser = null;

	$scope.editPasswordModal = $modal({
		scope: $scope,
		template: 'app/admin/password.modal.html',
		show: false
	});	

	$scope.editPassword = function(user) {
		$scope.currentUser = user;
		$scope.editPasswordModal.show();
	};

	$scope.updatePassword = function() {
		$scope.currentUser.password = document.querySelector('#new-password').value;
		User.update(
			{id : $scope.currentUser._id },
			$scope.currentUser
		);
 	}

	//specifyusers
	$scope.specifyusers = [];

	$scope.isDataToolUser = function(specifyUserId) {
		for (var index=0;index<$scope.users.length;index++) {
			var user = $scope.users[index];
			if (user.specifyUserId == specifyUserId) {
				return true;
			};
			if (index+1 == $scope.users.length) {
				return false;
			}
		}
	};
		
	SpecifyUser.query().$promise.then(function(specifyusers) {
		angular.forEach(specifyusers, function(specifyuser) {
			$scope.specifyusers.push({
				specifyUserId : specifyuser.SpecifyUserID,
				name : specifyuser.Name || '',
				email : specifyuser.EMail || '',
				usertype : specifyuser.UserType || 'Guest',
				created : specifyuser.TimestampCreated || '2000-01-01 00:00:00',
				//show created as danish date, perhaps we should have a localisation settings object
				createdDisplay : new Date(specifyuser.TimestampCreated).toLocaleDateString('da-dk') 
			});
		});
	})
	.then(function() {
		$scope.displayedSpecifyusers = [].concat($scope.specifyusers);
	});

    $scope.addSpecifyUser = function(specifyuser) {
		var user = {
			id : null,
			name : specifyuser.name,
			email : specifyuser.email,
			role : specifyuser.usertype,
			specifyUserId : specifyuser.specifyUserId,
			isSpecifyuser : true,
			password : 'password' //preliminary password?
		}
		User.save(user);
		$scope.users = User.query();
    };

}]);

