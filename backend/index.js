// index.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database'); // Import Sequelize connection
const Account = require('./models/account'); // Account model
const Order = require('./models/order'); // Order model
const accountRoutes = require('./routes/accountRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/account', accountRoutes);
app.use('/order', orderRoutes);

// Initialize database
async function initializeDatabase() {
  try {
    // Sync the database (drops tables if they exist and recreates them)
    await sequelize.sync({ force: true });
    console.log("In-memory database is ready!");

    // Sample Account
    const adminAccount = await Account.create({
      id: 1,
      email: 'admin',
      password: 'admin',
      phoneNumber: '0000000000',
    });

    // Sample Orders
    const sampleOrders = [
      {
        trackingID: 'TRK123456',
        arrivalDate: new Date('2024-12-01'),
        orderStatus: 'shipped',
      },
      {
        trackingID: 'TRK654321',
        arrivalDate: new Date('2024-12-05'),
        orderStatus: 'en route',
      },
      {
        trackingID: 'TRK789012',
        arrivalDate: new Date('2024-12-10'),
        orderStatus: 'delayed',
      },
      {
        trackingID: 'TRK345678',
        arrivalDate: new Date('2024-11-30'),
        orderStatus: 'canceled',
      },
    ];

    // Create orders in the database
    await Order.bulkCreate(sampleOrders);
    console.log("Sample orders created!");
  } catch (error) {
    console.error("Error during database initialization:", error);
  }
}

// Start the server
(async () => {
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
