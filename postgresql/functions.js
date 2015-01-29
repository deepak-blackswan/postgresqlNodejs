/**
 * Created by mankind on 28/01/15.
 */
var pg          = require("pg")
var conString   = "pg://postgres:node@localhost:5432/employees";
var client      = new pg.Client(conString);

client.connect();

//Drop table if it exists
client.query("DROP TABLE IF EXISTS emps");

// Create table and insert 2 records into it
client.query("CREATE TABLE IF NOT EXISTS emps(firstname varchar(64), lastname varchar(64))");

var postgres = {

    insert_records: function (req,res){

        var rtrn_result = [];

        client.query("INSERT INTO emps(firstname, lastname) values($1, $2) RETURNING firstname", ['Tinniam', 'Ganesh'], function(err, result){

            if (err) {
                console.log(err);
            } else {
                console.log('row inserted with name: ' + result.firstname);
                rtrn_result.push({
                    result 	: 'row inserted with name: ' + result.firstname
                });
            }
        });

        client.query("INSERT INTO emps(firstname, lastname) values($1, $2) RETURNING firstname", ['Anand', 'Karthik'], function(err, result){
            if (err) {
                console.log(err);
            } else {
                console.log('row inserted with name: ' + result.firstname);
                rtrn_result.push({
                    result 	: 'row inserted with name: ' + result.firstname
                });
            }
        });
        console.log(rtrn_result);
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.write(JSON.stringify(rtrn_result) + "\n");
        res.end();

    },

    list_records: function (req,res){
        var query = client.query("SELECT firstname, lastname FROM emps ORDER BY lastname, firstname");
        console.log('select');
        query.on("row", function (row, result) {
            result.addRow(row);
        });
        query.on("end", function (result) {
            // On end JSONify and write the results to console and to HTML output
            console.log(JSON.stringify(result.rows, null, "    "));
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.write(JSON.stringify(result.rows) + "\n");
            res.end();
        });

    },

    update_record: function (req,res){
        console.log('test');

        // Update the record where the firstname is Anand
        var query = client.query("UPDATE emps set firstname = 'Kumar' WHERE firstname='Anand' AND lastname='Karthik'");
        query.on("row", function (row, result) {
            result.addRow(row);
        });

        query.on("end", function (result) {
            // On end JSONify and write the results to console and to HTML output
            console.log(JSON.stringify(result.rows, null, "    "));
            res.write(JSON.stringify(result.rows) + "\n");
            res.end();
        });

    },

    delete_record: function (req,res){

        // Delete the record where the lastname is Karthik
        var query = client.query("DELETE FROM  emps WHERE lastname = 'Karthik'");
        query.on("row", function (row, result) {
            result.addRow(row);
        });

        query.on("end", function (result) {
            // On end JSONify and write the results to console and to HTML output
            console.log(JSON.stringify(result.rows, null, "    "));
            res.write(JSON.stringify(result.rows) + "\n");
            res.end();
        });


    }

}

module.exports = postgres;