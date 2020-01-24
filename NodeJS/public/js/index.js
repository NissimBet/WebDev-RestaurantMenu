async function loadStudents() {
  const data = await fetch('./api/students');
  const students = await data.json();

  const listElement = document.getElementById('studentList');
  listElement.innerHTML = '';

  for (let student of students) {
    let content = '';
    for (let val in student) {
      content += `${student[val]}`;
    }
    listElement.innerHTML += `
      <li>
        ${content}
      </li>
    `;
  }
}

function init() {
  loadStudents();
}

init();
