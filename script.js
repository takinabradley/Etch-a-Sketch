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


function allowDraw () {
  cells = document.querySelectorAll('#grid > div > div');

  cells.forEach( cell => cell.addEventListener('mouseenter', (e) => {
    e.target.style.backgroundColor = "black";
  }));
}
/*allowDraw applies event listeners to each cell of the grid.
  Needs to be applied to each grid that is created.*/


function createSketchPad (size) {
  createGrid(size);
  allowDraw();
}
//creates a grid with with drawing allowed, aka a 'SketchPad'.


function wipeSketchPad() {
  size = findGridSize();
  createSketchPad(size);
}
//replaces a current sketchpad with a new sketchpad of the same size


createSketchPad(16);



