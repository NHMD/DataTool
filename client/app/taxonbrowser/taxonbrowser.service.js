'use strict';

angular.module('specifyDataCleanerApp')
	.factory('TaxonBrowserService', function() {

		return {
			determinations : [],
			selectedDetermination : undefined,
			selectCallbacks: [],
			taxonRanks: {},
			selectedTaxon: undefined,
			taxonParent: undefined,
			taxonSelected: function() {
				for(var i=0; i< this.selectCallbacks.length; i++ ){
					if(typeof this.selectCallbacks[i] === 'function') {
						this.selectCallbacks[i]();
					}
				}
			}
		};


	});
