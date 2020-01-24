const { StudentList } = require('../models');

async function GetAllStudents(req, res) {
  try {
    const data = await StudentList.getAll();
    return res.status(200).send(data);
  } catch (error) {
    return res.status(404).send();
  }
}

async function GetStudentByName(req, res) {
  const qnombre = req.params.nombre;

  try {
    const data = await StudentList.getByNombre({ nombre: qnombre });

    res.status(200).json(data);
  } catch (error) {
    res.statusMessage = 'no se encontro el usuario';
    res.status(404).send();
  }
}

async function GetStudentById(req, res) {
  const queryId = req.query.matricula;

  try {
    const data = await StudentList.getByMatricula({ matricula: queryId });
    res.status(200).json(data);
  } catch (error) {
    res.statusMessage = 'no se encontro el usuario';
    res.status(404).send();
  }
}

async function DeleteStudent(req, res) {
  const { id: queryId } = req.query;
  const { id: bodyId } = req.body;

  try {
    if (queryId) {
      if (queryId != bodyId) {
        res.statusMessage = 'Id no son iguales';
        return res.status(409).send();
      } else {
        const foundStudent = await StudentList.getByMatricula({ matricula: bodyId });
        if (!foundStudent) {
          return res.status(404).send();
        }

        const student = await StudentList.deleteStudent({ matricula: bodyId });
        if (student.ok) {
          res.status(200).send();
        }
      }
    } else {
      res.statusMessage = 'Missing id';
      return res.status(406).send();
    }
  } catch (error) {}
}

async function UpdateStudent(req, res) {
  const { matricula } = req.params;
  const { nombre, apellido, id } = req.body;

  if ((nombre || apellido) && id && matricula) {
    if (id != matricula) {
      res.statusMessage = 'Ids no son iguales';
      return res.status(409).send();
    }

    let student = await StudentList.getByMatricula({ matricula: id });

    if (!student) {
      res.statusMessage = 'Estudiante no encontrado';
      return res.status(404).send();
    } else {
      let newData = {};
      nombre ? (newData.nombre = nombre) : '';
      apellido ? (newData.apellido = apellido) : '';

      let newStudent = await StudentList.updateStudent({ matricula: matricula, data: newData });
      if (newStudent.ok) {
        return res.status(202).json(newStudent);
      } else {
        return status(404).send();
      }
    }
  } else {
    res.statusMessage =
      'Missing parameters: ' +
      (!id ? 'Id\t' : '') +
      (!(nombre || apellido) ? 'nombre or apellido' : '');

    return res.status(406).send();
  }
}

async function CreateStudent(req, res) {
  const { nombre, apellido, matricula } = req.body;

  if (nombre && apellido && matricula) {
    const wasStudentFound = await StudentList.getByMatricula({ matricula: matricula });

    if (wasStudentFound) {
      res.statusMessage = 'Student could not be created, id already in use';
      return res.status(409).send();
    } else {
      const student = await StudentList.createStudent({
        nombre: nombre,
        apellido: apellido,
        matricula: matricula,
      });

      if (student) {
        return res.status(201).json(student);
      }
      return res.status(404).send();
    }
  } else {
    res.statusMessage =
      'Missing parameters: ' +
      (!nombre ? 'nombre\t' : '') +
      (!apellido ? 'apellido\t' : '') +
      (!matricula ? 'matricula\t' : '');
    return res.status(406).send();
  }
}

module.exports = {
  GetStudentById,
  GetAllStudents,
  GetStudentByName,
  DeleteStudent,
  UpdateStudent,
  CreateStudent,
};
