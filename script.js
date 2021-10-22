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
  //maybe append rows first?
  /* why are all the items only appended to the last fuggin row slakjfkjfa */
  
createGrid(16);

/*https://www.geeksforgeeks.org/how-to-use-dynamic-variable-names-in-javascript/
  maybe this will help?*/


/* 
  function createGrid () {
  grid = document.querySelector('#grid');
  
  row1 = document.createElement('div');
  row1.classList.add('_1');
  
  row2 = document.createElement('div');
  row2.classList.add('_2');
  
  items1 = document.createElement('div');
  items2 = document.createElement('div');
  
  row1.appendChild(items1);
  row1.appendChild(items2);
  
  row2.appendChild(items1);
  row2.appendChild(items2);
  
  grid.appendChild(row1);
  grid.appendChild(row2);
    
}
*/