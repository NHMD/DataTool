"use strict";


module.exports = function(sequelize, DataTypes) {
  var Geographytreedef = sequelize.define("geographytreedef", {
	GeographyTreeDefID: {
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
    ModifiedByAgentID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    CreatedByAgentID: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    }
   
}, {
	tableName: 'geographytreedef',
	timestamps: false,
	freezeTableName: true,
	classMethods: {
		
		associate: function(models) {
         
		  
          models.Discipline
  		  .belongsTo(models.Geographytreedef, {foreignKey : 'GeographyTreeDefID'});
		  
     
      models.Geographytreedef
		  .hasMany(models.Geographytreedefitem, {foreignKey : 'GeographyTreeDefID'}); 
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
return Geographytreedef;
};

