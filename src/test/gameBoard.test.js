import GameBoard from '../modules/gameBoard';
import Ship from '../modules/ship';

describe('gameboard', () => {
  const gameboard = GameBoard();
  const ship = Ship('carrier');

  test('empty board', () => {
    const board = gameboard
      .getBoard()
      .every((s) => s.every((d) => d === null) === true);
    expect(board).toBe(true);
  });

  test('cannot place a carrier from pt (0, 5)[horizontal]', () => {
    expect(gameboard.placeShip(0, 5, ship)).toBe(-1);
  });

  test('can place a carrier from pt (0, 5)[vertical]', () => {
    ship.setDirection();
    expect(gameboard.placeShip(0, 5, ship)).toBe(1);
  });

  test('can place a carrier from pt (5, 0)[horizontal]', () => {
    ship.setDirection();
    expect(gameboard.placeShip(5, 0, ship)).toBe(1);
  });

  test('cannot place a carrier from pt (5, 0)[vertical]', () => {
    ship.setDirection();
    expect(gameboard.placeShip(5, 0, ship)).toBe(-1);
  });

  test('ship is already placed at (0,5) vertical', () => {
    expect(gameboard.placeShip(0, 5, ship)).toBe(-1);
  });

  test('ship is already placed at (5,0) horizontal', () => {
    ship.setDirection();
    expect(gameboard.placeShip(0, 5, ship)).toBe(-1);
  });

  test('successful attack', () => {
    expect(gameboard.receiveAttack(5, 0)).toBe(1);
  });

  test('already hit', () => {
    expect(gameboard.receiveAttack(5, 0)).toBe(-1);
  });

  test('miss-attack', () => {
    expect(gameboard.receiveAttack(6, 1)).toBe(0);
  });

  test('ship sunk == false', () => {
    gameboard.receiveAttack(5, 1);
    gameboard.receiveAttack(5, 2);
    gameboard.receiveAttack(5, 3);
    expect(gameboard.isAllShipSunk()).toBe(false);
  });

  test('ship sunk == true', () => {
    gameboard.receiveAttack(5, 4);
    expect(gameboard.isAllShipSunk()).toBe(true);
  });
});
