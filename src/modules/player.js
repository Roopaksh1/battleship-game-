import { randomCoord } from './helper';

const Player = (id = 'human') => {
  const getID = () => id;

  const attack = (row, col, enemyBoard) => enemyBoard.receiveAttack(row, col);

  const compAttack = (enemyBoard) => {
    let row = -1;
    let col = -1;
    while (enemyBoard.receiveAttack(row, col) === -1) {
    [row, col] = randomCoord();
    }
  }

  return {
    getID,
    attack,
    compAttack,
  }
};

export default Player;
