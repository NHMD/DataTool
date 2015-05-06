'use strict';

angular.module('specifyDataCleanerApp')
	.controller('DatasetsCtrl', ['$document', '$route', '$rootScope', '$scope', '$modal', 'WorkbenchDataItem', 'WorkbenchTemplate', 'WorkbenchTemplateMappingItem', 'WorkbenchRow', 'Workbench', 'hotkeys', 'Icons', 'TaxonTreeDefItem', 'TaxonBrowserService','$timeout','Auth','localStorageService', 'DataFormService', 'History', 'User', 
		function($document, $route, $rootScope, $scope, $modal, WorkbenchDataItem, WorkbenchTemplate, WorkbenchTemplateMappingItem, WorkbenchRow, Workbench, hotkeys, Icons, TaxonTreeDefItem, TaxonBrowserService, $timeout,  Auth, localStorageService, DataFormService, History, User) {

			$scope.Icons = Icons;
			$scope.DataFormService = DataFormService;

			//create an easy accessible users lookup-array
			$scope.users = [];
			User.query().$promise.then(function(users) {	
				angular.forEach(users, function(user) {
					$scope.users[user.specifyUserId] = { name : user.name, email : user.email };
				});
			});

			//>>>>>> workbechPicker
			$scope.workbenchPickerValue = '';
			$scope.workbenchPicker = angular.element('#workbench-picker');
			$scope.workbenchPickerChange = function() {
				$scope.workbenchPickerFilter($scope.workbenchPicker.val());
			}
			$scope.workbenchPickerMouseDown = function() {
				$scope.workbenchPickerValue = '';
			}
			$scope.workbenchPickerClick = function(workbenchId) {
				angular.forEach($scope.workbenches, function(workbench) {
					if (workbenchId == workbench.WorkbenchID) {
						$scope.selectedWorkbench = workbench;
						$scope.workbenchPickerValue = workbench.Name;
					}
				});
			}
			$scope.workbenchPickerFilter = function(filter) {
				filter = filter.toLowerCase();
				var items = [];
				angular.forEach($scope.workbenches, function(workbench) {
					if (filter == '' || workbench.Name.toLowerCase().indexOf(filter) == 0) {
						items.push({
							click : 'workbenchPickerClick('+workbench.WorkbenchID+')',
							text : workbench.Name
						});
					}
				}).$promise.then($scope.workbenchesPicklist = items);
			}
			Workbench.query().$promise.then(function(workbenches) {
				$scope.workbenches = workbenches;
				$scope.workbenchPickerFilter('');
			});
			//<<<<<< workbenchPicker

			$scope.$watch('selectedWorkbench', function(newval, oldval) {
				if (newval && typeof newval === 'object' && newval !== oldval) {

					$scope.workbenchtemplatemappingitems = WorkbenchTemplateMappingItem.getFromWorkbenchTemplate({
						id: $scope.selectedWorkbench.WorkbenchTemplateID
					});

					localStorageService.bind($scope, 'showHideWorkBenchTemplate');
					if(!$scope.showHideWorkBenchTemplate){
						$scope.showHideWorkBenchTemplate = {};
						if(!$scope.showHideWorkBenchTemplate[$scope.selectedWorkbench.WorkbenchTemplateID]) {
							$scope.showHideWorkBenchTemplate[$scope.selectedWorkbench.WorkbenchTemplateID] = {};
						}
					}
					
					$scope.workbenchtemplatemappingitems.$promise.then(function() {
						var WorkbenchTemplateMappingItemIDs = $scope.workbenchtemplatemappingitems.map(function(elm) {
							return elm.WorkbenchTemplateMappingItemID;
						});

						$scope.workbenchdataitems = WorkbenchDataItem.getFromWorkbench({
							"id": $scope.selectedWorkbench.WorkbenchID
						});


						$scope.workbenchdataitems.$promise.then($scope.mapRows);
						
						// getters are used for sorting
						$scope.getters = {};
						// this dataset's Workbenchtemplatemappings for taxonomy
						$scope.taxonMappings = {};
						
						// a small map to identyfy if we have 1, 2 or 3 determinations on this row
						TaxonBrowserService.determinations = [];

						angular.forEach($scope.workbenchtemplatemappingitems, function(elm) {

							var taxonname = elm.FieldName.toLowerCase().substring(0, elm.FieldName.length - 1)
							if (TaxonBrowserService.taxonRanks[taxonname]) {
								var determinationNumber = elm.FieldName.slice(-1);
								$scope.taxonMappings[elm.WorkbenchTemplateMappingItemID] = {
									determinationNumber: determinationNumber, // refers to appended number: species1, species2, species3 etc
									RankID: TaxonBrowserService.taxonRanks[taxonname]
								};
								TaxonBrowserService.determinations[parseInt(determinationNumber-1)] = determinationNumber;
							};

							$scope.getters[elm.FieldName] = function(row) {
								return (row[elm.WorkbenchTemplateMappingItemID]) ? row[elm.WorkbenchTemplateMappingItemID].CellData : "";
							}
						});
						
						TaxonBrowserService.selectedDetermination = (TaxonBrowserService.determinations.length) ? TaxonBrowserService.determinations[0]: undefined;
					});
				}

			});

			$scope.mapRows = function() {
				var mappedRows = [];
				for (var i = 0; i < $scope.workbenchdataitems.length; i++) {

					if (mappedRows[$scope.workbenchdataitems[i].RowNumber] === undefined) {
						mappedRows[$scope.workbenchdataitems[i].RowNumber] = {
							WorkbenchRowID: $scope.workbenchdataitems[i].WorkbenchRowID,
							RowNumber: $scope.workbenchdataitems[i].RowNumber
						};
					};

					mappedRows[$scope.workbenchdataitems[i].RowNumber][$scope.workbenchdataitems[i].WorkbenchTemplateMappingItemID] = $scope.workbenchdataitems[i];
				};

				$scope.mappedRows = mappedRows;

			};

			$scope.createOrUpdateWorkBenchDataItem = function(row, item, template) {

				if (item.constructor.name === "Resource") {

					if (item.WorkbenchDataItemID === undefined) {
						item.$save();
					} else if (item.CellData !== "" && item.CellData !== undefined) {
						item.$update();
					} else if (item.CellData === "" || item.CellData === undefined) {
						item.$delete();
					};

				} else if (item.CellData !== "" && item.CellData !== undefined) {
					$scope.mappedRows[row.RowNumber][template.WorkbenchTemplateMappingItemID] = WorkbenchDataItem.save({
						"WorkbenchRowID": row.WorkbenchRowID,
						"RowNumber": row.RowNumber,
						"CellData": item.CellData,
						"WorkbenchTemplateMappingItemID": template.WorkbenchTemplateMappingItemID,
						"ValidationStatus": 0
					});

				};
			};

			$scope.deleteRow = function(row, idx) {
				WorkbenchRow.remove({
					id: row.WorkbenchRowID
				}).$promise.then(function() {
					$scope.mappedRows.splice($scope.mappedRows.indexOf(row), 1);
				});
			};

			$scope.carryForward = function(rowNumber, workbenchTemplateMappingItem) {
				if (!workbenchTemplateMappingItem.CarryForward) {
					return "";
				} else if (workbenchTemplateMappingItem.CarryForward) {
					var forwardValue = 
					($scope.mappedRows[$scope.mappedRows.length - 1][workbenchTemplateMappingItem.WorkbenchTemplateMappingItemID]) ? $scope.mappedRows[$scope.mappedRows.length - 1][workbenchTemplateMappingItem.WorkbenchTemplateMappingItemID].CellData : "";
					return forwardValue;
				};
			};

			$scope.addRowToGrid = function(openInGrid) {
				return	WorkbenchRow.save({
					"WorkbenchID": $scope.selectedWorkbench.WorkbenchID
				}).
				$promise.then(function(workbenchrow) {
					var row = {
						"WorkbenchRowID": workbenchrow.WorkbenchRowID,
						"RowNumber": workbenchrow.RowNumber	
					};
					
					if(openInGrid) row["inserted"] = true;
					for (var i = 0; i < $scope.workbenchtemplatemappingitems.length; i++) {


						row[$scope.workbenchtemplatemappingitems[i].WorkbenchTemplateMappingItemID] = new WorkbenchDataItem({
							"CellData": $scope.carryForward(workbenchrow.RowNumber, $scope.workbenchtemplatemappingitems[i]),
							"WorkbenchTemplateMappingItemID": $scope.workbenchtemplatemappingitems[i].WorkbenchTemplateMappingItemID,
							"ValidationStatus": 0,
							"WorkbenchRowID": workbenchrow.WorkbenchRowID,
							"RowNumber": workbenchrow.RowNumber
						});

					};
					$scope.mappedRows[workbenchrow.RowNumber] = row;
					
					
					// timeout is needed to move the click trigger outside the current digest cycle
					$timeout(function(){
			
						// had to use JQuery for these ones....
						$("ul.pagination li:last a").trigger('click');
						$("tbody").animate({
							scrollTop: $("tbody tr:last").offset().top
						}, "slow");
					});
					
					return row;
				});
			};

			$scope.saveRow = function(row) {
				// remove the mark that this row is "dirty"
				delete row.inserted;
			};
			$scope.addTaxonToSelectedRows = function() {
				for (var i = 0; i < $scope.rowCollection.length; i++) {

					if ($scope.rowCollection[i] !== undefined && $scope.rowCollection[i].isSelected) {
						$scope.addTaxonToRow($scope.rowCollection[i]);
					}
				}
			};
			// tell the TaxonBrowserService to add selected taxon to the selected rows when selection is done
			TaxonBrowserService.selectCallbacks.push($scope.addTaxonToSelectedRows);
			
			$scope.addTaxonToRow = function(row) {
				if (TaxonBrowserService.selectedTaxon === undefined || TaxonBrowserService.selectedTaxon.constructor.name !== 'Resource') return;
				for (var key in $scope.taxonMappings) {
					if($scope.taxonMappings[key].determinationNumber === TaxonBrowserService.selectedDetermination){
						
						if (TaxonBrowserService.selectedTaxon.RankID === $scope.taxonMappings[key].RankID){
							
							var item = (row[key] !== undefined) ? row[key] : {};
							
							item.CellData = TaxonBrowserService.selectedTaxon.Name;
							
							$scope.createOrUpdateWorkBenchDataItem(row, item, {
								WorkbenchTemplateMappingItemID: key
							});
							
						} else {
							var p = TaxonBrowserService.taxonParent;
							p.$promise.then(function(){while (p !== null && p !== undefined) {
								if (p.RankID === $scope.taxonMappings[key].RankID && $scope.taxonMappings[key].determinationNumber === TaxonBrowserService.selectedDetermination) {
									
									var item = (row[key] !== undefined) ? row[key] : {};
									item.CellData = p.Name;
									$scope.createOrUpdateWorkBenchDataItem(row, item, {
										WorkbenchTemplateMappingItemID: key
									});
									break;

								};
								p = p.Parent;
							}})
						}
					}
				}
			};

			hotkeys.bindTo($scope)
				.add({
					combo: 'ctrl+n',
					description: 'Add row to dataset',
					callback: $scope.addRowToGrid
				})
				.add({
					combo: 'ctrl+f',
					description: 'Open /close carry forward window',
					allowIn: ['INPUT'],
					callback: function() {
						if (!$scope.carryForwardModal.$isShown) {
							$scope.carryForwardModal.$promise.then($scope.carryForwardModal.show);
						} else {
							$scope.updateWorkBenchtemplateMappingitems();
							$scope.carryForwardModal.hide();
						};

					}
				})
				.add({
					combo: 'ctrl+h',
					description: 'Open /close hide columns window',
					allowIn: ['INPUT'],
					callback: function() {
						if (!$scope.showcolumnsModal.$isShown) {
							$scope.showcolumnsModal.$promise.then($scope.showcolumnsModal.show);
						} else {
							
							$scope.showcolumnsModal.hide();
						};

					}
				})
				.add({
					combo: 'f10',
					description: 'Open dataset picker',
					callback: function() {
						$scope.workbenchPicker.click()
					}
				})

				
			$scope.carryForwardModal = $modal({
				scope: $scope,
				template: 'app/datasets/carryforward.modal.tpl.html',
				show: false,
				prefixEvent: "carryforwardmodal"
			});
				
			$scope.showcolumnsModal = $modal({
				scope: $scope,
				template: 'app/datasets/showcolumns.modal.tpl.html',
				show: false,
				prefixEvent: "showcolumnsmodal"
			});
				
				
			$scope.saveTableSettingsForWorkbench = function() {
			}
				
				
			// used for updating carry forward
			$scope.updateWorkBenchtemplateMappingitems = function(){			
				for(var i=0; i < $scope.workbenchtemplatemappingitems.length; i++){
					$scope.workbenchtemplatemappingitems[i].$update();
				}
			};
				
			// Not pretty but we don´t want a click to focus an input field to also select the row
			$scope.stopClickFromBubbleUp = function(){
				$timeout(
					function(){
						$("input.editable-input").click(function(e){
							e.stopPropagation();
						})
					},
				100);	
			}

			// ------ workbench ownership / history events --------
			$scope.changeownerModal = $modal({
				scope: $scope,
				template: 'app/datasets/changeowner.modal.html',
				show: false
			});	

			$scope.createWorkbenchHistoryEvent = function(toUser, message) {
				var action = {
					timestamp : Date.now(),
					fromUserId : Auth.getCurrentUser().specifyUserId, 
					toUserId : toUser,
					message : message,
					confirmed : false
				}
				History.query().$promise.then(function(histories) {
					var saved = false;
					angular.forEach(histories, function(history) {
						if (!saved && history.workbenchId == $scope.selectedWorkbench.WorkbenchID) {
							history.actions.push(action);
							History.update(	{id : history._id }, history);
							saved = true;
						}
					}).$promise.then(function() {
						if (!saved) {
							//no earlier history recorded, create history for workbench
							History.save({	
								workbenchId : $scope.selectedWorkbench.WorkbenchID,
								name : $scope.selectedWorkbench.Name,
								actions : [action]
							});
						}		
					});
				}).then(function() {
					/* using $route.reload because
						1. we cannot be sure the $watch chain not raises errors
						2. we need $scope variables to be resetted anyway
					*/
					$route.reload();
				});
			}

			$scope.changeOwnership = function() {
				var newUserId = $scope.changeownerData.newUserId,
					message = $scope.changeownerData.message;

				if (newUserId !== undefined && newUserId !== $scope.changeownerData.currentUserId) {
					$scope.selectedWorkbench.SpecifyUserID = parseInt(newUserId);
					Workbench.update($scope.selectedWorkbench);
					$scope.createWorkbenchHistoryEvent(newUserId, message);
				}
			}
		
			$scope.changeownerClick = function(user) {
				$scope.changeownerData = {
					name : $scope.selectedWorkbench.Name,
					users : User.query(),
					currentUserId : Auth.getCurrentUser().specifyUserId,
					newUserId : undefined
				}				
				$scope.changeownerModal.show();
			};

			$scope.$watch('selectedWorkbench', function(newval, oldval) {
				if (typeof newval == 'object') {
					$scope.updateWorkbenchHistory(newval.WorkbenchID);
				}
			});

			$scope.updateWorkbenchHistory = function(workbenchId) {
				var action,
					items = [];				
					
				History.query().$promise.then(function(histories) {
					angular.forEach(histories, function(history) {
						if (history.workbenchId == workbenchId) {
							for (var i=0;i<history.actions.length;i++) {
								if (i>0) items.push({ divider : true });
								action = history.actions[i];
								items.push({
									href : '#',
									text : '<small>'+action.timestamp+'</small><br>'+
										   '<span class="wb-from">'+$scope.users[action.fromUserId].name+'</span>'+
										   '&nbsp;<i class="fa fa-share fa-fw wb-icon"></i>&nbsp;' +
										   '<span class="wb-to">'+$scope.users[action.toUserId].name+'</span>'+
										   '<br>'+
										   '<small class="wb-message">'+action.message+'</small>'
								});
							}
						}
					});
				}).then(function() {
					if (items.length==0) items.push({ href : '#', text : 'No events recorded for this workbench' });
					$scope.selectedWorkbenchHistory = items;
				});
			}

			//user notification of newly assigned workbench(es)
			$scope.notificationModal = $modal({
				scope: $scope,
				template: 'app/datasets/notification.modal.html',
				show: false
			});	

			$document.ready(function() {
				var actions,
					user;
				$scope.notification = { workbenches : [] };
				History.query().$promise.then(function(histories) {		
					angular.forEach(histories, function(history) {
						for (var i=0;i<history.actions.length;i++) {
							if (!history.actions[i].confirmed && history.actions[i].toUserId == Auth.getCurrentUser().specifyUserId) {
								user = $scope.users[history.actions[i].fromUserId];
								$scope.notification.workbenches.push({
									name : history.name,
									from : user.name+', '+user.email,
									message : history.actions[i].message
								});
								//update the action (confirmed == "seen")
								history.actions[i].confirmed = true;
								History.update(	{id : history._id }, history);
							}
						}
					}).$promise.then(function() {
						$scope.notification.header = $scope.notification.workbenches.length > 0
							? $scope.notification.workbenches.length == 1
								? 'You have a new workbench!'
								: 'You have '+$scope.notification.workbenches.length+' new workbenches!'
							: false;
						if ($scope.notification.header) {
							$scope.notificationModal.show();
						}
					});
				});
			});
		}			


]);


