'use strict';

angular.module('specifyDataCleanerApp')
	.factory('Csvdataset', function($resource) {
		// Service logic
		// Public API here
		return $resource('/api/fileupload/datasets/:collectionname', {
			id: '@collectionname'
		}, {
			getFields : {
				method: 'GET',
				params: {
					id: '@collectionname'
				},
				url: '/api/fileupload/datasets/:collectionname/fields',
				isArray: false
			},
			updateObject: {
				method: 'POST', // this method issues a PUT request
				params: {
					id: '@collectionname'
				},
				url: '/api/fileupload/datasets/:collectionname/actions/'
			},
			getData: {
				method: 'GET',
				params: {
					id: '@collectionname'
				},
				url: '/api/fileupload/datasets/:collectionname/objects',
				isArray: true
			},
			saveCsvMapping: {
				method: 'POST',
				params: {
					id: '@collectionname'
				},
				url: '/api/fileupload/datasets/:collectionname/mappings/',
				isArray: false
			},
			deleteCsvMapping: {
				method: 'DELETE',
				params: {
					id: '@collectionname'
				},
				url: '/api/fileupload/datasets/:collectionname/mappings/',
				isArray: false
			},
			setSpecifyCollection: {
				method: 'POST',
				params: {
					id: '@collectionname'
				},
				url: '/api/fileupload/datasets/:collectionname/specifycollection/',
				isArray: false
			},
			process: {
				method: 'POST',
				params: {
					id: '@collectionname'
				},
				url: '/api/fileupload/datasets/:collectionname/process/',
				isArray: false
			},
			processtree: {
				method: 'POST',
				params: {
					id: '@collectionname'
				},
				url: '/api/fileupload/datasets/:collectionname/processtree/',
				isArray: false
			},
		});
	});
