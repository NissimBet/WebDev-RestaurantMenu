function init() {
  const button = document.getElementById("renewPerroImage");

  button.addEventListener('click', event => {
    getPerro();
  })

  getPerro(); 
}

async function getPerro() {
  const imagenPerro = await fetch("https://dog.ceo/api/breeds/image/random", { method: "GET" });
  const imgJSON = await imagenPerro.json();

  const perro = document.getElementById("dogImage");

  perro.setAttribute("src", imgJSON.message);

}

init();