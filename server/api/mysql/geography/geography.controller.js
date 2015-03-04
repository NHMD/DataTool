'use strict';
var models = require('../');
var _ = require('lodash');
var qp = require('../nestedQueryParser');

// Get list of geographys
exports.index = function(req, res) {
	var query = (req.query) ? qp.parseQueryString(req.query) : undefined;
	models.Geography.findAll(query).then(function(geography) {
		return res.json(200, geography);
	}).
	catch (function(err) {
		handleError(res, err);
	});
};

// Get a single geography
exports.show = function(req, res) {
	models.Geography.find(req.params.id).then(function(geography) {
		return res.json(200, geography);
	}).
	catch (function(err) {
		handleError(res, err);
	});
};

exports.showParents = function(req, res) {
	models.Geography.find({
		where: {
			GeographyID: req.params.id
		},
		include: [{
			model: models.Geography,
			as: "Parent",
			include: [{
				model: models.Geography,
				as: "Parent",
				include: [{
					model: models.Geography,
					as: "Parent",
					include: [{
						model: models.Geography,
						as: "Parent",
						include: [{
							model: models.Geography,
							as: "Parent",
							include: [{
								model: models.Geography,
								as: "Parent",
								include: [{
									model: models.Geography,
									as: "Parent",
									include: [{
										model: models.Geography,
										as: "Parent",
										include: [{
											model: models.Geography,
											as: "Parent",
											include: [{
												model: models.Geography,
												as: "Parent",
												include: [{
													model: models.Geography,
													as: "Parent",
													include: [{
														model: models.Geography,
														as: "Parent",
														include: [{
															model: models.Geography,
															as: "Parent",
															include: [{
																model: models.Geography,
																as: "Parent",
																include: [{
																	model: models.Geography,
																	as: "Parent",
																	include: [{
																		model: models.Geography,
																		as: "Parent",
																		include: [{
																			model: models.Geography,
																			as: "Parent",
																			include: [{
																				model: models.Geography,
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

	}).then(function(geography) {
		return res.json(200, geography.Parent);
	}).
	catch (function(err) {
		handleError(res, err);
	});
};

function handleError(res, err) {
	return res.send(500, err);
}
