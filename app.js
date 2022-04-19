'use strict'

// *********GLOBAL VARIABLES***********

let roundsCounter = 25;
let productArray = [];



// *********CONSTRUCTOR**********

function Product(name, fileExtension = 'jpg'){
  this.name = name;
  this.img = `img/${this.name}.${fileExtension}`;
  this.clickCounter = 0;
  this.viewCounter = 0;
  productArray.push(this);
} 


// Product list
new Product('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('sweep', 'png');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('wine-glass');


// ********DOM REFERENCES*********

//creates the container elem
let imgContainer = document.getElementById('images');

let imageOne = document.getElementById('img-one');


let imageTwo = document.getElementById('img-two');


let imageThree = document.getElementById('img-three');


let resultsList = document.getElementById('display-results');
let resultsBtn = document.getElementById('results-btn')



// ********HELPER FUNCTIONS*********



// *********EVENT HANDLERS*******

//click event function
function handleClick(event){
  let imgClicked = event.target.alt;
  for(let i = 0; i < productArray.length; i++){
    if(imgClicked === productArray[i].name){
      productArray[i].clickCounter++;
    }
  }
  roundsCounter--;
  if (roundsCounter === 0){
    imgContainer.removeEventListener('click', handleClick);
  }
  renderImg();
}

function handleShowResults(){
  if (roundsCounter === 0){
    for(let i=0; i < productArray.length; i++){
      let li = document.createElement('li');
      li.textContent = `${productArray[i].name} had ${productArray[i].clickCounter} votes, and was seen ${productArray[i].viewCounter} times.`;
      resultsList.appendChild(li);
      resultsBtn.removeEventListener('click', handleShowResults);
    }
  }
}

// ***********EVENT LISTENERS************

imgContainer.addEventListener('click', handleClick);

resultsBtn.addEventListener('click', handleShowResults);






//********EXECUTABLE CODE*********


//prints three random non-repeating images to the page
function renderImg(){
  let imageOneIndex = getRandomIndex();
  let imageTwoIndex = getRandomIndex();
  let imageThreeIndex = getRandomIndex();

  
  while((imageOneIndex === imageTwoIndex) || (imageTwoIndex === imageThreeIndex) || (imageOneIndex === imageThreeIndex)){
    imageOneIndex = getRandomIndex();
    imageTwoIndex = getRandomIndex();
    imageThreeIndex = getRandomIndex();
  }
  
  imageOne.src = productArray[imageOneIndex].img;
  imageOne.alt = productArray[imageOneIndex].name;
  productArray[imageOneIndex].viewCounter++;

  imageTwo.src = productArray[imageTwoIndex].img;
  imageTwo.alt = productArray[imageTwoIndex].name;
  productArray[imageTwoIndex].viewCounter++;

  imageThree.src = productArray[imageThreeIndex].img;
  imageThree.alt = productArray[imageThreeIndex].name;
  productArray[imageThreeIndex].viewCounter++;

}

function getRandomIndex(){
  let randomFloat = Math.random()*productArray.length;
  let randomInt = Math.floor(randomFloat);
  return randomInt;
}

renderImg();