function init () {
  let recipeForm = document.getElementById('cocktailForm');
  
  recipeForm.addEventListener('submit', event => {
    event.preventDefault();

    getData();
  })
}

const Recipe = ({ name, imageURL, ingredients }) => `
  <div>
    <h3>${name}</h3>
    <img src='${imageURL}'/>
    <ul>
      ${ingredients.map(({ingredient, amount}) => ingredient ? `<li>${ingredient} - ${amount}</li>`: '').join('')}
    </ul>
  </div>
`;

async function getData() {
  let inputData = document.getElementById('cocktailNameInput').value;
  let results = document.getElementsByClassName('recipes')[0];

  let response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputData}`);
  let responseJSON = await response.json();

  console.log(responseJSON)

  results.innerHTML = '';

  for(recipe of responseJSON.drinks) {
    let ingredients = new Array(15);
    for(let i = 1; i <= 15; i++) {
      ingredients[i - 1] = { ingredient: recipe['strIngredient' + i], amount: recipe['strMeasure' + i] };
    }

    results.innerHTML += Recipe({ name: recipe.strDrink, imageURL: recipe.strDrinkThumb, ingredients: ingredients })
  }

}

init();