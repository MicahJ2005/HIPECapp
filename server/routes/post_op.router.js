const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

const router = express.Router();

// GET ROUTER TO RETRIEVE POST OP FOR PATIENT
router.get('/:id', rejectUnauthenticated, (req, res) => {
  const queryText = 'SELECT * FROM postop WHERE patient_id=$1';
  pool.query(queryText, [req.params.id])
      .then(results => res.send(results.rows[0]))
      .catch(error => {
          console.log('Error making SELECT for post op:', error);
          res.sendStatus(500);
      });
});

// POST ROUTER TO ADD NEW POST OP
// router.post('/', rejectUnauthenticated, (req, res) => {

//   const newItem = req.body;

//   const queryText = `INSERT INTO item 
//   ("category_id", "name", "brand_name", "person_id") 
//     VALUES ($1, $2, $3, $4)`;
//   const queryValues = [
//     newItem.category_id,
//     newItem.name,
//     newItem.brand_name,
//     req.user.id,
//   ];

//   // console.log('sql query for new items for new user', queryText);
//   pool.query(queryText, queryValues)
//     .then(() => { res.sendStatus(201); })
//     .catch((err) => {
//       console.log('Error completing INSERT item query', err);
//       res.sendStatus(500);
//     });
// });

router.put('/', rejectUnauthenticated, (req, res) => {
    const id = req.body.id;
    const patient_id = req.body.patient_id;
    const icu_stays = req.body.icu_stays;
    const mcu_stays = req.body.mcu_stays;
    const hospital_stays = req.body.hospital_stays;
    const notes = req.body.notes;
    const serious_adverse_event = req.body.serious_adverse_event;
    const score = req.body.score;
    const reoperation = req.body.reoperation;
    const hospital_mortality = req.body.hospital_mortality;
    const status_at_discharge = req.body.status_at_discharge;
    const discharge_notes = req.body.discharge_notes;

    const queryTextUpsert = 
        `INSERT INTO postop (patient_id, icu_stays, mcu_stays, hospital_stays,
            notes, serious_adverse_event, score, reoperation,
            hospital_mortality, status_at_discharge, discharge_notes)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT (patient_id)
        DO UPDATE SET icu_stays=$2, mcu_stays=$3, hospital_stays=$4,
            notes=$5, serious_adverse_event=$6, score=$7,
            reoperation=$8, hospital_mortality=$9,
            status_at_discharge=$10, discharge_notes=$11
        WHERE postop.patient_id=$1`

    console.log('IN QUERY FOR UPSERT', queryTextUpsert);
    pool.query(queryTextUpsert, [patient_id, icu_stays, mcu_stays, hospital_stays,
        notes, serious_adverse_event, score, reoperation, hospital_mortality,
        status_at_discharge, discharge_notes])
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing UPDATE post op query', err);
        res.sendStatus(500);
      });            
});

// DELETE ROUTER FOR ITEM
// router.delete('/', rejectUnauthenticated, (req, res) => {
//   // console.log('in delete on server', req.query.id);
//   const queryText = 'DELETE FROM item WHERE id=$1';
//   pool.query(queryText, [req.query.id])
//     .then(() => { res.sendStatus(200); })
//     .catch((err) => {
//       console.log('Error completing DELETE item query', err);
//       res.sendStatus(500);
//     });
// });


module.exports = router;