import { SHIP_LENGTH } from './helper';

const Ship = (type) => {
  const id = type;
  const length = SHIP_LENGTH[type];
  let hits = 0;

  // 1 for horizontal, 0 for vertical
  let direction = 1;

  const getDirection = () => direction;
  const setDirection = () => {
    direction = Number(!direction);
  };

  const hit = () => {
    hits += 1;
  };

  const isSunk = () => length <= hits;

  return {
    id,
    length,
    getDirection,
    setDirection,
    hit,
    isSunk,
  };
};

export default Ship;
