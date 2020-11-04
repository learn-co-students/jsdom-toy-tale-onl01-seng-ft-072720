let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
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


const getToys = document.addEventListener("DOMContentLoaded", () => {
  return fetch("http://localhost:3000/toys", {
  })
  .then(resp => response.json)
  .then(toys => toys.forEach(showToys()))
})

function showToys(toy) {
  let thisToy = toy
  let toyDiv = ""
  let htmlSegment = `<div class="card">
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar">
  <p>${toy.likes}</p></div>`
  toyDiv += htmlSegment
  let btn = document.createElement("BUTTON");
  btn.class = "like-btn"
  toyDiv.append(btn)
}

const createToy = toy => {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      "Accept": 'application/json'
    },
    body: JSON.stringify({
      name,
      image,
      likes
    })
  })
}

const likeToy = toy => {
  fetch(`http://localhost:3000/toys/${toy.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({ likes: toy.likes++ })
  }).then(resp => resp.json())
}