const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const encryptLib = require('../modules/encryption');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/// UPSERT into database from INTERVENTION tab
router.put('/:id', rejectUnauthenticated, (req, res, next) => {  
    const central = req.body.interventionState.central;
    const rightUpper = req.body.interventionState.rightUpper;
    const Epigastrium = req.body.interventionState.Epigastrium;
    const leftUpper = req.body.interventionState.leftUpper;
    const leftFlank = req.body.interventionState.leftFlank;
    const leftLower = req.body.interventionState.leftLower;
    const pelvis = req.body.interventionState.pelvisPCI;
    const rightLower = req.body.interventionState.rightLower;
    const rightFlank = req.body.interventionState.rightFlank;
    const upperJejunum = req.body.interventionState.upperJejunum;
    const lowerJejunum = req.body.interventionState.lowerJejunum;
    const upperIlium = req.body.interventionState.upperIlium;
    const lowerIlium = req.body.interventionState.lowerIlium;
    const PCITotal = req.body.interventionState.PCITotal;
    const surgeonOne = req.body.interventionState.surgeonOne;
    const surgeonTwo = req.body.interventionState.surgeonTwo;
    const surgeonThree = req.body.interventionState.surgeonThree;
    const nrHipec = req.body.interventionState.nrHipec;
    const hipecType = req.body.interventionState.hipecType;
    const reasonOC = req.body.interventionState.reasonOC;
    const anastomosis =req.body.interventionState.anastomosis
    const AnastomosisNumber = req.body.interventionState.AnastomosisNumber;
    const stomaType = req.body.interventionState.stomaType;
    const bloodLoss = req.body.interventionState.bloodLoss;
    const volume = req.body.interventionState.volume;
    const hipecRegiment = req.body.interventionState.hipecRegiment;
    const bloodLossTime = req.body.interventionState.bloodLossTime;
    const concentration = req.body.interventionState.concentration;
    const rScore = req.body.interventionState.rScore;
    const duration = req.body.interventionState.duration;
    const revisionStoma = req.body.interventionState.revisionStoma;
    const stomaPostHIPEC = req.body.interventionState.stomaPostHIPEC;
    const patientId = req.body.userId;
    const ovaries = req.body.interventionState.ovaries;
    const uterus = req.body.interventionState.uterus;
    const omentum = req.body.interventionState.omentum;
    const rectum = req.body.interventionState.rectum;
    const sigmoid = req.body.interventionState.sigmoid;
    const left_colon = req.body.interventionState.left_colon;
    const transverse_colon = req.body.interventionState.transverse_colon;
    const right_colon = req.body.interventionState.right_colon;
    const ileocaecal = req.body.interventionState.ileocaecal;
    const appendix =req.body.interventionState.appendix;
    const duodenum = req.body.interventionState.duodenum;
    const jejunum = req.body.interventionState.jejunum;
    const ileum = req.body.interventionState.ileum;
    const gallbladder = req.body.interventionState.gallbladder;
    const stomach = req.body.interventionState.stomach;
    const spleen = req.body.interventionState.spleen;
    const diagphram_l =req.body.interventionState.diagphram_l;
    const diagphram_r = req.body.interventionState.diagphram_r;
    const pancreas = req.body.interventionState.pancreas;
    const bladder = req.body.interventionState.bladder;
    const urether = req.body.interventionState.urether;
    const lymphnodes = req.body.interventionState.lymphnodes;
    const left_peritoneum = req.body.interventionState.left_peritoneum;
    const right_peritoneum = req.body.interventionState.right_peritoneum;
    const peritoneum = req.body.interventionState.peritoneum;
    const pelvisResection = req.body.interventionState.pelvis;

    const queryText = `INSERT INTO intervention 
    (patient_id, pci_0, pci_1, pci_2, pci_3, pci_4, pci_5, pci_6, pci_7, pci_8, pci_9, pci_10, pci_11, pci_12, pci_score, surgeon_1, surgeon_2, surgeon_3, nrhipec, hipec_type, reason_oc, anastomosis, anastomosis_number, revision_stoma, stoma_post_hipec_type, bloodloss, volume, hipec_regiment, time, concentration, r_score, duration, stoma_post_hipec)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33) 
    ON CONFLICT (patient_id)
    DO UPDATE SET (pci_0, pci_1, pci_2, pci_3, pci_4, pci_5, pci_6, pci_7, pci_8, pci_9, pci_10, pci_11, pci_12, pci_score, surgeon_1, surgeon_2, surgeon_3, nrhipec, hipec_type, reason_oc, anastomosis, anastomosis_number, revision_stoma, stoma_post_hipec_type, bloodloss, volume, hipec_regiment, time, concentration, r_score, duration, stoma_post_hipec) = 
    ($2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33)
    WHERE intervention.patient_id=$1 RETURNING id;`;

    pool.query(queryText, [patientId, central, rightUpper, Epigastrium, leftUpper, leftFlank, leftLower, pelvis, rightLower, rightFlank, upperJejunum, lowerJejunum, upperIlium, lowerIlium, PCITotal, surgeonOne, surgeonTwo, surgeonThree, nrHipec, hipecType, reasonOC, anastomosis, AnastomosisNumber, revisionStoma, stomaType, bloodLoss, volume, hipecRegiment, bloodLossTime, concentration, rScore, duration, stomaPostHIPEC])
      .then((results) => { 
        console.log('results ', results.rows[0].id);
        
    const interventionId = results.rows[0].id;
    const queryText2 = `INSERT INTO resections 
    (intervention_id, ovaries, uterus, omentum, rectum, sigmoid, left_colon, transverse_colon, right_colon, ileocaecal, appendix, duodenum, jejunum, ileum, gallbladder, stomach, spleen, diagphram_l, diagphram_r, pancreas, bladder, urether, lymphnodes, left_peritoneum, right_peritoneum, peritoneum, pelvis) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)
    ON CONFLICT (intervention_id)
    DO UPDATE SET (ovaries, uterus, omentum, rectum, sigmoid, left_colon, transverse_colon, right_colon, ileocaecal, appendix, duodenum, jejunum, ileum, gallbladder, stomach, spleen, diagphram_l, diagphram_r, pancreas, bladder, urether, lymphnodes, left_peritoneum, right_peritoneum, peritoneum, pelvis) =
    ($2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)
    WHERE resections.intervention_id=${results.rows[0].id};`;
        pool.query(queryText2, [interventionId, ovaries, uterus, omentum, rectum, sigmoid, left_colon, transverse_colon, right_colon, ileocaecal, appendix, duodenum, jejunum, ileum, gallbladder, stomach, spleen, diagphram_l, diagphram_r, pancreas, bladder, urether, lymphnodes, left_peritoneum, right_peritoneum, peritoneum, pelvisResection])  
        
        .then((results) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(error);
            res.sendStatus(500);
        })
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
  });

module.exports = router;