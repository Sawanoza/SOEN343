//===============================================================================================
// ACCOUNTS & APPLICATION (MARC)
const Account = require('./models/account');
const accountRoutes = require('./routes/accountRoutes');
const OrderRoutes = require('./routes/orderRoutes');
const transporterRoutes = require('./routes/transporterRoutes');
const warehouseRoutes = require('./routes/warehouseRoute');
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database'); // Import Sequelize connection
// const Account = require('./models/account'); // Account model
const Order = require('./models/order'); // Order model
const Transporter = require('./models/transporter')
const Warehouse = require('./models/warehouse')
// const accountRoutes = require('./routes/accountRoutes');
const orderRoutes = require('./routes/orderRoutes');

const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/account', accountRoutes);
app.use('/api', accountRoutes);
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
        trackingID: 'TRK111111',
        arrivalDate: new Date('2024-12-01'),
        orderStatus: 'shipped',
        pin: 111111
      },
      {
        trackingID: 'TRK222222',
        arrivalDate: new Date('2024-12-05'),
        orderStatus: 'en route',
        pin: 222222
      },
      {
        trackingID: 'TRK333333',
        arrivalDate: new Date('2024-12-10'),
        orderStatus: 'delayed',
        pin: 333333
      },
      {
        trackingID: 'TRK444444',
        arrivalDate: new Date('2024-11-30'),
        orderStatus: 'canceled',
        pin: 444444
      },
    ];

    // Create orders in the database
    await Order.bulkCreate(sampleOrders);
    console.log("Sample orders created!");


    // Sample Transporters
    const sampleTransporters = [
      {
        name: 'John Doe',
        vehicleType: 'Truck',
        phoneNumber: '123-456-7890',
      },
      {

        name: 'Jane Smith',
        vehicleType: 'Van',
        phoneNumber: '234-567-8901',
      },
      {
        name: 'Bob Johnson',
        vehicleType: 'Bike',
        phoneNumber: '345-678-9012',
      },
      {
        name: 'Alice Williams',
        vehicleType: 'Truck',
        phoneNumber: '456-789-0123',
      },
    ];

    // Create sample data in the database
    const createSampleData = async () => {
      try {
        await Transporter.bulkCreate(sampleTransporters, { ignoreDuplicates: true });
        console.log('Sample data added.');
      } catch (error) {
        console.error('Error creating sample data:', error);
      }
    };
    createSampleData();

    //sample warehouses
    const sampleWarehouses = [
      {
        name: 'Central Warehouse',
        location: 'Downtown City Center',
        capacity: 5000,
        status: 'active',
      },
      {
        name: 'North Warehouse',
        location: 'Northern Industrial Zone',
        capacity: 3000,
        status: 'inactive',
      },
      {
        name: 'East Warehouse',
        location: 'Eastern Suburbs',
        capacity: 4000,
        status: 'active',
      },
      {
        name: 'West Warehouse',
        location: 'Western Logistics Park',
        capacity: 3500,
        status: 'active',
      },
    ];
    

    // Create warehouses in the database
    await Warehouse.bulkCreate(sampleWarehouses);
    console.log("Sample warehouses created!");

  } catch (error) {
    console.error("Error during database initialization:", error);
  }

}






//===============================================================================================
// NODEMAILER
//===============================================================================================
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'marcyves.malchev2003@gmail.com', 
    pass: 'ygtw yqgg fvqc dolt',  
  },
});


app.post('/send-email', (req, res) => {
  const { recipient, subject, message } = req.body;

  const mailOptions = {
    from: 'marcyves.malchev2003@gmail.com',
    to: recipient,
    subject: subject,
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ success: false, message: 'Error: ' + error.toString() });
    }
    res.status(200).json({ success: true, message: 'Email sent: ' + info.response });
  });
});
//===============================================================================================






//===============================================================================================
// ROUTES
//===============================================================================================
app.use('/users', accountRoutes);
app.use('/order', OrderRoutes);
app.use('/transporter', transporterRoutes);
app.use('/warehouse', warehouseRoutes);
app.use('/orders', OrderRoutes);
//===============================================================================================

// Start the server
(async () => {
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
