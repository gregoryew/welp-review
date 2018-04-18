const express = require('express');
const bodyParser = require('body-parser');
const db = require('../db/index.js');
const path = require('path');

const app = express();

const jsonParser = bodyParser.json();

app.use(express.static(path.join(__dirname, '/../public')));

app.use(jsonParser);

app.get('/api/review/votes/:reviewid/:button', (req, res) => {
  db.update(req.params.reviewid, req.params.button, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});

function retrieve(id, sort, page, keyword = '', req, res) {
  db.retrieve(id, sort, page, keyword, (err, reviews) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(reviews);
    }
  });
}

app.get('/api/review/:id/:sort/:page/:keyword', (req, res) => {
  retrieve(req.params.id, req.params.sort, req.params.page, req.params.keyword, req, res);
});

app.get('/api/review/:id/:sort/:page', (req, res) => {
  retrieve(req.params.id, req.params.sort, req.params.page, '', req, res);
});

const port = process.env.PORT || 3004;

app.listen(port, () => console.log(`listening on port ${port}`));
