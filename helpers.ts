import { getWinnerLineIndex } from "./validators";

export const diagonalIndexs = [[0, 4, 8], [2, 4, 6]];

export function getRow(board: string, index: number) {
  return board.slice(index * 3, (index + 1) * 3);
}

export function getColumn(board: string, index: number) {
  return `${board[index]}${board[index + 3]}${board[index + 6]}`;
}

export function getDiagonal(board: string, index: number) {
  return diagonalIndexs[index].map(e => board[e]).join('');
}

export function storeLines(board: string) {
  const rows = [getRow(board,0), getRow(board, 1), getRow(board, 2)];
  const columns = [getColumn(board, 0), getColumn(board, 1), getColumn(board, 2)];
  const diagonals = [getDiagonal(board, 0), getDiagonal(board, 1)];
  return { rows, columns, diagonals };
}

export function placeOAt(board: string, index: number) {
  let boardArray = `${board}`.split('');
  boardArray[index] = 'o';
  const nextBoard = boardArray.join('');
  return nextBoard;
}

export function countPossibleWinMoves(board: string): number {
  const { rows, columns, diagonals } = storeLines(board);


  const winnerRowPossibility = getWinnerLineIndex(rows) !== -1 ? 1 : 0;
  const winnerColumnPossibility = getWinnerLineIndex(columns) !== -1 ? 1 : 0;
  const winnerDiagonalPossibility = getWinnerLineIndex(diagonals) !== -1 ? 1 : 0;

  return winnerRowPossibility + winnerColumnPossibility + winnerDiagonalPossibility;
}