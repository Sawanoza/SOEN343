// models/transporter.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');  // Import Sequelize instance

// Define Transport model
const Transporter = sequelize.define('Transporter', {
  lat: {
    type: DataTypes.FLOAT,
    allowNull: false,  
  },
  long: {
    type: DataTypes.FLOAT,
    allowNull: false,  
  },
  batteryLevel: {
    type: DataTypes.FLOAT,
    allowNull: false,  
    validate: {
      min: 0,  
      max: 100,
    }
  },
  type: {
    type: DataTypes.ENUM,
    values: ['transit', 'charging', 'ready'], 
    allowNull: false,  
  },
  status: {
    type: DataTypes.ENUM,
    values: ['EV', 'Drone'],  
    allowNull: false,  
  },
  altitude: {
    type: DataTypes.FLOAT,
    allowNull: true,  // Altitude is nullable (it can be null)
  }
});


module.exports = Transporter;
