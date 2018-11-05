//***********************************************************
//********************* Variables ***************************
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toysCollection = document.querySelector('#toy-collection')
let addToy = false
let toys = []

//***********************************************************
//*****************Fetches to JSON***************************


fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then((json) => {
    toys = json;
    toys.forEach((toy)=>{
      toysCollection.innerHTML += `
      <div data-id=${toy.id} class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes} Likes </p>
        <button class="like-btn">Like <3</button>
        </div>
      `
    })
  })

//***********************************************************
//*****************Event Listeners***************************

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

//***********************************************************
//*****************Helper Functions**************************
