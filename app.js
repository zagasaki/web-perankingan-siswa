// app.js
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect("mongodb+srv://bintang:123@cluster0.hxxeo.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected");
}).catch(err => console.error("Database connection error: ", err));

// Set up view engine and static files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'azuragliska',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Use secure: true if using HTTPS
}));

// Import routes
const siswaRoutes = require('./routes/siswa');
const guruRoutes = require('./routes/guru');
const adminRoutes = require('./routes/admin');
const logoutRoutes = require('./routes/logout');
const loginRoutes = require('./routes/login'); // Import route login

// Use routes
app.use('/siswa', siswaRoutes);
app.use('/guru', guruRoutes);
app.use('/admin', adminRoutes);
app.use('/logout', logoutRoutes);
app.use('/', loginRoutes); // Atur route root mengarah ke login

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  

module.exports = app;
