'use strict';


module.exports = function(sequelize, DataTypes) {
	var Agent = sequelize.define("agent", {
		AgentID: {
			type: DataTypes.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		TimestampCreated: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		},
		TimestampModified: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		},
		Version: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			defaultValue: 0
		},
		Abbreviation: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		AgentType: {
			type: DataTypes.INTEGER(4),
			allowNull: false,
			defaultValue: 1
		},
		DateOfBirth: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		DateOfBirthPrecision: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
		},
		DateOfDeath: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		DateOfDeathPrecision: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
		},
		DateType: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
		},
		Email: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		FirstName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		GUID: {
			type: DataTypes.UUID,
			allowNull: true,
			defaultValue: DataTypes.UUIDV1,
		},
		Initials: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		Interests: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		JobTitle: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		LastName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		MiddleInitial: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		Remarks: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		Title: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		URL: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		CollectionTCID: {
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
		InstitutionTCID: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		},
		InstitutionCCID: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		},
		DivisionID: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		},
		CollectionCCID: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		},
		ParentOrganizationID: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		},
		SpecifyUserID: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
		},
		Suffix: {
			type: DataTypes.STRING,
			allowNull: true,
		}
	}, {
		tableName: 'agent',
		timestamps: false,
		freezeTableName: true,
		classMethods: {

			associate: function(models) {
				// Agent.hasMany(models.Workbenchtemplate)
			}

		}
	});
	return Agent;
};
