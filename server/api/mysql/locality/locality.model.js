'use strict';


module.exports = function(sequelize, DataTypes) {
	var Locality = sequelize.define("locality", {
		LocalityID: {
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
		Datum: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		ElevationAccuracy: {
			type: DataTypes.FLOAT(24),
			allowNull: true,
		},
		ElevationMethod: {
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
		Lat1Text: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		Lat2Text: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		LatLongAccuracy: {
			type: DataTypes.FLOAT(24),
			allowNull: true,
		},
		LatLongMethod: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		LatLongType: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		Latitude1: {
			type: DataTypes.DECIMAL(12, 10),
			allowNull: true,
		},
		Latitude2: {
			type: DataTypes.DECIMAL(12, 10),
			allowNull: true,
		},
		LocalityName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		Long1Text: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		Long2Text: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		Longitude1: {
			type: DataTypes.DECIMAL(13, 10),
			allowNull: true,
		},
		Longitude2: {
			type: DataTypes.DECIMAL(13, 10),
			allowNull: true,
		},
		MaxElevation: {
			type: DataTypes.FLOAT(24),
			allowNull: true,
		},
		MinElevation: {
			type: DataTypes.FLOAT(24),
			allowNull: true,
		},
		NamedPlace: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		OriginalElevationUnit: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		OriginalLatLongUnit: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		},
		RelationToNamedPlace: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		Remarks: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		SGRStatus: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
		},
		ShortName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		SrcLatLongUnit: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
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
		Text4: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		Text5: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		VerbatimElevation: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		VerbatimLatitude: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		VerbatimLongitude: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		Visibility: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
		},
		PaleoContextID: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		},
		ModifiedByAgentID: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		},
		GeographyID: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		},
		DisciplineID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
		},
		VisibilitySetByID: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		},
		CreatedByAgentID: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		}
	}, {
		tableName: 'locality',
		timestamps: false,
		freezeTableName: true,
		classMethods: {

			associate: function(models) {
				/*
				models.Locality
					.belongsTo(models.Geography, {
						foreignKey: 'disciplineId'
					});
				*/
			}

		}
	});
	return Locality;
};
