import GameBoard from '../modules/gameBoard';
import Player from '../modules/player';
import Ship from '../modules/ship';

describe('gameboard', () => {
  const gameboard = GameBoard();
  const ship = Ship('carrier');
  const compBoard = GameBoard();
  const comp = Player('comp');

  test('empty board', () => {
    const board = gameboard
      .getBoard()
      .every((s) => s.every((d) => d === null) === true);
    expect(board).toBe(true);
  });

  test('cannot place a carrier from pt (0, 6)[horizontal]', () => {
    expect(gameboard.placeShip(0, 6, ship)).toBe(-1);
  });

  test('can place a carrier from pt (0, 6)[vertical]', () => {
    ship.setDirection();
    expect(gameboard.placeShip(0, 6, ship)).toBe(1);
  });

  test('can place a carrier from pt (6, 0)[horizontal]', () => {
    ship.setDirection();
    expect(gameboard.placeShip(6, 0, ship)).toBe(1);
  });

  test('cannot place a carrier from pt (6, 0)[vertical]', () => {
    ship.setDirection();
    expect(gameboard.placeShip(6, 0, ship)).toBe(-1);
  });

  test('ship is already placed at (0,6) vertical', () => {
    expect(gameboard.placeShip(0, 6, ship)).toBe(-1);
  });

  test('ship is already placed at (6,0) horizontal', () => {
    ship.setDirection();
    expect(gameboard.placeShip(0, 6, ship)).toBe(-1);
  });

  test('successful attack', () => {
    expect(gameboard.receiveAttack(6, 0)).toBe(1);
  });

  test('already hit', () => {
    expect(gameboard.receiveAttack(6, 0)).toBe(-1);
  });

  test('miss-attack', () => {
    expect(gameboard.receiveAttack(5, 1)).toBe(0);
  });

  test('ship sunk == false', () => {
    gameboard.receiveAttack(6, 1);
    gameboard.receiveAttack(6, 2);
    gameboard.receiveAttack(6, 3);
    expect(gameboard.isAllShipSunk()).toBe(false);
  });

  test('ship sunk == true', () => {
    gameboard.receiveAttack(6, 4);
    expect(gameboard.isAllShipSunk()).toBe(true);
  });

  test('random placement check', () => {
    compBoard.randomPlacement(comp);
    const board = compBoard
      .getBoard()
      .some((s) => s.some((d) => d !== null) === true);
    expect(board).toBe(true);
  });
});
