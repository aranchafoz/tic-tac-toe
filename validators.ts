export function validateBoardContent(board: string): boolean {
  return /^[xo ]{9}$/.test(board);
}

export function isPlausiblyOsTurn(board: string): boolean {
  return board.includes(' ');
}

export function getWinnerLineIndex(lines: string[]): number {
  return lines.findIndex(e => e.includes(' ') && (e.match(/o/g) || []).length === 2);
}