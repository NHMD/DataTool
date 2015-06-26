"use strict";

module.exports = function(sequelize, DataTypes) {
	var Workbenchdataitem = sequelize.define("workbenchdataitem", {
		"WorkbenchDataItemID": {
			type: DataTypes.INTEGER,
			primaryKey: true, 
			autoIncrement:true, 
			allowNull:false
		},
		"CellData": DataTypes.STRING,
		"RowNumber": DataTypes.INTEGER,
		"WorkbenchTemplateMappingItemID": DataTypes.INTEGER,
		"WorkbenchRowID": DataTypes.INTEGER
	}, {
		tableName: 'workbenchdataitem',
		timestamps: false,
		freezeTableName: true,
		classMethods: {

			associate: function(models) {
				models.Workbenchdataitem
					.belongsTo(models.Workbenchtemplatemappingitem, {
						foreignKey: "WorkbenchTemplateMappingItemID"
					});
				models.Workbenchtemplatemappingitem
					.belongsTo(models.Workbenchtemplate, {
						foreignKey: "WorkbenchTemplateID"
					});
				models.Workbenchtemplate
					.belongsTo(models.Specifyuser, {
						foreignKey: "SpecifyUserID"
					});
			},
			
			getByWorkbenchID: function(WorkbenchID, models){
			
		return sequelize
			.query('SELECT a.* FROM workbenchdataitem a , workbenchrow b  where b.WorkbenchID = :WorkbenchID and a.WorkbenchRowID = b.WorkbenchRowID',
				models.Workbenchdataitem, {
					raw: true
				}, {
					WorkbenchID: WorkbenchID
				}).catch(function(err){
					console.log(err.message)
				})
			
			}

		},
		instanceMethods: {
			authorize: function(models, user) {
				return sequelize
					.query('SELECT a.* FROM '+
						'specifyuser a, workbenchtemplate b, workbenchtemplatemappingitem c, workbench d where '+
						'd.workbenchTemplateID = b.workbenchTemplateID and '+
						'c.WorkbenchTemplateMappingItemID = :WorkbenchTemplateMappingItemID and a.SpecifyUserID = d.SpecifyUserID and b.WorkbenchTemplateID=c.WorkbenchTemplateID',
						models.Specifyuser, {
							raw: true
						}, {
							WorkbenchTemplateMappingItemID: this.WorkbenchTemplateMappingItemID
						})
					.then(function(specifyusers) {

						if (user.UserType === "Manager" || user.SpecifyUserID === specifyusers[0].SpecifyUserID) {

							return sequelize.Promise.resolve("Access granted")
						} else {

							return sequelize.Promise.reject("I'm afraid I can't let you do that!")
						}

					})
			}
			
		}
		
	});

	return Workbenchdataitem;
};
