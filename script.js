function createRows(size) {
  for (i = 0; i < size; i++) {
    row = document.createElement('div');
    row.classList.add('row');
    grid.appendChild(row);
  }
}
//creates 'size' amount of rows and appends them to #grid.


function createCells(size) {
  for (i = 0; i < size; i++) {
    let rows = document.querySelectorAll('#grid > div');
  
    let cell = document.createElement('div');
    cell.classList.add('cell');
  
    rows.forEach ( row => row.appendChild(cell.cloneNode(true)) );
    /*REMEMBER THIS:
      cell.cloneNod(true) allows the cells to be cloned to each row, instead
      of assigned to a row, then reassigned to another row on each
      'row.forEach' loop. This problem could also be solved by delegating
      the actual dom creation of cells to a separate function.*/
  }
}
//creates 'size' amount of cells and appends them to existing rows in #grid


function clearGrid() {
  document.querySelector('#grid').innerHTML = '';
}
//clears any previous grid contents.


function findGridSize () {
  return document.querySelectorAll('#grid > div').length;
}
//counts the rows in the #grid container and returns the grid size.


function createGrid (size) {
  
  if (size < 1 || size > 100 || size === null) return;
  
  grid = document.querySelector('#grid');

  clearGrid();
  createRows(size);
  createCells(size);
}
//creates a 'size'x'size' grid.


function getColor() {
  if (document.querySelector('.color').getAttribute('class') === 'color true') {
    return 'random';
  } else {
    return 'black';
  }
}
//applies random color if .color toggle is true


function findCurrentLightness(cell) {
  console.log(cell.style.backgroundColor);
  return 10;
  /*A mock value to keep the program running, you can visually see the cells get darker on a second pass*/
}
// finds the current lightness of a cell


function lowerLightness (lightness) {
  
}
//lowers a given lightness by 10%

// function drawRandom (e) {
//   //e.target.removeEventListener('mouseenter', drawBlack);
//   let hue = Math.floor(Math.random() * 361);
//   let saturation = Math.floor(Math.random() * 101);
//   let lightness = Math.floor(Math.random() * 101);
//   
//   e.target.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
//   e.target.classList.add('colored');
// }
// 
// function drawBlack (e) {
//   //e.target.removeEventListener('mouseenter', drawRandom);
//   e.target.style.backgroundColor = 'black';
//   e.target.classList.remove('colored');
// }

function allowDraw (color) {
  cells = document.querySelectorAll('#grid > div > div');
  
  if (color === 'random') {
    cells.forEach( cell => cell.addEventListener('mouseenter', (e) => {
      let hue = Math.floor(Math.random() * 361);
      let saturation = Math.floor(Math.random() * 101);
      let lightness = Math.floor(Math.random() * 101);
      
      if (cell.className === 'cell colored') {
        lightness = findCurrentLightness(cell);
        //lightness = lowerLightness(lightness);
      }
      
      cell.style.backgroundColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
      cell.classList.add('colored');
    }));
  } else if (color === 'black') {
    cells.forEach( cell => cell.addEventListener('mouseenter', (e) => {
      cell.style.backgroundColor = 'black';
      cell.classList.remove('colored');
    }));
  }
}
/*allowDraw applies event listeners to each cell of the grid that change the
  background color on mouseenter.
  Needs to be applied to each grid that is created.*/
//Bug: when a sketchpad is created, and it's original color is black,
//the color toggle works, but findCurrentLightness is never called. This is fixed
//by turning on colors by pressing the color button, clicking wipe (or creating 
//a new sketchpad), which initializes the sketchpad with allowColor('random').
//Breaks again when color is switched back to black.
//If you toggle color yet again after this, toggleCurrentLightness is retrives
//the current color in the console, but it's return value has no effect after a 
// second pass over the cells.



function wipeSketchPad() {
  size = findGridSize();
  createSketchPad(size);
}
//replaces a current sketchpad with a new sketchpad of the same size


function allowButtonInput() {
  wipeBtn = document.querySelector('.wipe');
  wipeBtn.addEventListener('click', wipeSketchPad);
  
  newSketchPad = document.querySelector('.new-sketchpad');
  newSketchPad.addEventListener('click', () => {
    createSketchPad(prompt('Pick a size', '1 - 100'));
  });
  
  colorToggle = document.querySelector('.color');
  colorToggle.addEventListener('click', (e) => {
    colorToggle.classList.toggle('true');
    allowDraw(getColor());
  });
}
// applies functions to buttons via event listeners.


function createSketchPad (size) {
  createGrid(size);
  allowDraw(getColor());
}
/*creates a grid with with drawing allowed, aka a 'SketchPad'.
  Uses getColor(); to get the color that should be used.*/


createSketchPad(16);
allowButtonInput();



