// JS Paint!
console.log('JS Paint starting...');

// Startup
// create startup variables
// CONSTANTS
const colours = ['black','white','gray','red','green','yellow','blue','purple','brown','orange'];
const canvas = document.createElement('canvas'); canvas.className = 'canvas'
const pen = canvas.getContext('2d');
const pallet = document.createElement('div'); pallet.className = 'pallet'


// changeable
let canvasWidth = 640; // width in pixels of canvas before scaling
let canvasHeight = 480; // height in pixels of canvas before scaling
let pixelSize = 16; // will be used for css styles to set width and height
let pencilColour = 'black'; // default colour is black, can be changed

// create canvas for paint pixels
const makeCanvas = function () {
  // for x,y create a div
  while (canvas.hasChildNode) {
    canvas.removeChild(canvas.firstChild);
  }



  // canvas resolution
  canvas.setAttribute('width',`${ canvasWidth }px`);
  canvas.setAttribute('height',`${ canvasHeight }px`);

  // mouse events
  canvas.addEventListener( 'mousedown', startDraw );
  canvas.addEventListener( 'mouseup', endDraw );

  //touch events
  canvas.addEventListener('touchstart', startDraw, {passive: true});
  canvas.addEventListener('touchend', endDraw, {passive: true});

  // add the canvas to the page
  document.body.prepend( canvas );

  // adjust background image size to scale
  resizeBgGrid();
  window.addEventListener( 'resize ', resizeBgGrid );
};

const resizeBgGrid = function () {
  // adjust background image size to scale
  // calculate to pixels
  // const bgSzH = ( canvas.clientWidth / canvasWidth * pixelSize ) + "px";
  // const bgSzW = ( canvas.clientHeight / canvasHeight * pixelSize ) + "px";

  // calculate to %
  const bgSzH = ( pixelSize / canvasWidth * 100  ) + "%";
  const bgSzW = ( pixelSize / canvasHeight * 100 ) + "%";
  console.log( ' resizing ' );
  canvas.style.backgroundSize = bgSzH + " " + bgSzW;
}

// function for evenet listener on mousedown -- starts drawing a line
const startDraw = function ( el ) {
  drawPixel( el );

  // add event listners to draw pixel when moving mouse or touch
  canvas.addEventListener( 'mousemove', drawPixel );
  canvas.addEventListener( 'touchmove', drawPixel, {passive: true} );
}

// function for evenet listener on mousedown -- ends drawing a line
const endDraw = function () {
  canvas.removeEventListener( 'mousemove', drawPixel );
  canvas.removeEventListener( 'touchmove', drawPixel, {passive: true} );
}

// create a colour pallet
const makePallet = function () {
  pallet.setAttribute("draggable", true); // to be used to allow someone to drag pallet arround;
  pallet.addEventListener("mouseup", endDraw ); // used to make sure endDraw is fired if mouse let go on pallet

  // TODO: add drag events and function to move this pallet on the screen

  for ( let i = 0; i < colours.length; i++ ) {
    const palletColour = document.createElement( 'div' );
    palletColour.style.backgroundColor = colours[i];
    palletColour.addEventListener( 'click', setPencilColour );
    palletColour.className = 'palletColour';
    pallet.appendChild( palletColour );
  }

  document.body.appendChild( pallet );
};


// function to set our new pencil colour when selected
const setPencilColour = function ( el ) {
  console.log( 'changing pencil colour?' );
  pencilColour = this.style.backgroundColor; // "this" refers to a palletColour div.
}

// math to normalise mouse input to canvas regardless of scaling
const normaliseMouseInput = function ( pos, size, unScaledRes, clientRes ) {
  return ( Math.ceil( pos / size / clientRes * unScaledRes ) * size ) - size;
}


const drawPixel = function( el, size = 16) { //default pixel size is 16 screen pixels
  let x = el.pageX;
  let y = el.pageY;

  console.log( 'woot, drawing! x:',x,'y:',y);
  // reset pencil space and setup pencil
  pen.beginPath();
  pen.fillStyle = pencilColour;
  pen.lineHeight = 0;

   // adjust cursor y coords to include any offset caused during centering
  y = y-canvas.getBoundingClientRect().top

  // normalize input so we only draw in 'pixels';
  x = normaliseMouseInput( x, size, canvasWidth, canvas.clientWidth );
  y = normaliseMouseInput( y, size, canvasHeight, canvas.clientHeight );

  // draw pixel or clear it
  if ( pencilColour === 'rgba(0, 0, 0, 0)' ) {
   pen.clearRect(x,y,size,size);
  }
  else {
   pen.fillRect(x,y,size,size);
  }

  return {
   x: x,
   y: y
  };
};



makeCanvas();
makePallet();
