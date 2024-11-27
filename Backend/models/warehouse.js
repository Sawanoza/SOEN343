const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Adjust path based on your project structure

const Warehouse = sequelize.define('Warehouse', {
  warehouseId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: 'warehouse_id', // Column name in the database
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'under maintenance'),
    allowNull: false,
    defaultValue: 'active', // Default status
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt columns
  tableName: 'warehouses', // Explicit table name if needed
});

module.exports = Warehouse;
