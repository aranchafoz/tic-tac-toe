import Game from './game';

test.each([
  { input: 'o o  xx  ', expected: 'ooo  xx  ' },
  { input: ' o xox   ', expected: ' o xox o ' },
  { input: '    o oxx', expected: '  o o oxx' },
])('Win - $input', ({ input, expected }) => {
  const game = new Game(input);
  const nextMove = game.calculateNextMove();
  expect(nextMove).toBe(expected);
});

test.each([
  { input: 'o  o  x x', expected: 'o  o  xox' },
  { input: '  x oxo  ', expected: '  x oxo o' },
  { input: 'x     oox', expected: 'x   o oox' },
])('Block - $input', ({ input, expected }) => {
  const game = new Game(input);
  const nextMove = game.calculateNextMove();
  expect(nextMove).toBe(expected);
});

test.each([
  { input: 'xx  o   o', expected: 'xxo o   o' },
  { input: 'x   ox  o', expected: 'x   oxo o' },
])('Fork - $input', ({ input, expected }) => {
  const game = new Game(input);
  const nextMove = game.calculateNextMove();
  expect(nextMove).toBe(expected);
});