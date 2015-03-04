'use strict';


module.exports = function(sequelize, DataTypes) {
  var Collector = sequelize.define("collector", {
      CollectorID: {
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
      IsPrimary: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      OrderNumber: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      Remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      DivisionID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      AgentID: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
      },
      CollectingEventID: {
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
      }
}, {
	tableName: 'collector',
	timestamps: false,
	freezeTableName: true,
	classMethods: {
		
      associate: function(models) {
       // Collector.hasMany(models.Workbenchtemplate)
      }
	  
	}
});
return Collector;
};
