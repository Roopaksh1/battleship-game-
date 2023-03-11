import { BOARD_LENGTH } from './helper';

const GameBoard = () => {
  const board = Array(BOARD_LENGTH)
    .fill(null)
    .map(() => Array(BOARD_LENGTH).fill(null));

  const shipList = [];

  const getShipList = () => shipList;
  const getBoard = () => board;

  const validCoordinates = (row, col, length, direction) => {
    if (direction) {
      return col + length < BOARD_LENGTH;
    }
    return row + length < BOARD_LENGTH;
  };

  const alreadyPlaced = (row, col, length, direction) => {
    if (direction) {
      for (let i = 0; i < length; i += 1) {
        if (board[row][col + i] != null) {
          return 1;
        }
      }
    } else {
      for (let i = 0; i < length; i += 1) {
        if (board[row + i][col] != null) {
          return 1;
        }
      }
    }
    return 0;
  };

  const placeShip = (row, col, ship) => {
    if (!validCoordinates(row, col, ship.length, ship.getDirection()))
      return -1;
    if (alreadyPlaced(row, col, ship.length, ship.getDirection())) return -1;
    if (ship.getDirection()) {
      for (let i = 0; i < ship.length; i += 1) {
        board[row][col + i] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i += 1) {
        board[row + i][col] = ship;
      }
      shipList.push({ ship, row, col });
    }
    return 1;
  };

  const receiveAttack = (row, col) => {
    if (board[row][col] === null) {
      board[row][col] = 'miss';
      return 0;
    }
    if (board[row][col] === 'miss' || board[row][col] === 'hit') return -1;
    board[row][col].hit();
    board[row][col] = 'hit';
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

export default GameBoard;
