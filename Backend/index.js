//===============================================================================================
// ACCOUNTS & APPLICATION (MARC)
const Account = require('./models/account');
const accountRoutes = require('./routes/accountRoutes');
const OrderRoutes = require('./routes/orderRoutes')
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', accountRoutes)
app.use('/api/accounts', accountRoutes);


const PORT = 3001;
//===============================================================================================

// index.js
const sequelize = require('./config/database');  // Import the Sequelize connection










//initialize database
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
}





//===============================================================================================
// ROUTES
//===============================================================================================
app.use('/users', accountRoutes);
app.use('/order', OrderRoutes );
// app.use('/transporters', transportRoutes);
// app.use('/orders', OrderRoutes);
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