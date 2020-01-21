const express = require('express');
const morgan = require('morgan');
const fs = require('fs');

const estudiantes = JSON.parse(fs.readFileSync('./activityData.json'));

const app = express();

app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.status(200).send('Hi There');
});

app.get('/api/students', (req, res) => {
  // status success
  res.status(200).json(estudiantes);
});

app.get('/api/student/name/:name', (req, res) => {
  const qName = req.params.name;

  const student = estudiantes.filter(({ name }) => {
    return name.toUpperCase() === qName.toUpperCase();
  });

  if (student.length > 0) {
    res.status(200).json(student);
  } else {
    res.statusMessage = 'no se encontro el usuario';
    res.status(404).send();
  }
});

app.get('/api/student/id', (req, res) => {
  const queryId = req.query.id;
  const student = estudiantes.find(({ id }) => id == queryId);

  if (student) {
    res.status(200).json(student);
  } else {
    res.statusMessage = 'no se encontro el usuario';
    res.status(404).send();
  }
});

app.listen(3001, () => console.log('listening'));
