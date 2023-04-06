import { clearScreen, renderBoard, renderMessageBox } from './dom';
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
    cpuBoard.randomPlacement(cpu);
  };

  const isGameOver = () => p1Board.isAllShipSunk() || cpuBoard.isAllShipSunk();

  const loadGame = (game) => {
    renderBoard(
      document.querySelector('.player1.board'),
      p1Board,
      player1,
      true,
      game
    );
    renderBoard(
      document.querySelector('.player2.board'),
      cpuBoard,
      cpu,
      true,
      game
    );
  };

  const startGame = (row, col, game) => {
    cpuBoard.receiveAttack(row, col);
    loadGame(game);
    if (isGameOver()) {
      renderMessageBox('You Won', game);
      return;
    }
    cpu.compAttack(p1Board);
    loadGame(game);
    if (isGameOver()) {
      renderMessageBox('Computer Won', game);
    }
  };

  function restart() {
    clearScreen();
    initGame();
    renderBoard(
      document.querySelector('.starting.board'),
      getP1Board(),
      getplayer1(),
      false,
      this
    );
  };

  return {
    getP1Board,
    getP2Board,
    getplayer1,
    getplayer2,
    initGame,
    isGameOver,
    loadGame,
    startGame,
    restart,
  };
};

export default Game;
