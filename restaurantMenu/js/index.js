/*
TODO NAVEGACION // DISPLAY SOLO LO QUE SE NECESITA DEPENDIENDO DEL NAV LINK
TODO RADIO BUTTON VALIDATION
TODO ONCHANGE / ONSUBMIT VALIDATION
*/

function watchFormSubission() {
  let form = document.getElementById("comment-form");
  form.addEventListener("submit", ({ target }) => {
    // detiene el refresh
    event.preventDefault();
  
    // inputs
    for(let formElement of target.getElementsByTagName('input')) {
      let classname = formElement.getAttribute("class");
      let inputname = formElement.getAttribute("name");
      let warning = document.getElementById(`${inputname}Warning`);
      
      if(formElement.value === "") {
        formElement.setAttribute("class", classname + " invalid-input");
        warning ? warning.style.display = "initial" : null;
      }
      else {
        formElement.setAttribute("class", "form-element" );
        warning ? warning.style.display = "none" : null;
      }
    }
  });
}

function formInputChangeEvent() {
  let inputs = document.querySelectorAll("#comment-form input");
  
  for(let inputElement of inputs) {
    inputElement.addEventListener("change", ({ target }) => {
      let classname = inputElement.getAttribute("class");
      let inputname = inputElement.getAttribute("name");
      let warning = document.getElementById(`${inputname}Warning`);

      if (target.value === "") {
        target.setAttribute("class", classname + " invalid-input");
        warning.style.display = "initial";

      }
      else {
        target.setAttribute("class", "form-element");
        warning.style.display = "none";

      }
    })
  }
}

function formSelectChangeEvent() {
  let selects = document.querySelectorAll("#comment-form select");
  
  for(let selectElemet of selects) {
    selectElemet.addEventListener("change", ({ target }) => {
      let classname = selectElemet.getAttribute("class");
      let inputname = selectElemet.getAttribute("name");
      let warning = document.getElementById(`${inputname}Warning`);
      
      if(target.value === "0") {
        target.setAttribute("class", classname + " invalid-input");
        warning.style.display = 'initial';
      }
      else {
        target.setAttribute("class", "form-element");
        warning.style.display = 'none';

      }
    })
  }
}

function init() {
  watchFormSubission();
  formInputChangeEvent();
  formSelectChangeEvent();
}

init();