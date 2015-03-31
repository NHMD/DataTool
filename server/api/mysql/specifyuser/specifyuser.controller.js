'use strict';
var models = require('../');


// Get list of specifyusers
exports.index = function(req, res) {
	//console.log(JSON.stringify(req.user))
	//	var query = (req.user.role === "Manager") ? undefined : { where : {SpecifyUserID: req.user.specifyUserId }};
	// {include: [{model: models.Spprincipal}]} 
	models.Specifyuser.findAll().then(function(specifyuser) {
		return res.json(200, specifyuser);
	}).
	catch (function(err) {
		handleError(res, err);
	});
};

// Get a single specifyuser
exports.show = function(req, res) {
	models.Specifyuser.find({
		where: {
			SpecifyUserID: req.params.id
		},
		include: [{
			model: models.Spprincipal
		}]
	}).then(function(specifyuser) {
		return res.json(200, specifyuser);
	}).
	catch (function(err) {
		handleError(res, err);
	});
};


// Get list of specifyusers´ collections
exports.indexCollections = function(req, res) {
	//console.log(JSON.stringify(req.user))
	//	var query = (req.user.role === "Manager") ? undefined : { where : {SpecifyUserID: req.user.specifyUserId }};
	// {include: [{model: models.Spprincipal}]} 
	models.Specifyuser.find({
		where: {
			SpecifyUserID: req.user.specifyUserId
		},
		include: [{
			model: models.Spprincipal,
			include: [{
				model: models.Collection,
				include: [{
					model: models.Discipline,
					include: [{
						model: models.Taxontreedef,
						include: [{
							model: models.Taxontreedefitem
						}]
					},
					{
						model: models.Division,
						include: [{
							model: models.Institution
						}]
					}
				]
				}]
			}]
		}]
	})
	.then(function(specifyuser) {
		var hash = {};
		var data = specifyuser.spprincipals
		.filter(function(elm){
			 // Some spprincipals has no collections, dont want to send nulls to the views 
			return (elm.collection === null || hash.hasOwnProperty(elm.collection.collectionId) )? false : (hash[elm.collection.collectionId] = true);
		})
		.map(function(elm){
			return elm.collection; // The spprincipals aren´t really relevant to the clients. You just want the collections along with the disciplines.
		});
		return res.json(200, data);
	})
	.catch (function(err) {
		handleError(res, err);
	});
};

function handleError(res, err) {
	return res.send(500, err);
}
