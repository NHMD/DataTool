/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

	// Insert routes below

	//mysql
	app.use('/api/spprincipals', require('./api/mysql/spprincipal'));
	app.use('/api/determinations', require('./api/mysql/determination'));
	app.use('/api/disciplines', require('./api/mysql/discipline'));
	app.use('/api/collections', require('./api/mysql/collection'));
	app.use('/api/collectionobjects', require('./api/mysql/collectionobject'));
	app.use('/api/collectingevents', require('./api/mysql/collectingevent'));
	app.use('/api/collectors', require('./api/mysql/collector'));
	app.use('/api/institutions', require('./api/mysql/institution'));
	app.use('/api/localitys', require('./api/mysql/locality'));
	app.use('/api/geographys', require('./api/mysql/geography'));
	app.use('/api/geographytreedefitems', require('./api/mysql/geographytreedefitem'));
	app.use('/api/geologictimeperiods', require('./api/mysql/geologictimeperiod'));
	app.use('/api/geologictimeperiodtreedefitems', require('./api/mysql/geologictimeperiodtreedefitem'));
	app.use('/api/lithostrats', require('./api/mysql/lithostrat'));
	app.use('/api/lithostrattreedefitems', require('./api/mysql/lithostrattreedefitem'));
	app.use('/api/preparations', require('./api/mysql/preparation'));
	app.use('/api/taxons', require('./api/mysql/taxon'));
	app.use('/api/taxontreedefitems', require('./api/mysql/taxontreedefitem'));
	app.use('/api/workbenches', require('./api/mysql/workbench'));
	app.use('/api/workbenchrows', require('./api/mysql/workbenchrow'));
	app.use('/api/specifyusers', require('./api/mysql/specifyuser'));
	app.use('/api/storages', require('./api/mysql/storage'));
	app.use('/api/storagetreedefitems', require('./api/mysql/storagetreedefitem'));
	app.use('/api/agents', require('./api/mysql/agent'));
	app.use('/api/workbenchdataitems', require('./api/mysql/workbenchdataitem'));
	app.use('/api/workbenchtemplatemappingitems', require('./api/mysql/workbenchtemplatemappingitem'));
	app.use('/api/workbenchtemplates', require('./api/mysql/workbenchtemplate'));
	
	
	app.use('/api/datamodels', require('./api/mysql/datamodel'));
	//MongoDB
//	app.use('/api/things', require('./api/mongo/thing'));
	app.use('/api/users', require('./api/mongo/user'));
	
	// File upload
	app.use('/api/fileupload',  require('./api/fileupload'));

	app.use('/auth', require('./auth'));

	// All undefined asset or api routes should return a 404
	app.route('/:url(api|auth|components|app|bower_components|assets)/*')
		.get(errors[404]);

	// All other routes should redirect to the index.html
	app.route('/*')
		.get(function(req, res) {
			res.sendfile(app.get('appPath') + '/index.html');
		});
};
