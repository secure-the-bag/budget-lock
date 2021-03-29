const express = require('express');

const app = express();
const port = 3000;
const config = require('./config');
// eslint-disable-next-line import/order
const client = require('twilio')(config.accountID, config.authToken);

app.get('/login', (req, res) => {
  client.verify.services(config.serviceID)
    .verifications
    .create({
      to: `+${req.query.phoneNumber}`,
      channel: 'sms',
    })
    .then((data) => {
      res.status(200).send(data);
    });
});

app.get('/verify', (req, res) => {
  client.verify.services(config.serviceID)
    .verificationChecks
    .create({
      to: `+${req.query.phoneNumber}`,
      code: req.query.code,
    })
    .then((data) => {
      res.status(200).send(data);
    });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
