const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

//GET request to DataBase for all PCI information
router.get('/:id', rejectUnauthenticated, (req, res) => {
  console.log('GET req.params.id', req.params.id);
  
  let reqId = req.params.id;
  const queryText = `SELECT intervention.*, resections.* FROM intervention
  JOIN resections on resections.intervention_id = intervention.id
  WHERE patient_id=${reqId};`;
  pool.query(queryText)
    .then((result) => { res.send(result.rows); })
    .catch((err) => {
      console.log('Error completing SELECT user query', err);
      res.sendStatus(500);
    });
});

module.exports = router;