/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

	// Insert routes below
app.use('/api/workbenches', require('./api/mysql/workbench'));
app.use('/api/workbenchrows', require('./api/mysql/workbenchrow'));
app.use('/api/specifyusers', require('./api/mysql/specifyuser'));
	app.use('/api/agents', require('./api/mysql/agent'));

	app.use('/api/workbenchdataitems', require('./api/mysql/workbenchdataitem'));
	app.use('/api/workbenchtemplatemappingitems', require('./api/mysql/workbenchtemplatemappingitem'));
	app.use('/api/workbenchtemplates', require('./api/mysql/workbenchtemplate'));
	//  app.use('/api/workbenchdatarows', require('./api/mysql/workbenchdatarow'));
	//  app.use('/api/collectionobjects', require('./api/mysql/collectionobject'));
	app.use('/api/things', require('./api/mongo/thing'));
	app.use('/api/users', require('./api/mongo/user'));

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
