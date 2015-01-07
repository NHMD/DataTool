"use strict";


module.exports = function(sequelize, DataTypes) {

	var Workbenchtemplatemappingitem = sequelize.define("workbenchtemplatemappingitem", {
		WorkbenchTemplateMappingItemID: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement:true, 
			allowNull:false
		},
	    TimestampCreated: {
	      type: DataTypes.DATE,
	      allowNull: false,
	    },
	    TimestampModified: {
	      type: DataTypes.DATE,
	      allowNull: true,
	    },
	    Version: {
	      type: DataTypes.INTEGER(11),
	      allowNull: true,
	    },
	    XCoord: {
	      type: DataTypes.INTEGER(6),
	      allowNull: true,
	    },
	    YCoord: {
	      type: DataTypes.INTEGER(6),
	      allowNull: true,
	    },
	    Caption: {
	      type: DataTypes.STRING,
	      allowNull: true,
	    },
	    CarryForward: {
	      type: DataTypes.BOOLEAN,
	      allowNull: true,
	    },
	    DataFieldLength: {
	      type: DataTypes.INTEGER(6),
	      allowNull: true,
	    },
	    FieldName: {
	      type: DataTypes.STRING,
	      allowNull: true,
	    },
	    FieldType: {
	      type: DataTypes.INTEGER(6),
	      allowNull: true,
	    },
	    ImportedColName: {
	      type: DataTypes.STRING,
	      allowNull: true,
	    },
	    IsEditable: {
	      type: DataTypes.BOOLEAN,
	      allowNull: true,
	    },
	    IsExportableToContent: {
	      type: DataTypes.BOOLEAN,
	      allowNull: true,
	    },
	    IsIncludedInTitle: {
	      type: DataTypes.BOOLEAN,
	      allowNull: true,
	    },
	    IsRequired: {
	      type: DataTypes.BOOLEAN,
	      allowNull: true,
	    },
	    MetaData: {
	      type: DataTypes.STRING,
	      allowNull: true,
	    },
	    DataColumnIndex: {
	      type: DataTypes.INTEGER(6),
	      allowNull: true,
	    },
	    TableId: {
	      type: DataTypes.INTEGER(11),
	      allowNull: true,
	    },
	    TableName: {
	      type: DataTypes.STRING,
	      allowNull: true,
	    },
	    ViewOrder: {
	      type: DataTypes.INTEGER(6),
	      allowNull: true,
	    },
	    CreatedByAgentID: {
	      type: DataTypes.INTEGER(11),
	      allowNull: true,
	    },
	    WorkbenchTemplateID: {
	      type: DataTypes.INTEGER(11),
	      allowNull: false,
	    },
	    ModifiedByAgentID: {
	      type: DataTypes.INTEGER(11),
	      allowNull: true,
	    }
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
