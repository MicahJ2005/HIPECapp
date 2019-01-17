const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');



router.get(`/:id`, rejectUnauthenticated, (req, res) => {
    const patientID = req.params.id
    const sqlText = `SELECT * FROM intake WHERE patient_id = $1`
    pool.query(sqlText,[patientID])
    .then((result) => {
        res.send(result.rows[0]);
    })
    .catch((error) => {
        res.sendStatus(500);
        console.log(error);

    })
});

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log(req.body);
    const patientId = req.body.id;
    const userInfo = req.body.state;
    const queryTextUpsert = `INSERT INTO intake (patient_id, weight_kg, length_m, bmi_auto, crp, ca125, leucocyte, smoking, diabetes, insulin_dependent, cardiovascular, hypertension,
        stoma_pre_hipec, stoma_type, neo_adjuvant_chemo, neo_adjuvant_chemo_type, biological, notes, diagnostic_scopy, date_scopy,
        scopy_conclusion)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
        ON CONFLICT (patient_id)
        DO UPDATE SET weight_kg=$2, length_m=$3, bmi_auto=$4,
            crp=$5, ca125=$6, leucocyte=$7,
            smoking=$8, diabetes=$9,
            insulin_dependent=$10, cardiovascular=$11, hypertension=$12, stoma_pre_hipec=$13, stoma_type=$14, neo_adjuvant_chemo=$15,
            neo_adjuvant_chemo_type=$16, biological=$17, notes=$18, diagnostic_scopy=$19, date_scopy=$20, scopy_conclusion=$21
        WHERE intake.patient_id=$1`
        pool.query(queryTextUpsert, [patientId, userInfo.weight_kg, userInfo.length_m, userInfo.bmi_auto,
            userInfo.crp, userInfo.ca125, userInfo.leucocyte, userInfo.smoking, userInfo.diabetes,
            userInfo.insulin_dependent, userInfo.cardiovascular, userInfo.hypertension, 'NULL', 'NULL', userInfo.neo_adjuvant_chemo,
            userInfo.neo_adjuvant_chemo_type, userInfo.biological, userInfo.notes, userInfo.diagnostic_scopy, userInfo.date_scopy, userInfo.scopy_conclusion])
        .then((result) => {
            const sqlText = `SELECT * FROM intake WHERE patient_id = ${patientId}`
            pool.query(sqlText)
            .then((result) => {
                res.send(result.rows[0])
            })
            .catch((error) => {
                console.log('error in our nested SQL Query getting the updated rows for the patient', error)
            })
        })
        .catch((error) => {
            res.sendStatus(500);
            console.log(error);
        })
});

module.exports = router;