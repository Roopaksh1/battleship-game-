import GameBoard from './gameBoard';
import Player from './player';

const Game = () => {
  let player1;
  let cpu;
  let p1Board;
  let cpuBoard;

  const getplayer1 = () => player1;
  const getplayer2 = () => cpu;
  const getP1Board = () => p1Board;
  const getP2Board = () => cpuBoard;

  const initGame = () => {
    player1 = Player();
    player1.setTurn();
    cpu = Player('computer');
    p1Board = GameBoard();
    cpuBoard = GameBoard();
  };

  const isGameOver = () =>
    getP1Board.isAllShipSunk() || getP2Board.isAllShipSunk();

  return {
    getP1Board,
    getP2Board,
    getplayer1,
    getplayer2,
    initGame,
    isGameOver,
  };
};

export default Game;
