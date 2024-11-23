const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // For parsing JSON request bodies
const path = require('path'); // For serving static files
const sequelize = require('./config/database');  // Import the Sequelize connection
const { User } = require('./models/user');  // Import the User and child models
const Transporter = require('./models/transporter.js');
const { Order, OrderDetail, Item } = require('./models/order');  // Import models
const userRoutes = require('./routes/userRoutes'); // Import routes
// const transportRoutes = require('./routes/transporterRoutes');  // Import transport routes
// const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());
app.use(cors());

// Initialize the database and add sample data
async function initializeDatabase() {
  await sequelize.sync({ force: true });
  console.log("In-memory database is ready!");

  //--------------------------------- SAMPLE USERS ----------------------------------------------
  
  // Creating a Company user
  const newCompany = await User.create({
    email: 'company@example.com',
    phoneNumber: '123-456-7890',
    paymentNumber: 12345,
    type: 'Company',  // Specify type as 'Company'
    companyName: 'Awesome Corp',  // Specific field for Company
    govClearance: true,  // Specific field for Company
  });
  console.log("Company user created:", newCompany.toJSON());

  // Creating a Client user
  const newClient = await User.create({
    email: 'client@example.com',
    phoneNumber: '987-654-3210',
    paymentNumber: 67890,
    type: 'Client',  // Specify type as 'Client'
    clientName: 'Client One',  // Specific field for Client
  });
  console.log("Client user created:", newClient.toJSON());

  // Creating an Admin user
  const newAdmin = await User.create({
    email: 'admin@example.com',
    phoneNumber: '555-555-5555',
    paymentNumber: 11223,
    type: 'Admin',  // Specify type as 'Admin'
    adminName: 'Admin Super',  // Specific field for Admin
  });
  console.log("Admin user created:", newAdmin.toJSON());

  //--------------------------------- SAMPLE TRANSPORTERS ----------------------------------------------
  // Create a sample transport record for testing
  // const newTransporter = await Transporter.create({
  //   lat: 37.7749,
  //   long: -122.4194,
  //   batteryLevel: 85,
  //   type: 'ready',
  //   status: 'EV',
  //   altitude: null
  // });
  // console.log("Sample transport created:", newTransporter.toJSON());

  //--------------------------------- SAMPLE ORDER, ORDER DETAIL, ITEM ----------------------------------------------
  // Creating a sample order
  const newOrder = await Order.create({
    trackingID: 'TR12345',
    date: new Date('2024-11-07T10:00:00Z')
  });
  console.log("Sample order created:", newOrder.toJSON());

  // Creating a sample order detail for the order
  const newOrderDetail = await OrderDetail.create({
    quantity: 3,
    dimensions: '20x30x40 cm',
    taxStatus: 'taxable',
    orderId: newOrder.id  // Foreign key linking to the order
  });
  console.log("Sample order detail created:", newOrderDetail.toJSON());

  // Creating sample items for the order detail
  const newItem1 = await Item.create({
    name: 'Item 1',
    description: 'Description of Item 1',
    itemNumber: 'ITEM123',
    shippingWeight: 1.2,
    orderDetailId: newOrderDetail.id  // Foreign key linking to the order detail
  });
  console.log("Sample item 1 created:", newItem1.toJSON());

  const newItem2 = await Item.create({
    name: 'Item 2',
    description: 'Description of Item 2',
    itemNumber: 'ITEM124',
    shippingWeight: 1.5,
    orderDetailId: newOrderDetail.id  // Foreign key linking to the order detail
  });
  console.log("Sample item 2 created:", newItem2.toJSON());
}

// Routes
app.use('/users', userRoutes);
// app.use('/transporters', transportRoutes);
// app.use('/orders', orderRoutes);

// Serve the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build'))); // Adjust path to React build folder

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html')); // Adjust path to React build index.html
  });
}

// Initialize database and start the server
initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(error => console.error("Error initializing the database:", error));
