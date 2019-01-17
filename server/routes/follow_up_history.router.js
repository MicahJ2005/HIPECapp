const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

// GET ROUTER TO RETRIEVE FOLLOW UP HISTORY FOR PATIENT
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM follow_up_history 
                    WHERE patient_id=$1
                    ORDER BY id desc`;
  pool.query(queryText, [req.params.id])      
      .then(results => res.send(results.rows))
      .catch(error => {
          console.log('Error making SELECT for follow up history:', error);
          res.sendStatus(500);
      });
});

// POST ROUTER TO ADD NEW FOLLOW UP HISTORY FOR PATIENT
router.post('/', rejectUnauthenticated, (req, res) => {
  const queryText = `INSERT INTO follow_up_history
                    ("patient_id", "date") VALUES ($1, $2)`;
  const queryValues = [req.body.patient_id, req.body.date];
  pool.query(queryText, queryValues)
    .then(() => { res.sendStatus(201); })
    .catch((err) => {
      console.log('Error completing INSERT follow up history query', err);
      res.sendStatus(500);
    });
});

// POST ROUTER TO UPDATE FOLLOW UP HISTORY
router.put('/', rejectUnauthenticated, (req, res) => {

    const id = req.body.id;
    const follow_up_date = req.body.date;
    const evidence_of_disease = req.body.evidence_of_disease;
    const follow_up_notes = req.body.follow_up_notes;
    const recurrence = req.body.recurrence;
    const cea = req.body.cea;
    const rec_modality = req.body.rec_modality;
    const syst_location = req.body.syst_location;
    const treatment = req.body.treatment;
    const date_treatment = req.body.date_treatment;
    const status = req.body.status;
    const treatment_notes = req.body.treatment_notes;
    const location = req.body.location;

    const queryText = `UPDATE follow_up_history 
        SET date=$2, evidence_of_disease=$3, follow_up_notes=$4,
        recurrence=$5, cea=$6, rec_modality=$7,
        syst_location=$8, treatment=$9, date_treatment=$10,
        status=$11, treatment_notes=$12, location=$13 WHERE id=$1`;

    pool.query(queryText, 
        [id, follow_up_date, evidence_of_disease, follow_up_notes,
        recurrence, cea, rec_modality, syst_location, treatment,
        date_treatment, status, treatment_notes, location])
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing UPDATE follow up history query', err);
        res.sendStatus(500);
      });            
});

module.exports = router;