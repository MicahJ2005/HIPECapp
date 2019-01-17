const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.get('/:id', rejectUnauthenticated, (req, res) => {
    pool.query(`SELECT * FROM psdss WHERE patient_id=${req.params.id}`)
    .then((response) => {
        res.send(response.rows[0]);
    })
    .catch((error) => {
        res.sendStatus(501);
        console.log(error);
    })
});


router.put('/', rejectUnauthenticated, (req, res) => {
    const patientId = req.body.id;
    const userInfo = req.body.state;
    const queryTextUpsert = `INSERT INTO psdss(patient_id, clinical, pci, histology, synchronous_liver_treatment, timing,
        date_treatment, treatment_type, notes, total)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (patient_id)
        DO UPDATE SET clinical=$2, pci=$3, histology=$4, synchronous_liver_treatment=$5, timing=$6, date_treatment=$7,
        treatment_type=$8, notes=$9, total=$10
        WHERE psdss.patient_id=$1`;
        pool.query(queryTextUpsert, [patientId, userInfo.clinical, userInfo.pci, userInfo.histology,
        userInfo.synchronous_liver_treatment, userInfo.timing, userInfo.date_treatment, userInfo.treatment_type,
        userInfo.notes, userInfo.total])
        .then((response)=>{
          pool.query(`SELECT * FROM psdss WHERE patient_id=${patientId}`)
          .then((result) => {
              res.send(result.rows[0])
          })
          .catch((error) => {
              console.log(error)
              res.sendStatus(501);
          })
        })
        .catch((error) => {
            console.log(error, 'in outside query for psdss.router.js')
            res.sendStatus(500);
        })
});

module.exports = router;