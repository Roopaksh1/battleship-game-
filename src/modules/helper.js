export const SHIP_LENGTH = {
  carrier: 5,
  battleship: 4,
  destroyer: 3,
  submarine: 3,
  patrolBoat: 2,
};

export const BOARD_LENGTH = 10;

export const randomCoord = () => {
  const row = Math.floor(Math.random() * 10);
  const col = Math.floor(Math.random() * 10);
  return [row, col];
};

export const SHIP_LIST = [
  'carrier',
  'battleship',
  'destroyer',
  'submarine',
  'patrolBoat',
];
