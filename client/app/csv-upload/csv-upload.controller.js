'use strict';

angular.module('specifyDataCleanerApp')
	.controller('CsvUploadCtrl', ['Auth', 'User', '$rootScope', '$scope', '$filter', '$http', '$timeout', '$compile', 'FileUploader', 'Csvdataset', 'DataModel', 'Icons', 'TaxonTreeDefItem', 'GeographyTreeDefItem','GeologicTimePeriodTreeDefItem', 'StorageTreeDefItem', 'LithostratTreeDefItem',
		function(Auth, User, $rootScope, $scope, $filter, $http, $timeout, $compile, FileUploader, Csvdataset, DataModel, Icons, TaxonTreeDefItem, GeographyTreeDefItem, GeologicTimePeriodTreeDefItem, StorageTreeDefItem, LithostratTreeDefItem) {

			$scope.treeResources = {
				Taxon: TaxonTreeDefItem,
				Geography: GeographyTreeDefItem,
				Geologictimeperiod: GeologicTimePeriodTreeDefItem,
				Storage :StorageTreeDefItem,
				Lithostrat : LithostratTreeDefItem
			};



			$scope.TreeDefItems = {};

			$scope.getTreeDefItems = function(tree) {

				if (!$scope.TreeDefItems[tree]) {
					var treeDefIdName = tree + "TreeDefID";
					var query = {
						where: {}
					};
					query.where[treeDefIdName] = $rootScope.fields.selectedCollection.discipline[treeDefIdName];
					$scope.TreeDefItems[tree] = $scope.treeResources[tree].query(query);
				}
				return $scope.TreeDefItems[tree];
			};

			$scope.Icons = Icons;

			$scope.$watch(Auth.isLoggedIn, function(newval, oldval) {

				$scope.user = Auth.getCurrentUser();

			})
			
			$scope.pushToSpecify = function(){
				
				console.log($rootScope.fields.selectedCollection);
				
				Csvdataset.setSpecifyCollection({
					collectionname: $scope.selectedCsv
				}, $rootScope.fields.selectedCollection).$promise.then(function(){
					return Csvdataset.process({
						collectionname: $scope.selectedCsv
					}, {});
				});

			};
			
			$scope.datasetIsMapped = function(){
				if(!$scope.selectedCsv) return false;
				var coll = $scope.user.csvimports.filter(function(e) {
						return e.collectionname === $scope.selectedCsv;
					})[0];
					return coll.mapping !== undefined;
			}

			$scope.getFieldsForModel = function(modelName) {


				if ($scope.datasetMapping[modelName] && typeof $scope.datasetMapping[modelName].table.fields === 'object') {


					return Object.keys($scope.datasetMapping[modelName].table.fields);

				} else {

					return [];
				}
			}

			$scope.tableIsTree = function(table) {
				if (!table) return false;
				var treedefitemtable = table.name + "treedefitem";
				return (table[treedefitemtable] !== undefined) ? true : false;

			}




			$scope.saveMapping = function() {

				angular.forEach($scope.datasetMapping, function(value, key) {
					if (value.table) {
						$scope.datasetMapping[key].tableName = value.table.name;
					}
					
				});
				
				Csvdataset.saveCsvMapping({
					collectionname: $scope.selectedCsv
				}, $scope.datasetMapping);
			}

			$scope.setCollection = function(collection) {
				
				 $scope.datasetMapping = undefined;
				
				
				$scope.collection = Csvdataset.get({
					collectionname: collection
				});

				$scope.data = Csvdataset.getData({
					collectionname: collection
				}).$promise.then(function(data) {
					
					//$scope.selectedCsv = collection;
					$scope.data = data;
					
					var coll = $scope.user.csvimports.filter(function(e) {
						return e.collectionname === collection;
					})[0];
					
					if (coll.mapping && coll.mapping) {
						$scope.datasetMapping = coll.mapping;
					} else {
						
						$scope.datasetMapping = {};
						for (var field in data[0]) {
							if (data[0].hasOwnProperty(field)) {
								
								$scope.datasetMapping[field] = {};
							}
						}
						
					}
/**/

					$scope.isLoading = false;
				});
			}

			$scope.$watch('selectedCsv', function(newval, oldval) {
				console.log(newval)
				
				if (newval !== undefined && newval !== oldval) {
					$scope.data = [];
					$scope.setCollection(newval);
				}
				
			});

			$scope.datamodels = DataModel.query();

			$scope.delimiters = [{
				value: ",",
				label: "Comma ,"
			}, {
				value: ";",
				label: "Semicolon ;"
			}, {
				value: ":",
				label: "Colon :"
			}];

			var uploader = $scope.uploader = new FileUploader({
				url: '/api/fileupload',
				headers: {
					Authorization: 'Bearer ' + Auth.getToken()
				}
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
				fileItem.delimiter = $scope.delimiters[0].value;
				console.info('onAfterAddingFile', fileItem);
			};
			uploader.onAfterAddingAll = function(addedFileItems) {
				console.info('onAfterAddingAll', addedFileItems);
			};
			uploader.onBeforeUploadItem = function(item) {
				item.formData.push({
					csvdelimiter: item.delimiter
				});
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
				$scope.setCollection(response.collectionname);
				$scope.user.csvimports.push(response);
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
							collectionname: $scope.collection.collectionname,
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
