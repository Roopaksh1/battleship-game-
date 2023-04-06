import { randomCoord, SHIP_LIST } from './helper';

const Player = (id = 'human') => {
  let turn = false;
  let fleet = [...SHIP_LIST];
  const setFleet = () => {
    fleet = SHIP_LIST;
  };
  const getFleet = () => fleet;
  const setTurn = () => {
    turn = !turn;
  };
  const getTurn = () => turn;
  const getID = () => id;
  const attack = (row, col, enemyBoard) => enemyBoard.receiveAttack(row, col);

  const compAttack = (enemyBoard) => {
    let row = -1;
    let col = -1;
    while (enemyBoard.receiveAttack(row, col) === -1) {
      [row, col] = randomCoord();
    }
  };

  return {
    setFleet,
    getFleet,
    getTurn,
    setTurn,
    getID,
    attack,
    compAttack,
  };
};

export default Player;
