'use strict';

angular.module('specifyDataCleanerApp')
	.controller('CsvTreeUploadCtrl', ['Auth', 'User', '$rootScope', '$scope', '$filter', '$http', '$location','$timeout', '$compile', 'FileUploader', 'Csvdataset', 'DataModel', 'Icons', 'TaxonTreeDefItem', 'GeographyTreeDefItem','GeologicTimePeriodTreeDefItem', 'StorageTreeDefItem', 'LithostratTreeDefItem', '$modal', 'hotkeys', 
		function(Auth, User, $rootScope, $scope, $filter, $http, $location, $timeout, $compile, FileUploader, Csvdataset, DataModel, Icons, TaxonTreeDefItem, GeographyTreeDefItem, GeologicTimePeriodTreeDefItem, StorageTreeDefItem, LithostratTreeDefItem, $modal, hotkeys) {

			$scope.treeResources = {
				Taxon: TaxonTreeDefItem,
				Geography: GeographyTreeDefItem,
				Geologictimeperiod: GeologicTimePeriodTreeDefItem,
				Storage :StorageTreeDefItem,
				Lithostrat : LithostratTreeDefItem
			};

			$scope.mapToTable;

			$scope.$watch('mapToTable', function(newval, oldval){
				if(newval !== undefined &&  newval.fields !== undefined){
					angular.forEach($scope.datasetMapping, function(value, key) {
							$scope.datasetMapping[key].table = newval;
					});
				}
			})

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
			
			$scope.pushToSpecify = function() {
				$scope.upLoading = true;
				Csvdataset.setSpecifyCollection({
					collectionname: $scope.selectedCsv
				}, $rootScope.fields.selectedCollection).$promise.then(function(){
					return Csvdataset.processtree({
						collectionname: $scope.selectedCsv
					}, {}).$promise.then(
						function() {
								$scope.upLoading = false;
							var coll = $scope.user.csvimports.filter(function(e) {
								return e.collectionname === $scope.selectedCsv;
							})[0];
							coll.uploadedToSpecify = true;
							if(confirm("The dataset "+coll.name+" was successfully saved to Specify. View tree?")){
								$location.path("/view-tree/"+$scope.mapToTable.name);
							}
						}
					);
				});
			};
			
			$scope.datasetIsMapped = function(){
				if(!$scope.selectedCsv) return false;
				var coll = $scope.user.csvimports.filter(function(e) {
						return e.collectionname === $scope.selectedCsv;
					})[0];
					return coll.mapping !== undefined;
			}

			$scope.datasetIsUploadedToSpecify = function(){
				if(!$scope.selectedCsv) return false;
				var coll = $scope.user.csvimports.filter(function(e) {
						return e.collectionname === $scope.selectedCsv;
					})[0];
					return coll.uploadedToSpecify;
			}
			
			$scope.deleteDataset = function() {
				var coll = $scope.user.csvimports.filter(function(e) {
					return e.collectionname === $scope.selectedCsv;
				})[0];
				if (confirm("Do you want to delete "+coll.name+" ?")){
					Csvdataset.delete({collectionname: $scope.selectedCsv}).$promise.then(function(){
						$scope.user.csvimports = $scope.user.csvimports.filter(function(e) {
							return e.collectionname !== $scope.selectedCsv;
						});
						$scope.selectedCsv = undefined;		
						$scope.data = undefined;
						alert("The dataset was deleted successfully.")
					})
				}
			};
			
			$scope.getFieldsForModel = function() {
				if ($scope.mapToTable && typeof $scope.mapToTable.fields === 'object') {
					return Object.keys($scope.mapToTable.fields);
				} else {
					return [];
				}
			}

			$scope.deleteCsvMapping = function(){
				Csvdataset.deleteCsvMapping({
					collectionname: $scope.selectedCsv
				}).$promise.then(function(){
					alert("The mapping was deleted")
				});
			}

			$scope.saveMapping = function() {
				angular.forEach($scope.datasetMapping, function(value, key) {
					if (value.table) {
						$scope.datasetMapping[key].tableName = value.table.name;
					}
					
				});
				Csvdataset.saveCsvMapping({
					collectionname: $scope.selectedCsv
				}, $scope.datasetMapping).$promise.then(function(mapping){
					var coll = $scope.user.csvimports.filter(function(e) {
						return e.collectionname === $scope.selectedCsv;
					})[0];
					coll.mapping = mapping;
					alert("The mapping was saved succesfully")
				});
			}

			$scope.setCollection = function(collection) {
				$scope.datasetMapping = undefined;
				$scope.collection = Csvdataset.get({
					collectionname: collection
				});

				//get array of fields
				Csvdataset.getFields({ 
					collectionname: collection
				}).$promise.then(function(data) {
					$scope.collectionFields = data.fields;
					console.log($scope.collectionFields);
				});

				//get collection data
				$scope.data = Csvdataset.getData({
					collectionname: collection
				}).$promise.then(function(data) {
					$scope.data = data;
					var coll = $scope.user.csvimports.filter(function(e) {
						return e.collectionname === collection;
					})[0];
					
					if (coll.mapping && coll.mapping) {
						$scope.datasetMapping = coll.mapping;
						var firstProperty = Object.keys(coll.mapping)[0];
						$scope.mapToTable =  coll.mapping[firstProperty].table;
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
				if (newval !== undefined && newval !== oldval) {
					$scope.data = [];
					$scope.setCollection(newval);
				}
			});

			$scope.datamodels = DataModel.query({treesOnly: true});

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
					csvdelimiter: item.delimiter,
					isTreeOnly: true
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
				//$scope.setCollection(response.collectionname);
				$scope.user.csvimports.push(response);
				$scope.selectedCsv = response.collectionname;
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

			/* edit */
			hotkeys.bindTo($scope)
				.add({
					combo: 'Ctrl-R',
					description: 'Search and Replace',
					callback: $scope.searchAndReplaceModal
				})

			$scope.editRowModal = function(row) {
				$scope.editRow = row.toJSON();
				$modal({
					scope: $scope,
					template: 'app/csv-tree-upload/editRow.modal.html',
					show: true,
					placement: 'center'
				});
			}				

			$scope.editRowSave = function() {
				Csvdataset.updateObject({ collectionname: $scope.collection.collectionname }, $scope.editRow).$promise.then(function() {
					$scope.callServer($scope.currentTableState);
				});
			}

			$scope.deleteRow = function(row) {
				if (confirm('Really delete row?')) {
					Csvdataset.deleteObject({ collectionname: $scope.collection.collectionname }, { _id : row._id} ).$promise.then(function() {
						$scope.callServer($scope.currentTableState);
					});						
				}
			}

			$scope.comparisonList = [
				'equal to',
				'different from',
				'begins with',
				'ends with',
				'contains',
				'not contains'
			];

			$scope.initSearchReplace = function() {
				$scope.searchReplace = { 
					action: 'searchreplace',
					field: '', 
					search: '', 
					replace: '',
					caseSensitive: false,
					replaceConditions: { conditions : [] }
				}
			}

			$scope.searchReplaceAddCondition = function() {
				$scope.searchReplace.replaceConditions.conditions.push({
					field: '',
					comparison: '',
					text: ''
				})
			}

			$scope.searchReplaceRemoveCondition = function(index) {
				if (index>-1) {
					$scope.searchReplace.replaceConditions.conditions.splice(index, 1);
				}
			}

			$scope.searchAndReplaceModal = function() {
				if (!$scope.searchReplace) $scope.initSearchReplace();					
				$timeout(function() {
					angular.element('#columnName').focus()
				}, 50);
				$modal({
					scope: $scope,
					template: 'app/csv-tree-upload/searchReplace.modal.html',
					show: true,
					placement: 'center'
				});
			}

			$scope.doSearchReplace = function() {
				Csvdataset.postAction({ collectionname: $scope.collection.collectionname }, $scope.searchReplace).$promise.then(function(res) {
					console.log('affected rows: ', res.affected);
					$scope.callServer($scope.currentTableState);
				});
			}

			/* table */
			$scope.callServer = function callServer(tableState) {
				$scope.isLoading = true;
				$scope.currentTableState = tableState;

				var filter = {},
					pagination = tableState.pagination,
					offset = pagination.start || 0, // This is NOT the page number, but the index of item in the list that you want to use to display the table.
					limit = pagination.number || 10; // Number of entries showed per page.
				
				if (typeof tableState.search.predicateObject != 'undefined' && Object.keys(tableState.search.predicateObject).length > 0) {
					filter = tableState.search.predicateObject;
				};

				var focused_element = document.activeElement.id;
				if ($scope.collection !== undefined) {
					$scope.collection.$promise.then(function() {
						tableState.pagination.numberOfPages = parseInt($scope.collection.count / limit);
						$scope.data = Csvdataset.getData({
							collectionname: $scope.collection.collectionname,
							offset: offset,
							limit: limit,
							sort: tableState.sort.reverse ? 1 : -1,
							orderBy: tableState.sort.predicate,
							filter: filter 
						}).$promise.then(function(data) {
							$scope.data = data;
							$scope.isLoading = false;
							//set focus back to element that invoked the reload, i.e searchbox
							if (focused_element !== '') {
								setTimeout(function() {
									angular.element('#'+focused_element).focus();
								}, 1);
							}
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
