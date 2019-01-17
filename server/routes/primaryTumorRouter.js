const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');


router.put('/', rejectUnauthenticated, (req,res) => {
    const patientId = req.body.userInfo.id;
    const userInfo = req.body.userInfo.state;
    const queryTextUpsert = `INSERT INTO primary_tumor (patient_id, date_primary_diagnosis, primary_location, t, n, m, m_location, differentiation, mucinous, date_prime_surgery, intervention_type, setting,
        adj_chemotherapy, adj_chemotherapy_type, biological, notes, prime_tumor_surgery)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
        ON CONFLICT (patient_id)
        DO UPDATE SET date_primary_diagnosis=$2, primary_location=$3, t=$4,
            n=$5, m=$6, m_location=$7,
            differentiation=$8, mucinous=$9,
            date_prime_surgery=$10, intervention_type=$11, setting=$12, adj_chemotherapy=$13, adj_chemotherapy_type=$14, biological=$15,
            notes=$16, prime_tumor_surgery=$17
        WHERE primary_tumor.patient_id=$1`
        pool.query(queryTextUpsert, [patientId, userInfo.date_primary_diagnosis, userInfo.primary_location, userInfo.t,
            userInfo.n, userInfo.m, userInfo.m_location, userInfo.differentiation, userInfo.mucinous,
            userInfo.date_prime_surgery, userInfo.intervention_type, userInfo.setting, userInfo.adj_chemotherapy, userInfo.adj_chemotherapy_type, userInfo.biological,
            userInfo.notes, userInfo.prime_tumor_surgery])
        .then((result) => {
            const sqlText = `SELECT * FROM primary_tumor WHERE patient_id = ${patientId}`
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
})

router.post('/getDataFor', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM primary_tumor WHERE patient_id = $1`
    pool.query(sqlText, [req.body.id])
    .then((result) => {
        res.send(result.rows[0])
    })
    .catch((error) => {
        console.log('error in our post /getDataFor req in our primaryTumorRouter.js', error);
        res.sendStatus(501)
    })
});

module.exports = router;