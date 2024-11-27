//===============================================================================================
// ACCOUNTS & APPLICATION (MARC)
const Account = require('./models/account');
const accountRoutes = require('./routes/accountRoutes');
const OrderRoutes = require('./routes/orderRoutes');
const transporterRoutes = require('./routes/transporterRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');
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

    // Sample Warehouses
    const sampleWarehouses = [
      {
        warehouseId: 1,
        location: 'New York, NY',
        capacity: 5000,
        status: 'active',
      },
      {
        warehouseId: 2,
        location: 'Los Angeles, CA',
        capacity: 8000,
        status: 'under maintenance',
      },
      {
        warehouseId: 3,
        location: 'Chicago, IL',
        capacity: 12000,
        status: 'active',
      },
      {
        warehouseId: 4,
        location: 'Houston, TX',
        capacity: 3000,
        status: 'inactive',
      },
    ];
    
    // Create warehouses in the database
    await Warehouse.bulkCreate(sampleWarehouses);
    console.log("Sample warehouses created!");

    // Sample Transporters
    const sampleTransporters = [
      {
        transporterId: 1,
        name: 'John Doe',
        vehicleType: 'Truck',
        phoneNumber: '123-456-7890',
        actions: ['Deliver', 'Pickup'],
      },
      {
        transporterId: 2,
        name: 'Jane Smith',
        vehicleType: 'Van',
        phoneNumber: '234-567-8901',
        actions: ['Pickup'],
      },
      {
        transporterId: 3,
        name: 'Bob Johnson',
        vehicleType: 'Bike',
        phoneNumber: '345-678-9012',
        actions: ['Deliver'],
      },
      {
        transporterId: 4,
        name: 'Alice Williams',
        vehicleType: 'Truck',
        phoneNumber: '456-789-0123',
        actions: ['Deliver', 'Pickup', 'Assist'],
      },
    ];
    
    // Create transporters in the database
    await Transporter.bulkCreate(sampleTransporters);
    console.log("Sample transporters created!");

  } catch (error) {
    console.error("Error during database initialization:", error);
  }
}

//===============================================================================================
// ROUTES
//===============================================================================================
app.use('/users', accountRoutes);
app.use('/order', OrderRoutes );
app.use('/transporter', transporterRoutes);
app.use('/warehouse', warehouseRoutes);
// app.use('/orders', OrderRoutes);
//===============================================================================================

// Start the server
(async () => {
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
