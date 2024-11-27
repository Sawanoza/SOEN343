const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transporter = sequelize.define('Transporter', {
  transporterId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  // Automatically increments the transporterId
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  vehicleType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt columns
  tableName: 'transporters', // Explicit table name if needed
});

module.exports = Transporter;
