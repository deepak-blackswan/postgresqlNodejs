/**
 * Created by mankind on 28/01/15.
 */
var postgres= require('../postgresql/functions');
var express = require('express');
var router  = express.Router();

// if req method is post then insert record form the table
router.post('/postgres/insert', postgres.insert_records);

// if req method is get then get record from the table
router.get('/postgres/select', postgres.list_records);

// if req method is put then update record in the table
router.put('/postgres/update',  postgres.update_record);

// if req method is delete then delete record from the table
router.delete('/postgres/delete', postgres.delete_record);

module.exports = router;
