'use strict';
var models = require('../');
var _ = require('lodash');
var qp = require('../nestedQueryParser');

// Get list of taxons
exports.index = function(req, res) {
	var query = (req.query) ? qp.parseQueryString(req.query) : undefined;
	models.Taxon.findAll(query).then(function(taxon) {
		return res.json(200, taxon);
	}).
	catch (function(err) {
		handleError(res, err);
	});
};

// Get a single taxon
exports.show = function(req, res) {
	models.Taxon.find(req.params.id).then(function(taxon) {
		return res.json(200, taxon);
	}).
	catch (function(err) {
		handleError(res, err);
	});
};

exports.showParents = function(req, res) {
	models.Taxon.find({
		where: {
			TaxonID: req.params.id
		},
		include: [{
			model: models.Taxon,
			as: "Parent",
			include: [{
				model: models.Taxon,
				as: "Parent",
				include: [{
					model: models.Taxon,
					as: "Parent",
					include: [{
						model: models.Taxon,
						as: "Parent",
						include: [{
							model: models.Taxon,
							as: "Parent",
							include: [{
								model: models.Taxon,
								as: "Parent",
								include: [{
									model: models.Taxon,
									as: "Parent",
									include: [{
										model: models.Taxon,
										as: "Parent",
										include: [{
											model: models.Taxon,
											as: "Parent",
											include: [{
												model: models.Taxon,
												as: "Parent",
												include: [{
													model: models.Taxon,
													as: "Parent",
													include: [{
														model: models.Taxon,
														as: "Parent",
														include: [{
															model: models.Taxon,
															as: "Parent",
															include: [{
																model: models.Taxon,
																as: "Parent",
																include: [{
																	model: models.Taxon,
																	as: "Parent",
																	include: [{
																		model: models.Taxon,
																		as: "Parent",
																		include: [{
																			model: models.Taxon,
																			as: "Parent",
																			include: [{
																				model: models.Taxon,
																				as: "Parent"
																			}]
																		}]
																	}]
																}]
															}]
														}]
													}]
												}]
											}]
										}]
									}]
								}]
							}]
						}]
					}]
				}]
			}]
		}]

	}).then(function(taxon) {
		return res.json(200, taxon.Parent);
	}).
	catch (function(err) {
		handleError(res, err);
	});
};

function handleError(res, err) {
	return res.send(500, err);
}
