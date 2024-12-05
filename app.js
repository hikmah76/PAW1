require('dotenv').config();
const express = require('express');
const app = express();
const todoRoutes = require('./routes/tododb.js')
const port = process.env.PORT;
const db = require('./database/db.js');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const { isAuthenticated } = require('./middleware/middlewares.js');
const path = require('path');
app.set('views engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public/css/index.css'));
console.log(path.join(__dirname, 'public/css/todo.css'));

app.use(session({
    secret: process.env.SESSION_SECRET, // Gunakan secret key yang aman
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // Set ke true jika menggunakan HTTPS
}));

app.use('/', authRoutes);

app.use('/todos', todoRoutes);
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index');
});
app.post('/login', (req, res) => {
    // Validasi login
    if (validasiBerhasil) {
        res.redirect('/todo'); // Arahkan ke halaman Todo setelah login berhasil
    } else {
        res.redirect('/login'); // Arahkan kembali ke halaman login jika gagal
    }
});

app.post('/signup', (req, res) => {
    // Proses signup
    if (signupBerhasil) {
        res.redirect('/contact'); // Arahkan ke halaman Contact setelah signup berhasil
    } else {
        res.redirect('/signup'); // Arahkan kembali ke halaman signup jika gagal
    }
});


app.get('/home', (req, res) => {
    res.render('home'); // Render home.ejs
});

app.get('/contact', (req, res) => {
    res.render('contact'); // Render contact.ejs
});

app.get('/todo', (req, res) => {
    res.render('todo'); // Render todo.ejs
});




app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
}); 