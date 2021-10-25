function createRows(size) {
  for (i = 0; i < size; i++) {
    const row = document.createElement('div');
    row.classList.add('row');
    grid.appendChild(row);
  }
}


function createCells(size) {
  for (i = 0; i < size; i++) {
    const rows = document.querySelectorAll('.row');
  
    const cell = document.createElement('div');
    cell.classList.add('cell');
  
    rows.forEach ( row => row.appendChild(cell.cloneNode(true)) );
    /*REMEMBER THIS:
      cell.cloneNod(true) allows the cells to be cloned to each row, instead
      of assigned to a row, then reassigned to another row on each
      'row.forEach' loop. This problem could also be solved by delegating
      the actual dom creation of cells to a separate function.*/
  }
}
//appends cells to existing rows.


function clearGrid() {
  grid.innerHTML = '';
}


function getGridSize () {
  return document.querySelectorAll('.row').length;
}


function createGrid (size) {
  if (size < 1 || size > 100 || size === null) return;
  const grid = document.querySelector('#grid');

  clearGrid();
  createRows(size);
  createCells(size);
}
//creates a 'size'x'size' grid.


function getDrawColor() {
  if (document.querySelector('.color').classList.contains('true')) {//getAttribute('class') === 'color true') {
    return 'random';
  } else {
    return 'black';
  }
}
//chooses draw color based on if the color button is toggled.


function rgbToLightness(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }
  
  return Math.round(l * 100);
}
//a modified RGB to HSL function that only returns Lightness as an integer.


function getCurrentLightness(e) {
  currentColor = e.target.style.backgroundColor.split(',');
  
  currentColor[0] = parseInt(currentColor[0].replace(/\D/g,''), 10); //removes extra text before parsing
  currentColor[1] = parseInt(currentColor[1], 10);
  currentColor[2] = parseInt(currentColor[2], 10);
  //converts all strings in array to numbers
  
  return rgbToLightness(currentColor[0], currentColor[1], currentColor[2])
}


function lowerLightness (lightness) {
  return lightness - 9;
}


function drawRandom (e) {
  const hue = Math.floor(Math.random() * 361); 
  const saturation = Math.floor(Math.random() * 101);
  let lightness = 90;
  
  if (e.target.classList.contains('colored')) {
    lightness = lowerLightness(getCurrentLightness(e));
  }
  //lowers lightness if a cell has been previously colored.
  
  e.target.style.backgroundColor = `hsl( ${hue} ${saturation}% ${lightness}% )`;
  e.target.classList.add('colored');
}


function drawBlack (e) {
  e.target.style.backgroundColor = 'black';
  e.target.classList.remove('colored');
}


function allowDraw (drawColor) {
  const cells = document.querySelectorAll('.cell');
  
  cells.forEach( cell => {
    cell.removeEventListener('mouseenter', drawRandom);
    cell.removeEventListener('mouseenter', drawBlack);
  });
  //must remove any event listeners on the cells on each run to avoid buggy behavior.
  
  if (drawColor === 'random') {
    cells.forEach( cell => cell.addEventListener('mouseenter', drawRandom));
  } else if (drawColor === 'black') {
    cells.forEach( cell => cell.addEventListener('mouseenter', drawBlack));
  }
}
/*applies event listeners to each cell that changes background color on mouseenter.
  --Needs to be applied to each grid that is created.-- */


function wipeSketchPad() {
  const size = getGridSize();
  createSketchPad(size);
}
//replaces a current sketchpad with a new sketchpad of the same size


function allowButtonInput() {
  const wipeBtn = document.querySelector('.wipe');
  wipeBtn.addEventListener('click', wipeSketchPad);
  
  const newSketchPad = document.querySelector('.new-sketchpad');
  newSketchPad.addEventListener('click', () => {
    createSketchPad(prompt('Pick a size', '1 - 100'));
  });
  
  const colorToggle = document.querySelector('.color');
  colorToggle.addEventListener('click', (e) => {
    colorToggle.classList.toggle('true');
    allowDraw(getDrawColor());
  });
}
/*applies functions to buttons to wipe, create, and change drawing color of the
sketchpad*/


function createSketchPad (size) {
  createGrid(size);
  allowDraw(getDrawColor());
}
/*SketchPad: a grid with drawing allowed*/


createSketchPad(16);
allowButtonInput();



