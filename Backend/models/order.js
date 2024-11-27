const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  trackingID: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Ensure tracking ID is unique
  },
  arrivalDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  orderStatus: {
    type: DataTypes.ENUM('shipped', 'en route', 'delayed', 'canceled'),
    allowNull: false,
    defaultValue: 'shipped', // Default status
  }
}, {
  timestamps: false, // Adds createdAt and updatedAt columns
  tableName: 'orders', // Explicit table name if needed
});

module.exports = Order;
