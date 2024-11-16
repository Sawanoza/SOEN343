// models/user.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Import the Sequelize instance

// Define User model (parent model for all types of users)
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING, // You could use this field to distinguish between types
    allowNull: false
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  clientName: {
    type: DataTypes.STRING,
    allowNull: true
  },
  adminName: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  // Add the `paranoid` option to use soft deletes (optional)
  paranoid: true
});

// Define the associations in a way that one user can have only one specific child type.
User.belongsTo(User, { as: 'Company', foreignKey: 'companyId' });
User.belongsTo(User, { as: 'Client', foreignKey: 'clientId' });
User.belongsTo(User, { as: 'Admin', foreignKey: 'adminId' });

// Export the User model (which can be used for all types)
module.exports = { User };
