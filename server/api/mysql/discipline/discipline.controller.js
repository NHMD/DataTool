'use strict';
var models = require('../');
var datamapper = require('../../../components/datamapper');

var SpecifyModel = require('../../mongo/specifymodel/specifymodel.model');


//var Discipline = require('./discipline.model');

// Get list of disciplines
exports.index = function(req, res) {
	var query = (req.query._query) ? {
		where: JSON.parse(req.query._query)
	} : undefined;

	models.Discipline.findAll(query).then(function(discipline) {
		return res.json(200, discipline);
	}).
	catch (function(err) {
		handleError(res, err);
	});
};

// Get a single discipline
exports.show = function(req, res) {
	models.Discipline.find(req.params.id).then(function(discipline) {
		return res.json(200, discipline);
	}).
	catch (function(err) {
		handleError(res, err);
	});
};



exports.showTree = function(req, res) {

	if (!models[req.params.treemodel] || !datamapper.isTree(req.params.treemodel)) {
		return res.json(404);
	};

	SpecifyModel.findOne({
		table: req.params.treemodel.toLowerCase()
	}, function(err, m) {
		if (err) {
			return handleError(res, err);
		}

		
		var treeIDName = m.idColumn;
		var treeDefIDName = treeIDName.split("ID")[0] + "TreeDefID";


		models.Discipline.find({

			where: {
				disciplineId: req.params.id
			},
			include: {
				model: models.Division,
				include: [{
					model: models.Institution
				}]
			}
		})
			.then(function(discipline) {
				discipline = datamapper.flattenDiscipline(discipline.get());
				
				var query = {
					where: {},
					attributes: [treeIDName, 'ParentID', 'name'],
					include: [{
						model: models[req.params.treemodel],
						attributes: [treeIDName, 'ParentID', 'name'],
						as: "children",
						include: [{
							model: models[req.params.treemodel],
							attributes: [treeIDName, 'ParentID', 'name'],
							as: "children",
							include: [{
								model: models[req.params.treemodel],
								attributes: [treeIDName, 'ParentID', 'name'],
								as: "children",
								include: [{
									model: models[req.params.treemodel],
									attributes: [treeIDName, 'ParentID', 'name'],
									as: "children",
									include: [{
										model: models[req.params.treemodel],
										attributes: [treeIDName, 'ParentID', 'name'],
										as: "children",
										include: [{
											model: models[req.params.treemodel],
											attributes: [treeIDName, 'ParentID', 'name'],
											as: "children",
											include: [{
												model: models[req.params.treemodel],
												attributes: [treeIDName, 'ParentID', 'name'],
												as: "children",
												include: [{
													model: models[req.params.treemodel],
													attributes: [treeIDName, 'ParentID', 'name'],
													as: "children",
													include: [{
														model: models[req.params.treemodel],
														attributes: [treeIDName, 'ParentID', 'name'],
														as: "children",
														include: [{
															model: models[req.params.treemodel],
															attributes: [treeIDName, 'ParentID', 'name'],
															as: "children",
															include: [{
																model: models[req.params.treemodel],
																attributes: [treeIDName, 'ParentID', 'name'],
																as: "children",
																include: [{
																	model: models[req.params.treemodel],
																	attributes: [treeIDName, 'ParentID', 'name'],
																	as: "children",
																	include: [{
																		model: models[req.params.treemodel],
																		attributes: [treeIDName, 'ParentID', 'name'],
																		as: "children",
																		include: [{
																			model: models[req.params.treemodel],
																			attributes: [treeIDName, 'ParentID', 'name'],
																			as: "children",
																			include: [{
																				model: models[req.params.treemodel],
																				attributes: [treeIDName, 'ParentID', 'name'],
																				as: "children",
																				include: [{
																					model: models[req.params.treemodel],
																					attributes: [treeIDName, 'ParentID', 'name'],
																					as: "children"
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
				};
				query.where[treeDefIDName] = discipline[treeDefIDName];
				query.where['RankID'] = 0;
				return models[req.params.treemodel].find(query)
			})
			.then(function(root) {
				return res.json(200, root);
			}).
		catch (function(err) {
			handleError(res, err);
		});
	});
	/*	
  models.Discipline.find(req.params.id)
	.then(function(discipline){
		var query = { where: {},
		attributes: [ treeIDName,'ParentID', 'name']
	};
		query.where[treeDefIDName] = discipline[treeDefIDName];
		query.where['RankID'] = 0;
  	return  [models[req.params.treemodel].find(query),discipline ]
  })
.spread(function(root, discipline){
	var query = { where: {},
	attributes: [ treeIDName,'ParentID', 'name']
	};
	query.where[treeDefIDName] = discipline[treeDefIDName];
	query.where['ParentID'] = root[treeIDName];
	console.log("root[treeIDName] "+root[treeIDName]);
	console.log("query "+JSON.stringify(query));
	return  [models[req.params.treemodel].findAll(query), root]
})
	.spread(function(children, root){
		var r = root.get();
		r.children =  children.map(function(e){return e.get()})
		//root.children = children;
		
  	return res.json(200, r);	
  }).catch(function(err){
	  handleError(res, err);
  });
*/
};


function handleError(res, err) {
	return res.send(500, err.message);
}
