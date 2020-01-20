function init() {
  let inputForm = document.getElementById('inputForm');

  inputForm.addEventListener('submit', event => {
    event.preventDefault();

    getData();
  })
}

const News = ({ title, description, urlToImage, author }) => `
  <div>
    <h2>${title}</h2>
    <p class='author'>${author ? author : 'anonymous'}</p>
    <img src='${urlToImage}' />
    <p>${description}</p>
  </div>
`

async function getData() {
  let interestInput = document.getElementById('interestNewsInput');
  let contentContainer = document.getElementsByClassName('resulting-news')[0];

  let interest = interestInput.value;

  let url = 'https://newsapi.org/v2/top-headlines?' +
    'q=' + interest + '&' +
    'apiKey=' + 'b7120cd3cc334bdaa0ef749647f6d55e';

  let data = await fetch(url);
  let dataJSON = await data.json();

  contentContainer.innerHTML = '';

  dataJSON.articles.forEach((article) => {
    contentContainer.innerHTML += News(article);
  })
}

init();