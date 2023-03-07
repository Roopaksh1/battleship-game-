import SHIP_LENGTH from './helper';

const ship = (type) => {
  const length = SHIP_LENGTH[type];
  let hits = 0;
  let sunk = false;

  const hit = () => {
    hits += 1;
  };

  const isSunk = () => length <= hits;
};
