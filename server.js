// Connecting to the server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var path = require('path');
const app = express();
const port = process.env.PORT || 3700;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// Connect to DB
const mongoose = require('mongoose');
mongoose.connect("mongodb://0.0.0.0:27017/Final_Project",
{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('💾 Connected to DB')
})
.catch((err) => {
    console.error('Error connecting to the database:', err);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Set the views directory for your EJS templates
app.set('views', path.join(__dirname, 'Views'));
app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public/')));

const Home = require('./Routes/Home');
const Orders = require('./Routes/Orders');
const Products = require('./Routes/Products');
const Users = require('./Routes/Users');
const Admin = require('./Routes/Admin');
const Cart = require('./Routes/Cart');
const Shop = require('./Routes/Shop');

app.use('/', Home);
app.use('/Orders', Orders);
app.use('/Products', Products);
app.use('/Users', Users);
app.use('/Admin', Admin);
app.use('/Cart', Cart);
app.use('/Shop', Shop);