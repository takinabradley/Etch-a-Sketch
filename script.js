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


function createGrid (size) {
  
  if (size < 1 || size > 100 || size === null) return;
  
  grid = document.querySelector('#grid');

  clearGrid();
  createRows(size);
  createCells(size);
}
//creates a 'size'x'size' grid.


function clearGrid() {
  document.querySelector('#grid').innerHTML = '';
}
//clears any previous grid contents.


function findGridSize () {
  return document.querySelectorAll('#grid > div').length;
}
//counts the rows in the #grid container and returns the grid size.


function allowDraw (color) {
  cells = document.querySelectorAll('#grid > div > div');

  cells.forEach( cell => cell.addEventListener('mouseenter', (e) => {
    if (color === 'random') {
      e.target.style.backgroundColor = `rgb( ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0)`;
    } else {
      e.target.style.backgroundColor = 'black';
    }
  }));
}
/*allowDraw applies event listeners to each cell of the grid that change the
  background color on mouseenter.
  Needs to be applied to each grid that is created.*/


function applyColor() {
    if (document.querySelector('.color').getAttribute('class') === 'color true') {
      return 'random';
    } else {
      return;
    }
}
//applies random color if .color toggle is true

function createSketchPad (size) {
  createGrid(size);
  allowDraw(applyColor());
}
/*creates a grid with with drawing allowed, aka a 'SketchPad'.
  Uses allowColor(); to test */


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
    allowDraw(applyColor());
  });
}
/*considering making buttons that add rows and columns to the sketchpad
  without clearing it, but that might be a bit hard.*/


createSketchPad(16);
allowButtonInput();



