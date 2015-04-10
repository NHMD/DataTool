"use strict";


module.exports = function(sequelize, DataTypes) {
  var Lithostrat = sequelize.define("lithostrat", {
	LithoStratID: {
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
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NodeNumber: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    Number1: {
      type: DataTypes.FLOAT(24),
      allowNull: true,
    },
    Number2: {
      type: DataTypes.FLOAT(24),
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
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Text2: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    YesNo1: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    YesNo2: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    CreatedByAgentID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    AcceptedID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    ModifiedByAgentID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    ParentID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    LithoStratTreeDefID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    LithoStratTreeDefItemID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    }
   
}, {
	tableName: 'lithostrat',
	timestamps: false,
	freezeTableName: true,
	classMethods: {
		
		associate: function(models) {
		
			models.Lithostrat
				.belongsTo(models.Lithostrat, {
					foreignKey: "ParentID",
					as: "Parent"
				});
			models.Lithostrat
				.hasMany(models.Lithostrat, {
					foreignKey: "ParentID",
					as: "children"
				});
				/*
			models.Lithostrattreedefitem
				.hasMany(models.Lithostrattreedefitemrow, {
					foreignKey: "LithostrattreedefitemID"
				});
			models.Lithostrattreedefitem
				.hasOne(models.Lithostrattreedefitemtemplate, {
					foreignKey: "LithostrattreedefitemTemplateID"
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
	      return 	models.Lithostrat.find({
		where: {
			LithoStratID: this.ParentID
		},
		include: [{
			model: models.Lithostrat,
			as: "Parent",
			include: [{
				model: models.Lithostrat,
				as: "Parent",
				include: [{
					model: models.Lithostrat,
					as: "Parent",
					include: [{
						model: models.Lithostrat,
						as: "Parent",
						include: [{
							model: models.Lithostrat,
							as: "Parent",
							include: [{
								model: models.Lithostrat,
								as: "Parent",
								include: [{
									model: models.Lithostrat,
									as: "Parent",
									include: [{
										model: models.Lithostrat,
										as: "Parent",
										include: [{
											model: models.Lithostrat,
											as: "Parent",
											include: [{
												model: models.Lithostrat,
												as: "Parent",
												include: [{
													model: models.Lithostrat,
													as: "Parent",
													include: [{
														model: models.Lithostrat,
														as: "Parent",
														include: [{
															model: models.Lithostrat,
															as: "Parent",
															include: [{
																model: models.Lithostrat,
																as: "Parent",
																include: [{
																	model: models.Lithostrat,
																	as: "Parent",
																	include: [{
																		model: models.Lithostrat,
																		as: "Parent",
																		include: [{
																			model: models.Lithostrat,
																			as: "Parent",
																			include: [{
																				model: models.Lithostrat,
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
return Lithostrat;
};

