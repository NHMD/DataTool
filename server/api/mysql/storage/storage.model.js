"use strict";


module.exports = function(sequelize, DataTypes) {
  var Storage = sequelize.define("storage", {
	StorageID: {
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
    Abbrev: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    FullName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    HighestChildNodeNumber: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    IsAccepted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NodeNumber: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    Number1: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    Number2: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    RankID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Text1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Text2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    TimestampVersion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    StorageTreeDefItemID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    AcceptedID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    StorageTreeDefID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    ParentID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    CreatedByAgentID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    ModifiedByAgentID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    }
   
}, {
	tableName: 'storage',
	timestamps: false,
	freezeTableName: true,
	classMethods: {
		
		associate: function(models) {
		
			models.Storage
				.belongsTo(models.Storage, {
					foreignKey: "ParentID",
					as: "Parent"
				});
			
				/*
			models.Storagetreedefitem
				.hasMany(models.Storagetreedefitemrow, {
					foreignKey: "StoragetreedefitemID"
				});
			models.Storagetreedefitem
				.hasOne(models.Storagetreedefitemtemplate, {
					foreignKey: "StoragetreedefitemTemplateID"
				});
				*/
		
		},
	authorize: function(models, user) {
		return sequelize.Promise.resolve("Access granted");
		/*
				if (user.UserType === "Manager" || user.SpecifyUserID === this.SpecifyUserID) {

					return sequelize.Promise.resolve("Access granted")
				} else {

					return sequelize.Promise.reject("I'm afraid I can't let you do that!")
				}
*/
	}
	  
	},
	instanceMethods: {
	    showParents: function(models) {
	      return 	models.Storage.find({
		where: {
			StorageID: this.ParentID
		},
		include: [{
			model: models.Storage,
			as: "Parent",
			include: [{
				model: models.Storage,
				as: "Parent",
				include: [{
					model: models.Storage,
					as: "Parent",
					include: [{
						model: models.Storage,
						as: "Parent",
						include: [{
							model: models.Storage,
							as: "Parent",
							include: [{
								model: models.Storage,
								as: "Parent",
								include: [{
									model: models.Storage,
									as: "Parent",
									include: [{
										model: models.Storage,
										as: "Parent",
										include: [{
											model: models.Storage,
											as: "Parent",
											include: [{
												model: models.Storage,
												as: "Parent",
												include: [{
													model: models.Storage,
													as: "Parent",
													include: [{
														model: models.Storage,
														as: "Parent",
														include: [{
															model: models.Storage,
															as: "Parent",
															include: [{
																model: models.Storage,
																as: "Parent",
																include: [{
																	model: models.Storage,
																	as: "Parent",
																	include: [{
																		model: models.Storage,
																		as: "Parent",
																		include: [{
																			model: models.Storage,
																			as: "Parent",
																			include: [{
																				model: models.Storage,
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

	})
	    }
	  }
});
return Storage;
};

