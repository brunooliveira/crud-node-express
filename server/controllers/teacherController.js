const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// View Teachers
exports.view = (req, res) => {
  // Teacher the connection
  connection.query('SELECT * FROM teacher WHERE status = "active"', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedTeacher = req.query.removed;
      res.render('home', { rows, removedTeacher });
    } else {
      console.log(err);
    }
    console.log('The data from teacher table: \n', rows);
  });
}

// Find Teacher by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // Teacher the connection
  connection.query('SELECT * FROM teacher WHERE first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from teacher table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('add-teacher');
}

// Add new teacher
exports.create = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  let searchTerm = req.body.search;

  // Teacher the connection
  connection.query('INSERT INTO teacher SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
    if (!err) {
      res.render('add-teacher', { alert: 'Teacher added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from teacher table: \n', rows);
  });
}


// Edit teacher
exports.edit = (req, res) => {
  // Teacher the connection
  connection.query('SELECT * FROM teacher WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-teacher', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from teacher table: \n', rows);
  });
}


// Update teacher
exports.update = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body;
  // Teacher the connection
  connection.query('UPDATE teacher SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {

    if (!err) {
      // Teacher the connection
      connection.query('SELECT * FROM teacher WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
        
        if (!err) {
          res.render('edit-teacher', { rows, alert: `${first_name} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from teacher table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from teacher table: \n', rows);
  });
}

// Delete Teacher
exports.delete = (req, res) => {

  // Delete a record

  // User the connection
  // connection.query('DELETE FROM user WHERE id = ?', [req.params.id], (err, rows) => {

  //   if(!err) {
  //     res.redirect('/');
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from user table: \n', rows);

  // });

  // Hide a record

  connection.query('UPDATE teacher SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
    if (!err) {
      let removedTeacher = encodeURIComponent('Teacher successeflly removed.');
      res.redirect('/?removed=' + removedTeacher);
    } else {
      console.log(err);
    }
    console.log('The data from beer table are: \n', rows);
  });

}

// View Teacher
exports.viewall = (req, res) => {

  // Teacher the connection
  connection.query('SELECT * FROM teacher WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-teacher', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from teacher table: \n', rows);
  });

}