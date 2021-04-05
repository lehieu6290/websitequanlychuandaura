const express = require('express');
const app = express();
const port = 3000;

app.set("view engine", "ejs");

// Import routes
const accountRoute = require('./routes/accountRoute');

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.render('index', { fullname: 'Tôi' });
});

app.use('/account', accountRoute);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});