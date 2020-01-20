function init () {
  let usernameForm = document.getElementById('githubRepo');

  usernameForm.addEventListener('submit', event => {
    event.preventDefault();

    getData();
  })
}

const Repo = ({ name, html_url, full_name }) => `
  <div>
    <h3>${name}</h3>
    <p class='author'>${full_name}</p>
    <a href="${html_url}" target="_blank" >Repo URL</a>
  </div>
`

async function getData() {
  let input = document.getElementById('githubHandle');
  let url = `https://api.github.com/users/${input.value}/repos`;

  let reposContainer = document.getElementsByClassName('repos')[0];

  let response = await fetch(url);
  let data = await response.json();

  reposContainer.innerHTML = '';

  data.forEach(repo => {
    reposContainer.innerHTML += Repo(repo);
  })

}

init();