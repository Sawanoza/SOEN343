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
    type: DataTypes.ENUM('shipped', 'en route', 'delayed', 'canceled', 'dropped-off'),
    allowNull: false,
    defaultValue: 'shipped', // Default status
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true, // Ensure the value is a valid email address
    },
  },
  status: {
    type: DataTypes.ENUM('created', 'confirmed', 'dropped-off'),
    allowNull: false,
    defaultValue: 'created', // Default status
  },
}, {
  timestamps: false, // Adds createdAt and updatedAt columns
  tableName: 'orders', // Explicit table name if needed
});

module.exports = Order;
