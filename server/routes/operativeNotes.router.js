const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

///POST route to the DataBase. Sending operative notes and credentials of user who created note
router.post('/', rejectUnauthenticated, (req, res) => {
  const userId = req.body.userId;
  const operative_notes = req.body.operativeNotes;
  const title = req.body.title;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const queryText = `INSERT INTO operative_op_notes ("operative_notes", "patient_id", "title", "first_name", "last_name" ) VALUES ($1, $2, $3, $4, $5)`;
    pool.query(queryText, [operative_notes, userId, title, firstName, lastName])
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing UPDATE post op query', err);
        res.sendStatus(500);
      });            
});

///GET route to the DataBase. Retreiving operative note history
router.get('/:id', rejectUnauthenticated, (req, res) => {
  console.log('GET req.params.id', req.params.id);
  
  let reqId = req.params.id;
  const queryText = `SELECT * FROM operative_op_notes WHERE patient_id=${reqId} ORDER BY date_completed DESC`;
  pool.query(queryText)
    .then((result) => { res.send(result.rows); })
    .catch((err) => {
      console.log('Error completing SELECT user query', err);
      res.sendStatus(500);
    });
});

module.exports = router;