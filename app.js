const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Fake DB
const formData = [];

app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.render('index');
});

app.post('/form', function(req, res) {
  if (req.body.user_data.length === 0) {
    res.send ({ message: 'Please input some text!' });
    return;
  }
  formData.push(req.body);
  console.log('user_data saved: ' + formData[formData.length - 1].user_data);
  res.status(200);
  res.send({ message: 'Form submitted!<br>You wrote: ' + req.body.user_data });
});

app.use(function(req, res) {
  res.status(404);
  res.redirect('/');
});

app.listen(3000, function() {
  console.log('App started on port 3000');
});
