'use strict';


module.exports = function(sequelize, DataTypes) {
  var Collectingevent = sequelize.define("collectingevent", {
      CollectingEventID: {
        type: DataTypes.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
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
      EndDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      EndDatePrecision: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
      },
      EndDateVerbatim: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      EndTime: {
        type: DataTypes.INTEGER(6),
        allowNull: true,
      },
      GUID: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Integer1: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      Integer2: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      Method: {
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
      ReservedText1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ReservedText2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      SGRStatus: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
      },
      StartDate: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      StartDatePrecision: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
      },
      StartDateVerbatim: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      StartTime: {
        type: DataTypes.INTEGER(6),
        allowNull: true,
      },
      StationFieldNumber: {
        type: DataTypes.STRING,
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
      VerbatimDate: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      VerbatimLocality: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Visibility: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
      },
      VisibilitySetByID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      CollectingEventAttributeID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      DisciplineID: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      CollectingTripID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      LocalityID: {
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
      },
      PaleoContextID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      }
}, {
	tableName: 'collectingevent',
	timestamps: false,
	freezeTableName: true,
	classMethods: {
		
      associate: function(models) {
       // Collectingevent.hasMany(models.Workbenchtemplate)
      }
	  
	}
});
return Collectingevent;
};
