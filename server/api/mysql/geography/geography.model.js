"use strict";


module.exports = function(sequelize, DataTypes) {
  var Geography = sequelize.define("geography", {
	GeographyID: {
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
    CentroidLat: {
      type: DataTypes.DECIMAL(19,2),
      allowNull: true,
    },
    CentroidLon: {
      type: DataTypes.DECIMAL(19,2),
      allowNull: true,
    },
    CommonName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    FullName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    GeographyCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    GML: {
      type: DataTypes.TEXT,
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
    IsCurrent: {
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
    GeographyTreeDefID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    CreatedByAgentID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    ModifiedByAgentID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    AcceptedID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    GeographyTreeDefItemID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    ParentID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    }
   
}, {
	tableName: 'geography',
	timestamps: false,
	freezeTableName: true,
	classMethods: {
		
		associate: function(models) {
		
			models.Geography
				.belongsTo(models.Geography, {
					foreignKey: "ParentID",
					as: "Parent"
				});
			
				/*
			models.Geographytreedefitem
				.hasMany(models.Geographytreedefitemrow, {
					foreignKey: "GeographytreedefitemID"
				});
			models.Geographytreedefitem
				.hasOne(models.Geographytreedefitemtemplate, {
					foreignKey: "GeographytreedefitemTemplateID"
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
return Geography;
};

