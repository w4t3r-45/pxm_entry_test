/**
 * # LOGIC :
 *  i will treat my 50 x 50 grid as a matrix so that i can increase accuracy when
 * it comes to looping , i could treat it as one single table but this will cause unecessary iterations
 * which must be avoided for best performance
 *
 * # CREATE GRID :
 *  to create my grid i need 3 indicators :
 *    max : the maximum width / height of our matrix
 *    rowIndicator : this will be initialized to 0 , used to indicate new rows when we create our matrix in the for loop
 *    colIndicator : this will be initialized to 0 , used to indicate new columns when we create our matrix in the for loop
 *
 * # REMARK :
 *  -good practice is always to separate  concerns , i could separate some funtions in separated files
 *  but for the sake of simplicity i let everything in one file
 */
document.addEventListener("DOMContentLoaded", () => {
  const MAX = 50;
  var rowIndicator = 0; //row index indicator
  var colIndicator = -1; //column index indicator
  const container = document.getElementById("root");

  // cell color changer function
  const FlashColor = (item, color, duration) => {
    item.style.backgroundColor = color;
    setTimeout(() => {
      item.style.backgroundColor = "#fff";
    }, duration);
  };

  // function to change color brifly and clear table cells
  const FlashClearTable = (table, color, duration) => {
    /**
     * i must clone the current table so that i can access
     * it after dealy in setInterval (to clear its color and values)
     * */
    const temp = [...table];
    for (let i = 0; i < table.length; i++) {
      table[i].style.backgroundColor = color;
    }
    // change color and set content to empty after a brief delay
    setTimeout(() => {
      for (let i = 0; i < temp.length; i++) {
        temp[i].style.backgroundColor = "#fff";
        temp[i].innerHTML = "";
      }
    }, duration);
  };

  // check if a given number is perfect square (we need it in isFibonacci function)
  const isPerfectSquare = (x) => {
    let s = parseInt(Math.sqrt(x));
    return s * s == x;
  };

  // Returns true if n is a Fibinacci Number, else false
  const isFibonacci = (n) => {
    // n is Fibinacci if one of 5*n*n + 4 or 5*n*n - 4 or both are a perferct square
    return isPerfectSquare(5 * n * n + 4) || isPerfectSquare(5 * n * n - 4);
  };

  // a function to return next fibonacci number of a given number
  const nextFibonacci = (n) => {
    let a = (n * (1 + Math.sqrt(5))) / 2.0;
    return Math.round(a);
  };

  // a function to check if cell values in a given table of length = 5 are in fibonacci sequence
  const isFibonacciTable = (table) => {
    let isFebo = false; //the indicator which let's  know if the table cells are in Febonacci sequence
    if (Boolean(table[0]) && isFibonacci(parseInt(table[0].innerHTML))) {
      let prev = parseInt(table[0].innerHTML); //previous nbr (initialize it to the first table item)
      for (let i = 1; i < 5; i++) {
        // check if the new item is the next febonacci number of the previous item
        if (parseInt(table[i].innerHTML) === parseInt(nextFibonacci(prev))) {
          prev = parseInt(table[i].innerHTML);
          isFebo = true;
        } else {
          isFebo = false;
          break;
        }
      }
    }
    return isFebo;
  };

  //check for fibonacci adjacents in Rows
  const checkFiboRows = () => {
    // tempCells will save each time 5 adjacent cells to compare them
    let tempCells = [];
    let colIndicator = -1;
    let rowIndicator = 0;
    for (let i = 0; i < Math.pow(MAX, 2) + 50; i++) {
      colIndicator++;
      // if tempCells length is equal to 5 do the job
      if (tempCells.length === 5) {
        // check for fibonnacci  , if true  flashGreen and clear cells
        isFibonacciTable(tempCells) && FlashClearTable(tempCells, "green", 200);
        // else if the end of that row still not reached then shift() cellTable "remove item at index[0]" and push the next Item
        if (colIndicator === 50) {
          // GO TO THE NEXT ROW AND RESET COLUMNS INDICATOR (START FROM -1 AGAIN)
          rowIndicator++;
          colIndicator = -1;
          // EMPTY OUR TEMP TABLE BECAUSE WE REACHED THE END OF CURRENT ROW
          tempCells = [];
        } else {
          tempCells.shift();
          tempCells.push(
            document.getElementById(`${rowIndicator}#${colIndicator}`)
          );
        }
      } else {
        // push items (to fill first 5 cells)
        tempCells.push(
          document.getElementById(`${rowIndicator}#${colIndicator}`)
        );
      }
    }
    // reset indicators to be ready if any other cell was clicked
    rowIndicator = 0;
    colIndicator = -1;
  };

  //check for fibonacci adjacents in Columns
  const checkFiboColumns = () => {
    // tempCells will save each time 5 adjacent cells to compare them
    let tempCells = [];
    let colIndicator = 0;
    let rowIndicator = -1;
    for (let i = 0; i < Math.pow(MAX, 2) + 50; i++) {
      rowIndicator++;
      // if tempCells length is equal to 5 do the job
      if (tempCells.length === 5) {
        // check for fibonnacci  , if true  flashGreen and clear cells
        isFibonacciTable(tempCells) && FlashClearTable(tempCells, "green", 200);
        // else if the end of that row still not reached then shift() cellTable "remove item at index[0]" and push the next Item
        if (rowIndicator === 50) {
          // GO TO THE NEXT COLUMN AND RESET ROWS INDICATOR (START FROM -1 AGAIN)
          colIndicator++;
          rowIndicator = -1;
          // EMPTY OUR TEMP TABLE BECAUSE WE REACHED THE END OF CURRENT COLUMN
          tempCells = [];
        } else {
          tempCells.shift();
          tempCells.push(
            document.getElementById(`${rowIndicator}#${colIndicator}`)
          );
        }
      } else {
        // push items (to fill first 5 cells)
        tempCells.push(
          document.getElementById(`${rowIndicator}#${colIndicator}`)
        );
      }
    }
    // reset indicators to be ready if any other cell was clicked
    rowIndicator = 0;
    colIndicator = -1;
  };

  const CreateTable = () => {
    for (let i = 0; i < Math.pow(MAX, 2); i++) {
      colIndicator++;
      // create cell and affect an ID to it (must contains row / column indicators)
      if (i > 0 && i % MAX === 0) {
        rowIndicator++;
        colIndicator = 0;
      }
      const cell = document.createElement("div");
      cell.setAttribute("id", `${rowIndicator}#${colIndicator}`);
      cell.style.border = "1px solid #707070";
      cell.style.fontSize = "10px";
      cell.style.textAlign = "center";
      cell.style.width = "15px";
      cell.style.height = "15px";
      // add onClick event  listener
      cell.addEventListener("click", () => {
        // get indexes for the clicked cell
        // my id is structured like that Ri#Ci , Ri is Row index, Ci is Column Index
        const rowIndex = cell.id.split("#")[0];
        const colIndex = cell.id.split("#")[1];
        // update value for the clicked cell (to avoid ambiguity when we update the all rest cells in the same row and column)
        if (Boolean(cell.innerHTML)) {
          cell.innerHTML = (parseInt(cell.innerHTML) + 1).toString();
        } else {
          cell.innerHTML = "1";
        }
        // update all cells in the same row / column as the clicked one
        // and save them (for bgcolor)
        for (let i = 0; i < 50; i++) {
          let rowCell = document.getElementById(`${rowIndex}#${i}`);
          let colCell = document.getElementById(`${i}#${colIndex}`);
          // update Value for cell row
          if (Boolean(rowCell.innerHTML)) {
            // avoid updating the current cell again (value updated when row were updated)
            if (rowCell.id !== cell.id) {
              rowCell.innerHTML = (parseInt(rowCell.innerHTML) + 1).toString();
            }
            FlashColor(rowCell, "yellow", 200);
          } else {
            rowCell.innerHTML = "1";
            FlashColor(rowCell, "yellow", 200);
          }
          // update Value for cell column
          if (Boolean(colCell.innerHTML)) {
            // avoid updating the current cell again (value updated when row were updated)
            if (colCell.id !== cell.id) {
              colCell.innerHTML = (parseInt(colCell.innerHTML) + 1).toString();
            }
            FlashColor(colCell, "yellow", 200);
          } else {
            colCell.innerHTML = "1";
            FlashColor(colCell, "yellow", 200);
          }
        }
        // check for ROWs / COLUMNS WITH Fibbonacci Sequence
        // those function are considered heavy so i must delay a bit between calls
        setTimeout(() => {
          checkFiboRows(); //checking for fibonacci sequence in rows
          checkFiboColumns(); //checking for fibonacci sequence in columns
        }, 600);
      });
      container.appendChild(cell);
    }
    // reset global indicators (because i need them in next cell clicks)
    rowIndicator = 0;
    colIndicator = -1;
  };
  CreateTable();
});
