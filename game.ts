import { countPossibleWinMoves, diagonalIndexs, placeOAt, storeLines } from "./helpers";
import { getOponentWinnerLineIndex, getWinnerLineIndex } from "./validators";

class Game {
  board: string;
  rows: string[];
  columns: string[];
  diagonals: string[];
 
  constructor(board: string) {
    this.board = board;
    const { rows, columns, diagonals } = storeLines(board);
    this.rows = rows;
    this.columns = columns;
    this.diagonals = diagonals;
  }

  private win(): boolean {
    const winnerRowIndex = getWinnerLineIndex(this.rows);
    if (winnerRowIndex > -1) {
      const cellIndex = this.rows[winnerRowIndex].indexOf(' ');
      const boardCellIndex = winnerRowIndex*3 + cellIndex;
      this.board = placeOAt(this.board, boardCellIndex);
      return true;
    } 

    const winnerColumnIndex = getWinnerLineIndex(this.columns);
    if (winnerColumnIndex > -1) {
      const cellIndex = this.columns[winnerColumnIndex].indexOf(' ');
      const boardCellIndex = winnerColumnIndex + cellIndex*3;
      this.board = placeOAt(this.board, boardCellIndex);
      return true;
    }

    const winnerDiagonalIndex = getWinnerLineIndex(this.diagonals);
    if (winnerDiagonalIndex > -1) {
      const cellIndex = this.diagonals[winnerDiagonalIndex].indexOf(' ');
      const boardCellIndex = diagonalIndexs[winnerDiagonalIndex][cellIndex];
      this.board = placeOAt(this.board, boardCellIndex);
      return true;
    }

    return false;
  }

  private block(): boolean {
    const rowIndex = getOponentWinnerLineIndex(this.rows);
    if (rowIndex > -1) {
      const cellIndex = this.rows[rowIndex].indexOf(' ');
      const boardCellIndex = rowIndex*3 + cellIndex;
      this.board = placeOAt(this.board, boardCellIndex);
      return true;
    } 

    const columnIndex = getOponentWinnerLineIndex(this.columns);
    if (columnIndex > -1) {
      const cellIndex = this.columns[columnIndex].indexOf(' ');
      const boardCellIndex = columnIndex + cellIndex*3;
      this.board = placeOAt(this.board, boardCellIndex);
      return true;
    }

    const diagonalIndex = getOponentWinnerLineIndex(this.diagonals);
    if (diagonalIndex > -1) {
      const cellIndex = this.diagonals[diagonalIndex].indexOf(' ');
      const boardCellIndex = diagonalIndexs[diagonalIndex][cellIndex];
      this.board = placeOAt(this.board, boardCellIndex);
      return true;
    }

    return false;
  }

  fork(): boolean {
    const splittedBoard = Array.from(this.board);
    for(let [i, cell] of splittedBoard.entries()) {
      if (cell === ' ') {
        const possibleMove = placeOAt(this.board, i);
        const canFork = countPossibleWinMoves(possibleMove) > 1;
        if (canFork) {
          this.board = possibleMove;
          return true;
        }
      }
    }

    return false;
  }

  calculateNextMove(): string {
    // win
    if (!this.win()) {
      if (!this.block()) {
        if (!this.fork()) {

        }
      }
    }


    return this.board;
  }
}

export default Game;
