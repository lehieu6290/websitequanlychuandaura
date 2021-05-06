const express = require('express');
const passport = require('passport');
const session = require('express-session');
const session_config = require('./config/session');
const initPassportLocal = require('./controllers/auth/passportLocal');

const app = express();
const port = 3000;

//Set up
app.set("view engine", "ejs");
app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(session(session_config));
app.use(passport.initialize());
app.use(passport.session());

//Test
// app.get('/', (req, res) => {
//     res.render('index', { fullname: req.user.magiangvien });
// });

// Đăng ký
// const db = require('./config/database');
// const bcrypt = require('bcrypt');
// app.get('/register', async (req, res) => {
//     let passwordHashed = await bcrypt.hash('12345', 10);
//     let query = "INSERT INTO giangvien VALUES('b1706697', 'Nguyễn Văn A', 'ab1706697@student.ctu.edu.vn', false, $1)";
//     db.query(query, [passwordHashed])
//     .then(() => {
//         res.send("OK");
//     }).catch(() => {
//         res.send("NOT");
//     })
// });

//Init Passport Local
initPassportLocal(passport);

// Import routes
const giangvienRouter = require('./routes/giangvienRouter');
const hocphanRouter = require('./routes/hocphanRouter');
const lophocphanRouter = require('./routes/lophocphanRouter');
const mucdiemRouter = require('./routes/mucdiemRouter');
const chitietchuanRouter = require('./routes/chitietchuanRouter');
const nguoidungRouter = require('./routes/nguoidungRouter');
const chuandauraRouter = require('./routes/chuandauraRouter');

// Use routes
app.use('/', giangvienRouter);
app.use('/hocphan', hocphanRouter);
app.use('/lophocphan', lophocphanRouter);
app.use('/mucdiem', mucdiemRouter);
app.use('/chitietchuan', chitietchuanRouter);
app.use('/nguoidung', nguoidungRouter);
app.use('/chuandaura', chuandauraRouter);

//Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});