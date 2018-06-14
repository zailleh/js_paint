// JS Paint!
console.log('JS Paint starting...');

// Startup
// create startup variables
let canvasWidth = 50 //width of canvas in "pixels"
const pixelWidth = `${ 100/canvasWidth }vw` // will be used for css styles to set width and height
let pencilColour = 'black' // default colour is black, can be changed

// create grid for paint pixels
const makeCanvas = function () {

  const defaultStyle = `width: ${ pixelWidth }; height: ${ pixelWidth }; float: left;`

  // for x,y create a div
    for (let i = 0; i < canvasWidth; i++) {
      for (let j = 0; j < canvasWidth; j++ ) {
        const newPixel = document.createElement('div');

        // set div width 2% of screen width? (gives 50px across)
        newPixel.style = defaultStyle;
        newPixel.setAttribute("draggable",true);
        // add event-listener for click?
        newPixel.addEventListener( 'click', colourPixel );
        newPixel.addEventListener( 'dragenter', colourPixel );
        newPixel.addEventListener( 'begindrag', colourPixel );
        // TODO: Add more event listeners for dragenter and begindrag operations.

        document.body.appendChild( newPixel );
      }
    }
}

// paint event listener to apply colour
const colourPixel = function (element) {
  console.log('change color?');
  this.style.backgroundColor = '#000000';
}

makeCanvas();
