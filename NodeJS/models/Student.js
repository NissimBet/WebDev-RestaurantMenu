const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const StudentSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  matricula: { type: Number, required: true, unique: true },
});

const Student = mongoose.model('students', StudentSchema);

const StudentList = {
  getAll: async () => {
    try {
      const studentsData = await Student.find();
      return studentsData;
    } catch (err) {
      throw Error(err);
    }
  },
  getByNombre: async ({ nombre }) => {
    try {
      const studentsData = await Student.find({ nombre: nombre });
      return studentsData;
    } catch (err) {
      throw Error(err);
    }
  },
  getByMatricula: async ({ matricula }) => {
    try {
      const studentsData = await Student.findOne({ matricula: matricula });
      return studentsData;
    } catch (err) {
      throw Error(err);
    }
  },
  deleteStudent: async ({ matricula }) => {
    try {
      const deletedStudent = await Student.deleteOne({ matricula: matricula });
      return deletedStudent;
    } catch (error) {
      throw Error(error);
    }
  },
  updateStudent: async ({ matricula, data }) => {
    try {
      const newUserData = await Student.updateOne({ matricula: matricula }, { ...data });
      return newUserData;
    } catch (error) {
      throw Error(error);
    }
  },
  createStudent: async data => {
    try {
      const newUser = await Student.create({ ...data });
      return newUser;
    } catch (error) {
      throw Error(error);
    }
  },
};

module.exports = {
  StudentList,
};
