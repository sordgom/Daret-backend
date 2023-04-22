require('dotenv').config(); // enables loading .env vars
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8080;
const daretRouter = require('./src/routes/daret.route');
const campaignRouter = require('./src/routes/campaign.route');
const faucetRouter = require('./src/routes/faucet.route');
const cors = require('cors');
const path = require('path');

// Middleware to set CORS headers
app.use((req, res, next) => {
  // Allow any origin to access the resources
  res.header('Access-Control-Allow-Origin', '*');
  // Allowed request methods
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // Allowed request headers
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/daret', daretRouter);
app.use('/campaign',campaignRouter);
app.use('/faucet',faucetRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  return;
});

// For heroku deployment
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'http' ) {
    res.redirect(`https://${req.headers.host}${req.url}`);
  } else {
    next();
  }
});

const listener = app.listen(port, () => {
  console.log('Listening on port ' + listener.address().port)
});
