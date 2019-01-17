const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

//*** GET last patient ID from db */
router.get(`/`, (req, res) => {
    const sqlText = `SELECT * FROM patients ORDER BY id DESC LIMIT 1;`;
    pool.query(sqlText).then( rows => {
        newPatientId = rows.rows[0].id + 1
        console.log(newPatientId);
        result = {newPatientId}
        res.send(result);
})
.catch((error) => {
    console.log('GET error from the server', error);
    res.sendStatus(500); // A good server always responds!
})
});

module.exports = router;