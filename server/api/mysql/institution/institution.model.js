'use strict';


module.exports = function(sequelize, DataTypes) {
  var Institution = sequelize.define("institution", {
      UserGroupScopeId: {
        type: DataTypes.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
        allowNull: false,
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
      ModifiedByAgentID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      CreatedByAgentID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      AltName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Copyright: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      CurrentManagedRelVersion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      CurrentManagedSchemaVersion: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Disclaimer: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      GUID: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      HasBeenAsked: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      IconURI: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      institutionId: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      Ipr: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      IsAccessionsGlobal: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      IsAnonymous: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      IsReleaseManagedGlobally: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      IsSecurityOn: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      IsServerBased: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      IsSharingLocalities: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      IsSingleGeographyTree: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      License: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      LsidAuthority: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      MinimumPwdLength: {
        type: DataTypes.INTEGER(4),
        allowNull: true,
      },
      Name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      RegNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      Remarks: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      TermsOfUse: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Uri: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      StorageTreeDefID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      },
      AddressID: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
      }
}, {
	tableName: 'institution',
	timestamps: false,
	freezeTableName: true,
	classMethods: {
		
      associate: function(models) {
  		
      }
	  
	}
});
return Institution;
};
