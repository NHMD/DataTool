"use strict";


module.exports = function(sequelize, DataTypes) {
  var Geologictimeperiodtreedef = sequelize.define("geologictimeperiodtreedef", {
	GeologicTimePeriodTreeDefID: {
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
    FullNameDirection: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Remarks: {
      type: DataTypes.TEXT,
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
	tableName: 'geologictimeperiodtreedef',
	timestamps: false,
	freezeTableName: true,
	classMethods: {
		
		associate: function(models) {
         
		  /*
          models.Institution
  		  .belongsTo(models.Geologictimeperiodtreedef, {foreignKey : 'StorageTreeDefID'});
		  */
     
      models.Geologictimeperiodtreedef
		  .hasMany(models.Geologictimeperiodtreedefitem, {foreignKey : 'GeologicTimePeriodTreeDefID'}); 
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
return Geologictimeperiodtreedef;
};

