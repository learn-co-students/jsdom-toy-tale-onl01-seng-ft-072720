let addToy = false;

const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
const toyCollection = document.querySelector("#toy-collection");
const newToy = document.querySelector(".add-toy-form");
const likeButton = document.querySelectorAll(".like-btn");

getToys();


document.addEventListener("DOMContentLoaded", () => {
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function getToys() {
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(createToyCard)
}

function createToyCard(object) {
  for (const toy of object) {
    let htmlToy = htmlify(toy)
    toyCollection.innerHTML += htmlToy   
  }
}

function htmlify(object) {
  return (`
    <div class="card">
      <h2>${object.name}</h2>
      <img src=${object.image} class="toy-avatar" />
      <p>${object.likes}</p>
      <button class="like-btn"> Like <3 </button>
    </div>
  `)
  }

function submitData() {

  let formData = {
    "name": document.querySelectorAll('.input-text')[0].value,
    "image": document.querySelectorAll('.input-text')[1].value,
    "likes": "0"
  };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
  };

  function displayError(error) {
    document.body.innerHTML = error.message
  }

  function mountToBody(object) {
    let htmlToy = htmlify(object)
    toyCollection.innerHTML += htmlToy
  }

  return fetch("http://localhost:3000/toys", configObj)
    .then(resp => resp.json())
    .then(mountToBody)
    .catch(displayError)
}


// function getToyData(form) {
//   return {
//     name: name.value,
//     image: image.value
//   }
// }

newToy.addEventListener("submit", submitData)

likeButton.addEventListener("click", increaseCount)

function increaseCount(toy) {
  debugger
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": parseInt(toy.likes) + 1
    })
  };
  fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
  }



