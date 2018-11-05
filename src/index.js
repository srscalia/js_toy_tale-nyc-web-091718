//***********************************************************
//********************* Variables ***************************
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const actualForm = toyForm.querySelector('form')
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
    toyForm.addEventListener('submit', (event)=> {
      event.preventDefault();
      let nameValue = event.target.querySelector('input').value;
      let imgValue = event.target.children[3].value
      fetch('http://localhost:3000/toys', {
        method: 'POST',
        headers:
          {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
        body: JSON.stringify(
          {
            "name": nameValue,
            "image": imgValue,
            "likes": 0
          }) //end of JSON stringify
      }).then(response => {
        return response.json()
      }).then(json => {
        toys.push(json);
        toysCollection.innerHTML += `
        <div data-id=${json.id} class="card">
          <h2>${json.name}</h2>
          <img src=${json.image} class="toy-avatar" />
          <p>${json.likes} Likes </p>
          <button class="like-btn">Like <3</button>
          </div>
        `
      }) // end of the post fetch
      actualForm.reset()
    }) // end of event listener for submit
  } else {
    toyForm.style.display = 'none'
  }
}) //end of event listener for creating new toy

toysCollection.addEventListener('click', (event)=> {
  if (event.target.className === 'like-btn') {
    const id = event.target.parentElement.dataset.id;
    const parent = event.target.parentElement;
    const fromAllToys = toys.find((toy)=>{
      return toy.id == id
    })
    fromAllToys.likes+=1
    // Because I am pointing to this object, I can change resassign here  
    const likes = fromAllToys.likes
    fetch(`http://localhost:3000/toys/${id}`, {
          method: 'PATCH', //which HTTP method do we want to use?
          headers: {
            //headers specify details/data for our request
            'Content-Type': 'application/json', //hey server, i am sending u JSON,
            Accept: 'application/json' //hey server pls send me back JSON
          },
          body: JSON.stringify({
            "likes": likes
          })
        })
        .then(r => r.json())
        .then(updatedLikes => {
          parent.querySelector('p').innerText = likes + " Likes";
        })
  }
})

//***********************************************************
//*****************Helper Functions**************************
