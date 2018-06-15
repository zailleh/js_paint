// JS Paint!
console.log('JS Paint starting...');

// Startup
// create startup variables
// CONSTANTS
const colours = ['black','white','gray','red','green','yellow','blue','purple','brown','orange'];
const canvas = document.createElement('div'); canvas.className = 'canvas'
const pallet = document.createElement('div'); pallet.className = 'pallet'

// changeable
let canvasWidth = 50; //width of canvas in "pixels"
let pixelWidth = `${ 100/canvasWidth }vw`; // will be used for css styles to set width and height
let pencilColour = 'black'; // default colour is black, can be changed
let defaultStyle = `width: ${ pixelWidth }; height: ${ pixelWidth }; float: left;`

// create grid for paint pixels
const makeCanvas = function () {
  // for x,y create a div
  while (canvas.hasChildNode) {
    canvas.removeChild(canvas.firstChild);
  }

  if ( !document.body.contains( canvas ) ) {
    document.body.prepend(canvas);
  }

  for (let i = 0; i < canvasWidth; i++) {
    for (let j = 0; j < canvasWidth; j++ ) {
      const newPixel = document.createElement('div');

      // set div width 2% of screen width? (gives 50px across)
      newPixel.style = defaultStyle;
      newPixel.className = 'pixel';
      newPixel.setAttribute("draggable",true);
      // add event-listener for click?
      newPixel.addEventListener( 'click', colourPixel );
      newPixel.addEventListener( 'dragenter', colourPixel );
      newPixel.addEventListener( 'begindrag', colourPixel );
      // TODO: Add more event listeners for dragenter and begindrag operations.

      canvas.appendChild( newPixel );
    }
  }
};

// create a colour pallet
const makePallet = function () {
  pallet.setAttribute("draggable", true); // to be used to allow someone to drag pallet arround;

  for ( let i = 0; i < colours.length; i++ ) {
    const palletColour = document.createElement( 'div' );
    palletColour.style.backgroundColor = colours[i];
    palletColour.addEventListener( 'click', setPencilColour );
    palletColour.className = 'palletColour';

    pallet.appendChild( palletColour );
  }

  document.body.appendChild( pallet );
};

const setPencilColour = function () {
  console.log( 'changing pencil colour?' );
  pencilColour = this.style.backgroundColor;
}

// paint event listener to apply colour
const colourPixel = function ( element ) {
  //console.log( 'change color?' );
  this.style.backgroundColor = pencilColour;
}

makeCanvas();
makePallet();
