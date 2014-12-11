"use strict";


module.exports = function(sequelize, DataTypes) {

	var Workbenchtemplatemappingitem = sequelize.define("workbenchtemplatemappingitem", {
		"WorkbenchTemplateMappingItemID": {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement:true, 
			allowNull:false
		},
		"WorkbenchTemplateID": DataTypes.INTEGER,
		"TimestampCreated": DataTypes.DATE,
		"TimestampModified": DataTypes.DATE,
		"Caption": DataTypes.STRING,
		"FieldName": DataTypes.STRING,
		"ImportedColName": DataTypes.STRING,
		"TableName": DataTypes.STRING
	}, {
		tableName: 'workbenchtemplatemappingitem',
		timestamps: false,
		freezeTableName: true,
		classMethods: {

			associate: function(models) {


			},

			instanceMethods: {
				authorize: function(models, user) {
					return sequelize
						.query('SELECT a.* FROM specifyuser a , workbenchtemplate b where b.WorkbenchTemplateID = :WorkbenchTemplateID and a.SpecifyUserID = b.SpecifyUserID',
							models.Specifyuser, {
								raw: true
							}, {
								WorkbenchTemplateID: this.WorkbenchTemplateID
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

		}
	});


	return Workbenchtemplatemappingitem;

};
