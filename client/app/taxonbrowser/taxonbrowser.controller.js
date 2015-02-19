'use strict';

angular.module('specifyDataCleanerApp')
	.controller('TaxonbrowserCtrl', ['$rootScope', '$scope', '$modal', 'Icons', 'hotkeys', 'Taxon', 'TaxonBrowserService',
		function($rootScope, $scope, $modal, Icons, hotkeys, Taxon, TaxonBrowserService) {
			$scope.Icons = Icons;
			$scope.TaxonBrowserService = TaxonBrowserService;

			$scope.getTaxon = function(viewValue) {
				if ($rootScope.fields.selectedCollection === undefined) return "";
				var TaxonTreeDefID = $rootScope.fields.selectedCollection.discipline.TaxonTreeDefID;
				var value = (viewValue.constructor.name === 'Resource') ? viewValue.Name : viewValue;

				var params = {
					where: {
						Name: {
							like: value + "%"
						},
						TaxonTreeDefID: {
							eq: TaxonTreeDefID
						}
					},
					limit: 30
				};

				return Taxon.query(params).$promise;

			};

			$rootScope.$watch('fields.selectedCollection', function(newval, oldval) {
				if (newval !== undefined) {
					TaxonBrowserService.taxonRanks = {};
					var taxontreedefitems = $rootScope.fields.selectedCollection.discipline.taxontreedef.taxontreedefitems;
					for (var i = 0; i < taxontreedefitems.length; i++) {
						TaxonBrowserService.taxonRanks[taxontreedefitems[i].Name.toLowerCase()] = taxontreedefitems[i].RankID;
					}
				}
			});

			$scope.$watch('TaxonBrowserService.selectedTaxon', function(newval, oldval) {
				if (newval !== undefined && newval.constructor.name === "Resource") {
					TaxonBrowserService.taxonParent = Taxon.getParents({
						id: TaxonBrowserService.selectedTaxon.TaxonID
					});
				}

			});

			$scope.getTaxonRankNameFromRankID = function(rankId) {
				if (rankId === undefined) return "";

				for (var key in TaxonBrowserService.taxonRanks) {
					if (TaxonBrowserService.taxonRanks[key] === rankId) {
						return key;
					}
				};
				return "";
			};
			$scope.resetTaxon = function() {
				TaxonBrowserService.selectedTaxon = undefined;
			};

			$scope.taxonModal = $modal({
				scope: $scope,
				template: 'app/taxonbrowser/taxon.modal.tpl.html',
				show: false,
				prefixEvent: "taxonmodal"
			});

			$scope.$on('taxonmodal.show', function() {
				$('.taxon-typeahead').focus();
			});

			hotkeys.bindTo($scope)
				.add({
					combo: 'ctrl+x',
					description: 'Open Taxon browser / Close taxon browser and use selected taxon',
					allowIn: ['INPUT'],
					callback: function() {
						if (!$scope.taxonModal.$isShown) {
							$scope.taxonModal.$promise.then($scope.taxonModal.show);
						} else {
							TaxonBrowserService.taxonSelected();
							$scope.taxonModal.hide();
						};

					}
				})
				.add({
					combo: 'ctrl+z',
					description: 'Close Taxon browser and discard selected taxon',
					allowIn: ['INPUT'],
					callback: function() {
						$scope.resetTaxon();
						$scope.taxonModal.hide();
					}
				})



		}
	]);
