import { BOARD_LENGTH } from './helper';
import Ship from './ship';

const clearStartingBoard = () => {
  document.querySelector('.starting.board').textContent = '';
};

export const renderGrid = (row, col, status) =>
  `<div class="grid ${status}" data-row="${row}" data-col="${col}"></div>`;

export const renderBoard = (node, gameBoard, player, gameStart, game) => {
  node.textContent = '';
  const div = document.createElement('div');
  const board = gameBoard.getBoard();
  for (let i = 0; i < BOARD_LENGTH; i += 1) {
    for (let j = 0; j < BOARD_LENGTH; j += 1) {
      const status = board[i][j];
      if (status === null || status === 'hit' || status === 'miss') {
        div.innerHTML += renderGrid(i, j, status);
      } else {
        if (player.getID() === 'human') {
          div.innerHTML += renderGrid(i, j, status.id);
        } else {
          div.innerHTML += renderGrid(i, j, null);
        }
      }
    }
  }
  node.appendChild(div);
  bindEvents(player, gameBoard, gameStart, game);
};

const getAdjacentCells = (row, col, length, direction) => {
  const cells = [];
  for (let i = 0; i < length; i += 1) {
    if (direction) {
      cells.push(
        document.querySelector(
          `[data-row = "${row}"][data-col = "${Number(col) + i}"]`
        )
      );
    } else {
      cells.push(
        document.querySelector(
          `[data-row = "${Number(row) + i}"][data-col = "${col}"]`
        )
      );
    }
  }
  return cells;
};

const renderStartingShip = (player1, p1Board, e) => {
  const row = e.target.getAttribute('data-row');
  const col = e.target.getAttribute('data-col');
  const ship = Ship(player1.getFleet()[0]);
  if (p1Board.validCoordinates(row, col, ship.length, ship.getDirection())) {
    getAdjacentCells(row, col, ship.length, ship.getDirection()).forEach((c) =>
      c.classList.add('show-ship')
    );
  }
};

const removeShip = () => {
  document
    .querySelectorAll('.show-ship')
    .forEach((d) => d.classList.remove('show-ship'));
};

const placeShip = (player1, p1Board, game, e) => {
  const row = e.target.getAttribute('data-row');
  const col = e.target.getAttribute('data-col');
  const ship = Ship(player1.getFleet()[0]);
  if (p1Board.placeShip(row, col, ship) !== -1) {
    player1.getFleet().shift();
    renderBoard(
      document.querySelector('.starting.board'),
      p1Board,
      player1,
      false,
      game
    );
    if (player1.getFleet().length === 0) {
      clearStartingBoard();
      game.loadGame(game);
    }
  }
};

const bindEvents = (player, board, gameStart, game) => {
  if (!gameStart) {
    const div = document.querySelectorAll('.starting.board .grid');
    div.forEach((d) =>
      d.addEventListener(
        'mouseenter',
        renderStartingShip.bind(null, player, board)
      )
    );
    div.forEach((d) => d.addEventListener('mouseleave', removeShip));
    div.forEach((d) =>
      d.addEventListener('click', placeShip.bind(null, player, board, game))
    );
  } else {
    const p2 = document.querySelectorAll('.player2.board .grid');
    p2.forEach((d) =>
      d.addEventListener('click', (e) => {
        const row = e.target.getAttribute('data-row');
        const col = e.target.getAttribute('data-col');
        if (
          !e.target.classList.contains('miss') &&
          !e.target.classList.contains('hit')
        ) {
          game.startGame(row, col, game);
        }
      })
    );
  }
};

export const renderMessageBox = (message, game) => {
  const container = document.querySelector('.message-container');
  container.classList.add('overlay');
  const msg = document.createElement('p');
  msg.textContent = message;
  msg.classList.add('message-box');
  const btn = document.createElement('button');
  btn.classList.add('rematch');
  btn.textContent = 'Play Again';
  btn.addEventListener('click', () => game.restart());
  container.append(msg, btn);
};

export const clearScreen = () => {
  document.querySelector('.starting.board').textContent = '';
  document.querySelector('.player1.board').textContent = '';
  document.querySelector('.player2.board').textContent = '';
  document.querySelector('.message-container').textContent = '';
  document.querySelector('.message-container').classList.remove('overlay');
};
