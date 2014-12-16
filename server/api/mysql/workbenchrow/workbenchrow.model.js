"use strict";

module.exports = function(sequelize, DataTypes) {
	var Workbenchrow = sequelize.define("workbenchrow", {
		"WorkbenchRowID": {
			type: DataTypes.INTEGER,
			primaryKey: true, 
			autoIncrement:true, 
			allowNull:false
		},

	    "BioGeomancerResults": {
	      type: DataTypes.TEXT,
	      allowNull: true,
	    },
	    "CardImageData": {
	      type: 'MEDIUMBLOB',
	      allowNull: true,
	    },
	    "CardImageFullPath": {
	      type: DataTypes.STRING,
	      allowNull: true,
	    },
	    "Lat1Text": {
	      type: DataTypes.STRING,
	      allowNull: true,
	    },
	    "Lat2Text": {
	      type: DataTypes.STRING,
	      allowNull: true,
	    },
	    "Long1Text": {
	      type: DataTypes.STRING,
	      allowNull: true,
	    },
	    "Long2Text": {
	      type: DataTypes.STRING,
	      allowNull: true,
	    },
	    "RecordID": {
	      type: DataTypes.INTEGER(11),
	      allowNull: true,
	    },
	    "RowNumber": {
	      type: DataTypes.INTEGER(6),
	      allowNull: true,
	    },
	    "SGRStatus": {
	      type: DataTypes.INTEGER(4),
	      allowNull: true,
	    },
	    "UploadStatus": {
	      type: DataTypes.INTEGER(4),
	      allowNull: true,
	    },
	    "WorkbenchID": {
	      type: DataTypes.INTEGER(11),
	      allowNull: false,
	    }

	}, {
		tableName: 'workbenchrow',
		timestamps: false,
		freezeTableName: true,
		
		// IMPORTANT: Since we will not alter Specify´s DB, we will have to do cascading through hooks:
		hooks: {
			beforeDestroy: function(workbenchrow, models){
				console.log("Deleting all cells associated with row id "+workbenchrow.WorkbenchRowID);
				return models.Workbenchdataitem.destroy({ where: {"WorkbenchRowID": workbenchrow.WorkbenchRowID}});
			},
			beforeCreate: function(workbenchrow){
				return sequelize.query("SELECT MAX(RowNumber)+1 as NextRowNumber FROM workbenchrow WHERE WorkbenchID=:WorkbenchID", null,{raw:true} , {
							WorkbenchID: workbenchrow.WorkbenchID
						}).then(function(rows) {
							console.log(rows);
							workbenchrow.RowNumber = rows[0].NextRowNumber;
				});
				
			}
		},
		classMethods: {

			associate: function(models) {
				models.Workbenchdataitem
					.belongsTo(models.Workbenchrow, {
						foreignKey: "WorkbenchRowID"
					});
				models.Workbenchrow
					.hasMany(models.Workbenchdataitem, {
						foreignKey: "WorkbenchRowID"
					});

			},

		},
		instanceMethods: {
			authorize: function(models, user) {
				return sequelize
					.query('SELECT a.* FROM specifyuser a , workbench b, workbenchrow c  where c.WorkbenchRowID = :WorkbenchRowID and a.SpecifyUserID = b.SpecifyUserID and b.WorkbenchID=c.WorkbenchID',
						models.Specifyuser, {
							raw: true
						}, {
							WorkbenchRowID: this.WorkbenchRowID
						})
					.then(function(specifyusers) {

						if (user.UserType === "Manager" || user.SpecifyUserID === specifyusers[0].SpecifyUserID) {

							return sequelize.Promise.resolve("Access granted")
						} else {

							return sequelize.Promise.reject("I'm afraid I can't let you do that!")
						}

					}).
					catch(function(err){
						console.log(err.message)
					});
			}
		}
	});

	return Workbenchrow;
};
