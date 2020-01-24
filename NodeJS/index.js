const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {
  GetAllStudents,
  GetStudentById,
  GetStudentByName,
  DeleteStudent,
  UpdateStudent,
  CreateStudent,
} = require('./controllers');

const app = express();

function runServer(port, databaseUrl) {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      databaseUrl,
      { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
      response => {
        if (response) {
          return reject(response);
        } else {
          server = app
            .listen(port, () => {
              console.log('App is running on port ' + port);
              resolve();
            })
            .on('error', err => {
              mongoose.disconnect();
              return reject(err);
            });
        }
      }
    );
  });
}
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing the server');
      server.close(err => {
        if (err) {
          return reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}

app.use(express.static('public'));
app.use(jsonParser);
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).send('Hi There');
});

app.get('/api/students', GetAllStudents);
app.get('/api/student/nombre/:nombre', GetStudentByName);
app.get('/api/student/matricula', GetStudentById);
app.post('/api/student/new', CreateStudent);
app.put('/api/student/update/:matricula', UpdateStudent);
app.delete('/api/student/delete', DeleteStudent);

module.exports = { app, runServer, closeServer };
