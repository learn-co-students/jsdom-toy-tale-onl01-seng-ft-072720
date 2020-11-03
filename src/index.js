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

function getToyCollection () {
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(data => displayToys(data))
}

function displayToys(dataset) {
  dataset.forEach(data => {
  // data = data[0];
  const toyCollection = document.querySelector("#toy-collection");
  const div = document.createElement("div");
  div.className = "card";
  toyCollection.appendChild(div);

  const toyName = document.createElement("h2");
  toyName.innerText = data["name"];
  div.appendChild(toyName);

  const img = document.createElement("img");
  img.src = data["image"]
  img.className = "toy-avatar"
  div.appendChild(img);

  const p = document.createElement("p");
  p.innerText = `${data.likes} likes`;
  div.appendChild(p);

  const button = document.createElement("button");
  button.className = "like-btn";
  button.innerText = "Like <3";
  div.appendChild(button);
  })



  // debugger;
}

getToyCollection();

const toyCollection = document.querySelector("#toy-collection")