// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

function readMatrix(rows, cols, label) {
  const matrix = [];
  console.log(`\nEnter matrix ${label} (${rows} x ${cols}):`);
  for (let i = 0; i < rows; i++) {
    let row;
    // Keep asking until the row has exactly `cols` numbers
    while (true) {
      row = readlineSync
        .question(`Enter row ${i + 1}: `)
        .trim()
        .split(' ')
        .filter(x => x !== '')
        .map(Number);
 
      if (row.length !== cols || row.some(isNaN)) {
        console.log(`  -> Please enter exactly ${cols} numbers separated by spaces.`);
      } else {
        break;
      }
    }
    matrix.push(row);
  }
  return matrix;
}
 
// -----------------------------------------------------------------------------
// HELPER: Print a matrix in a neat, aligned grid format
// -----------------------------------------------------------------------------
function printMatrix(matrix, label) {
  console.log(`\n${label}:`);
 
  // Find the widest number so every column lines up
  let maxWidth = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const width = String(matrix[i][j]).length;
      if (width > maxWidth) maxWidth = width;
    }
  }
 
  for (let i = 0; i < matrix.length; i++) {
    let line = '';
    for (let j = 0; j < matrix[i].length; j++) {
      line += String(matrix[i][j]).padStart(maxWidth + 2, ' ');
    }
    console.log(line);
  }
}
 
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];
 
  for (let j = 0; j < cols; j++) {
    const newRow = [];
    for (let i = 0; i < rows; i++) {
      newRow.push(matrix[i][j]);
    }
    result.push(newRow);
  }
 
  return result;
}
 
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
function addMatrices(matrixA, matrixB) {
  const rows = matrixA.length;
  const cols = matrixA[0].length;
  const result = [];
 
  for (let i = 0; i < rows; i++) {
    const newRow = [];
    for (let j = 0; j < cols; j++) {
      newRow.push(matrixA[i][j] + matrixB[i][j]);
    }
    result.push(newRow);
  }
 
  return result;
}
 
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
function multiplyMatrices(matrixA, matrixB) {
  const rowsA = matrixA.length;
  const colsA = matrixA[0].length; // = rowsB
  const colsB = matrixB[0].length;
  const result = [];
 
  for (let i = 0; i < rowsA; i++) {
    const newRow = [];
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += matrixA[i][k] * matrixB[k][j];
      }
      newRow.push(sum);
    }
    result.push(newRow);
  }
 
  return result;
}
 
// -----------------------------------------------------------------------------
// HELPER: Read valid, positive integer dimensions
// -----------------------------------------------------------------------------
function readDimension(prompt) {
  let value;
  while (true) {
    value = Number(readlineSync.question(prompt));
    if (Number.isInteger(value) && value > 0) break;
    console.log('  -> Please enter a positive whole number.');
  }
  return value;
}
 
// -----------------------------------------------------------------------------
// MAIN PROGRAM
// -----------------------------------------------------------------------------
function main() {
  console.log('=============================================');
  console.log(' MATRIX OPERATIONS');
  console.log('=============================================');
 
  // ---------------------------------------------------------------------
  // PART A — Transpose
  // ---------------------------------------------------------------------
  console.log('\n--- PART A: Transpose a Matrix ---');
  const rowsA = readDimension('Enter number of rows: ');
  const colsA = readDimension('Enter number of columns: ');
  const matrixA = readMatrix(rowsA, colsA, 'A');
 
  printMatrix(matrixA, 'Original Matrix');
  const transposed = transposeMatrix(matrixA);
  printMatrix(transposed, 'Transposed Matrix');
 
  // ---------------------------------------------------------------------
  // PART B — Addition
  // ---------------------------------------------------------------------
  console.log('\n--- PART B: Add Two Matrices ---');
  const addRows = readDimension('Enter number of rows for both matrices: ');
  const addCols = readDimension('Enter number of columns for both matrices: ');
  const matrixB1 = readMatrix(addRows, addCols, '1');
  const matrixB2 = readMatrix(addRows, addCols, '2');
 
  printMatrix(matrixB1, 'Matrix 1');
  printMatrix(matrixB2, 'Matrix 2');
  const sum = addMatrices(matrixB1, matrixB2);
  printMatrix(sum, 'Sum (Matrix 1 + Matrix 2)');
 
  // ---------------------------------------------------------------------
  // PART C — Multiplication
  // ---------------------------------------------------------------------
  console.log('\n--- PART C: Multiply Two Matrices ---');
  console.log('(Columns of A must equal rows of B)');
  const rowsC1 = readDimension('Enter number of rows for Matrix A: ');
  const colsC1 = readDimension('Enter number of columns for Matrix A (= rows of B): ');
  const colsC2 = readDimension('Enter number of columns for Matrix B: ');
 
  const matrixC1 = readMatrix(rowsC1, colsC1, 'A');
  const matrixC2 = readMatrix(colsC1, colsC2, 'B');
 
  printMatrix(matrixC1, 'Matrix A');
  printMatrix(matrixC2, 'Matrix B');
  const product = multiplyMatrices(matrixC1, matrixC2);
  printMatrix(product, 'Product (A x B)');
 
  console.log('\n=============================================');
  console.log(' DONE');
  console.log('=============================================');
}
 
main();
 
