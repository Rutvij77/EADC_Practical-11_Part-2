var express = require('express');

var PORT;
var Cloudant = require('@cloudant/cloudant');


if (process.env.PORT) {
  PORT = process.env.PORT;
} else {
  PORT = 8000;
}
var Cloudant = require('@cloudant/cloudant');
var url = "https://apikey-v2-2wpjd7ykkqnd4gvkacj3k0i9sji2badp7elda1fwwafq:e72f7554bcfa164e1b8b98931508c8fd@76216f95-4d85-4b3e-a279-b25f2875d5d1-bluemix.cloudantnosqldb.appdomain.cloud";
var username = "apikey-v2-2wpjd7ykkqnd4gvkacj3k0i9sji2badp7elda1fwwafq";
var password = "e72f7554bcfa164e1b8b98931508c8fd";
var app = express();
const bodyParser = require('body-parser');
//const cors = require('cors');
//app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
////////////
app.post('/insert', (req, res) => {

  const { name, email, database } = req.body;
  
  const data = {
      name: name,
      email: email
  };
///////
Cloudant({ url: url, username: username, password: password }, function(err, cloudant, pong) {
  if (err) {
    return console.log('Failed to initialize Cloudant: ' + err.message);
  }
console.log(pong); // {"couchdb":"Welcome","version": ..

cloudant.use(database).insert({ "name": name, "email": email } , (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data); // { ok: true, id: 'rabbit', ...
      }
    });
});

});


app.listen(PORT);
//console.log(message.getPortMessage() + PORT);



