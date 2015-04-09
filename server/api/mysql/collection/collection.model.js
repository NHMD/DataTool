"use strict";


module.exports = function(sequelize, DataTypes) {
	var Collection = sequelize.define("collection", {
		UserGroupScopeId: {
			type: DataTypes.INTEGER,
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
		ModifiedByAgentID: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		},
		CreatedByAgentID: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		},
		CatalogFormatNumName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Code: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		collectionId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		},
		CollectionName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		CollectionType: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		DbContentVersion: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		Description: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		DevelopmentStatus: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		EstimatedSize: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		},
		GUID: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		InstitutionType: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		IsEmbeddedCollectingEvent: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		IsaNumber: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		KingdomCoverage: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		PreservationMethodType: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		PrimaryFocus: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		PrimaryPurpose: {
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
		Scope: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		WebPortalURI: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		WebSiteURI: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		DisciplineID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		},
		InstitutionNetworkID: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		}

	}, {
		tableName: 'collection',
		timestamps: false,
		freezeTableName: true,
		classMethods: {

			associate: function(models) {
							
				models.Collection
					.belongsTo(models.Discipline, {
						foreignKey: 'disciplineId'
					});
			
			}

		}
	});
	return Collection;
};
