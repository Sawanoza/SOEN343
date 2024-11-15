// models/order.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');  // Import the Sequelize instance

// Define the Order model
const Order = sequelize.define('Order', {
  trackingID: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

// Define the OrderDetail model
const OrderDetail = sequelize.define('OrderDetail', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  dimensions: {
    type: DataTypes.STRING,  // Could be a JSON or a specific format
    allowNull: false
  },
  taxStatus: {
    type: DataTypes.STRING,  // E.g., 'exempt', 'taxable'
    allowNull: false
  }
});

// Define the Item model
const Item = sequelize.define('Item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  itemNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shippingWeight: {
    type: DataTypes.FLOAT,  // Assuming weight is a float (e.g., in kg or lbs)
    allowNull: false
  }
});

// Associations
Order.hasMany(OrderDetail);  // One order has many order details
OrderDetail.belongsTo(Order);  // Each order detail belongs to one order

OrderDetail.hasMany(Item);  // One order detail has many items
Item.belongsTo(OrderDetail);  // Each item belongs to one order detail

module.exports = { Order, OrderDetail, Item };
