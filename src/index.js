let addToy = false;
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
});



const htmlify = (obj) => {
  return (` 
<div class="card">
    <h2>${obj.name}</h2>
    <img src=${obj.image} class="toy-avatar" />
    <p>${obj.likes} Likes </p>
    <button class="like-btn">Like <3</button>
  </div>
  `)
}


fetch("http://localhost:3000/toys")
.then(resp => resp.json())
.then(toys => {
  dataToDom(toys)
});

function dataToDom(toys) {
  for (toy of toys) {
    const htmlToy = htmlify(toy)
    document.querySelector("#toy-collection").innerHTML += htmlToy
  }
  allButtons = document.querySelectorAll('.like-btn')
  addLikeButtons();
};
   
const submitButton = document.querySelector("input.submit");
submitButton.addEventListener('click', function(event) {
  event.preventDefault();
  let toyName = document.querySelector("body > div.container > form > input:nth-child(2)").value;
  let toyImage = document.querySelector("body > div.container > form > input:nth-child(4)").value;
  console.log("We're here!")
  submitData(toyName, toyImage)
 
});

function submitData(toyName, toyImage) {
  let formData = {
      name: toyName,
      image: toyImage,
      likes: 0
    };

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };


return  fetch("http://localhost:3000/toys", configObj)
  .then(function(response) {
    return response.json();
    })
    .then(function(object) {
        console.log(object);
        const htmlToy = htmlify(object)
        document.querySelector("#toy-collection").innerHTML += htmlToy
    })
 };


 // add likes
 function addLikeButtons() {
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].addEventListener("click", function(e) {
      // e.preventDefault();
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
  