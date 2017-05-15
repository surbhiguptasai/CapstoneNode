const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

// Mongoose internally uses a promise-like object,
// but its better to make Mongoose use built in es6 promises
mongoose.Promise = global.Promise;
mongoose.set('debug', true);

// config.js is where we control constants for entire
// app like PORT and DATABASE_URL
const {PORT, DATABASE_URL} = require('./config');
const {UserDetail} = require('./models');
//const {ActTypeDetail} = require('./models');
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(request, response) {
  response.render('views/index', { title: 'ejs' })

});
// GET requests to /restaurants => return 10 restaurants
app.get('/users', (req, res) => {
  //console.log("req.query"+JSON.stringify(req.query));
  //var queryString=JSON.stringify(req.query);
  console.log("req.query"+JSON.stringify(req.query));
  
//console.log("UserDetail is "+UserDetail);
    // var numofRecords = req.param('numRecords');
    // console.log("numofRecords"+numofRecords);
    //console.log("req.query.accountID"+req.query.accountID);
 
  UserDetail
    .find(
      req.query

      )
    // we're limiting because restaurants db has > 25,000
    // documents, and that's too much to process/return
   //.limit(100)
    // `exec` returns a promise
    .exec()
    // success callback: for each restaurant we got back, we'll
    // call the `.apiRepr` instance method we've created in
    // models.js in order to only expose the data we want the API return.
    .then(users => {
      res.json({
        users: users.map(
          (user) => user.apiRepr())
      });
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});
app.get('/distinct', (req, res) => {
  console.log("req.params.distinct "+req.query.distinct);

   
  UserDetail.distinct(
      req.query.distinct
      )
    // we're limiting because restaurants db has > 25,000
    // documents, and that's too much to process/return
    //.limit(10)
    // `exec` returns a promise
    .exec()
    // success callback: for each restaurant we got back, we'll
    // call the `.apiRepr` instance method we've created in
    // models.js in order to only expose the data we want the API return.
    .then(acttype => {
      console.log("acttype is "+acttype);
      res.json({
      acttype
      });
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});


// app.get('/distinct', (req, res) => {
//   console.log("req.params.distinct "+req.query.distinct);

   
//   UserDetail.distinct(
//       req.query.distinct
//       )
//     // we're limiting because restaurants db has > 25,000
//     // documents, and that's too much to process/return
//     //.limit(10)
//     // `exec` returns a promise
//     .exec()
//     // success callback: for each restaurant we got back, we'll
//     // call the `.apiRepr` instance method we've created in
//     // models.js in order to only expose the data we want the API return.
//     .then(gender => {
//       console.log("gender is "+gentype);
//       res.json({
//       gender
//       });
//     })
//     .catch(
//       err => {
//         console.error(err);
//         res.status(500).json({message: 'Internal server error'});
//     });
// });

// app.get('/distinct', (req, res) => {
//   console.log("req.params.distinct "+req.query.distinct);

   
//   UserDetail.distinct(
//       req.query.distinct
//       )
//     // we're limiting because restaurants db has > 25,000
//     // documents, and that's too much to process/return
//     //.limit(10)
//     // `exec` returns a promise
//     .exec()
//     // success callback: for each restaurant we got back, we'll
//     // call the `.apiRepr` instance method we've created in
//     // models.js in order to only expose the data we want the API return.
//     .then(city => {
//       console.log("city is "+city);
//       res.json({
//       city
//       });
//     })
//     .catch(
//       err => {
//         console.error(err);
//         res.status(500).json({message: 'Internal server error'});
//     });
// });

// app.get('/users/:accountId', (req, res) => {
//   UserDetail
//     .find(
//       {
       
//        // totalAmount : 345600 
//         //"name.firstName" : "Tom"
//         "accountID": req.params.accountId
//       }
//       )
//     // we're limiting because restaurants db has > 25,000
//     // documents, and that's too much to process/return
//     //.limit(10)
//     // `exec` returns a promise
//     .exec()
//     // success callback: for each restaurant we got back, we'll
//     // call the `.apiRepr` instance method we've created in
//     // models.js in order to only expose the data we want the API return.
//     .then(users => {
//       res.json({
//         users: users.map(
//           (user) => user.apiRepr())
//       });
//     })
//     .catch(
//       err => {
//         console.error(err);
//         res.status(500).json({message: 'Internal server error'});
//     });
// });

// can also request by ID
// app.get('/restaurants/:id', (req, res) => {
//   Restaurant
//     // this is a convenience method Mongoose provides for searching
//     // by the object _id property
//     .findById(req.params.id)
//     .exec()
//     .then(restaurant =>res.json(restaurant.apiRepr()))
//     .catch(err => {
//       console.error(err);
//         res.status(500).json({message: 'Internal server error'})
//     });
// });


// app.post('/restaurants', (req, res) => {

//   const requiredFields = ['name', 'borough', 'cuisine'];
//   for (let i=0; i<requiredFields.length; i++) {
//     const field = requiredFields[i];
//     if (!(field in req.body)) {
//       const message = `Missing \`${field}\` in request body`
//       console.error(message);
//       return res.status(400).send(message);
//     }
//   }

//   Restaurant
//     .create({
//       name: req.body.name,
//       borough: req.body.borough,
//       cuisine: req.body.cuisine,
//       grades: req.body.grades,
//       address: req.body.address})
//     .then(
//       restaurant => res.status(201).json(restaurant.apiRepr()))
//     .catch(err => {
//       console.error(err);
//       res.status(500).json({message: 'Internal server error'});
//     });
// });


// app.put('/restaurants/:id', (req, res) => {
//   // ensure that the id in the request path and the one in request body match
//   if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
//     const message = (
//       `Request path id (${req.params.id}) and request body id ` +
//       `(${req.body.id}) must match`);
//     console.error(message);
//     res.status(400).json({message: message});
//   }

//   // we only support a subset of fields being updateable.
//   // if the user sent over any of the updatableFields, we udpate those values
//   // in document
//   const toUpdate = {};
//   const updateableFields = ['name', 'borough', 'cuisine', 'address'];

//   updateableFields.forEach(field => {
//     if (field in req.body) {
//       toUpdate[field] = req.body[field];
//     }
//   });

//   Restaurant
//     // all key/value pairs in toUpdate will be updated -- that's what `$set` does
//     .findByIdAndUpdate(req.params.id, {$set: toUpdate})
//     .exec()
//     .then(restaurant => res.status(204).end())
//     .catch(err => res.status(500).json({message: 'Internal server error'}));
// });

// app.delete('/restaurants/:id', (req, res) => {
//   Restaurant
//     .findByIdAndRemove(req.params.id)
//     .exec()
//     .then(restaurant => res.status(204).end())
//     .catch(err => res.status(500).json({message: 'Internal server error'}));
// });

// catch-all endpoint if client makes request to non-existent endpoint
app.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
});

// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl=DATABASE_URL, port=PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {app, runServer, closeServer};
