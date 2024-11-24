//===============================================================================================
// ACCOUNTS (MARC)
const Account = require('./models/account');
//===============================================================================================

// index.js
const express = require('express');
const bodyParser = require('body-parser'); // For parsing JSON request bodies
const sequelize = require('./config/database');  // Import the Sequelize connection
const Transporter = require('./models/transporter.js');
const { Order, OrderDetail, Item } = require('./models/order');  // Import models
const userRoutes = require('./routes/userRoutes'); // Import routes
const transportRoutes = require('./routes/transporterRoutes');  // Import transport routes
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Initialize the database and add sample data
async function initializeDatabase() {
  await sequelize.sync({ force: true });
  console.log("In-memory database is ready!");

//===============================================================================================
// SAMPLE USERS
//===============================================================================================
const adminAccount = await Account.create({
  id: 1,
  email: 'admin',
  password: 'admin',
  phoneNumber: '0000000000',
});
//===============================================================================================





























// PREVIOUS IMPLEMENTATION (NOT REMOVED SINCE IDK IF YOU USE THESE. MAKE IT MORE SIMPLE ANYWAYS, CHECK MY EXAMPLE WITH USERS)

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


//--------------------------------- SAMPLE order, orderDetail, item ----------------------------------------------

//  // Creating a sample order
//  const newOrder = await Order.create({
//   trackingID: 'TR12345',
//   date: new Date('2024-11-07T10:00:00Z')
// });
// console.log("Sample order created:", newOrder.toJSON());

// // Creating a sample order detail for the order
// const newOrderDetail = await OrderDetail.create({
//   quantity: 3,
//   dimensions: '20x30x40 cm',
//   taxStatus: 'taxable',
//   orderId: newOrder.id  // Foreign key linking to the order
// });
// console.log("Sample order detail created:", newOrderDetail.toJSON());

// // Creating sample items for the order detail
// const newItem1 = await Item.create({
//   name: 'Item 1',
//   description: 'Description of Item 1',
//   itemNumber: 'ITEM123',
//   shippingWeight: 1.2,
//   orderDetailId: newOrderDetail.id  // Foreign key linking to the order detail
// });
// console.log("Sample item 1 created:", newItem1.toJSON());

// const newItem2 = await Item.create({
//   name: 'Item 2',
//   description: 'Description of Item 2',
//   itemNumber: 'ITEM124',
//   shippingWeight: 1.5,
//   orderDetailId: newOrderDetail.id  // Foreign key linking to the order detail
// });
// console.log("Sample item 2 created:", newItem2.toJSON());

}
//----------------------------------------------------------------------------------------------------




























//===============================================================================================
// ROUTES
//===============================================================================================
app.use('/users', userRoutes);
// app.use('/transporters', transportRoutes);
// app.use('/orders', orderRoutes);
//===============================================================================================

//===============================================================================================
// INITIALIZE DB & START SERVER
//===============================================================================================
initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch(error => console.error("Error initializing the database:", error));
//===============================================================================================