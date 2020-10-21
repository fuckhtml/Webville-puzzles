'use strict';

const initPuzzleGame = () => {

  let grid = [
    ['07', '10', '14', '11'],
    ['12', '06', '05', '13'],
    ['08', '00', '01', '15'],
    ['04', '02', '09', '03'],
  ];

  // for tests
  // let grid = [
  //   ['01', '02', '03', '04'],
  //   ['05', '06', '07', '08'],
  //   ['09', '00', '11', '12'],
  //   ['13', '10', '14', '15'],
  // ];

  let puzzleGrid = document.createElement('tbody'); 
  for (let i = 0; i < grid.length; i++) {
    let tr = document.createElement('tr');
    for (let j = 0; j < grid[i].length; j++ ) {
      let td = document.createElement('td');
      td.id = 'cell' + (i + 1) + (j + 1);

      let img = document.createElement('img');
      img.src = `images/${grid[i][j]}.png`;
      img.alt = grid[i][j];
      img.width = '69';
      img.height = '69';

      td.append(img);
      tr.append(td);
    }
    puzzleGrid.append(tr);
  }
  document.querySelector('#puzzleGrid table').append(puzzleGrid);

  const puzzleGridNode = document.querySelector('#puzzleGrid tbody');
  puzzleGridNode.addEventListener('click', function(event) {
    if (event.target.tagName === 'IMG') {
      let emptyCell = puzzleGridNode.querySelector('img[alt="00"]').parentElement;
      let emptyCellCoord = parseInt(emptyCell.id.slice(-2)); // [1, 4][1, 4]

      let cellLeft = puzzleGridNode.querySelector(`td#cell${emptyCellCoord - 1}`);
      let cellRight = puzzleGridNode.querySelector(`td#cell${emptyCellCoord + 1}`);
      let cellTop = puzzleGridNode.querySelector(`td#cell${emptyCellCoord - 10}`);
      let cellBottom = puzzleGridNode.querySelector(`td#cell${emptyCellCoord + 10}`);

      let clickedCell = event.target.parentElement;

      let buffImg = null;
      let emptyCellCoordRow = Math.floor((emptyCellCoord - 10) / 10);
      let emptyCellCoordCol = (emptyCellCoord - 1) % 10;
      let cellCoordToSwapRow = emptyCellCoordRow;              // take coords of '00' in 
      let cellCoordToSwapCol = emptyCellCoordCol;              // grid array to change in switch

      switch(clickedCell) {
        case (cellLeft):
          buffImg = cellLeft.replaceChild(emptyCell.children[0], cellLeft.children[0]);
          cellCoordToSwapCol = emptyCellCoordCol - 1;
          break;
        case (cellRight):
          buffImg = cellRight.replaceChild(emptyCell.children[0], cellRight.children[0]);
          cellCoordToSwapCol = emptyCellCoordCol + 1;
          break;
        case (cellTop):
          buffImg = cellTop.replaceChild(emptyCell.children[0], cellTop.children[0]);
          cellCoordToSwapRow = emptyCellCoordRow - 1;
          break;
        case (cellBottom):
          buffImg = cellBottom.replaceChild(emptyCell.children[0], cellBottom.children[0]);
          cellCoordToSwapRow = emptyCellCoordRow + 1;
          break;
        default:;        
      }

      try {
        emptyCell.appendChild(buffImg);
        grid[emptyCellCoordRow][emptyCellCoordCol] = grid[cellCoordToSwapRow][cellCoordToSwapCol];
        grid[cellCoordToSwapRow][cellCoordToSwapCol] = '00';
      } catch {
        alert('Unable to move the cell');
      }

      let gridInStr = grid.join(',').replace('00','').replace(',,',',');
      if (gridInStr === '01,02,03,04,05,06,07,08,09,10,11,12,13,14,15') {
        alert('You win!');
        window.location.reload();
      }

    }
  })
}

window.addEventListener('load', initPuzzleGame);
