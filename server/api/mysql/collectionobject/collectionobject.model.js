'use strict';


module.exports = function(sequelize, DataTypes) {
  var Collectionobject = sequelize.define("collectionobject", {
      CollectionobjectID: {
        type: DataTypes.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
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
        allowNull: true,
		  defaultValue: 0
      },
      CollectionMemberID: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      AltCatalogNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Availability: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      CatalogNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      CatalogedDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      CatalogedDatePrecision: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
      },
      CatalogedDateVerbatim: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      CountAmt: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      Deaccessioned: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      Description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      FieldNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      GUID: {
		type: DataTypes.UUID,
		allowNull: true,
		defaultValue: DataTypes.UUIDV1,
      },
      Integer1: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      Integer2: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      InventoryDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      Modifier: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Notifications: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Number1: {
        type: DataTypes.FLOAT(20,10),
        allowNull: true,
      },
      Number2: {
        type: DataTypes.FLOAT(20,10),
        allowNull: true,
      },
      ObjectCondition: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      OCR: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ProjectNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ReservedInteger3: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      ReservedInteger4: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      ReservedText: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ReservedText2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ReservedText3: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Restrictions: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      SGRStatus: {
        type: DataTypes.INTEGER(4),
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
      Text3: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      TotalValue: {
        type: DataTypes.DECIMAL(12,2),
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
      YesNo4: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      YesNo5: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      YesNo6: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      ContainerOwnerID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      CollectionObjectAttributeID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      CatalogerID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      PaleoContextID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      AccessionID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      FieldNotebookPageID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      AppraisalID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      CollectingEventID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      CreatedByAgentID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      CollectionID: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
			references: "collection",
			referencesKey: "collectionId"
      },
      VisibilitySetByID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      ContainerID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      ModifiedByAgentID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      }
}, {
	tableName: 'collectionobject',
	timestamps: false,
	freezeTableName: true,
	classMethods: {
		
      associate: function(models) {
     
		  
		  
	models.Collection
		.hasMany(models.Collectionobject, {
			foreignKey: 'CollectionId',
			as: 'collectionobjects'
		});
      }
	  
	}
});
return Collectionobject;
};
