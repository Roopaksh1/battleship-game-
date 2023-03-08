import { BOARD_LENGTH } from './helper';

const gameBoard = () => {
  const board = Array(BOARD_LENGTH)
    .fill(null)
    .map(() => Array(BOARD_LENGTH).fill(null));

  const shipList = [];

  const getShipList = () => shipList;
  const getBoard = () => board;

  const validCoordinates = (x, y, length, direction) => {
    if (direction) {
      return x + length <= BOARD_LENGTH;
    }
    return y + length <= BOARD_LENGTH;
  };

  const placeShip = (x, y, ship) => {
    if (!validCoordinates(x, y, ship.length, ship.getDirection)) return -1;
    if (ship.getDirection) {
      for (let i = 0; i < ship.length; i + 1) {
        board[x + i][y] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i + 1) {
        board[x][y + i] = ship;
      }
      shipList.push({ ship, coordX: x, coordY: y });
    }
    return 1;
  };

  const receiveAttack = (x, y) => {
    if (board[x][y] === null) {
      board[x][y] = 'miss';
      return 0;
    }
    if (board[x][y] === 'miss') return -1;
    board[x][y].hit();
    board[x][y] = 'hit';
    return 1;
  };

  const isAllShipSunk = () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const s of shipList) {
      if (!s.ship.isSunk()) return false;
    }
    return true;
  };

  return {
    getShipList,
    getBoard,
    validCoordinates,
    placeShip,
    receiveAttack,
    isAllShipSunk,
  };
};

export default gameBoard;
