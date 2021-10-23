function createGrid (size) {
  grid = document.querySelector('#grid');
  
  clearGrid();
  
  for (i = 0; i < size; i++) {
    row = document.createElement('div');
    row.classList.add('row');
    grid.appendChild(row);
  }
  //adds 'size' amount of rows to #grid container.
  
  for (i = 0; i < size; i++) {
    rows = document.querySelectorAll('#grid > div');
    
    cell = document.createElement('div');
    cell.classList.add('cell');
    
    rows.forEach ( row => row.appendChild(cell.cloneNode(true)) );
    /*cell.cloneNod(true) allows the cells to be cloned to each row, instead
      of assigned to a row, then reassigned to another row on each 'row.forEach'
      loop*/
  }
  //adds 'size' amount of cells to each row.
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
  Needs to be applied every time a new grid is created.*/


function createSketchPad (size) {
  createGrid(size);
  allowDraw();
}
//creates a grid with with drawing allowed


function wipeSketchPad() {
  size = findGridSize();
  
  createSketchPad(size);
}
/*clears the current sketchpad, then replaces it with a sketchpad of the same 
  size*/
  

createSketchPad(16);



