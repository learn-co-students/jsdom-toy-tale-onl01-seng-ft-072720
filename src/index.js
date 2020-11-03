let addToy = false;
const toyCollection = document.querySelector('#toy-collection')
const form = document.querySelector('.add-toy-form')
let allButtons;

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
  function createCard(toy, object) {
    toyCollection.innerHTML += `<div class="card">
    <h2>${object[toy]['name']}</h2>
    <img src=${object[toy]['image']} class="toy-avatar" />
    <p>${object[toy]['likes']} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>` 
  }
  
  function getToys() {
    return fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(obj => {
      for(const toy in obj) {
        createCard(toy, obj);
      }
      allButtons = document.querySelectorAll('.like-btn')
      addLikeButtons();
    })
  }
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const toyName = form.name.value;
    const toyAvatar = form.image.value;
    const data = {
      name: toyName,
      image: toyAvatar,
      likes: 0
    }
    createCardFromForm(data);
  })
  
  function createCardFromForm(toyData) {
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toyData)
    })
  }
  
  function addLikeButtons() {
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", function(e) {
      const pText = e.target.parentElement.children[2].innerText
      const count = pText.split(' ')[0]
      const parsedCount = parseInt(count) + 1
      
      fetch(`http://localhost:3000/toys/${i + 1}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          "likes": `${parsedCount}`
        })
      })
    })
  }
  }
  getToys();
});


