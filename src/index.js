let addToy = false;
const toyCollection = document.getElementById("toy-collection")

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

function getToys(){
  fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(toys => showToys(toys))
}

function showToys(toys){
  for (toy of toys){
  const toyDiv = document.createElement("div")
  const h2 = document.createElement("h2")
  h2.innerHTML = toy.name

  const img = document.createElement("img")
  img.setAttribute("src", toy.image)
  img.setAttribute("class", "toy-avatar")

  const p = document.createElement("p")
  p.innerHTML = `${toy.likes} Likes `

  const button = document.createElement("button")
  button.setAttribute("class", "like-btn")
  button.innerHTML = "Like <3"
  button.addEventListener("click", 
    function(e) {
      
    }
  )
  
  

  toyDiv.append()
  toyCollection.append(toyDiv)
  }
}
