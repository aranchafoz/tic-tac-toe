import { getOponentWinnerLineIndex, getWinnerLineIndex } from "./validators";

const diagonalIndexs = [[0, 4, 8], [2, 4, 6]];

class Game {
  board: string;
  rows: string[];
  columns: string[];
  diagonals: string[];
 
  constructor(board: string) {
    this.board = board;
    this.rows = [];
    this.columns = [];
    this.diagonals = [];
  }

  getRow(index: number) {
    return this.board.slice(index*3, (index+1)*3);
  }

  getColumn(index: number) {
    return `${this.board[index]}${this.board[index+3]}${this.board[index+6]}`;
  }

  getDiagonal(index: number) {
    return diagonalIndexs[index].map(e => this.board[e]).join('');
  }
  
  storeLines() {
    this.rows = [this.getRow(0), this.getRow(1), this.getRow(2)];
    this.columns = [this.getColumn(0), this.getColumn(1), this.getColumn(2)];
    this.diagonals = [this.getDiagonal(0), this.getDiagonal(1)];
  }

  private playOAt(index: number) {
    let boardArray = `${this.board}`.split('');
    boardArray[index] = 'o';
    const nextBoard = boardArray.join('');
    this.board = nextBoard;
  }

  private win(): boolean {
    const winnerRowIndex = getWinnerLineIndex(this.rows);
    if (winnerRowIndex > -1) {
      const cellIndex = this.rows[winnerRowIndex].indexOf(' ');
      const boardCellIndex = winnerRowIndex*3 + cellIndex;
      this.playOAt(boardCellIndex);
      return true;
    } 

    const winnerColumnIndex = getWinnerLineIndex(this.columns);
    if (winnerColumnIndex > -1) {
      const cellIndex = this.columns[winnerColumnIndex].indexOf(' ');
      const boardCellIndex = winnerColumnIndex + cellIndex*3;
      this.playOAt(boardCellIndex);
      return true;
    }

    const winnerDiagonalIndex = getWinnerLineIndex(this.diagonals);
    if (winnerDiagonalIndex > -1) {
      const cellIndex = this.diagonals[winnerDiagonalIndex].indexOf(' ');
      const boardCellIndex = diagonalIndexs[winnerDiagonalIndex][cellIndex];
      this.playOAt(boardCellIndex);
      return true;
    }

    return false;
  }

  private block(): boolean {
    const rowIndex = getOponentWinnerLineIndex(this.rows);
    if (rowIndex > -1) {
      const cellIndex = this.rows[rowIndex].indexOf(' ');
      const boardCellIndex = rowIndex*3 + cellIndex;
      this.playOAt(boardCellIndex);
      return true;
    } 

    const columnIndex = getOponentWinnerLineIndex(this.columns);
    if (columnIndex > -1) {
      const cellIndex = this.columns[columnIndex].indexOf(' ');
      const boardCellIndex = columnIndex + cellIndex*3;
      this.playOAt(boardCellIndex);
      return true;
    }

    const diagonalIndex = getOponentWinnerLineIndex(this.diagonals);
    if (diagonalIndex > -1) {
      const cellIndex = this.diagonals[diagonalIndex].indexOf(' ');
      const boardCellIndex = diagonalIndexs[diagonalIndex][cellIndex];
      this.playOAt(boardCellIndex);
      return true;
    }

    return false;
  }

  calculateNextMove(): string {
    // win
    if (!this.win()) {
      if (!this.block()) {

      }
    }


    return this.board;
  }
}

export default Game;
