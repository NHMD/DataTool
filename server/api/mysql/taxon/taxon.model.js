"use strict";


module.exports = function(sequelize, DataTypes) {
  var Taxon = sequelize.define("taxon", {
	TaxonID: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement:true, 
		allowNull:false
	},
    TimestampCreated: {
      type: DataTypes.DATE,
      allowNull: false,
		defaultValue:	DataTypes.NOW
    },
    TimestampModified: {
      type: DataTypes.DATE,
      allowNull: false,
		defaultValue:	DataTypes.NOW
    },
    Version: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
		defaultValue: 0	
    },
    Author: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CitesStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    COLStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CommonName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CultivarName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    EnvironmentalProtectionStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    EsaStatus: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    FullName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    GroupNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    GUID: {
		type: DataTypes.UUID,
		allowNull: true,
		defaultValue: DataTypes.UUIDV1,
    },
    HighestChildNodeNumber: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    IsAccepted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
		defaultValue:	true
    },
    IsHybrid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
	defaultValue:	false
    },
    IsisNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    LabelFormat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    NcbiTaxonNumber: {
      type: DataTypes.STRING,
      allowNull: true,
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
    Number3: {
      type: DataTypes.FLOAT(20,10),
      allowNull: true,
    },
    Number4: {
      type: DataTypes.FLOAT(20,10),
      allowNull: true,
    },
    Number5: {
      type: DataTypes.FLOAT(20,10),
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
    Source: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    TaxonomicSerialNumber: {
      type: DataTypes.STRING,
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
    Text3: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Text4: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Text5: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    UnitInd1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    UnitInd2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    UnitInd3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    UnitInd4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    UnitName1: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    UnitName2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    UnitName3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    UnitName4: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    UsfwsCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    Visibility: {
      type: DataTypes.INTEGER(4),
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
    YesNo3: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    TaxonTreeDefItemID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    ModifiedByAgentID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    CreatedByAgentID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    HybridParent1ID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    ParentID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    HybridParent2ID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    AcceptedID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    TaxonTreeDefID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
    },
    VisibilitySetByID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    }
   
}, {
	tableName: 'taxon',
	timestamps: false,
	freezeTableName: true,
	classMethods: {
		
		associate: function(models) {
		
			models.Taxon
				.belongsTo(models.Taxon, {
					foreignKey: "ParentID",
					as: "Parent"
				});
			
			models.Taxon
				.hasMany(models.Taxon, {
					foreignKey: "ParentID",
					as: "children"
				});
				/*
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
return Taxon;
};

