const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const session = require('express-session');
const PORT = process.env.PORT || 3000;


mongoose.connect("mongodb+srv://bintang:123@cluster0.hxxeo.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    app.listen(PORT, () => {
        console.log(`Database connected \nServer running on port: ${PORT}`);
    });
}).catch(err => console.log(err));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.use(session({
    secret: 'azuragliska',  // Anda bisa mengganti 'yourSecretKey' dengan key rahasia Anda
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Jika Anda menggunakan HTTPS, ubah menjadi true
}));

// Import routes
const siswaRoutes = require('./routes/siswa');
const guruRoutes = require('./routes/guru');
const adminRoutes = require('./routes/admin');
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');



// Gunakan routes
app.use(loginRoutes);
app.use('/siswa', siswaRoutes);
app.use('/guru', guruRoutes);
app.use('/admin',adminRoutes)
app.use('/logout', logoutRoutes);

