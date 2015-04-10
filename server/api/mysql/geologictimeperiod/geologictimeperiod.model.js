"use strict";


module.exports = function(sequelize, DataTypes) {
  var Geologictimeperiod = sequelize.define("geologictimeperiod", {
	GeologicTimePeriodID: {
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
    EndPeriod: {
      type: DataTypes.FLOAT(20,10),
      allowNull: true,
    },
    EndUncertainty: {
      type: DataTypes.FLOAT(20,10),
      allowNull: true,
    },
    FullName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    GUID: {
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
    IsBioStrat: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NodeNumber: {
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
    Standard: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    StartPeriod: {
      type: DataTypes.FLOAT(20,10),
      allowNull: true,
    },
    StartUncertainty: {
      type: DataTypes.FLOAT(20,10),
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
    AcceptedID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    ParentID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    CreatedByAgentID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    GeologicTimePeriodTreeDefItemID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    ModifiedByAgentID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    GeologicTimePeriodTreeDefID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    }
   
}, {
	tableName: 'geologictimeperiod',
	timestamps: false,
	freezeTableName: true,
	classMethods: {
		
		associate: function(models) {
		
			models.Geologictimeperiod
				.belongsTo(models.Geologictimeperiod, {
					foreignKey: "ParentID",
					as: "Parent"
				});
			models.Geologictimeperiod
				.hasMany(models.Geologictimeperiod, {
					foreignKey: "ParentID",
					as: "children"
				});
				/*
			models.Geologictimeperiodtreedefitem
				.hasMany(models.Geologictimeperiodtreedefitemrow, {
					foreignKey: "GeologictimeperiodtreedefitemID"
				});
			models.Geologictimeperiodtreedefitem
				.hasOne(models.Geologictimeperiodtreedefitemtemplate, {
					foreignKey: "GeologictimeperiodtreedefitemTemplateID"
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
	      return 	models.Geologictimeperiod.find({
		where: {
			GeologicTimePeriodID: this.ParentID
		},
		include: [{
			model: models.Geologictimeperiod,
			as: "Parent",
			include: [{
				model: models.Geologictimeperiod,
				as: "Parent",
				include: [{
					model: models.Geologictimeperiod,
					as: "Parent",
					include: [{
						model: models.Geologictimeperiod,
						as: "Parent",
						include: [{
							model: models.Geologictimeperiod,
							as: "Parent",
							include: [{
								model: models.Geologictimeperiod,
								as: "Parent",
								include: [{
									model: models.Geologictimeperiod,
									as: "Parent",
									include: [{
										model: models.Geologictimeperiod,
										as: "Parent",
										include: [{
											model: models.Geologictimeperiod,
											as: "Parent",
											include: [{
												model: models.Geologictimeperiod,
												as: "Parent",
												include: [{
													model: models.Geologictimeperiod,
													as: "Parent",
													include: [{
														model: models.Geologictimeperiod,
														as: "Parent",
														include: [{
															model: models.Geologictimeperiod,
															as: "Parent",
															include: [{
																model: models.Geologictimeperiod,
																as: "Parent",
																include: [{
																	model: models.Geologictimeperiod,
																	as: "Parent",
																	include: [{
																		model: models.Geologictimeperiod,
																		as: "Parent",
																		include: [{
																			model: models.Geologictimeperiod,
																			as: "Parent",
																			include: [{
																				model: models.Geologictimeperiod,
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
return Geologictimeperiod;
};

