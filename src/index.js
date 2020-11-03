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

  const form = document.querySelector("body > div.container > form");
  form.addEventListener("submit", submitNewToy);

});

function getToyCollection () {
  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(data => displayToys(data))
    .catch(error => alert(error.messages))
}

function displayToys(dataset) {
  dataset.forEach(data => {
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
}

function submitNewToy(event) {
  event.preventDefault();
  const name = document.querySelector("body > div.container > form > input:nth-child(2)").value;
  const image = document.querySelector("body > div.container > form > input:nth-child(4)").value;
  createNewToyFromForm(name, image);
}

function createNewToyFromForm(name, image) {
  if (checkURL(image)) {
    // debugger;
    let formData = {
      name,
      image,
      likes: "0"
    };

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(formData)

    }
    fetch("http://localhost:3000/toys", configObj)
}
}


function checkURL(url) {

  if (url.match(/\.(jpeg|jpg|gif|png)$/) == null || checkStatus(url) == false ) {
    alert("Invalid image url")
    return false;
  } else {
    return true;
  };  
}

function checkStatus(url) {
  return fetch(url, {
    mode: 'no-cors'
  })
  .then(response => response.ok)
  .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

getToyCollection();

const toyCollection = document.querySelector("#toy-collection")