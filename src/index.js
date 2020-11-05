const addBtn = document.querySelector("#new-toy-btn");
const toyFormContainer = document.querySelector(".container");
let addToy = false;
let divCollect = document.querySelector('toy-collection')

//When the page loads, make a 'GET' request to fetch all the toy objects.
function getToys() {
  return fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
}

//When a user submits the toy form, a POST request is sent to http://localhost:3000/toys 
//and the new toy is added to Andy's Toy Collection.
//In order to send a POST request via Fetch, give the Fetch a second argument of an object. 
//This object should specify the method as POST and also provide the appropriate headers and the JSON-ified data for the request.
function postToys(toy_data) {
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toy_data.name.value
      "image": toy_data.image.value
      "likes": 0
    })
  })
  .then(resp => resp.json())
  .then(obj_toy) => {
    let new_toy = renderToys(obj_toy)
    divCollect.append(newToy)
  }
}

function likes(e) {
  e.preventDefault()
  //Conditional increase to the toy's like count without reloading the page
  let more = parseInt(e.target.previousElementSibling.innerText) + 1
//A patch request sent to the server at http://localhost:3000/toys/:id 
//updating the number of likes that the specific toy has
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": more
    })
  })
    .then(resp => resp.json())
    .then((like_obj => {
      e.target.previousElementSibling.innerText = `${more} likes`;
    }))
}

function renderToys(toy) {
  //h2 tag with the toy's name
  let h2 = document.createElement("h2")
  h2.innerText = toy.name

  //img tag with the src of the toy's image attribute and the class name "toy-avatar"
  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  //p tag with how many likes that toy has
  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

//button tag with a class "like-btn"
  let btn = document.createElement("button")
  btn.setAttribute('class', 'like-btn')
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })
//With the response data, make a <div class="card"> for each toy and add it to the toy-collection div.
  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  divCollect.append(divCard)
 }




document.addEventListener("DOMContentLoaded", () => {

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      toyForm.addEventListener('submit', event => {
        event.preventDefault()
        postToy(event.target)
      })
    } else {
      toyForm.style.display = 'none'
    }
  })

getToys().then(toys => {
  toys.forEach(toy => {
    
    renderToys(toy)
  })
})