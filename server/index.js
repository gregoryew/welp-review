const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/index.js');
const path = require('path');


const app = express();

const jsonParser = bodyParser.json();

app.use(express.static(path.join(__dirname, '/../public')));

app.use(jsonParser);

app.get('/api/review/:id', (req, res) => {
  db.retrieve(req.params.id, (err, reviews) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(reviews);
    }
  });
});

const port = process.env.PORT || 3004;

app.listen(port, () => console.log(`listening on port ${port}`));
