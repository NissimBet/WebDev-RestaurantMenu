let dogs = 0;

function init() {
  watchForm();
}

function watchForm() {
  const form = document.getElementById('randomDog');
  form.addEventListener('submit', event  => {
    event.preventDefault();
  
    getDog();
  })
}

async function getDog() {
  const dogResults = document.getElementsByClassName("results")[0];

  const dogData = await fetch("https://dog.ceo/api/breeds/image/random", { method: "GET" });
  const dataJson = await dogData.json();

  const DogDiv = document.createElement('div');
  const DogImage = document.createElement('img');
  
  DogImage.src = dataJson.message;
  DogImage.alt = "Este es el perro " + ++dogs;
  DogImage.style.height = '100px';
  DogImage.style.width = '100px';
  
  DogDiv.appendChild(DogImage);
  DogDiv.style.margin = '10px';
  DogDiv.onclick = function(event) {
    event.target.parentNode.parentNode.removeChild(this);
  }

  dogResults.appendChild(DogDiv)
}


init();