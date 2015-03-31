'use strict';


module.exports = function(sequelize, DataTypes) {
	var Division = sequelize.define("division", {
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
		Abbrev: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		AltName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		Description: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		DisciplineType: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		divisionId: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		},
		IconURI: {
			type: DataTypes.STRING,
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
		Uri: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		AddressID: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		},
		InstitutionID: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			references: "institution",
			referencesKey: "institutionId"
		}
	}, {
		tableName: 'division',
		timestamps: false,
		freezeTableName: true,
		classMethods: {

			associate: function(models) {

				models.Division
					.belongsTo(models.Institution, {
						foreignKey: 'InstitutionID'
					});
			}

		}
	});
	return Division;
};
