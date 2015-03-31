"use strict";


module.exports = function(sequelize, DataTypes) {
  var Storagetreedef = sequelize.define("storagetreedef", {
	StorageTreeDefID: {
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
	tableName: 'storagetreedef',
	timestamps: false,
	freezeTableName: true,
	classMethods: {
		
		associate: function(models) {
         
		  /*
          models.Institution
  		  .belongsTo(models.Storagetreedef, {foreignKey : 'StorageTreeDefID'});
		  */
     
      models.Storagetreedef
		  .hasMany(models.Storagetreedefitem, {foreignKey : 'StorageTreeDefID'}); 
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
return Storagetreedef;
};

