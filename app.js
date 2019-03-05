const express = require('express');
const fs = require('fs');
const app = express();

app.set('view engine', 'ejs');

app.use(function(req, res, next) {
    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`;
    fs.appendFile('server.log', log + '\n', err => {
        if (err) {
            console.log('Unable to write to server.log');
        }
    })
    next();
})

// app.use(function(req, res) {
//     res.render('maintenance');
// });
app.use(express.static(__dirname + '/public'));
app.locals.currentYear = new Date().getFullYear();

app.get('/', function(req, res) {
    res.render('about', {
        pageTitle: 'Hello World',
        heading: 'Home',
    });
});
app.get('/about', function(req, res) {
    res.render('about', {
        pageTitle: 'Hello World',
        heading: 'About',
    });
});
app.get('/bad', function (req, res) {
    res.send({errorMessage: 'Something went wrong'});
});

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`The server is up and running on port ${port}!`);
});