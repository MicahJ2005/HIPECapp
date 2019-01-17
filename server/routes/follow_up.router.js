const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// GET ROUTER TO RETRIEVE FOLLOW UP FOR PATIENT
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = 'SELECT * FROM follow_up WHERE patient_id=$1';
  pool.query(queryText, [req.params.id])      
      .then(results => res.send(results.rows[0]))
      .catch(error => {
          console.log('Error making SELECT for follow up:', error);
          res.sendStatus(500);
      });
});

// PUT ROUTER TO UPDATE FOLLOW UP INFORMATION FOR PATIENT
router.put('/', rejectUnauthenticated, (req, res) => {

    const patient_id = req.body.patient_id
    const adjuvant_chemo = req.body.adjuvant_chemo
    const adjuvant_chemo_type = req.body.adjuvant_chemo_type;
    const biological = req.body.biological;
    const evidence_of_disease = req.body.evidence_of_disease;
    const last_contact = req.body.last_contact;
    const date_of_death = req.body.date_of_death;
    const notes = req.body.notes;

    const queryTextUpsert = 
        `INSERT INTO follow_up (patient_id, adjuvant_chemo, adjuvant_chemo_type,
            biological, evidence_of_disease, last_contact, date_of_death, notes)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (patient_id)
        DO UPDATE SET adjuvant_chemo=$2, adjuvant_chemo_type=$3, biological=$4,
            evidence_of_disease=$5, last_contact=$6, date_of_death=$7, notes=$8
        WHERE follow_up.patient_id=$1`

    pool.query(queryTextUpsert, 
        [patient_id, adjuvant_chemo, adjuvant_chemo_type, biological,evidence_of_disease,
        last_contact,date_of_death,notes])
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing UPSERT follow up query', err);
        res.sendStatus(500);
      });            
});

module.exports = router;