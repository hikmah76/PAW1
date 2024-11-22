
const express = require('express');
const app = express();
const todoRoutes = require('./routes/tododb.js')
const port = process.env.PORT;
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const { isAuthenticated } = require('./middlewares/middleware.js');

app.use(express.json());

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
});contact

app.get('/', isAuthenticated,(req, res) => {
    res.render('contact');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
}); //