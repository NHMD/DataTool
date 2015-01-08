"use strict";


module.exports = function(sequelize, DataTypes) {
  var Taxontreedefitem = sequelize.define("taxontreedefitem", {
	TaxontreedefitemID: {
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
    FormatToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    FullNameSeparator: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    IsEnforced: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    IsInFullName: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    RankID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    Remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    TextAfter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    TextBefore: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ParentItemID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    ModifiedByAgentID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    CreatedByAgentID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    TaxonTreeDefID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    }
   
}, {
	tableName: 'taxontreedefitem',
	timestamps: false,
	freezeTableName: true,
	classMethods: {
		
		associate: function(models) {
			/*
			models.Taxontreedefitemrow
				.belongsTo(models.Taxontreedefitem, {
					foreignKey: "TaxontreedefitemID"
				});
			models.Taxontreedefitem
				.hasMany(models.Taxontreedefitemrow, {
					foreignKey: "TaxontreedefitemID"
				});
			models.Taxontreedefitem
				.hasOne(models.Taxontreedefitemtemplate, {
					foreignKey: "TaxontreedefitemTemplateID"
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
	  
	}
});
return Taxontreedefitem;
};

