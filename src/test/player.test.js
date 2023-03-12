import GameBoard from '../modules/gameBoard';
import Player from '../modules/player'

describe('player-test', () => {
  const player1 = Player('human');
  const player2 = Player('cpu');
  const gameBoard1 = GameBoard();
  const gameBoard2 = GameBoard();

  test('id === cpu', () => {
    expect(player2.getID()).toBe('cpu');
  })

  test('miss attack', () => {
    player1.attack(0, 5, gameBoard2);
    expect(gameBoard2.getBoard()[0][5]).toBe('miss');
  })

  test('cpu-attack', () => {
    player2.compAttack(gameBoard1);
    expect(gameBoard1.getBoard().some((x) => x.some((y) => y === 'miss'))).toBe(true);
  })
})