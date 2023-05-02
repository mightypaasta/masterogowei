// require the necessary packages
const express = require('express');
const mysql = require('mysql2');

// create an express app
const app = express();
app.use(express.json());

// create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Amateratsu',
  database: 'aadhar',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// define a route to add a user
app.post('/users', (req, res) => {
  const { username, password, aadhar } = req.body;
  console.log(req.body);
  console.log(username, password, aadhar);
  // insert the user into the database
  pool.query(
    'INSERT INTO voters (username, password, aadhar, isVoted) VALUES (?, ?, ?,?)',
    [username, password, aadhar,false],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(400).send('Failed to add user');
      } else {
        res.status(200).send('User added successfully');
      }
    }
  );
});

// define a route to get a user
app.get('/users', (req, res) => {
  const { aadhar } = req.body;
  

  // check if the Aadhaar number exists in the database
  pool.query(
    'SELECT * FROM voters WHERE aadhar = ?',
    [aadhar],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(400).send('Failed to fetch user');
      } else if (results.length === 0) {
        res.status(400).send('User not found');
      } else {
        const user = results[0];
        if (user.isVoted) {
          res.status(205).send('User has already voted');
        } else {
          res.status(200).send('User found');
        }
      }
    }
  );
});

// define a route to update a user's isVoted status
app.put('/users/voted/:aadhar', (req, res) => {
    const { aadhar } = req.params;
  
    // update the user's isVoted status to true in the database
    pool.query(
      'UPDATE voters SET isVoted = true WHERE aadhar = ?',
      [aadhar],
      (error, results) => {
        if (error) {
          console.error(error);
          res.status(400).send('Failed to update user');
        } else if (results.affectedRows === 0) {
          res.status(400).send('User not found');
        } else {
          res.status(200).send('User successfully updated');
        }
      }
    );
  });
  

// start the server
app.listen(8080, () => {
  console.log('Server started on port 8080');
});
