const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const encryptLib = require('../modules/encryption');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

/// GET route from the DataBase, to obtain all user information
router.get('/', rejectUnauthenticated, (req, res) => {
    let reqId = req.params.id;
    const queryText = `SELECT * FROM person`;
    pool.query(queryText)
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing SELECT tasks query', err);
        res.sendStatus(500);
      });
  });

/// GET route from the Database, to obtain specific User Information (used on search by ID functionality). 
///This query works but could use some further development to allow mulitple search parameters.
  router.get('/:id', rejectUnauthenticated, (req, res) => {
    let reqId = req.params.id;
    const queryText = `SELECT * FROM person WHERE id=${reqId}`;
    pool.query(queryText)
      .then((result) => { res.send(result.rows); })
      .catch((err) => {
        console.log('Error completing SELECT user query', err);
        res.sendStatus(500);
      });
  });

///POST new user information to the DataBase
router.post('/', rejectUnauthenticated, (req, res, next) => { console.log('New User POST req.body', req.body);
    const title = req.body.title;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const password = encryptLib.encryptPassword(req.body.password);
    const access_level = req.body.accessLevel;
  
    const queryText = 'INSERT INTO person (title, first_name, last_name, username, password, access_level) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
    pool.query(queryText, [title, firstName, lastName, username, password, access_level])
      .then(() => { res.sendStatus(201); })
      .catch((err) => { next(err); });
  });

///UPDATE user profile information
  router.put('/:id', rejectUnauthenticated, (req, res) => {
    const reqId = req.body.userId
    const title = req.body.title
    const newFirstName = req.body.firstName;
    const newLastName = req.body.lastName;
    const accessLevel = req.body.accessLevel;
    const active = req.body.active;
    // const userName = req.body.username;
    // const password = encryptLib.encryptPassword(req.body.password);
    const queryText = `UPDATE person 
    SET ("title", "first_name", "last_name", "access_level", "active") 
    = ($1, $2, $3, $4, $5)
    WHERE person.id=${reqId};`;
    const queryValues = [
        title,
        newFirstName,
        newLastName,
        accessLevel,
        active,
        // userName,
        // password,
    ];
    pool.query(queryText, queryValues)
      .then(() => { res.sendStatus(201); })
      .catch((error) => {
        console.log('Error completing SELECT project query', error);
        res.sendStatus(500);
      });
  });

module.exports = router;