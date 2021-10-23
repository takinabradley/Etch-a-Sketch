function createGrid (size) {
  let grid = document.querySelector('#grid');
  
  for (i = 0; i < size; i++) {
    row = document.createElement('div');
    grid.appendChild(row);
  }
  
  for (i = 0; i < size; i++) {
    row = document.querySelectorAll('#grid > div');
    items = document.createElement('div');
    row.forEach ( row => row.appendChild(items.cloneNode(true)) );
  }
  
  // Below code doesn't work because 'items' isn't cloned to be used again.
  // row[1] = document.createElement('div');
  // row[1].classList.add('_1');
  // 
  // row[2] = document.createElement('div');
  // row[2].classList.add('_2');
  // 
  // items[1] = document.createElement('div');
  // items[2] = document.createElement('div');
  // 
  // row[1].appendChild(items[1]);
  // row[1].appendChild(items[2]);
  // 
  // row[2].appendChild(items[1]);
  // row[2].appendChild(items[2]);
  // 
  // grid.appendChild(row[1]);
  // grid.appendChild(row[2]);
}
  
createGrid(16);
