import { BOARD_LENGTH, randomCoord } from './helper';
import Ship from './ship';

const GameBoard = () => {
  const board = Array(BOARD_LENGTH)
    .fill(null)
    .map(() => Array(BOARD_LENGTH).fill(null));

  const shipList = [];

  const getShipList = () => shipList;
  const getBoard = () => board;

  const validCoordinates = (row, col, length, direction) => {
    if (direction) {
      return Number(col) + Number(length) <= BOARD_LENGTH;
    }
    return Number(row) + Number(length) < BOARD_LENGTH;
  };

  const alreadyPlaced = (row, col, length, direction) => {
    if (direction) {
      for (let i = 0; i < length; i += 1) {
        if (board[Number(row)][Number(col) + i] != null) {
          return 1;
        }
      }
    } else {
      for (let i = 0; i < length; i += 1) {
        if (board[Number(row) + i][Number(col)] != null) {
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
        board[Number(row)][Number(col) + i] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i += 1) {
        board[Number(row) + i][Number(col)] = ship;
      }
    }
    shipList.push({ ship, row, col });
    return 1;
  };

  const receiveAttack = (row, col) => {
    if (Number(row) < 0 || Number(row) >= BOARD_LENGTH || Number(col) < 0 || Number(col) >= BOARD_LENGTH)
      return -1;
    if (board[Number(row)][Number(col)] === null) {
      board[Number(row)][Number(col)] = 'miss';
      return 0;
    }
    if (board[Number(row)][Number(col)] === 'miss' || board[Number(row)][Number(col)] === 'hit') return -1;
    board[Number(row)][Number(col)].hit();
    board[Number(row)][Number(col)] = 'hit';
    return 1;
  };

  const isAllShipSunk = () => {
    // eslint-disable-next-line no-restricted-syntax
    for (const s of shipList) {
      if (!s.ship.isSunk()) return false;
    }
    return true;
  };

  const randomPlacement = (player) => {
    let [row, col] = randomCoord();
    while (player.getFleet().length !== 0) {
      const ship = Ship(player.getFleet()[0]);
      if (placeShip(row, col, ship) === 1) {
        player.getFleet().shift();
      } 
      [row, col] = randomCoord();
    }
  }

  return {
    getShipList,
    getBoard,
    validCoordinates,
    placeShip,
    receiveAttack,
    isAllShipSunk,
    randomPlacement,
  };
};

export default GameBoard;
