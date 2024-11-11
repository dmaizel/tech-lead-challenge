const express = require("express");

const app = express ();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", port);
});

app.get('/status'); // not sure we need it- just in case ES not availble

/* query API:
a simple query
the parameters will include all types of fields like like, date, time, error code, action, method, data
 */
app.get('/query'); // query all services
app.get('/query/:service_name');

/* an aggregation query
The same as query api but more complex including aggregation
The body should include a json formatted text that contain all the supported aggregations and complexes -like regex
Notes:
carefully with regex , it must be check and verifies no vulnerabilities are there

 */
app.post('/agg');
app.post('/agg/:service_name');

