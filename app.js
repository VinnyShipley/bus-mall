'use strict'

// *********GLOBAL VARIABLES***********

let roundsCounter = 15;
let productArray = [];


//**************Getting data out of local storage************

let retrievedProduct = localStorage.getItem('product');



//************* Parsing the data back to usable state********

let parsedProduct = JSON.parse(retrievedProduct);



// *********CONSTRUCTOR**********

function Product(name, fileExtension = 'jpg'){
  this.name = name;
  this.img = `img/${this.name}.${fileExtension}`;
  this.clickCounter = 0;
  this.viewCounter = 0;
  productArray.push(this);
} 

//************Instatiating New Products**********


// Product list

if(retrievedProduct){
  productArray = parsedProduct;
}  else{
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
  }




// ********DOM REFERENCES*********

//creates the container elem
let imgContainer = document.getElementById('images');

let imageOne = document.getElementById('img-one');


let imageTwo = document.getElementById('img-two');


let imageThree = document.getElementById('img-three');



// ********HELPER FUNCTIONS*********



// *********EVENT HANDLERS*******

//click event function
function handleClick(event){
  let imgClicked = event.target.alt;
  for(let i = 0; i < productArray.length; i++){
    if(imgClicked === productArray[i].name){
      productArray[i].clickCounter++;
      renderImg();
    }
  }
  roundsCounter--;
  if (roundsCounter === 0){
    imgContainer.removeEventListener('click', handleClick);
    renderproductChart();


    //*********Local Storage Work*************** 

    // Stringifying the data 

    let stringifiedProduct = JSON.stringify(productArray);
    
    //Setting it into Local Storage
    
    localStorage.setItem('product', stringifiedProduct);
    
    console.log(stringifiedProduct);
  }
}




// ***********EVENT LISTENERS************

imgContainer.addEventListener('click', handleClick);


//********EXECUTABLE CODE*********


//prints three random non-repeating images to the page

let indexArray = [];

function renderImg(){
  while (indexArray.length < 6) {
    let randomNumber = getRandomIndex();
    if (!indexArray.includes(randomNumber)){
      indexArray.push(randomNumber);
    }
  }

  let tempOne = indexArray.shift();
  let tempTwo = indexArray.shift();
  let tempThree = indexArray.shift();
  
  imageOne.src = productArray[tempOne].img;
  imageOne.alt = productArray[tempOne].name;
  productArray[tempOne].viewCounter++;

  imageTwo.src = productArray[tempTwo].img;
  imageTwo.alt = productArray[tempTwo].name;
  productArray[tempTwo].viewCounter++;

  imageThree.src = productArray[tempThree].img;
  imageThree.alt = productArray[tempThree].name;
  productArray[tempThree].viewCounter++;

}

function getRandomIndex(){
  let randomFloat = Math.random()*productArray.length;
  let randomInt = Math.floor(randomFloat);
  return randomInt;
}


//********CANVAS REFERENCE***********

let ctx = document.getElementById('myChart');



//************CHART RENDER****************

function renderproductChart() {

  // Creating arrays to help with labels and dataset
  let productNames = [];
  let productVotes = [];
  let productViews = [];

  for(let i = 0; i < productArray.length; i++){
    productNames.push(productArray[i].name);
    productVotes.push(productArray[i].clickCounter);
    productViews.push(productArray[i].viewCounter);
  }

  let myChartObj = {
    type: 'bar',
    data: {
      labels: productNames, // product names
      datasets: [{
        label: '# of Votes', // # votes and # views
        data: productVotes,
        backgroundColor: [
          'blue'
        ],
        borderColor: [
          'blue'
        ],
        borderWidth: 1
      },
      {
        label: '# of Views', // # votes and # views
        data: productViews, // the actual view or votes
        backgroundColor: [
          'black'
        ],
        borderColor: [
          'black'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };
  new Chart(ctx, myChartObj);
}

console.log('Does the gnarled dragon meat give you the creeps when you see it, like it does to me?')
renderImg();
