'use strict';

angular.module('specifyDataCleanerApp')
	.controller('CsvUploadCtrl', ['$scope', '$http', '$timeout', '$compile', 'FileUploader', 'Csvdataset',
		function($scope, $http, $timeout, $compile, FileUploader, Csvdataset) {
		
			$scope.delimiters = [{value:",",label:"Comma ,"}, {value:";",label:"Semicolon ;"}, {value:":",label:"Colon :"}];
			$scope.delimiter =$scope.delimiters[0].value;
			var uploader = $scope.uploader = new FileUploader({
				url: '/api/fileupload'
			});
			
			
			// FILTERS

			uploader.filters.push({
				name: 'customFilter',
				fn: function(item /*{File|FileLikeObject}*/ , options) {
					return this.queue.length < 10;
				}
			});

			// CALLBACKS

			uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter, options) {
				console.info('onWhenAddingFileFailed', item, filter, options);
			};
			uploader.onAfterAddingFile = function(fileItem) {
				
				console.info('onAfterAddingFile', fileItem);
			};
			uploader.onAfterAddingAll = function(addedFileItems) {
				console.info('onAfterAddingAll', addedFileItems);
			};
			uploader.onBeforeUploadItem = function(item) {
				item.formData.push({csvdelimiter : $scope.delimiter});
				console.info('onBeforeUploadItem', item);
			};
			uploader.onProgressItem = function(fileItem, progress) {
				console.info('onProgressItem', fileItem, progress);
			};
			uploader.onProgressAll = function(progress) {
				console.info('onProgressAll', progress);
			};
			uploader.onSuccessItem = function(fileItem, response, status, headers) {
				console.info('onSuccessItem', fileItem, response, status, headers);
				$scope.collection = Csvdataset.get({
					collectionname: response.collection
				});

				$scope.data = Csvdataset.getData({
					collectionname: response.collection
				}).$promise.then(function(data) {
					
					$scope.data = data;
					$scope.fields = [];
					for (var field in data[0]){
						if (data[0].hasOwnProperty(data[0])) {
							$scope.fields.push(field);
						}
					}
					$scope.isLoading = false;
				});


			};
			uploader.onErrorItem = function(fileItem, response, status, headers) {
				console.info('onErrorItem', fileItem, response, status, headers);
			};
			uploader.onCancelItem = function(fileItem, response, status, headers) {
				console.info('onCancelItem', fileItem, response, status, headers);
			};
			uploader.onCompleteItem = function(fileItem, response, status, headers) {
				console.info('onCompleteItem', fileItem, response, status, headers);
			};
			uploader.onCompleteAll = function() {
				console.info('onCompleteAll');
			};

			console.info('uploader', uploader);


			$scope.callServer = function callServer(tableState) {

				$scope.isLoading = true;

				var pagination = tableState.pagination;

				var offset = pagination.start || 0; // This is NOT the page number, but the index of item in the list that you want to use to display the table.
				var limit = pagination.number || 100; // Number of entries showed per page.


				if ($scope.collection !== undefined) {
					$scope.collection.$promise.then(function() {
						tableState.pagination.numberOfPages = parseInt($scope.collection.count / limit);
						$scope.data = Csvdataset.getData({
							collectionname: $scope.collection.name,
							offset: offset,
							limit: limit
						}).$promise.then(function(data) {
							$scope.data = data;
							$scope.isLoading = false;
						});
					})
				} else {
					tableState.pagination.numberOfPages = 15;
					$scope.data = [];
					$scope.isLoading = false;
				}


			};

		}
	]);
