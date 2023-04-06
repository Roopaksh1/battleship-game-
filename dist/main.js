/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/modules/dom.js":
/*!****************************!*\
  !*** ./src/modules/dom.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clearScreen": () => (/* binding */ clearScreen),
/* harmony export */   "renderBoard": () => (/* binding */ renderBoard),
/* harmony export */   "renderGrid": () => (/* binding */ renderGrid),
/* harmony export */   "renderMessageBox": () => (/* binding */ renderMessageBox)
/* harmony export */ });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ "./src/modules/helper.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");


var clearStartingBoard = function clearStartingBoard() {
  document.querySelector('.starting.board').textContent = '';
};
var renderGrid = function renderGrid(row, col, status) {
  return "<div class=\"grid ".concat(status, "\" data-row=\"").concat(row, "\" data-col=\"").concat(col, "\"></div>");
};
var renderBoard = function renderBoard(node, gameBoard, player, gameStart, game) {
  node.textContent = '';
  var div = document.createElement('div');
  var board = gameBoard.getBoard();
  for (var i = 0; i < _helper__WEBPACK_IMPORTED_MODULE_0__.BOARD_LENGTH; i += 1) {
    for (var j = 0; j < _helper__WEBPACK_IMPORTED_MODULE_0__.BOARD_LENGTH; j += 1) {
      var status = board[i][j];
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
var getAdjacentCells = function getAdjacentCells(row, col, length, direction) {
  var cells = [];
  for (var i = 0; i < length; i += 1) {
    if (direction) {
      cells.push(document.querySelector("[data-row = \"".concat(row, "\"][data-col = \"").concat(Number(col) + i, "\"]")));
    } else {
      cells.push(document.querySelector("[data-row = \"".concat(Number(row) + i, "\"][data-col = \"").concat(col, "\"]")));
    }
  }
  return cells;
};
var renderStartingShip = function renderStartingShip(player1, p1Board, e) {
  var row = e.target.getAttribute('data-row');
  var col = e.target.getAttribute('data-col');
  var ship = (0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])(player1.getFleet()[0]);
  if (p1Board.validCoordinates(row, col, ship.length, ship.getDirection())) {
    getAdjacentCells(row, col, ship.length, ship.getDirection()).forEach(function (c) {
      return c.classList.add('show-ship');
    });
  }
};
var removeShip = function removeShip() {
  document.querySelectorAll('.show-ship').forEach(function (d) {
    return d.classList.remove('show-ship');
  });
};
var placeShip = function placeShip(player1, p1Board, game, e) {
  var row = e.target.getAttribute('data-row');
  var col = e.target.getAttribute('data-col');
  var ship = (0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])(player1.getFleet()[0]);
  if (p1Board.placeShip(row, col, ship) !== -1) {
    player1.getFleet().shift();
    renderBoard(document.querySelector('.starting.board'), p1Board, player1, false, game);
    if (player1.getFleet().length === 0) {
      clearStartingBoard();
      game.loadGame(game);
    }
  }
};
var bindEvents = function bindEvents(player, board, gameStart, game) {
  if (!gameStart) {
    var div = document.querySelectorAll('.starting.board .grid');
    div.forEach(function (d) {
      return d.addEventListener('mouseenter', renderStartingShip.bind(null, player, board));
    });
    div.forEach(function (d) {
      return d.addEventListener('mouseleave', removeShip);
    });
    div.forEach(function (d) {
      return d.addEventListener('click', placeShip.bind(null, player, board, game));
    });
  } else {
    var p2 = document.querySelectorAll('.player2.board .grid');
    p2.forEach(function (d) {
      return d.addEventListener('click', function (e) {
        var row = e.target.getAttribute('data-row');
        var col = e.target.getAttribute('data-col');
        if (!e.target.classList.contains('miss') && !e.target.classList.contains('hit')) {
          game.startGame(row, col, game);
        }
      });
    });
  }
};
var renderMessageBox = function renderMessageBox(message, game) {
  var container = document.querySelector('.message-container');
  container.classList.add('overlay');
  var msg = document.createElement('p');
  msg.textContent = message;
  msg.classList.add('message-box');
  var btn = document.createElement('button');
  btn.classList.add('rematch');
  btn.textContent = 'Play Again';
  btn.addEventListener('click', function () {
    return game.restart();
  });
  container.append(msg, btn);
};
var clearScreen = function clearScreen() {
  document.querySelector('.starting.board').textContent = '';
  document.querySelector('.player1.board').textContent = '';
  document.querySelector('.player2.board').textContent = '';
  document.querySelector('.message-container').textContent = '';
  document.querySelector('.message-container').classList.remove('overlay');
};

/***/ }),

/***/ "./src/modules/game.js":
/*!*****************************!*\
  !*** ./src/modules/game.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/modules/dom.js");
/* harmony import */ var _gameBoard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameBoard */ "./src/modules/gameBoard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");



var Game = function Game() {
  var player1;
  var cpu;
  var p1Board;
  var cpuBoard;
  var getplayer1 = function getplayer1() {
    return player1;
  };
  var getplayer2 = function getplayer2() {
    return cpu;
  };
  var getP1Board = function getP1Board() {
    return p1Board;
  };
  var getP2Board = function getP2Board() {
    return cpuBoard;
  };
  var initGame = function initGame() {
    player1 = (0,_player__WEBPACK_IMPORTED_MODULE_2__["default"])();
    player1.setTurn();
    cpu = (0,_player__WEBPACK_IMPORTED_MODULE_2__["default"])('computer');
    p1Board = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_1__["default"])();
    cpuBoard = (0,_gameBoard__WEBPACK_IMPORTED_MODULE_1__["default"])();
    cpuBoard.randomPlacement(cpu);
  };
  var isGameOver = function isGameOver() {
    return p1Board.isAllShipSunk() || cpuBoard.isAllShipSunk();
  };
  var loadGame = function loadGame(game) {
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.renderBoard)(document.querySelector('.player1.board'), p1Board, player1, true, game);
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.renderBoard)(document.querySelector('.player2.board'), cpuBoard, cpu, true, game);
  };
  var startGame = function startGame(row, col, game) {
    cpuBoard.receiveAttack(row, col);
    loadGame(game);
    if (isGameOver()) {
      (0,_dom__WEBPACK_IMPORTED_MODULE_0__.renderMessageBox)('You Won', game);
      return;
    }
    cpu.compAttack(p1Board);
    loadGame(game);
    if (isGameOver()) {
      (0,_dom__WEBPACK_IMPORTED_MODULE_0__.renderMessageBox)('Computer Won', game);
    }
  };
  function restart() {
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.clearScreen)();
    initGame();
    (0,_dom__WEBPACK_IMPORTED_MODULE_0__.renderBoard)(document.querySelector('.starting.board'), getP1Board(), getplayer1(), false, this);
  }
  ;
  return {
    getP1Board: getP1Board,
    getP2Board: getP2Board,
    getplayer1: getplayer1,
    getplayer2: getplayer2,
    initGame: initGame,
    isGameOver: isGameOver,
    loadGame: loadGame,
    startGame: startGame,
    restart: restart
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);

/***/ }),

/***/ "./src/modules/gameBoard.js":
/*!**********************************!*\
  !*** ./src/modules/gameBoard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ "./src/modules/helper.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var GameBoard = function GameBoard() {
  var board = Array(_helper__WEBPACK_IMPORTED_MODULE_0__.BOARD_LENGTH).fill(null).map(function () {
    return Array(_helper__WEBPACK_IMPORTED_MODULE_0__.BOARD_LENGTH).fill(null);
  });
  var shipList = [];
  var getShipList = function getShipList() {
    return shipList;
  };
  var getBoard = function getBoard() {
    return board;
  };
  var validCoordinates = function validCoordinates(row, col, length, direction) {
    if (direction) {
      return Number(col) + Number(length) <= _helper__WEBPACK_IMPORTED_MODULE_0__.BOARD_LENGTH;
    }
    return Number(row) + Number(length) < _helper__WEBPACK_IMPORTED_MODULE_0__.BOARD_LENGTH;
  };
  var alreadyPlaced = function alreadyPlaced(row, col, length, direction) {
    if (direction) {
      for (var i = 0; i < length; i += 1) {
        if (board[Number(row)][Number(col) + i] != null) {
          return 1;
        }
      }
    } else {
      for (var _i = 0; _i < length; _i += 1) {
        if (board[Number(row) + _i][Number(col)] != null) {
          return 1;
        }
      }
    }
    return 0;
  };
  var placeShip = function placeShip(row, col, ship) {
    if (!validCoordinates(row, col, ship.length, ship.getDirection())) return -1;
    if (alreadyPlaced(row, col, ship.length, ship.getDirection())) return -1;
    if (ship.getDirection()) {
      for (var i = 0; i < ship.length; i += 1) {
        board[Number(row)][Number(col) + i] = ship;
      }
    } else {
      for (var _i2 = 0; _i2 < ship.length; _i2 += 1) {
        board[Number(row) + _i2][Number(col)] = ship;
      }
    }
    shipList.push({
      ship: ship,
      row: row,
      col: col
    });
    return 1;
  };
  var receiveAttack = function receiveAttack(row, col) {
    if (Number(row) < 0 || Number(row) >= _helper__WEBPACK_IMPORTED_MODULE_0__.BOARD_LENGTH || Number(col) < 0 || Number(col) >= _helper__WEBPACK_IMPORTED_MODULE_0__.BOARD_LENGTH) return -1;
    if (board[Number(row)][Number(col)] === null) {
      board[Number(row)][Number(col)] = 'miss';
      return 0;
    }
    if (board[Number(row)][Number(col)] === 'miss' || board[Number(row)][Number(col)] === 'hit') return -1;
    board[Number(row)][Number(col)].hit();
    board[Number(row)][Number(col)] = 'hit';
    return 1;
  };
  var isAllShipSunk = function isAllShipSunk() {
    // eslint-disable-next-line no-restricted-syntax
    for (var _i3 = 0, _shipList = shipList; _i3 < _shipList.length; _i3++) {
      var s = _shipList[_i3];
      if (!s.ship.isSunk()) return false;
    }
    return true;
  };
  var randomPlacement = function randomPlacement(player) {
    var _randomCoord = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.randomCoord)(),
      _randomCoord2 = _slicedToArray(_randomCoord, 2),
      row = _randomCoord2[0],
      col = _randomCoord2[1];
    while (player.getFleet().length !== 0) {
      var ship = (0,_ship__WEBPACK_IMPORTED_MODULE_1__["default"])(player.getFleet()[0]);
      if (placeShip(row, col, ship) === 1) {
        player.getFleet().shift();
      }
      var _randomCoord3 = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.randomCoord)();
      var _randomCoord4 = _slicedToArray(_randomCoord3, 2);
      row = _randomCoord4[0];
      col = _randomCoord4[1];
    }
  };
  return {
    getShipList: getShipList,
    getBoard: getBoard,
    validCoordinates: validCoordinates,
    placeShip: placeShip,
    receiveAttack: receiveAttack,
    isAllShipSunk: isAllShipSunk,
    randomPlacement: randomPlacement
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GameBoard);

/***/ }),

/***/ "./src/modules/helper.js":
/*!*******************************!*\
  !*** ./src/modules/helper.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BOARD_LENGTH": () => (/* binding */ BOARD_LENGTH),
/* harmony export */   "SHIP_LENGTH": () => (/* binding */ SHIP_LENGTH),
/* harmony export */   "SHIP_LIST": () => (/* binding */ SHIP_LIST),
/* harmony export */   "randomCoord": () => (/* binding */ randomCoord)
/* harmony export */ });
var SHIP_LENGTH = {
  carrier: 5,
  battleship: 4,
  destroyer: 3,
  submarine: 3,
  patrolBoat: 2
};
var BOARD_LENGTH = 10;
var randomCoord = function randomCoord() {
  var row = Math.floor(Math.random() * 10);
  var col = Math.floor(Math.random() * 10);
  return [row, col];
};
var SHIP_LIST = ['carrier', 'battleship', 'destroyer', 'submarine', 'patrolBoat'];

/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ "./src/modules/helper.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }

var Player = function Player() {
  var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'human';
  var turn = false;
  var fleet = _toConsumableArray(_helper__WEBPACK_IMPORTED_MODULE_0__.SHIP_LIST);
  var setFleet = function setFleet() {
    fleet = _helper__WEBPACK_IMPORTED_MODULE_0__.SHIP_LIST;
  };
  var getFleet = function getFleet() {
    return fleet;
  };
  var setTurn = function setTurn() {
    turn = !turn;
  };
  var getTurn = function getTurn() {
    return turn;
  };
  var getID = function getID() {
    return id;
  };
  var attack = function attack(row, col, enemyBoard) {
    return enemyBoard.receiveAttack(row, col);
  };
  var compAttack = function compAttack(enemyBoard) {
    var row = -1;
    var col = -1;
    while (enemyBoard.receiveAttack(row, col) === -1) {
      var _randomCoord = (0,_helper__WEBPACK_IMPORTED_MODULE_0__.randomCoord)();
      var _randomCoord2 = _slicedToArray(_randomCoord, 2);
      row = _randomCoord2[0];
      col = _randomCoord2[1];
    }
  };
  return {
    setFleet: setFleet,
    getFleet: getFleet,
    getTurn: getTurn,
    setTurn: setTurn,
    getID: getID,
    attack: attack,
    compAttack: compAttack
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helper */ "./src/modules/helper.js");

var Ship = function Ship(type) {
  var id = type;
  var length = _helper__WEBPACK_IMPORTED_MODULE_0__.SHIP_LENGTH[type];
  var hits = 0;

  // 1 for horizontal, 0 for vertical
  var direction = 1;
  var getDirection = function getDirection() {
    return direction;
  };
  var setDirection = function setDirection() {
    direction = Number(!direction);
  };
  var hit = function hit() {
    hits += 1;
  };
  var isSunk = function isSunk() {
    return length <= hits;
  };
  return {
    id: id,
    length: length,
    getDirection: getDirection,
    setDirection: setDirection,
    hit: hit,
    isSunk: isSunk
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/global.css":
/*!*********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/global.css ***!
  \*********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n  font-size: 62.5%;\n  --grid-color: #d8e2dc;\n  --background-color: #fee440;\n  --grid-hover-color: #f8edeb;\n  --ship-hover-color: #f4a261;\n  --carrier-color: #343a40;\n  --battleship-color: #354f52;\n  --destroyer-color: #52796f;\n  --submarine-color: #84a98c;\n  --patrolBoat-color: #6c757d;\n  --miss-color: #80ed99;\n  --hit-color: #d00000;\n  --overlay-color: rgba(0, 0, 0, 0.5);\n}\n\n*,\n*::after,\n*::before {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  background-color: var(--background-color);\n}\n\nh1 {\n  font-size: 10rem;\n  text-align: center;\n}\n\n.starting.board > div,\n.player1.board > div,\n.player2.board > div {\n  display: flex;\n  flex-flow: row wrap;\n  margin: 10rem auto;\n  border: solid black 2px;\n  border-right: 0;\n  border-bottom: 0;\n  width: 60.4rem;\n}\n\n.container {\n  display: flex;\n  justify-content: space-around;\n}\n\n.grid {\n  background-color: var(--grid-color);\n  width: 6rem;\n  height: 6rem;\n  border: solid black;\n  border-width: 0 2px 2px 0;\n  cursor: pointer;\n}\n\n.grid:hover {\n  background-color: var(--grid-hover-color);\n}\n\n.grid.show-ship {\n  background-color: var(--ship-hover-color);\n}\n\n.grid[class*='carrier'] {\n  background-color: var(--carrier-color);\n}\n\n.grid[class*='battleship'] {\n  background-color: var(--battleship-color);\n}\n\n.grid[class*='destroyer'] {\n  background-color: var(--destroyer-color);\n}\n\n.grid[class*='submarine'] {\n  background-color: var(--submarine-color);\n}\n\n.grid[class*='patrolBoat'] {\n  background-color: var(--patrolBoat-color);\n}\n\n.grid[class*='miss'] {\n  background-color: var(--miss-color);\n}\n\n.grid[class*='hit'] {\n  background-color: var(--hit-color);\n}\n\n.message-container.overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: var(--overlay-color);\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n.message-box {\n  font-size: 4rem;\n  margin-bottom: 3rem;\n  color: aqua;\n  letter-spacing: 5px;\n}\n\n.rematch {\n  border: none;\n  cursor: pointer;\n  padding: 2rem;\n  font-size: 2rem;\n}\n", "",{"version":3,"sources":["webpack://./src/styles/global.css"],"names":[],"mappings":"AAAA;EACE,gBAAgB;EAChB,qBAAqB;EACrB,2BAA2B;EAC3B,2BAA2B;EAC3B,2BAA2B;EAC3B,wBAAwB;EACxB,2BAA2B;EAC3B,0BAA0B;EAC1B,0BAA0B;EAC1B,2BAA2B;EAC3B,qBAAqB;EACrB,oBAAoB;EACpB,mCAAmC;AACrC;;AAEA;;;EAGE,SAAS;EACT,UAAU;EACV,sBAAsB;AACxB;;AAEA;EACE,yCAAyC;AAC3C;;AAEA;EACE,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA;;;EAGE,aAAa;EACb,mBAAmB;EACnB,kBAAkB;EAClB,uBAAuB;EACvB,eAAe;EACf,gBAAgB;EAChB,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,6BAA6B;AAC/B;;AAEA;EACE,mCAAmC;EACnC,WAAW;EACX,YAAY;EACZ,mBAAmB;EACnB,yBAAyB;EACzB,eAAe;AACjB;;AAEA;EACE,yCAAyC;AAC3C;;AAEA;EACE,yCAAyC;AAC3C;;AAEA;EACE,sCAAsC;AACxC;;AAEA;EACE,yCAAyC;AAC3C;;AAEA;EACE,wCAAwC;AAC1C;;AAEA;EACE,wCAAwC;AAC1C;;AAEA;EACE,yCAAyC;AAC3C;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,kBAAkB;EAClB,MAAM;EACN,OAAO;EACP,QAAQ;EACR,SAAS;EACT,sCAAsC;EACtC,aAAa;EACb,sBAAsB;EACtB,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,mBAAmB;EACnB,WAAW;EACX,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,eAAe;EACf,aAAa;EACb,eAAe;AACjB","sourcesContent":[":root {\n  font-size: 62.5%;\n  --grid-color: #d8e2dc;\n  --background-color: #fee440;\n  --grid-hover-color: #f8edeb;\n  --ship-hover-color: #f4a261;\n  --carrier-color: #343a40;\n  --battleship-color: #354f52;\n  --destroyer-color: #52796f;\n  --submarine-color: #84a98c;\n  --patrolBoat-color: #6c757d;\n  --miss-color: #80ed99;\n  --hit-color: #d00000;\n  --overlay-color: rgba(0, 0, 0, 0.5);\n}\n\n*,\n*::after,\n*::before {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}\n\nbody {\n  background-color: var(--background-color);\n}\n\nh1 {\n  font-size: 10rem;\n  text-align: center;\n}\n\n.starting.board > div,\n.player1.board > div,\n.player2.board > div {\n  display: flex;\n  flex-flow: row wrap;\n  margin: 10rem auto;\n  border: solid black 2px;\n  border-right: 0;\n  border-bottom: 0;\n  width: 60.4rem;\n}\n\n.container {\n  display: flex;\n  justify-content: space-around;\n}\n\n.grid {\n  background-color: var(--grid-color);\n  width: 6rem;\n  height: 6rem;\n  border: solid black;\n  border-width: 0 2px 2px 0;\n  cursor: pointer;\n}\n\n.grid:hover {\n  background-color: var(--grid-hover-color);\n}\n\n.grid.show-ship {\n  background-color: var(--ship-hover-color);\n}\n\n.grid[class*='carrier'] {\n  background-color: var(--carrier-color);\n}\n\n.grid[class*='battleship'] {\n  background-color: var(--battleship-color);\n}\n\n.grid[class*='destroyer'] {\n  background-color: var(--destroyer-color);\n}\n\n.grid[class*='submarine'] {\n  background-color: var(--submarine-color);\n}\n\n.grid[class*='patrolBoat'] {\n  background-color: var(--patrolBoat-color);\n}\n\n.grid[class*='miss'] {\n  background-color: var(--miss-color);\n}\n\n.grid[class*='hit'] {\n  background-color: var(--hit-color);\n}\n\n.message-container.overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: var(--overlay-color);\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n}\n\n.message-box {\n  font-size: 4rem;\n  margin-bottom: 3rem;\n  color: aqua;\n  letter-spacing: 5px;\n}\n\n.rematch {\n  border: none;\n  cursor: pointer;\n  padding: 2rem;\n  font-size: 2rem;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/styles/global.css":
/*!*******************************!*\
  !*** ./src/styles/global.css ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_global_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./global.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/global.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_global_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_global_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_global_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_global_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/dom */ "./src/modules/dom.js");
/* harmony import */ var _modules_game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/game */ "./src/modules/game.js");
/* harmony import */ var _styles_global_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/global.css */ "./src/styles/global.css");



var game = (0,_modules_game__WEBPACK_IMPORTED_MODULE_1__["default"])();
game.initGame();
(0,_modules_dom__WEBPACK_IMPORTED_MODULE_0__.renderBoard)(document.querySelector('.starting.board'), game.getP1Board(), game.getplayer1(), false, game);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQUEsTUFBTSxDQUFDQyxPQUFPLEdBQUcsVUFBVUMsc0JBQXNCLEVBQUU7RUFDakQsSUFBSUMsSUFBSSxHQUFHLEVBQUU7O0VBRWI7RUFDQUEsSUFBSSxDQUFDQyxRQUFRLEdBQUcsU0FBU0EsUUFBUUEsQ0FBQSxFQUFHO0lBQ2xDLE9BQU8sSUFBSSxDQUFDQyxHQUFHLENBQUMsVUFBVUMsSUFBSSxFQUFFO01BQzlCLElBQUlDLE9BQU8sR0FBRyxFQUFFO01BQ2hCLElBQUlDLFNBQVMsR0FBRyxPQUFPRixJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVztNQUM5QyxJQUFJQSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDWEMsT0FBTyxJQUFJLGFBQWEsQ0FBQ0UsTUFBTSxDQUFDSCxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDO01BQ2pEO01BQ0EsSUFBSUEsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ1hDLE9BQU8sSUFBSSxTQUFTLENBQUNFLE1BQU0sQ0FBQ0gsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQztNQUM1QztNQUNBLElBQUlFLFNBQVMsRUFBRTtRQUNiRCxPQUFPLElBQUksUUFBUSxDQUFDRSxNQUFNLENBQUNILElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQ0ksTUFBTSxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUNELE1BQU0sQ0FBQ0gsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQztNQUNqRjtNQUNBQyxPQUFPLElBQUlMLHNCQUFzQixDQUFDSSxJQUFJLENBQUM7TUFDdkMsSUFBSUUsU0FBUyxFQUFFO1FBQ2JELE9BQU8sSUFBSSxHQUFHO01BQ2hCO01BQ0EsSUFBSUQsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ1hDLE9BQU8sSUFBSSxHQUFHO01BQ2hCO01BQ0EsSUFBSUQsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ1hDLE9BQU8sSUFBSSxHQUFHO01BQ2hCO01BQ0EsT0FBT0EsT0FBTztJQUNoQixDQUFDLENBQUMsQ0FBQ0ksSUFBSSxDQUFDLEVBQUUsQ0FBQztFQUNiLENBQUM7O0VBRUQ7RUFDQVIsSUFBSSxDQUFDUyxDQUFDLEdBQUcsU0FBU0EsQ0FBQ0EsQ0FBQ0MsT0FBTyxFQUFFQyxLQUFLLEVBQUVDLE1BQU0sRUFBRUMsUUFBUSxFQUFFQyxLQUFLLEVBQUU7SUFDM0QsSUFBSSxPQUFPSixPQUFPLEtBQUssUUFBUSxFQUFFO01BQy9CQSxPQUFPLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRUEsT0FBTyxFQUFFSyxTQUFTLENBQUMsQ0FBQztJQUN4QztJQUNBLElBQUlDLHNCQUFzQixHQUFHLENBQUMsQ0FBQztJQUMvQixJQUFJSixNQUFNLEVBQUU7TUFDVixLQUFLLElBQUlLLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBRyxJQUFJLENBQUNWLE1BQU0sRUFBRVUsQ0FBQyxFQUFFLEVBQUU7UUFDcEMsSUFBSUMsRUFBRSxHQUFHLElBQUksQ0FBQ0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25CLElBQUlDLEVBQUUsSUFBSSxJQUFJLEVBQUU7VUFDZEYsc0JBQXNCLENBQUNFLEVBQUUsQ0FBQyxHQUFHLElBQUk7UUFDbkM7TUFDRjtJQUNGO0lBQ0EsS0FBSyxJQUFJQyxFQUFFLEdBQUcsQ0FBQyxFQUFFQSxFQUFFLEdBQUdULE9BQU8sQ0FBQ0gsTUFBTSxFQUFFWSxFQUFFLEVBQUUsRUFBRTtNQUMxQyxJQUFJaEIsSUFBSSxHQUFHLEVBQUUsQ0FBQ0csTUFBTSxDQUFDSSxPQUFPLENBQUNTLEVBQUUsQ0FBQyxDQUFDO01BQ2pDLElBQUlQLE1BQU0sSUFBSUksc0JBQXNCLENBQUNiLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQzdDO01BQ0Y7TUFDQSxJQUFJLE9BQU9XLEtBQUssS0FBSyxXQUFXLEVBQUU7UUFDaEMsSUFBSSxPQUFPWCxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssV0FBVyxFQUFFO1VBQ2xDQSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUdXLEtBQUs7UUFDakIsQ0FBQyxNQUFNO1VBQ0xYLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUNHLE1BQU0sQ0FBQ0gsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDSSxNQUFNLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQ0QsTUFBTSxDQUFDSCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUNHLE1BQU0sQ0FBQ0gsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztVQUNuR0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHVyxLQUFLO1FBQ2pCO01BQ0Y7TUFDQSxJQUFJSCxLQUFLLEVBQUU7UUFDVCxJQUFJLENBQUNSLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtVQUNaQSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUdRLEtBQUs7UUFDakIsQ0FBQyxNQUFNO1VBQ0xSLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUNHLE1BQU0sQ0FBQ0gsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDRyxNQUFNLENBQUNILElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7VUFDOURBLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBR1EsS0FBSztRQUNqQjtNQUNGO01BQ0EsSUFBSUUsUUFBUSxFQUFFO1FBQ1osSUFBSSxDQUFDVixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUU7VUFDWkEsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQ0csTUFBTSxDQUFDTyxRQUFRLENBQUM7UUFDL0IsQ0FBQyxNQUFNO1VBQ0xWLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUNHLE1BQU0sQ0FBQ0gsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDRyxNQUFNLENBQUNILElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUM7VUFDbkVBLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBR1UsUUFBUTtRQUNwQjtNQUNGO01BQ0FiLElBQUksQ0FBQ29CLElBQUksQ0FBQ2pCLElBQUksQ0FBQztJQUNqQjtFQUNGLENBQUM7RUFDRCxPQUFPSCxJQUFJO0FBQ2IsQ0FBQzs7Ozs7Ozs7OztBQ3BGWTs7QUFFYkgsTUFBTSxDQUFDQyxPQUFPLEdBQUcsVUFBVUssSUFBSSxFQUFFO0VBQy9CLElBQUlDLE9BQU8sR0FBR0QsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUNyQixJQUFJa0IsVUFBVSxHQUFHbEIsSUFBSSxDQUFDLENBQUMsQ0FBQztFQUN4QixJQUFJLENBQUNrQixVQUFVLEVBQUU7SUFDZixPQUFPakIsT0FBTztFQUNoQjtFQUNBLElBQUksT0FBT2tCLElBQUksS0FBSyxVQUFVLEVBQUU7SUFDOUIsSUFBSUMsTUFBTSxHQUFHRCxJQUFJLENBQUNFLFFBQVEsQ0FBQ0Msa0JBQWtCLENBQUNDLElBQUksQ0FBQ0MsU0FBUyxDQUFDTixVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0UsSUFBSU8sSUFBSSxHQUFHLDhEQUE4RCxDQUFDdEIsTUFBTSxDQUFDaUIsTUFBTSxDQUFDO0lBQ3hGLElBQUlNLGFBQWEsR0FBRyxNQUFNLENBQUN2QixNQUFNLENBQUNzQixJQUFJLEVBQUUsS0FBSyxDQUFDO0lBQzlDLE9BQU8sQ0FBQ3hCLE9BQU8sQ0FBQyxDQUFDRSxNQUFNLENBQUMsQ0FBQ3VCLGFBQWEsQ0FBQyxDQUFDLENBQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDO0VBQ3JEO0VBQ0EsT0FBTyxDQUFDSixPQUFPLENBQUMsQ0FBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQztBQUM3QixDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDZnVDO0FBQ2Q7QUFFMUIsSUFBTXdCLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBa0JBLENBQUEsRUFBUztFQUMvQkMsUUFBUSxDQUFDQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQ0MsV0FBVyxHQUFHLEVBQUU7QUFDNUQsQ0FBQztBQUVNLElBQU1DLFVBQVUsR0FBRyxTQUFiQSxVQUFVQSxDQUFJQyxHQUFHLEVBQUVDLEdBQUcsRUFBRUMsTUFBTTtFQUFBLDRCQUFBakMsTUFBQSxDQUNyQmlDLE1BQU0sb0JBQUFqQyxNQUFBLENBQWUrQixHQUFHLG9CQUFBL0IsTUFBQSxDQUFlZ0MsR0FBRztBQUFBLENBQVU7QUFFbkUsSUFBTUUsV0FBVyxHQUFHLFNBQWRBLFdBQVdBLENBQUlDLElBQUksRUFBRUMsU0FBUyxFQUFFQyxNQUFNLEVBQUVDLFNBQVMsRUFBRUMsSUFBSSxFQUFLO0VBQ3ZFSixJQUFJLENBQUNOLFdBQVcsR0FBRyxFQUFFO0VBQ3JCLElBQU1XLEdBQUcsR0FBR2IsUUFBUSxDQUFDYyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQ3pDLElBQU1DLEtBQUssR0FBR04sU0FBUyxDQUFDTyxRQUFRLEVBQUU7RUFDbEMsS0FBSyxJQUFJeEMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHcUIsaURBQVksRUFBRXJCLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDeEMsS0FBSyxJQUFJeUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHcEIsaURBQVksRUFBRW9CLENBQUMsSUFBSSxDQUFDLEVBQUU7TUFDeEMsSUFBTVgsTUFBTSxHQUFHUyxLQUFLLENBQUN2QyxDQUFDLENBQUMsQ0FBQ3lDLENBQUMsQ0FBQztNQUMxQixJQUFJWCxNQUFNLEtBQUssSUFBSSxJQUFJQSxNQUFNLEtBQUssS0FBSyxJQUFJQSxNQUFNLEtBQUssTUFBTSxFQUFFO1FBQzVETyxHQUFHLENBQUNLLFNBQVMsSUFBSWYsVUFBVSxDQUFDM0IsQ0FBQyxFQUFFeUMsQ0FBQyxFQUFFWCxNQUFNLENBQUM7TUFDM0MsQ0FBQyxNQUFNO1FBQ0wsSUFBSUksTUFBTSxDQUFDUyxLQUFLLEVBQUUsS0FBSyxPQUFPLEVBQUU7VUFDOUJOLEdBQUcsQ0FBQ0ssU0FBUyxJQUFJZixVQUFVLENBQUMzQixDQUFDLEVBQUV5QyxDQUFDLEVBQUVYLE1BQU0sQ0FBQ3JCLEVBQUUsQ0FBQztRQUM5QyxDQUFDLE1BQU07VUFDTDRCLEdBQUcsQ0FBQ0ssU0FBUyxJQUFJZixVQUFVLENBQUMzQixDQUFDLEVBQUV5QyxDQUFDLEVBQUUsSUFBSSxDQUFDO1FBQ3pDO01BQ0Y7SUFDRjtFQUNGO0VBQ0FULElBQUksQ0FBQ1ksV0FBVyxDQUFDUCxHQUFHLENBQUM7RUFDckJRLFVBQVUsQ0FBQ1gsTUFBTSxFQUFFRCxTQUFTLEVBQUVFLFNBQVMsRUFBRUMsSUFBSSxDQUFDO0FBQ2hELENBQUM7QUFFRCxJQUFNVSxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQWdCQSxDQUFJbEIsR0FBRyxFQUFFQyxHQUFHLEVBQUUvQixNQUFNLEVBQUVpRCxTQUFTLEVBQUs7RUFDeEQsSUFBTUMsS0FBSyxHQUFHLEVBQUU7RUFDaEIsS0FBSyxJQUFJaEQsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHRixNQUFNLEVBQUVFLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDbEMsSUFBSStDLFNBQVMsRUFBRTtNQUNiQyxLQUFLLENBQUNyQyxJQUFJLENBQ1JhLFFBQVEsQ0FBQ0MsYUFBYSxrQkFBQTVCLE1BQUEsQ0FDSitCLEdBQUcsdUJBQUEvQixNQUFBLENBQWtCb0QsTUFBTSxDQUFDcEIsR0FBRyxDQUFDLEdBQUc3QixDQUFDLFNBQ3JELENBQ0Y7SUFDSCxDQUFDLE1BQU07TUFDTGdELEtBQUssQ0FBQ3JDLElBQUksQ0FDUmEsUUFBUSxDQUFDQyxhQUFhLGtCQUFBNUIsTUFBQSxDQUNKb0QsTUFBTSxDQUFDckIsR0FBRyxDQUFDLEdBQUc1QixDQUFDLHVCQUFBSCxNQUFBLENBQWtCZ0MsR0FBRyxTQUNyRCxDQUNGO0lBQ0g7RUFDRjtFQUNBLE9BQU9tQixLQUFLO0FBQ2QsQ0FBQztBQUVELElBQU1FLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBa0JBLENBQUlDLE9BQU8sRUFBRUMsT0FBTyxFQUFFQyxDQUFDLEVBQUs7RUFDbEQsSUFBTXpCLEdBQUcsR0FBR3lCLENBQUMsQ0FBQ0MsTUFBTSxDQUFDQyxZQUFZLENBQUMsVUFBVSxDQUFDO0VBQzdDLElBQU0xQixHQUFHLEdBQUd3QixDQUFDLENBQUNDLE1BQU0sQ0FBQ0MsWUFBWSxDQUFDLFVBQVUsQ0FBQztFQUM3QyxJQUFNQyxJQUFJLEdBQUdsQyxpREFBSSxDQUFDNkIsT0FBTyxDQUFDTSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztFQUN4QyxJQUFJTCxPQUFPLENBQUNNLGdCQUFnQixDQUFDOUIsR0FBRyxFQUFFQyxHQUFHLEVBQUUyQixJQUFJLENBQUMxRCxNQUFNLEVBQUUwRCxJQUFJLENBQUNHLFlBQVksRUFBRSxDQUFDLEVBQUU7SUFDeEViLGdCQUFnQixDQUFDbEIsR0FBRyxFQUFFQyxHQUFHLEVBQUUyQixJQUFJLENBQUMxRCxNQUFNLEVBQUUwRCxJQUFJLENBQUNHLFlBQVksRUFBRSxDQUFDLENBQUNDLE9BQU8sQ0FBQyxVQUFDQyxDQUFDO01BQUEsT0FDckVBLENBQUMsQ0FBQ0MsU0FBUyxDQUFDQyxHQUFHLENBQUMsV0FBVyxDQUFDO0lBQUEsRUFDN0I7RUFDSDtBQUNGLENBQUM7QUFFRCxJQUFNQyxVQUFVLEdBQUcsU0FBYkEsVUFBVUEsQ0FBQSxFQUFTO0VBQ3ZCeEMsUUFBUSxDQUNMeUMsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQzlCTCxPQUFPLENBQUMsVUFBQ00sQ0FBQztJQUFBLE9BQUtBLENBQUMsQ0FBQ0osU0FBUyxDQUFDSyxNQUFNLENBQUMsV0FBVyxDQUFDO0VBQUEsRUFBQztBQUNwRCxDQUFDO0FBRUQsSUFBTUMsU0FBUyxHQUFHLFNBQVpBLFNBQVNBLENBQUlqQixPQUFPLEVBQUVDLE9BQU8sRUFBRWhCLElBQUksRUFBRWlCLENBQUMsRUFBSztFQUMvQyxJQUFNekIsR0FBRyxHQUFHeUIsQ0FBQyxDQUFDQyxNQUFNLENBQUNDLFlBQVksQ0FBQyxVQUFVLENBQUM7RUFDN0MsSUFBTTFCLEdBQUcsR0FBR3dCLENBQUMsQ0FBQ0MsTUFBTSxDQUFDQyxZQUFZLENBQUMsVUFBVSxDQUFDO0VBQzdDLElBQU1DLElBQUksR0FBR2xDLGlEQUFJLENBQUM2QixPQUFPLENBQUNNLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0VBQ3hDLElBQUlMLE9BQU8sQ0FBQ2dCLFNBQVMsQ0FBQ3hDLEdBQUcsRUFBRUMsR0FBRyxFQUFFMkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7SUFDNUNMLE9BQU8sQ0FBQ00sUUFBUSxFQUFFLENBQUNZLEtBQUssRUFBRTtJQUMxQnRDLFdBQVcsQ0FDVFAsUUFBUSxDQUFDQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsRUFDekMyQixPQUFPLEVBQ1BELE9BQU8sRUFDUCxLQUFLLEVBQ0xmLElBQUksQ0FDTDtJQUNELElBQUllLE9BQU8sQ0FBQ00sUUFBUSxFQUFFLENBQUMzRCxNQUFNLEtBQUssQ0FBQyxFQUFFO01BQ25DeUIsa0JBQWtCLEVBQUU7TUFDcEJhLElBQUksQ0FBQ2tDLFFBQVEsQ0FBQ2xDLElBQUksQ0FBQztJQUNyQjtFQUNGO0FBQ0YsQ0FBQztBQUVELElBQU1TLFVBQVUsR0FBRyxTQUFiQSxVQUFVQSxDQUFJWCxNQUFNLEVBQUVLLEtBQUssRUFBRUosU0FBUyxFQUFFQyxJQUFJLEVBQUs7RUFDckQsSUFBSSxDQUFDRCxTQUFTLEVBQUU7SUFDZCxJQUFNRSxHQUFHLEdBQUdiLFFBQVEsQ0FBQ3lDLGdCQUFnQixDQUFDLHVCQUF1QixDQUFDO0lBQzlENUIsR0FBRyxDQUFDdUIsT0FBTyxDQUFDLFVBQUNNLENBQUM7TUFBQSxPQUNaQSxDQUFDLENBQUNLLGdCQUFnQixDQUNoQixZQUFZLEVBQ1pyQixrQkFBa0IsQ0FBQ3NCLElBQUksQ0FBQyxJQUFJLEVBQUV0QyxNQUFNLEVBQUVLLEtBQUssQ0FBQyxDQUM3QztJQUFBLEVBQ0Y7SUFDREYsR0FBRyxDQUFDdUIsT0FBTyxDQUFDLFVBQUNNLENBQUM7TUFBQSxPQUFLQSxDQUFDLENBQUNLLGdCQUFnQixDQUFDLFlBQVksRUFBRVAsVUFBVSxDQUFDO0lBQUEsRUFBQztJQUNoRTNCLEdBQUcsQ0FBQ3VCLE9BQU8sQ0FBQyxVQUFDTSxDQUFDO01BQUEsT0FDWkEsQ0FBQyxDQUFDSyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUVILFNBQVMsQ0FBQ0ksSUFBSSxDQUFDLElBQUksRUFBRXRDLE1BQU0sRUFBRUssS0FBSyxFQUFFSCxJQUFJLENBQUMsQ0FBQztJQUFBLEVBQ3ZFO0VBQ0gsQ0FBQyxNQUFNO0lBQ0wsSUFBTXFDLEVBQUUsR0FBR2pELFFBQVEsQ0FBQ3lDLGdCQUFnQixDQUFDLHNCQUFzQixDQUFDO0lBQzVEUSxFQUFFLENBQUNiLE9BQU8sQ0FBQyxVQUFDTSxDQUFDO01BQUEsT0FDWEEsQ0FBQyxDQUFDSyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQ2xCLENBQUMsRUFBSztRQUNqQyxJQUFNekIsR0FBRyxHQUFHeUIsQ0FBQyxDQUFDQyxNQUFNLENBQUNDLFlBQVksQ0FBQyxVQUFVLENBQUM7UUFDN0MsSUFBTTFCLEdBQUcsR0FBR3dCLENBQUMsQ0FBQ0MsTUFBTSxDQUFDQyxZQUFZLENBQUMsVUFBVSxDQUFDO1FBQzdDLElBQ0UsQ0FBQ0YsQ0FBQyxDQUFDQyxNQUFNLENBQUNRLFNBQVMsQ0FBQ1ksUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUNwQyxDQUFDckIsQ0FBQyxDQUFDQyxNQUFNLENBQUNRLFNBQVMsQ0FBQ1ksUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUNuQztVQUNBdEMsSUFBSSxDQUFDdUMsU0FBUyxDQUFDL0MsR0FBRyxFQUFFQyxHQUFHLEVBQUVPLElBQUksQ0FBQztRQUNoQztNQUNGLENBQUMsQ0FBQztJQUFBLEVBQ0g7RUFDSDtBQUNGLENBQUM7QUFFTSxJQUFNd0MsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFnQkEsQ0FBSUMsT0FBTyxFQUFFekMsSUFBSSxFQUFLO0VBQ2pELElBQU0wQyxTQUFTLEdBQUd0RCxRQUFRLENBQUNDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztFQUM5RHFELFNBQVMsQ0FBQ2hCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFNBQVMsQ0FBQztFQUNsQyxJQUFNZ0IsR0FBRyxHQUFHdkQsUUFBUSxDQUFDYyxhQUFhLENBQUMsR0FBRyxDQUFDO0VBQ3ZDeUMsR0FBRyxDQUFDckQsV0FBVyxHQUFHbUQsT0FBTztFQUN6QkUsR0FBRyxDQUFDakIsU0FBUyxDQUFDQyxHQUFHLENBQUMsYUFBYSxDQUFDO0VBQ2hDLElBQU1pQixHQUFHLEdBQUd4RCxRQUFRLENBQUNjLGFBQWEsQ0FBQyxRQUFRLENBQUM7RUFDNUMwQyxHQUFHLENBQUNsQixTQUFTLENBQUNDLEdBQUcsQ0FBQyxTQUFTLENBQUM7RUFDNUJpQixHQUFHLENBQUN0RCxXQUFXLEdBQUcsWUFBWTtFQUM5QnNELEdBQUcsQ0FBQ1QsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO0lBQUEsT0FBTW5DLElBQUksQ0FBQzZDLE9BQU8sRUFBRTtFQUFBLEVBQUM7RUFDbkRILFNBQVMsQ0FBQ0ksTUFBTSxDQUFDSCxHQUFHLEVBQUVDLEdBQUcsQ0FBQztBQUM1QixDQUFDO0FBRU0sSUFBTUcsV0FBVyxHQUFHLFNBQWRBLFdBQVdBLENBQUEsRUFBUztFQUMvQjNELFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUNDLFdBQVcsR0FBRyxFQUFFO0VBQzFERixRQUFRLENBQUNDLGFBQWEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDQyxXQUFXLEdBQUcsRUFBRTtFQUN6REYsUUFBUSxDQUFDQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQ0MsV0FBVyxHQUFHLEVBQUU7RUFDekRGLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUNDLFdBQVcsR0FBRyxFQUFFO0VBQzdERixRQUFRLENBQUNDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDcUMsU0FBUyxDQUFDSyxNQUFNLENBQUMsU0FBUyxDQUFDO0FBQzFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUlrRTtBQUMvQjtBQUNOO0FBRTlCLElBQU1tQixJQUFJLEdBQUcsU0FBUEEsSUFBSUEsQ0FBQSxFQUFTO0VBQ2pCLElBQUluQyxPQUFPO0VBQ1gsSUFBSW9DLEdBQUc7RUFDUCxJQUFJbkMsT0FBTztFQUNYLElBQUlvQyxRQUFRO0VBRVosSUFBTUMsVUFBVSxHQUFHLFNBQWJBLFVBQVVBLENBQUE7SUFBQSxPQUFTdEMsT0FBTztFQUFBO0VBQ2hDLElBQU11QyxVQUFVLEdBQUcsU0FBYkEsVUFBVUEsQ0FBQTtJQUFBLE9BQVNILEdBQUc7RUFBQTtFQUM1QixJQUFNSSxVQUFVLEdBQUcsU0FBYkEsVUFBVUEsQ0FBQTtJQUFBLE9BQVN2QyxPQUFPO0VBQUE7RUFDaEMsSUFBTXdDLFVBQVUsR0FBRyxTQUFiQSxVQUFVQSxDQUFBO0lBQUEsT0FBU0osUUFBUTtFQUFBO0VBRWpDLElBQU1LLFFBQVEsR0FBRyxTQUFYQSxRQUFRQSxDQUFBLEVBQVM7SUFDckIxQyxPQUFPLEdBQUdrQyxtREFBTSxFQUFFO0lBQ2xCbEMsT0FBTyxDQUFDMkMsT0FBTyxFQUFFO0lBQ2pCUCxHQUFHLEdBQUdGLG1EQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3hCakMsT0FBTyxHQUFHZ0Msc0RBQVMsRUFBRTtJQUNyQkksUUFBUSxHQUFHSixzREFBUyxFQUFFO0lBQ3RCSSxRQUFRLENBQUNPLGVBQWUsQ0FBQ1IsR0FBRyxDQUFDO0VBQy9CLENBQUM7RUFFRCxJQUFNUyxVQUFVLEdBQUcsU0FBYkEsVUFBVUEsQ0FBQTtJQUFBLE9BQVM1QyxPQUFPLENBQUM2QyxhQUFhLEVBQUUsSUFBSVQsUUFBUSxDQUFDUyxhQUFhLEVBQUU7RUFBQTtFQUU1RSxJQUFNM0IsUUFBUSxHQUFHLFNBQVhBLFFBQVFBLENBQUlsQyxJQUFJLEVBQUs7SUFDekJMLGlEQUFXLENBQ1RQLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGdCQUFnQixDQUFDLEVBQ3hDMkIsT0FBTyxFQUNQRCxPQUFPLEVBQ1AsSUFBSSxFQUNKZixJQUFJLENBQ0w7SUFDREwsaURBQVcsQ0FDVFAsUUFBUSxDQUFDQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsRUFDeEMrRCxRQUFRLEVBQ1JELEdBQUcsRUFDSCxJQUFJLEVBQ0puRCxJQUFJLENBQ0w7RUFDSCxDQUFDO0VBRUQsSUFBTXVDLFNBQVMsR0FBRyxTQUFaQSxTQUFTQSxDQUFJL0MsR0FBRyxFQUFFQyxHQUFHLEVBQUVPLElBQUksRUFBSztJQUNwQ29ELFFBQVEsQ0FBQ1UsYUFBYSxDQUFDdEUsR0FBRyxFQUFFQyxHQUFHLENBQUM7SUFDaEN5QyxRQUFRLENBQUNsQyxJQUFJLENBQUM7SUFDZCxJQUFJNEQsVUFBVSxFQUFFLEVBQUU7TUFDaEJwQixzREFBZ0IsQ0FBQyxTQUFTLEVBQUV4QyxJQUFJLENBQUM7TUFDakM7SUFDRjtJQUNBbUQsR0FBRyxDQUFDWSxVQUFVLENBQUMvQyxPQUFPLENBQUM7SUFDdkJrQixRQUFRLENBQUNsQyxJQUFJLENBQUM7SUFDZCxJQUFJNEQsVUFBVSxFQUFFLEVBQUU7TUFDaEJwQixzREFBZ0IsQ0FBQyxjQUFjLEVBQUV4QyxJQUFJLENBQUM7SUFDeEM7RUFDRixDQUFDO0VBRUQsU0FBUzZDLE9BQU9BLENBQUEsRUFBRztJQUNqQkUsaURBQVcsRUFBRTtJQUNiVSxRQUFRLEVBQUU7SUFDVjlELGlEQUFXLENBQ1RQLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGlCQUFpQixDQUFDLEVBQ3pDa0UsVUFBVSxFQUFFLEVBQ1pGLFVBQVUsRUFBRSxFQUNaLEtBQUssRUFDTCxJQUFJLENBQ0w7RUFDSDtFQUFDO0VBRUQsT0FBTztJQUNMRSxVQUFVLEVBQVZBLFVBQVU7SUFDVkMsVUFBVSxFQUFWQSxVQUFVO0lBQ1ZILFVBQVUsRUFBVkEsVUFBVTtJQUNWQyxVQUFVLEVBQVZBLFVBQVU7SUFDVkcsUUFBUSxFQUFSQSxRQUFRO0lBQ1JHLFVBQVUsRUFBVkEsVUFBVTtJQUNWMUIsUUFBUSxFQUFSQSxRQUFRO0lBQ1JLLFNBQVMsRUFBVEEsU0FBUztJQUNUTSxPQUFPLEVBQVBBO0VBQ0YsQ0FBQztBQUNILENBQUM7QUFFRCxpRUFBZUssSUFBSTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGa0M7QUFDM0I7QUFFMUIsSUFBTUYsU0FBUyxHQUFHLFNBQVpBLFNBQVNBLENBQUEsRUFBUztFQUN0QixJQUFNN0MsS0FBSyxHQUFHOEQsS0FBSyxDQUFDaEYsaURBQVksQ0FBQyxDQUM5QmlGLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDVjdHLEdBQUcsQ0FBQztJQUFBLE9BQU00RyxLQUFLLENBQUNoRixpREFBWSxDQUFDLENBQUNpRixJQUFJLENBQUMsSUFBSSxDQUFDO0VBQUEsRUFBQztFQUU1QyxJQUFNQyxRQUFRLEdBQUcsRUFBRTtFQUVuQixJQUFNQyxXQUFXLEdBQUcsU0FBZEEsV0FBV0EsQ0FBQTtJQUFBLE9BQVNELFFBQVE7RUFBQTtFQUNsQyxJQUFNL0QsUUFBUSxHQUFHLFNBQVhBLFFBQVFBLENBQUE7SUFBQSxPQUFTRCxLQUFLO0VBQUE7RUFFNUIsSUFBTW1CLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBZ0JBLENBQUk5QixHQUFHLEVBQUVDLEdBQUcsRUFBRS9CLE1BQU0sRUFBRWlELFNBQVMsRUFBSztJQUN4RCxJQUFJQSxTQUFTLEVBQUU7TUFDYixPQUFPRSxNQUFNLENBQUNwQixHQUFHLENBQUMsR0FBR29CLE1BQU0sQ0FBQ25ELE1BQU0sQ0FBQyxJQUFJdUIsaURBQVk7SUFDckQ7SUFDQSxPQUFPNEIsTUFBTSxDQUFDckIsR0FBRyxDQUFDLEdBQUdxQixNQUFNLENBQUNuRCxNQUFNLENBQUMsR0FBR3VCLGlEQUFZO0VBQ3BELENBQUM7RUFFRCxJQUFNb0YsYUFBYSxHQUFHLFNBQWhCQSxhQUFhQSxDQUFJN0UsR0FBRyxFQUFFQyxHQUFHLEVBQUUvQixNQUFNLEVBQUVpRCxTQUFTLEVBQUs7SUFDckQsSUFBSUEsU0FBUyxFQUFFO01BQ2IsS0FBSyxJQUFJL0MsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHRixNQUFNLEVBQUVFLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDbEMsSUFBSXVDLEtBQUssQ0FBQ1UsTUFBTSxDQUFDckIsR0FBRyxDQUFDLENBQUMsQ0FBQ3FCLE1BQU0sQ0FBQ3BCLEdBQUcsQ0FBQyxHQUFHN0IsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFO1VBQy9DLE9BQU8sQ0FBQztRQUNWO01BQ0Y7SUFDRixDQUFDLE1BQU07TUFDTCxLQUFLLElBQUlBLEVBQUMsR0FBRyxDQUFDLEVBQUVBLEVBQUMsR0FBR0YsTUFBTSxFQUFFRSxFQUFDLElBQUksQ0FBQyxFQUFFO1FBQ2xDLElBQUl1QyxLQUFLLENBQUNVLE1BQU0sQ0FBQ3JCLEdBQUcsQ0FBQyxHQUFHNUIsRUFBQyxDQUFDLENBQUNpRCxNQUFNLENBQUNwQixHQUFHLENBQUMsQ0FBQyxJQUFJLElBQUksRUFBRTtVQUMvQyxPQUFPLENBQUM7UUFDVjtNQUNGO0lBQ0Y7SUFDQSxPQUFPLENBQUM7RUFDVixDQUFDO0VBRUQsSUFBTXVDLFNBQVMsR0FBRyxTQUFaQSxTQUFTQSxDQUFJeEMsR0FBRyxFQUFFQyxHQUFHLEVBQUUyQixJQUFJLEVBQUs7SUFDcEMsSUFBSSxDQUFDRSxnQkFBZ0IsQ0FBQzlCLEdBQUcsRUFBRUMsR0FBRyxFQUFFMkIsSUFBSSxDQUFDMUQsTUFBTSxFQUFFMEQsSUFBSSxDQUFDRyxZQUFZLEVBQUUsQ0FBQyxFQUMvRCxPQUFPLENBQUMsQ0FBQztJQUNYLElBQUk4QyxhQUFhLENBQUM3RSxHQUFHLEVBQUVDLEdBQUcsRUFBRTJCLElBQUksQ0FBQzFELE1BQU0sRUFBRTBELElBQUksQ0FBQ0csWUFBWSxFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN4RSxJQUFJSCxJQUFJLENBQUNHLFlBQVksRUFBRSxFQUFFO01BQ3ZCLEtBQUssSUFBSTNELENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR3dELElBQUksQ0FBQzFELE1BQU0sRUFBRUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN2Q3VDLEtBQUssQ0FBQ1UsTUFBTSxDQUFDckIsR0FBRyxDQUFDLENBQUMsQ0FBQ3FCLE1BQU0sQ0FBQ3BCLEdBQUcsQ0FBQyxHQUFHN0IsQ0FBQyxDQUFDLEdBQUd3RCxJQUFJO01BQzVDO0lBQ0YsQ0FBQyxNQUFNO01BQ0wsS0FBSyxJQUFJeEQsR0FBQyxHQUFHLENBQUMsRUFBRUEsR0FBQyxHQUFHd0QsSUFBSSxDQUFDMUQsTUFBTSxFQUFFRSxHQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3ZDdUMsS0FBSyxDQUFDVSxNQUFNLENBQUNyQixHQUFHLENBQUMsR0FBRzVCLEdBQUMsQ0FBQyxDQUFDaUQsTUFBTSxDQUFDcEIsR0FBRyxDQUFDLENBQUMsR0FBRzJCLElBQUk7TUFDNUM7SUFDRjtJQUNBK0MsUUFBUSxDQUFDNUYsSUFBSSxDQUFDO01BQUU2QyxJQUFJLEVBQUpBLElBQUk7TUFBRTVCLEdBQUcsRUFBSEEsR0FBRztNQUFFQyxHQUFHLEVBQUhBO0lBQUksQ0FBQyxDQUFDO0lBQ2pDLE9BQU8sQ0FBQztFQUNWLENBQUM7RUFFRCxJQUFNcUUsYUFBYSxHQUFHLFNBQWhCQSxhQUFhQSxDQUFJdEUsR0FBRyxFQUFFQyxHQUFHLEVBQUs7SUFDbEMsSUFBSW9CLE1BQU0sQ0FBQ3JCLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSXFCLE1BQU0sQ0FBQ3JCLEdBQUcsQ0FBQyxJQUFJUCxpREFBWSxJQUFJNEIsTUFBTSxDQUFDcEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJb0IsTUFBTSxDQUFDcEIsR0FBRyxDQUFDLElBQUlSLGlEQUFZLEVBQ2xHLE9BQU8sQ0FBQyxDQUFDO0lBQ1gsSUFBSWtCLEtBQUssQ0FBQ1UsTUFBTSxDQUFDckIsR0FBRyxDQUFDLENBQUMsQ0FBQ3FCLE1BQU0sQ0FBQ3BCLEdBQUcsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO01BQzVDVSxLQUFLLENBQUNVLE1BQU0sQ0FBQ3JCLEdBQUcsQ0FBQyxDQUFDLENBQUNxQixNQUFNLENBQUNwQixHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU07TUFDeEMsT0FBTyxDQUFDO0lBQ1Y7SUFDQSxJQUFJVSxLQUFLLENBQUNVLE1BQU0sQ0FBQ3JCLEdBQUcsQ0FBQyxDQUFDLENBQUNxQixNQUFNLENBQUNwQixHQUFHLENBQUMsQ0FBQyxLQUFLLE1BQU0sSUFBSVUsS0FBSyxDQUFDVSxNQUFNLENBQUNyQixHQUFHLENBQUMsQ0FBQyxDQUFDcUIsTUFBTSxDQUFDcEIsR0FBRyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdEdVLEtBQUssQ0FBQ1UsTUFBTSxDQUFDckIsR0FBRyxDQUFDLENBQUMsQ0FBQ3FCLE1BQU0sQ0FBQ3BCLEdBQUcsQ0FBQyxDQUFDLENBQUM2RSxHQUFHLEVBQUU7SUFDckNuRSxLQUFLLENBQUNVLE1BQU0sQ0FBQ3JCLEdBQUcsQ0FBQyxDQUFDLENBQUNxQixNQUFNLENBQUNwQixHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUs7SUFDdkMsT0FBTyxDQUFDO0VBQ1YsQ0FBQztFQUVELElBQU1vRSxhQUFhLEdBQUcsU0FBaEJBLGFBQWFBLENBQUEsRUFBUztJQUMxQjtJQUNBLFNBQUFVLEdBQUEsTUFBQUMsU0FBQSxHQUFnQkwsUUFBUSxFQUFBSSxHQUFBLEdBQUFDLFNBQUEsQ0FBQTlHLE1BQUEsRUFBQTZHLEdBQUEsSUFBRTtNQUFyQixJQUFNRSxDQUFDLEdBQUFELFNBQUEsQ0FBQUQsR0FBQTtNQUNWLElBQUksQ0FBQ0UsQ0FBQyxDQUFDckQsSUFBSSxDQUFDc0QsTUFBTSxFQUFFLEVBQUUsT0FBTyxLQUFLO0lBQ3BDO0lBQ0EsT0FBTyxJQUFJO0VBQ2IsQ0FBQztFQUVELElBQU1mLGVBQWUsR0FBRyxTQUFsQkEsZUFBZUEsQ0FBSTdELE1BQU0sRUFBSztJQUNsQyxJQUFBNkUsWUFBQSxHQUFpQlgsb0RBQVcsRUFBRTtNQUFBWSxhQUFBLEdBQUFDLGNBQUEsQ0FBQUYsWUFBQTtNQUF6Qm5GLEdBQUcsR0FBQW9GLGFBQUE7TUFBRW5GLEdBQUcsR0FBQW1GLGFBQUE7SUFDYixPQUFPOUUsTUFBTSxDQUFDdUIsUUFBUSxFQUFFLENBQUMzRCxNQUFNLEtBQUssQ0FBQyxFQUFFO01BQ3JDLElBQU0wRCxJQUFJLEdBQUdsQyxpREFBSSxDQUFDWSxNQUFNLENBQUN1QixRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUN2QyxJQUFJVyxTQUFTLENBQUN4QyxHQUFHLEVBQUVDLEdBQUcsRUFBRTJCLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUNuQ3RCLE1BQU0sQ0FBQ3VCLFFBQVEsRUFBRSxDQUFDWSxLQUFLLEVBQUU7TUFDM0I7TUFBQyxJQUFBNkMsYUFBQSxHQUNZZCxvREFBVyxFQUFFO01BQUEsSUFBQWUsYUFBQSxHQUFBRixjQUFBLENBQUFDLGFBQUE7TUFBekJ0RixHQUFHLEdBQUF1RixhQUFBO01BQUV0RixHQUFHLEdBQUFzRixhQUFBO0lBQ1g7RUFDRixDQUFDO0VBRUQsT0FBTztJQUNMWCxXQUFXLEVBQVhBLFdBQVc7SUFDWGhFLFFBQVEsRUFBUkEsUUFBUTtJQUNSa0IsZ0JBQWdCLEVBQWhCQSxnQkFBZ0I7SUFDaEJVLFNBQVMsRUFBVEEsU0FBUztJQUNUOEIsYUFBYSxFQUFiQSxhQUFhO0lBQ2JELGFBQWEsRUFBYkEsYUFBYTtJQUNiRixlQUFlLEVBQWZBO0VBQ0YsQ0FBQztBQUNILENBQUM7QUFFRCxpRUFBZVgsU0FBUzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqR2pCLElBQU1nQyxXQUFXLEdBQUc7RUFDekJDLE9BQU8sRUFBRSxDQUFDO0VBQ1ZDLFVBQVUsRUFBRSxDQUFDO0VBQ2JDLFNBQVMsRUFBRSxDQUFDO0VBQ1pDLFNBQVMsRUFBRSxDQUFDO0VBQ1pDLFVBQVUsRUFBRTtBQUNkLENBQUM7QUFFTSxJQUFNcEcsWUFBWSxHQUFHLEVBQUU7QUFFdkIsSUFBTStFLFdBQVcsR0FBRyxTQUFkQSxXQUFXQSxDQUFBLEVBQVM7RUFDL0IsSUFBTXhFLEdBQUcsR0FBRzhGLElBQUksQ0FBQ0MsS0FBSyxDQUFDRCxJQUFJLENBQUNFLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQztFQUMxQyxJQUFNL0YsR0FBRyxHQUFHNkYsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDO0VBQzFDLE9BQU8sQ0FBQ2hHLEdBQUcsRUFBRUMsR0FBRyxDQUFDO0FBQ25CLENBQUM7QUFFTSxJQUFNZ0csU0FBUyxHQUFHLENBQ3ZCLFNBQVMsRUFDVCxZQUFZLEVBQ1osV0FBVyxFQUNYLFdBQVcsRUFDWCxZQUFZLENBQ2I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0QmlEO0FBRWxELElBQU14QyxNQUFNLEdBQUcsU0FBVEEsTUFBTUEsQ0FBQSxFQUFxQjtFQUFBLElBQWpCNUUsRUFBRSxHQUFBcUgsU0FBQSxDQUFBaEksTUFBQSxRQUFBZ0ksU0FBQSxRQUFBeEgsU0FBQSxHQUFBd0gsU0FBQSxNQUFHLE9BQU87RUFDMUIsSUFBSUMsSUFBSSxHQUFHLEtBQUs7RUFDaEIsSUFBSUMsS0FBSyxHQUFBQyxrQkFBQSxDQUFPSiw4Q0FBUyxDQUFDO0VBQzFCLElBQU1LLFFBQVEsR0FBRyxTQUFYQSxRQUFRQSxDQUFBLEVBQVM7SUFDckJGLEtBQUssR0FBR0gsOENBQVM7RUFDbkIsQ0FBQztFQUNELElBQU1wRSxRQUFRLEdBQUcsU0FBWEEsUUFBUUEsQ0FBQTtJQUFBLE9BQVN1RSxLQUFLO0VBQUE7RUFDNUIsSUFBTWxDLE9BQU8sR0FBRyxTQUFWQSxPQUFPQSxDQUFBLEVBQVM7SUFDcEJpQyxJQUFJLEdBQUcsQ0FBQ0EsSUFBSTtFQUNkLENBQUM7RUFDRCxJQUFNSSxPQUFPLEdBQUcsU0FBVkEsT0FBT0EsQ0FBQTtJQUFBLE9BQVNKLElBQUk7RUFBQTtFQUMxQixJQUFNcEYsS0FBSyxHQUFHLFNBQVJBLEtBQUtBLENBQUE7SUFBQSxPQUFTbEMsRUFBRTtFQUFBO0VBQ3RCLElBQU0ySCxNQUFNLEdBQUcsU0FBVEEsTUFBTUEsQ0FBSXhHLEdBQUcsRUFBRUMsR0FBRyxFQUFFd0csVUFBVTtJQUFBLE9BQUtBLFVBQVUsQ0FBQ25DLGFBQWEsQ0FBQ3RFLEdBQUcsRUFBRUMsR0FBRyxDQUFDO0VBQUE7RUFFM0UsSUFBTXNFLFVBQVUsR0FBRyxTQUFiQSxVQUFVQSxDQUFJa0MsVUFBVSxFQUFLO0lBQ2pDLElBQUl6RyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBQ1osSUFBSUMsR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNaLE9BQU93RyxVQUFVLENBQUNuQyxhQUFhLENBQUN0RSxHQUFHLEVBQUVDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO01BQUEsSUFBQWtGLFlBQUEsR0FDbkNYLG9EQUFXLEVBQUU7TUFBQSxJQUFBWSxhQUFBLEdBQUFDLGNBQUEsQ0FBQUYsWUFBQTtNQUF6Qm5GLEdBQUcsR0FBQW9GLGFBQUE7TUFBRW5GLEdBQUcsR0FBQW1GLGFBQUE7SUFDWDtFQUNGLENBQUM7RUFFRCxPQUFPO0lBQ0xrQixRQUFRLEVBQVJBLFFBQVE7SUFDUnpFLFFBQVEsRUFBUkEsUUFBUTtJQUNSMEUsT0FBTyxFQUFQQSxPQUFPO0lBQ1ByQyxPQUFPLEVBQVBBLE9BQU87SUFDUG5ELEtBQUssRUFBTEEsS0FBSztJQUNMeUYsTUFBTSxFQUFOQSxNQUFNO0lBQ05qQyxVQUFVLEVBQVZBO0VBQ0YsQ0FBQztBQUNILENBQUM7QUFFRCxpRUFBZWQsTUFBTTs7Ozs7Ozs7Ozs7Ozs7O0FDbkNrQjtBQUV2QyxJQUFNL0QsSUFBSSxHQUFHLFNBQVBBLElBQUlBLENBQUlnSCxJQUFJLEVBQUs7RUFDckIsSUFBTTdILEVBQUUsR0FBRzZILElBQUk7RUFDZixJQUFNeEksTUFBTSxHQUFHc0gsZ0RBQVcsQ0FBQ2tCLElBQUksQ0FBQztFQUNoQyxJQUFJQyxJQUFJLEdBQUcsQ0FBQzs7RUFFWjtFQUNBLElBQUl4RixTQUFTLEdBQUcsQ0FBQztFQUVqQixJQUFNWSxZQUFZLEdBQUcsU0FBZkEsWUFBWUEsQ0FBQTtJQUFBLE9BQVNaLFNBQVM7RUFBQTtFQUNwQyxJQUFNeUYsWUFBWSxHQUFHLFNBQWZBLFlBQVlBLENBQUEsRUFBUztJQUN6QnpGLFNBQVMsR0FBR0UsTUFBTSxDQUFDLENBQUNGLFNBQVMsQ0FBQztFQUNoQyxDQUFDO0VBRUQsSUFBTTJELEdBQUcsR0FBRyxTQUFOQSxHQUFHQSxDQUFBLEVBQVM7SUFDaEI2QixJQUFJLElBQUksQ0FBQztFQUNYLENBQUM7RUFFRCxJQUFNekIsTUFBTSxHQUFHLFNBQVRBLE1BQU1BLENBQUE7SUFBQSxPQUFTaEgsTUFBTSxJQUFJeUksSUFBSTtFQUFBO0VBRW5DLE9BQU87SUFDTDlILEVBQUUsRUFBRkEsRUFBRTtJQUNGWCxNQUFNLEVBQU5BLE1BQU07SUFDTjZELFlBQVksRUFBWkEsWUFBWTtJQUNaNkUsWUFBWSxFQUFaQSxZQUFZO0lBQ1o5QixHQUFHLEVBQUhBLEdBQUc7SUFDSEksTUFBTSxFQUFOQTtFQUNGLENBQUM7QUFDSCxDQUFDO0FBRUQsaUVBQWV4RixJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvQm5CO0FBQzZHO0FBQ2pCO0FBQzVGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQSxpREFBaUQscUJBQXFCLDBCQUEwQixnQ0FBZ0MsZ0NBQWdDLGdDQUFnQyw2QkFBNkIsZ0NBQWdDLCtCQUErQiwrQkFBK0IsZ0NBQWdDLDBCQUEwQix5QkFBeUIsd0NBQXdDLEdBQUcsOEJBQThCLGNBQWMsZUFBZSwyQkFBMkIsR0FBRyxVQUFVLDhDQUE4QyxHQUFHLFFBQVEscUJBQXFCLHVCQUF1QixHQUFHLHlFQUF5RSxrQkFBa0Isd0JBQXdCLHVCQUF1Qiw0QkFBNEIsb0JBQW9CLHFCQUFxQixtQkFBbUIsR0FBRyxnQkFBZ0Isa0JBQWtCLGtDQUFrQyxHQUFHLFdBQVcsd0NBQXdDLGdCQUFnQixpQkFBaUIsd0JBQXdCLDhCQUE4QixvQkFBb0IsR0FBRyxpQkFBaUIsOENBQThDLEdBQUcscUJBQXFCLDhDQUE4QyxHQUFHLDZCQUE2QiwyQ0FBMkMsR0FBRyxnQ0FBZ0MsOENBQThDLEdBQUcsK0JBQStCLDZDQUE2QyxHQUFHLCtCQUErQiw2Q0FBNkMsR0FBRyxnQ0FBZ0MsOENBQThDLEdBQUcsMEJBQTBCLHdDQUF3QyxHQUFHLHlCQUF5Qix1Q0FBdUMsR0FBRyxnQ0FBZ0MsdUJBQXVCLFdBQVcsWUFBWSxhQUFhLGNBQWMsMkNBQTJDLGtCQUFrQiwyQkFBMkIsNEJBQTRCLHdCQUF3QixHQUFHLGtCQUFrQixvQkFBb0Isd0JBQXdCLGdCQUFnQix3QkFBd0IsR0FBRyxjQUFjLGlCQUFpQixvQkFBb0Isa0JBQWtCLG9CQUFvQixHQUFHLFNBQVMsd0ZBQXdGLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxPQUFPLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxPQUFPLFVBQVUsWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsWUFBWSxhQUFhLFdBQVcsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFVBQVUsaUNBQWlDLHFCQUFxQiwwQkFBMEIsZ0NBQWdDLGdDQUFnQyxnQ0FBZ0MsNkJBQTZCLGdDQUFnQywrQkFBK0IsK0JBQStCLGdDQUFnQywwQkFBMEIseUJBQXlCLHdDQUF3QyxHQUFHLDhCQUE4QixjQUFjLGVBQWUsMkJBQTJCLEdBQUcsVUFBVSw4Q0FBOEMsR0FBRyxRQUFRLHFCQUFxQix1QkFBdUIsR0FBRyx5RUFBeUUsa0JBQWtCLHdCQUF3Qix1QkFBdUIsNEJBQTRCLG9CQUFvQixxQkFBcUIsbUJBQW1CLEdBQUcsZ0JBQWdCLGtCQUFrQixrQ0FBa0MsR0FBRyxXQUFXLHdDQUF3QyxnQkFBZ0IsaUJBQWlCLHdCQUF3Qiw4QkFBOEIsb0JBQW9CLEdBQUcsaUJBQWlCLDhDQUE4QyxHQUFHLHFCQUFxQiw4Q0FBOEMsR0FBRyw2QkFBNkIsMkNBQTJDLEdBQUcsZ0NBQWdDLDhDQUE4QyxHQUFHLCtCQUErQiw2Q0FBNkMsR0FBRywrQkFBK0IsNkNBQTZDLEdBQUcsZ0NBQWdDLDhDQUE4QyxHQUFHLDBCQUEwQix3Q0FBd0MsR0FBRyx5QkFBeUIsdUNBQXVDLEdBQUcsZ0NBQWdDLHVCQUF1QixXQUFXLFlBQVksYUFBYSxjQUFjLDJDQUEyQyxrQkFBa0IsMkJBQTJCLDRCQUE0Qix3QkFBd0IsR0FBRyxrQkFBa0Isb0JBQW9CLHdCQUF3QixnQkFBZ0Isd0JBQXdCLEdBQUcsY0FBYyxpQkFBaUIsb0JBQW9CLGtCQUFrQixvQkFBb0IsR0FBRyxxQkFBcUI7QUFDajJLO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTnZDLE1BQWtHO0FBQ2xHLE1BQXdGO0FBQ3hGLE1BQStGO0FBQy9GLE1BQWtIO0FBQ2xILE1BQTJHO0FBQzNHLE1BQTJHO0FBQzNHLE1BQXVHO0FBQ3ZHO0FBQ0E7O0FBRUE7O0FBRUEsNEJBQTRCLHFHQUFtQjtBQUMvQyx3QkFBd0Isa0hBQWE7O0FBRXJDLHVCQUF1Qix1R0FBYTtBQUNwQztBQUNBLGlCQUFpQiwrRkFBTTtBQUN2Qiw2QkFBNkIsc0dBQWtCOztBQUUvQyxhQUFhLDBHQUFHLENBQUMsdUZBQU87Ozs7QUFJaUQ7QUFDekUsT0FBTyxpRUFBZSx1RkFBTyxJQUFJLDhGQUFjLEdBQUcsOEZBQWMsWUFBWSxFQUFDOzs7Ozs7Ozs7OztBQzFCaEU7O0FBRWI7O0FBRUE7QUFDQTs7QUFFQSxrQkFBa0Isd0JBQXdCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsb0JBQW9CLDRCQUE0QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxxQkFBcUIsNkJBQTZCO0FBQ2xEOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ3ZHYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzREFBc0Q7O0FBRXREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUN0Q2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNWYTs7QUFFYjtBQUNBO0FBQ0EsY0FBYyxLQUF3QyxHQUFHLHNCQUFpQixHQUFHLENBQUk7O0FBRWpGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDWGE7O0FBRWI7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0RBQWtEO0FBQ2xEOztBQUVBO0FBQ0EsMENBQTBDO0FBQzFDOztBQUVBOztBQUVBO0FBQ0EsaUZBQWlGO0FBQ2pGOztBQUVBOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsYUFBYTtBQUNiOztBQUVBOztBQUVBO0FBQ0EseURBQXlEO0FBQ3pELElBQUk7O0FBRUo7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ3JFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7VUNmQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7Ozs7QUNBNEM7QUFDVjtBQUNMO0FBRzdCLElBQU1jLElBQUksR0FBR2tELHlEQUFJLEVBQUU7QUFDbkJsRCxJQUFJLENBQUN5RCxRQUFRLEVBQUU7QUFFZjlELHlEQUFXLENBQUNQLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGlCQUFpQixDQUFDLEVBQUVXLElBQUksQ0FBQ3VELFVBQVUsRUFBRSxFQUFFdkQsSUFBSSxDQUFDcUQsVUFBVSxFQUFFLEVBQUUsS0FBSyxFQUFFckQsSUFBSSxDQUFDLEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUtLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUtLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1nYW1lLS8uL3NyYy9tb2R1bGVzL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUtLy4vc3JjL21vZHVsZXMvZ2FtZS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUtLy4vc3JjL21vZHVsZXMvZ2FtZUJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtZ2FtZS0vLi9zcmMvbW9kdWxlcy9oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1nYW1lLS8uL3NyYy9tb2R1bGVzL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUtLy4vc3JjL21vZHVsZXMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUtLy4vc3JjL3N0eWxlcy9nbG9iYWwuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAtZ2FtZS0vLi9zcmMvc3R5bGVzL2dsb2JhbC5jc3M/ZjBkOCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUtLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtZ2FtZS0vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtZ2FtZS0vLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1nYW1lLS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUtLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1nYW1lLS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAtZ2FtZS0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1nYW1lLS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUtL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLWdhbWUtL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC1nYW1lLS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAtZ2FtZS0vd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAtZ2FtZS0vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsImltcG9ydCB7IEJPQVJEX0xFTkdUSCB9IGZyb20gJy4vaGVscGVyJztcbmltcG9ydCBTaGlwIGZyb20gJy4vc2hpcCc7XG5cbmNvbnN0IGNsZWFyU3RhcnRpbmdCb2FyZCA9ICgpID0+IHtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0aW5nLmJvYXJkJykudGV4dENvbnRlbnQgPSAnJztcbn07XG5cbmV4cG9ydCBjb25zdCByZW5kZXJHcmlkID0gKHJvdywgY29sLCBzdGF0dXMpID0+XG4gIGA8ZGl2IGNsYXNzPVwiZ3JpZCAke3N0YXR1c31cIiBkYXRhLXJvdz1cIiR7cm93fVwiIGRhdGEtY29sPVwiJHtjb2x9XCI+PC9kaXY+YDtcblxuZXhwb3J0IGNvbnN0IHJlbmRlckJvYXJkID0gKG5vZGUsIGdhbWVCb2FyZCwgcGxheWVyLCBnYW1lU3RhcnQsIGdhbWUpID0+IHtcbiAgbm9kZS50ZXh0Q29udGVudCA9ICcnO1xuICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgY29uc3QgYm9hcmQgPSBnYW1lQm9hcmQuZ2V0Qm9hcmQoKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBCT0FSRF9MRU5HVEg7IGkgKz0gMSkge1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgQk9BUkRfTEVOR1RIOyBqICs9IDEpIHtcbiAgICAgIGNvbnN0IHN0YXR1cyA9IGJvYXJkW2ldW2pdO1xuICAgICAgaWYgKHN0YXR1cyA9PT0gbnVsbCB8fCBzdGF0dXMgPT09ICdoaXQnIHx8IHN0YXR1cyA9PT0gJ21pc3MnKSB7XG4gICAgICAgIGRpdi5pbm5lckhUTUwgKz0gcmVuZGVyR3JpZChpLCBqLCBzdGF0dXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHBsYXllci5nZXRJRCgpID09PSAnaHVtYW4nKSB7XG4gICAgICAgICAgZGl2LmlubmVySFRNTCArPSByZW5kZXJHcmlkKGksIGosIHN0YXR1cy5pZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGl2LmlubmVySFRNTCArPSByZW5kZXJHcmlkKGksIGosIG51bGwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIG5vZGUuYXBwZW5kQ2hpbGQoZGl2KTtcbiAgYmluZEV2ZW50cyhwbGF5ZXIsIGdhbWVCb2FyZCwgZ2FtZVN0YXJ0LCBnYW1lKTtcbn07XG5cbmNvbnN0IGdldEFkamFjZW50Q2VsbHMgPSAocm93LCBjb2wsIGxlbmd0aCwgZGlyZWN0aW9uKSA9PiB7XG4gIGNvbnN0IGNlbGxzID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAoZGlyZWN0aW9uKSB7XG4gICAgICBjZWxscy5wdXNoKFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGBbZGF0YS1yb3cgPSBcIiR7cm93fVwiXVtkYXRhLWNvbCA9IFwiJHtOdW1iZXIoY29sKSArIGl9XCJdYFxuICAgICAgICApXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBjZWxscy5wdXNoKFxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGBbZGF0YS1yb3cgPSBcIiR7TnVtYmVyKHJvdykgKyBpfVwiXVtkYXRhLWNvbCA9IFwiJHtjb2x9XCJdYFxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gY2VsbHM7XG59O1xuXG5jb25zdCByZW5kZXJTdGFydGluZ1NoaXAgPSAocGxheWVyMSwgcDFCb2FyZCwgZSkgPT4ge1xuICBjb25zdCByb3cgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcm93Jyk7XG4gIGNvbnN0IGNvbCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1jb2wnKTtcbiAgY29uc3Qgc2hpcCA9IFNoaXAocGxheWVyMS5nZXRGbGVldCgpWzBdKTtcbiAgaWYgKHAxQm9hcmQudmFsaWRDb29yZGluYXRlcyhyb3csIGNvbCwgc2hpcC5sZW5ndGgsIHNoaXAuZ2V0RGlyZWN0aW9uKCkpKSB7XG4gICAgZ2V0QWRqYWNlbnRDZWxscyhyb3csIGNvbCwgc2hpcC5sZW5ndGgsIHNoaXAuZ2V0RGlyZWN0aW9uKCkpLmZvckVhY2goKGMpID0+XG4gICAgICBjLmNsYXNzTGlzdC5hZGQoJ3Nob3ctc2hpcCcpXG4gICAgKTtcbiAgfVxufTtcblxuY29uc3QgcmVtb3ZlU2hpcCA9ICgpID0+IHtcbiAgZG9jdW1lbnRcbiAgICAucXVlcnlTZWxlY3RvckFsbCgnLnNob3ctc2hpcCcpXG4gICAgLmZvckVhY2goKGQpID0+IGQuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdy1zaGlwJykpO1xufTtcblxuY29uc3QgcGxhY2VTaGlwID0gKHBsYXllcjEsIHAxQm9hcmQsIGdhbWUsIGUpID0+IHtcbiAgY29uc3Qgcm93ID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXJvdycpO1xuICBjb25zdCBjb2wgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29sJyk7XG4gIGNvbnN0IHNoaXAgPSBTaGlwKHBsYXllcjEuZ2V0RmxlZXQoKVswXSk7XG4gIGlmIChwMUJvYXJkLnBsYWNlU2hpcChyb3csIGNvbCwgc2hpcCkgIT09IC0xKSB7XG4gICAgcGxheWVyMS5nZXRGbGVldCgpLnNoaWZ0KCk7XG4gICAgcmVuZGVyQm9hcmQoXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhcnRpbmcuYm9hcmQnKSxcbiAgICAgIHAxQm9hcmQsXG4gICAgICBwbGF5ZXIxLFxuICAgICAgZmFsc2UsXG4gICAgICBnYW1lXG4gICAgKTtcbiAgICBpZiAocGxheWVyMS5nZXRGbGVldCgpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY2xlYXJTdGFydGluZ0JvYXJkKCk7XG4gICAgICBnYW1lLmxvYWRHYW1lKGdhbWUpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgYmluZEV2ZW50cyA9IChwbGF5ZXIsIGJvYXJkLCBnYW1lU3RhcnQsIGdhbWUpID0+IHtcbiAgaWYgKCFnYW1lU3RhcnQpIHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3RhcnRpbmcuYm9hcmQgLmdyaWQnKTtcbiAgICBkaXYuZm9yRWFjaCgoZCkgPT5cbiAgICAgIGQuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgJ21vdXNlZW50ZXInLFxuICAgICAgICByZW5kZXJTdGFydGluZ1NoaXAuYmluZChudWxsLCBwbGF5ZXIsIGJvYXJkKVxuICAgICAgKVxuICAgICk7XG4gICAgZGl2LmZvckVhY2goKGQpID0+IGQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHJlbW92ZVNoaXApKTtcbiAgICBkaXYuZm9yRWFjaCgoZCkgPT5cbiAgICAgIGQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGFjZVNoaXAuYmluZChudWxsLCBwbGF5ZXIsIGJvYXJkLCBnYW1lKSlcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHAyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBsYXllcjIuYm9hcmQgLmdyaWQnKTtcbiAgICBwMi5mb3JFYWNoKChkKSA9PlxuICAgICAgZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvdyA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1yb3cnKTtcbiAgICAgICAgY29uc3QgY29sID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWNvbCcpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbWlzcycpICYmXG4gICAgICAgICAgIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnaGl0JylcbiAgICAgICAgKSB7XG4gICAgICAgICAgZ2FtZS5zdGFydEdhbWUocm93LCBjb2wsIGdhbWUpO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn07XG5cbmV4cG9ydCBjb25zdCByZW5kZXJNZXNzYWdlQm94ID0gKG1lc3NhZ2UsIGdhbWUpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lc3NhZ2UtY29udGFpbmVyJyk7XG4gIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdvdmVybGF5Jyk7XG4gIGNvbnN0IG1zZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgbXNnLnRleHRDb250ZW50ID0gbWVzc2FnZTtcbiAgbXNnLmNsYXNzTGlzdC5hZGQoJ21lc3NhZ2UtYm94Jyk7XG4gIGNvbnN0IGJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBidG4uY2xhc3NMaXN0LmFkZCgncmVtYXRjaCcpO1xuICBidG4udGV4dENvbnRlbnQgPSAnUGxheSBBZ2Fpbic7XG4gIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGdhbWUucmVzdGFydCgpKTtcbiAgY29udGFpbmVyLmFwcGVuZChtc2csIGJ0bik7XG59O1xuXG5leHBvcnQgY29uc3QgY2xlYXJTY3JlZW4gPSAoKSA9PiB7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydGluZy5ib2FyZCcpLnRleHRDb250ZW50ID0gJyc7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIxLmJvYXJkJykudGV4dENvbnRlbnQgPSAnJztcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcjIuYm9hcmQnKS50ZXh0Q29udGVudCA9ICcnO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZS1jb250YWluZXInKS50ZXh0Q29udGVudCA9ICcnO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVzc2FnZS1jb250YWluZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdvdmVybGF5Jyk7XG59O1xuIiwiaW1wb3J0IHsgY2xlYXJTY3JlZW4sIHJlbmRlckJvYXJkLCByZW5kZXJNZXNzYWdlQm94IH0gZnJvbSAnLi9kb20nO1xuaW1wb3J0IEdhbWVCb2FyZCBmcm9tICcuL2dhbWVCb2FyZCc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vcGxheWVyJztcblxuY29uc3QgR2FtZSA9ICgpID0+IHtcbiAgbGV0IHBsYXllcjE7XG4gIGxldCBjcHU7XG4gIGxldCBwMUJvYXJkO1xuICBsZXQgY3B1Qm9hcmQ7XG5cbiAgY29uc3QgZ2V0cGxheWVyMSA9ICgpID0+IHBsYXllcjE7XG4gIGNvbnN0IGdldHBsYXllcjIgPSAoKSA9PiBjcHU7XG4gIGNvbnN0IGdldFAxQm9hcmQgPSAoKSA9PiBwMUJvYXJkO1xuICBjb25zdCBnZXRQMkJvYXJkID0gKCkgPT4gY3B1Qm9hcmQ7XG5cbiAgY29uc3QgaW5pdEdhbWUgPSAoKSA9PiB7XG4gICAgcGxheWVyMSA9IFBsYXllcigpO1xuICAgIHBsYXllcjEuc2V0VHVybigpO1xuICAgIGNwdSA9IFBsYXllcignY29tcHV0ZXInKTtcbiAgICBwMUJvYXJkID0gR2FtZUJvYXJkKCk7XG4gICAgY3B1Qm9hcmQgPSBHYW1lQm9hcmQoKTtcbiAgICBjcHVCb2FyZC5yYW5kb21QbGFjZW1lbnQoY3B1KTtcbiAgfTtcblxuICBjb25zdCBpc0dhbWVPdmVyID0gKCkgPT4gcDFCb2FyZC5pc0FsbFNoaXBTdW5rKCkgfHwgY3B1Qm9hcmQuaXNBbGxTaGlwU3VuaygpO1xuXG4gIGNvbnN0IGxvYWRHYW1lID0gKGdhbWUpID0+IHtcbiAgICByZW5kZXJCb2FyZChcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIxLmJvYXJkJyksXG4gICAgICBwMUJvYXJkLFxuICAgICAgcGxheWVyMSxcbiAgICAgIHRydWUsXG4gICAgICBnYW1lXG4gICAgKTtcbiAgICByZW5kZXJCb2FyZChcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIyLmJvYXJkJyksXG4gICAgICBjcHVCb2FyZCxcbiAgICAgIGNwdSxcbiAgICAgIHRydWUsXG4gICAgICBnYW1lXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBzdGFydEdhbWUgPSAocm93LCBjb2wsIGdhbWUpID0+IHtcbiAgICBjcHVCb2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sKTtcbiAgICBsb2FkR2FtZShnYW1lKTtcbiAgICBpZiAoaXNHYW1lT3ZlcigpKSB7XG4gICAgICByZW5kZXJNZXNzYWdlQm94KCdZb3UgV29uJywgZ2FtZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNwdS5jb21wQXR0YWNrKHAxQm9hcmQpO1xuICAgIGxvYWRHYW1lKGdhbWUpO1xuICAgIGlmIChpc0dhbWVPdmVyKCkpIHtcbiAgICAgIHJlbmRlck1lc3NhZ2VCb3goJ0NvbXB1dGVyIFdvbicsIGdhbWUpO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiByZXN0YXJ0KCkge1xuICAgIGNsZWFyU2NyZWVuKCk7XG4gICAgaW5pdEdhbWUoKTtcbiAgICByZW5kZXJCb2FyZChcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydGluZy5ib2FyZCcpLFxuICAgICAgZ2V0UDFCb2FyZCgpLFxuICAgICAgZ2V0cGxheWVyMSgpLFxuICAgICAgZmFsc2UsXG4gICAgICB0aGlzXG4gICAgKTtcbiAgfTtcblxuICByZXR1cm4ge1xuICAgIGdldFAxQm9hcmQsXG4gICAgZ2V0UDJCb2FyZCxcbiAgICBnZXRwbGF5ZXIxLFxuICAgIGdldHBsYXllcjIsXG4gICAgaW5pdEdhbWUsXG4gICAgaXNHYW1lT3ZlcixcbiAgICBsb2FkR2FtZSxcbiAgICBzdGFydEdhbWUsXG4gICAgcmVzdGFydCxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdhbWU7XG4iLCJpbXBvcnQgeyBCT0FSRF9MRU5HVEgsIHJhbmRvbUNvb3JkIH0gZnJvbSAnLi9oZWxwZXInO1xuaW1wb3J0IFNoaXAgZnJvbSAnLi9zaGlwJztcblxuY29uc3QgR2FtZUJvYXJkID0gKCkgPT4ge1xuICBjb25zdCBib2FyZCA9IEFycmF5KEJPQVJEX0xFTkdUSClcbiAgICAuZmlsbChudWxsKVxuICAgIC5tYXAoKCkgPT4gQXJyYXkoQk9BUkRfTEVOR1RIKS5maWxsKG51bGwpKTtcblxuICBjb25zdCBzaGlwTGlzdCA9IFtdO1xuXG4gIGNvbnN0IGdldFNoaXBMaXN0ID0gKCkgPT4gc2hpcExpc3Q7XG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4gYm9hcmQ7XG5cbiAgY29uc3QgdmFsaWRDb29yZGluYXRlcyA9IChyb3csIGNvbCwgbGVuZ3RoLCBkaXJlY3Rpb24pID0+IHtcbiAgICBpZiAoZGlyZWN0aW9uKSB7XG4gICAgICByZXR1cm4gTnVtYmVyKGNvbCkgKyBOdW1iZXIobGVuZ3RoKSA8PSBCT0FSRF9MRU5HVEg7XG4gICAgfVxuICAgIHJldHVybiBOdW1iZXIocm93KSArIE51bWJlcihsZW5ndGgpIDwgQk9BUkRfTEVOR1RIO1xuICB9O1xuXG4gIGNvbnN0IGFscmVhZHlQbGFjZWQgPSAocm93LCBjb2wsIGxlbmd0aCwgZGlyZWN0aW9uKSA9PiB7XG4gICAgaWYgKGRpcmVjdGlvbikge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoYm9hcmRbTnVtYmVyKHJvdyldW051bWJlcihjb2wpICsgaV0gIT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKGJvYXJkW051bWJlcihyb3cpICsgaV1bTnVtYmVyKGNvbCldICE9IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfTtcblxuICBjb25zdCBwbGFjZVNoaXAgPSAocm93LCBjb2wsIHNoaXApID0+IHtcbiAgICBpZiAoIXZhbGlkQ29vcmRpbmF0ZXMocm93LCBjb2wsIHNoaXAubGVuZ3RoLCBzaGlwLmdldERpcmVjdGlvbigpKSlcbiAgICAgIHJldHVybiAtMTtcbiAgICBpZiAoYWxyZWFkeVBsYWNlZChyb3csIGNvbCwgc2hpcC5sZW5ndGgsIHNoaXAuZ2V0RGlyZWN0aW9uKCkpKSByZXR1cm4gLTE7XG4gICAgaWYgKHNoaXAuZ2V0RGlyZWN0aW9uKCkpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBib2FyZFtOdW1iZXIocm93KV1bTnVtYmVyKGNvbCkgKyBpXSA9IHNoaXA7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBib2FyZFtOdW1iZXIocm93KSArIGldW051bWJlcihjb2wpXSA9IHNoaXA7XG4gICAgICB9XG4gICAgfVxuICAgIHNoaXBMaXN0LnB1c2goeyBzaGlwLCByb3csIGNvbCB9KTtcbiAgICByZXR1cm4gMTtcbiAgfTtcblxuICBjb25zdCByZWNlaXZlQXR0YWNrID0gKHJvdywgY29sKSA9PiB7XG4gICAgaWYgKE51bWJlcihyb3cpIDwgMCB8fCBOdW1iZXIocm93KSA+PSBCT0FSRF9MRU5HVEggfHwgTnVtYmVyKGNvbCkgPCAwIHx8IE51bWJlcihjb2wpID49IEJPQVJEX0xFTkdUSClcbiAgICAgIHJldHVybiAtMTtcbiAgICBpZiAoYm9hcmRbTnVtYmVyKHJvdyldW051bWJlcihjb2wpXSA9PT0gbnVsbCkge1xuICAgICAgYm9hcmRbTnVtYmVyKHJvdyldW051bWJlcihjb2wpXSA9ICdtaXNzJztcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBpZiAoYm9hcmRbTnVtYmVyKHJvdyldW051bWJlcihjb2wpXSA9PT0gJ21pc3MnIHx8IGJvYXJkW051bWJlcihyb3cpXVtOdW1iZXIoY29sKV0gPT09ICdoaXQnKSByZXR1cm4gLTE7XG4gICAgYm9hcmRbTnVtYmVyKHJvdyldW051bWJlcihjb2wpXS5oaXQoKTtcbiAgICBib2FyZFtOdW1iZXIocm93KV1bTnVtYmVyKGNvbCldID0gJ2hpdCc7XG4gICAgcmV0dXJuIDE7XG4gIH07XG5cbiAgY29uc3QgaXNBbGxTaGlwU3VuayA9ICgpID0+IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgICBmb3IgKGNvbnN0IHMgb2Ygc2hpcExpc3QpIHtcbiAgICAgIGlmICghcy5zaGlwLmlzU3VuaygpKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIGNvbnN0IHJhbmRvbVBsYWNlbWVudCA9IChwbGF5ZXIpID0+IHtcbiAgICBsZXQgW3JvdywgY29sXSA9IHJhbmRvbUNvb3JkKCk7XG4gICAgd2hpbGUgKHBsYXllci5nZXRGbGVldCgpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgY29uc3Qgc2hpcCA9IFNoaXAocGxheWVyLmdldEZsZWV0KClbMF0pO1xuICAgICAgaWYgKHBsYWNlU2hpcChyb3csIGNvbCwgc2hpcCkgPT09IDEpIHtcbiAgICAgICAgcGxheWVyLmdldEZsZWV0KCkuc2hpZnQoKTtcbiAgICAgIH0gXG4gICAgICBbcm93LCBjb2xdID0gcmFuZG9tQ29vcmQoKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGdldFNoaXBMaXN0LFxuICAgIGdldEJvYXJkLFxuICAgIHZhbGlkQ29vcmRpbmF0ZXMsXG4gICAgcGxhY2VTaGlwLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgaXNBbGxTaGlwU3VuayxcbiAgICByYW5kb21QbGFjZW1lbnQsXG4gIH07XG59O1xuXG5leHBvcnQgZGVmYXVsdCBHYW1lQm9hcmQ7XG4iLCJleHBvcnQgY29uc3QgU0hJUF9MRU5HVEggPSB7XG4gIGNhcnJpZXI6IDUsXG4gIGJhdHRsZXNoaXA6IDQsXG4gIGRlc3Ryb3llcjogMyxcbiAgc3VibWFyaW5lOiAzLFxuICBwYXRyb2xCb2F0OiAyLFxufTtcblxuZXhwb3J0IGNvbnN0IEJPQVJEX0xFTkdUSCA9IDEwO1xuXG5leHBvcnQgY29uc3QgcmFuZG9tQ29vcmQgPSAoKSA9PiB7XG4gIGNvbnN0IHJvdyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgY29uc3QgY29sID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICByZXR1cm4gW3JvdywgY29sXTtcbn07XG5cbmV4cG9ydCBjb25zdCBTSElQX0xJU1QgPSBbXG4gICdjYXJyaWVyJyxcbiAgJ2JhdHRsZXNoaXAnLFxuICAnZGVzdHJveWVyJyxcbiAgJ3N1Ym1hcmluZScsXG4gICdwYXRyb2xCb2F0Jyxcbl07XG4iLCJpbXBvcnQgeyByYW5kb21Db29yZCwgU0hJUF9MSVNUIH0gZnJvbSAnLi9oZWxwZXInO1xuXG5jb25zdCBQbGF5ZXIgPSAoaWQgPSAnaHVtYW4nKSA9PiB7XG4gIGxldCB0dXJuID0gZmFsc2U7XG4gIGxldCBmbGVldCA9IFsuLi5TSElQX0xJU1RdO1xuICBjb25zdCBzZXRGbGVldCA9ICgpID0+IHtcbiAgICBmbGVldCA9IFNISVBfTElTVDtcbiAgfTtcbiAgY29uc3QgZ2V0RmxlZXQgPSAoKSA9PiBmbGVldDtcbiAgY29uc3Qgc2V0VHVybiA9ICgpID0+IHtcbiAgICB0dXJuID0gIXR1cm47XG4gIH07XG4gIGNvbnN0IGdldFR1cm4gPSAoKSA9PiB0dXJuO1xuICBjb25zdCBnZXRJRCA9ICgpID0+IGlkO1xuICBjb25zdCBhdHRhY2sgPSAocm93LCBjb2wsIGVuZW15Qm9hcmQpID0+IGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbCk7XG5cbiAgY29uc3QgY29tcEF0dGFjayA9IChlbmVteUJvYXJkKSA9PiB7XG4gICAgbGV0IHJvdyA9IC0xO1xuICAgIGxldCBjb2wgPSAtMTtcbiAgICB3aGlsZSAoZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sKSA9PT0gLTEpIHtcbiAgICAgIFtyb3csIGNvbF0gPSByYW5kb21Db29yZCgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4ge1xuICAgIHNldEZsZWV0LFxuICAgIGdldEZsZWV0LFxuICAgIGdldFR1cm4sXG4gICAgc2V0VHVybixcbiAgICBnZXRJRCxcbiAgICBhdHRhY2ssXG4gICAgY29tcEF0dGFjayxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFBsYXllcjtcbiIsImltcG9ydCB7IFNISVBfTEVOR1RIIH0gZnJvbSAnLi9oZWxwZXInO1xuXG5jb25zdCBTaGlwID0gKHR5cGUpID0+IHtcbiAgY29uc3QgaWQgPSB0eXBlO1xuICBjb25zdCBsZW5ndGggPSBTSElQX0xFTkdUSFt0eXBlXTtcbiAgbGV0IGhpdHMgPSAwO1xuXG4gIC8vIDEgZm9yIGhvcml6b250YWwsIDAgZm9yIHZlcnRpY2FsXG4gIGxldCBkaXJlY3Rpb24gPSAxO1xuXG4gIGNvbnN0IGdldERpcmVjdGlvbiA9ICgpID0+IGRpcmVjdGlvbjtcbiAgY29uc3Qgc2V0RGlyZWN0aW9uID0gKCkgPT4ge1xuICAgIGRpcmVjdGlvbiA9IE51bWJlcighZGlyZWN0aW9uKTtcbiAgfTtcblxuICBjb25zdCBoaXQgPSAoKSA9PiB7XG4gICAgaGl0cyArPSAxO1xuICB9O1xuXG4gIGNvbnN0IGlzU3VuayA9ICgpID0+IGxlbmd0aCA8PSBoaXRzO1xuXG4gIHJldHVybiB7XG4gICAgaWQsXG4gICAgbGVuZ3RoLFxuICAgIGdldERpcmVjdGlvbixcbiAgICBzZXREaXJlY3Rpb24sXG4gICAgaGl0LFxuICAgIGlzU3VuayxcbiAgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IFNoaXA7XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIjpyb290IHtcXG4gIGZvbnQtc2l6ZTogNjIuNSU7XFxuICAtLWdyaWQtY29sb3I6ICNkOGUyZGM7XFxuICAtLWJhY2tncm91bmQtY29sb3I6ICNmZWU0NDA7XFxuICAtLWdyaWQtaG92ZXItY29sb3I6ICNmOGVkZWI7XFxuICAtLXNoaXAtaG92ZXItY29sb3I6ICNmNGEyNjE7XFxuICAtLWNhcnJpZXItY29sb3I6ICMzNDNhNDA7XFxuICAtLWJhdHRsZXNoaXAtY29sb3I6ICMzNTRmNTI7XFxuICAtLWRlc3Ryb3llci1jb2xvcjogIzUyNzk2ZjtcXG4gIC0tc3VibWFyaW5lLWNvbG9yOiAjODRhOThjO1xcbiAgLS1wYXRyb2xCb2F0LWNvbG9yOiAjNmM3NTdkO1xcbiAgLS1taXNzLWNvbG9yOiAjODBlZDk5O1xcbiAgLS1oaXQtY29sb3I6ICNkMDAwMDA7XFxuICAtLW92ZXJsYXktY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcXG59XFxuXFxuKixcXG4qOjphZnRlcixcXG4qOjpiZWZvcmUge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvcik7XFxufVxcblxcbmgxIHtcXG4gIGZvbnQtc2l6ZTogMTByZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5zdGFydGluZy5ib2FyZCA+IGRpdixcXG4ucGxheWVyMS5ib2FyZCA+IGRpdixcXG4ucGxheWVyMi5ib2FyZCA+IGRpdiB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1mbG93OiByb3cgd3JhcDtcXG4gIG1hcmdpbjogMTByZW0gYXV0bztcXG4gIGJvcmRlcjogc29saWQgYmxhY2sgMnB4O1xcbiAgYm9yZGVyLXJpZ2h0OiAwO1xcbiAgYm9yZGVyLWJvdHRvbTogMDtcXG4gIHdpZHRoOiA2MC40cmVtO1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG59XFxuXFxuLmdyaWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZ3JpZC1jb2xvcik7XFxuICB3aWR0aDogNnJlbTtcXG4gIGhlaWdodDogNnJlbTtcXG4gIGJvcmRlcjogc29saWQgYmxhY2s7XFxuICBib3JkZXItd2lkdGg6IDAgMnB4IDJweCAwO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG4uZ3JpZDpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ncmlkLWhvdmVyLWNvbG9yKTtcXG59XFxuXFxuLmdyaWQuc2hvdy1zaGlwIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXNoaXAtaG92ZXItY29sb3IpO1xcbn1cXG5cXG4uZ3JpZFtjbGFzcyo9J2NhcnJpZXInXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1jYXJyaWVyLWNvbG9yKTtcXG59XFxuXFxuLmdyaWRbY2xhc3MqPSdiYXR0bGVzaGlwJ10ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmF0dGxlc2hpcC1jb2xvcik7XFxufVxcblxcbi5ncmlkW2NsYXNzKj0nZGVzdHJveWVyJ10ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGVzdHJveWVyLWNvbG9yKTtcXG59XFxuXFxuLmdyaWRbY2xhc3MqPSdzdWJtYXJpbmUnXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1zdWJtYXJpbmUtY29sb3IpO1xcbn1cXG5cXG4uZ3JpZFtjbGFzcyo9J3BhdHJvbEJvYXQnXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1wYXRyb2xCb2F0LWNvbG9yKTtcXG59XFxuXFxuLmdyaWRbY2xhc3MqPSdtaXNzJ10ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tbWlzcy1jb2xvcik7XFxufVxcblxcbi5ncmlkW2NsYXNzKj0naGl0J10ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taGl0LWNvbG9yKTtcXG59XFxuXFxuLm1lc3NhZ2UtY29udGFpbmVyLm92ZXJsYXkge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tb3ZlcmxheS1jb2xvcik7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLm1lc3NhZ2UtYm94IHtcXG4gIGZvbnQtc2l6ZTogNHJlbTtcXG4gIG1hcmdpbi1ib3R0b206IDNyZW07XFxuICBjb2xvcjogYXF1YTtcXG4gIGxldHRlci1zcGFjaW5nOiA1cHg7XFxufVxcblxcbi5yZW1hdGNoIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHBhZGRpbmc6IDJyZW07XFxuICBmb250LXNpemU6IDJyZW07XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZXMvZ2xvYmFsLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLGdCQUFnQjtFQUNoQixxQkFBcUI7RUFDckIsMkJBQTJCO0VBQzNCLDJCQUEyQjtFQUMzQiwyQkFBMkI7RUFDM0Isd0JBQXdCO0VBQ3hCLDJCQUEyQjtFQUMzQiwwQkFBMEI7RUFDMUIsMEJBQTBCO0VBQzFCLDJCQUEyQjtFQUMzQixxQkFBcUI7RUFDckIsb0JBQW9CO0VBQ3BCLG1DQUFtQztBQUNyQzs7QUFFQTs7O0VBR0UsU0FBUztFQUNULFVBQVU7RUFDVixzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSx5Q0FBeUM7QUFDM0M7O0FBRUE7RUFDRSxnQkFBZ0I7RUFDaEIsa0JBQWtCO0FBQ3BCOztBQUVBOzs7RUFHRSxhQUFhO0VBQ2IsbUJBQW1CO0VBQ25CLGtCQUFrQjtFQUNsQix1QkFBdUI7RUFDdkIsZUFBZTtFQUNmLGdCQUFnQjtFQUNoQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLG1DQUFtQztFQUNuQyxXQUFXO0VBQ1gsWUFBWTtFQUNaLG1CQUFtQjtFQUNuQix5QkFBeUI7RUFDekIsZUFBZTtBQUNqQjs7QUFFQTtFQUNFLHlDQUF5QztBQUMzQzs7QUFFQTtFQUNFLHlDQUF5QztBQUMzQzs7QUFFQTtFQUNFLHNDQUFzQztBQUN4Qzs7QUFFQTtFQUNFLHlDQUF5QztBQUMzQzs7QUFFQTtFQUNFLHdDQUF3QztBQUMxQzs7QUFFQTtFQUNFLHdDQUF3QztBQUMxQzs7QUFFQTtFQUNFLHlDQUF5QztBQUMzQzs7QUFFQTtFQUNFLG1DQUFtQztBQUNyQzs7QUFFQTtFQUNFLGtDQUFrQztBQUNwQzs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixNQUFNO0VBQ04sT0FBTztFQUNQLFFBQVE7RUFDUixTQUFTO0VBQ1Qsc0NBQXNDO0VBQ3RDLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixtQkFBbUI7RUFDbkIsV0FBVztFQUNYLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixlQUFlO0VBQ2YsYUFBYTtFQUNiLGVBQWU7QUFDakJcIixcInNvdXJjZXNDb250ZW50XCI6W1wiOnJvb3Qge1xcbiAgZm9udC1zaXplOiA2Mi41JTtcXG4gIC0tZ3JpZC1jb2xvcjogI2Q4ZTJkYztcXG4gIC0tYmFja2dyb3VuZC1jb2xvcjogI2ZlZTQ0MDtcXG4gIC0tZ3JpZC1ob3Zlci1jb2xvcjogI2Y4ZWRlYjtcXG4gIC0tc2hpcC1ob3Zlci1jb2xvcjogI2Y0YTI2MTtcXG4gIC0tY2Fycmllci1jb2xvcjogIzM0M2E0MDtcXG4gIC0tYmF0dGxlc2hpcC1jb2xvcjogIzM1NGY1MjtcXG4gIC0tZGVzdHJveWVyLWNvbG9yOiAjNTI3OTZmO1xcbiAgLS1zdWJtYXJpbmUtY29sb3I6ICM4NGE5OGM7XFxuICAtLXBhdHJvbEJvYXQtY29sb3I6ICM2Yzc1N2Q7XFxuICAtLW1pc3MtY29sb3I6ICM4MGVkOTk7XFxuICAtLWhpdC1jb2xvcjogI2QwMDAwMDtcXG4gIC0tb3ZlcmxheS1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xcbn1cXG5cXG4qLFxcbio6OmFmdGVyLFxcbio6OmJlZm9yZSB7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yKTtcXG59XFxuXFxuaDEge1xcbiAgZm9udC1zaXplOiAxMHJlbTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLnN0YXJ0aW5nLmJvYXJkID4gZGl2LFxcbi5wbGF5ZXIxLmJvYXJkID4gZGl2LFxcbi5wbGF5ZXIyLmJvYXJkID4gZGl2IHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xcbiAgbWFyZ2luOiAxMHJlbSBhdXRvO1xcbiAgYm9yZGVyOiBzb2xpZCBibGFjayAycHg7XFxuICBib3JkZXItcmlnaHQ6IDA7XFxuICBib3JkZXItYm90dG9tOiAwO1xcbiAgd2lkdGg6IDYwLjRyZW07XFxufVxcblxcbi5jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbn1cXG5cXG4uZ3JpZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ncmlkLWNvbG9yKTtcXG4gIHdpZHRoOiA2cmVtO1xcbiAgaGVpZ2h0OiA2cmVtO1xcbiAgYm9yZGVyOiBzb2xpZCBibGFjaztcXG4gIGJvcmRlci13aWR0aDogMCAycHggMnB4IDA7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbi5ncmlkOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWdyaWQtaG92ZXItY29sb3IpO1xcbn1cXG5cXG4uZ3JpZC5zaG93LXNoaXAge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tc2hpcC1ob3Zlci1jb2xvcik7XFxufVxcblxcbi5ncmlkW2NsYXNzKj0nY2FycmllciddIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWNhcnJpZXItY29sb3IpO1xcbn1cXG5cXG4uZ3JpZFtjbGFzcyo9J2JhdHRsZXNoaXAnXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYXR0bGVzaGlwLWNvbG9yKTtcXG59XFxuXFxuLmdyaWRbY2xhc3MqPSdkZXN0cm95ZXInXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1kZXN0cm95ZXItY29sb3IpO1xcbn1cXG5cXG4uZ3JpZFtjbGFzcyo9J3N1Ym1hcmluZSddIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXN1Ym1hcmluZS1jb2xvcik7XFxufVxcblxcbi5ncmlkW2NsYXNzKj0ncGF0cm9sQm9hdCddIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXBhdHJvbEJvYXQtY29sb3IpO1xcbn1cXG5cXG4uZ3JpZFtjbGFzcyo9J21pc3MnXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1taXNzLWNvbG9yKTtcXG59XFxuXFxuLmdyaWRbY2xhc3MqPSdoaXQnXSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1oaXQtY29sb3IpO1xcbn1cXG5cXG4ubWVzc2FnZS1jb250YWluZXIub3ZlcmxheSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICBib3R0b206IDA7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1vdmVybGF5LWNvbG9yKTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ubWVzc2FnZS1ib3gge1xcbiAgZm9udC1zaXplOiA0cmVtO1xcbiAgbWFyZ2luLWJvdHRvbTogM3JlbTtcXG4gIGNvbG9yOiBhcXVhO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDVweDtcXG59XFxuXFxuLnJlbWF0Y2gge1xcbiAgYm9yZGVyOiBub25lO1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgcGFkZGluZzogMnJlbTtcXG4gIGZvbnQtc2l6ZTogMnJlbTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9nbG9iYWwuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9nbG9iYWwuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCB7IHJlbmRlckJvYXJkIH0gZnJvbSAnLi9tb2R1bGVzL2RvbSc7XG5pbXBvcnQgR2FtZSBmcm9tICcuL21vZHVsZXMvZ2FtZSc7XG5pbXBvcnQgJy4vc3R5bGVzL2dsb2JhbC5jc3MnO1xuXG5cbmNvbnN0IGdhbWUgPSBHYW1lKCk7XG5nYW1lLmluaXRHYW1lKCk7XG5cbnJlbmRlckJvYXJkKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zdGFydGluZy5ib2FyZCcpLCBnYW1lLmdldFAxQm9hcmQoKSwgZ2FtZS5nZXRwbGF5ZXIxKCksIGZhbHNlLCBnYW1lKTtcblxuIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJjc3NXaXRoTWFwcGluZ1RvU3RyaW5nIiwibGlzdCIsInRvU3RyaW5nIiwibWFwIiwiaXRlbSIsImNvbnRlbnQiLCJuZWVkTGF5ZXIiLCJjb25jYXQiLCJsZW5ndGgiLCJqb2luIiwiaSIsIm1vZHVsZXMiLCJtZWRpYSIsImRlZHVwZSIsInN1cHBvcnRzIiwibGF5ZXIiLCJ1bmRlZmluZWQiLCJhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzIiwiayIsImlkIiwiX2siLCJwdXNoIiwiY3NzTWFwcGluZyIsImJ0b2EiLCJiYXNlNjQiLCJ1bmVzY2FwZSIsImVuY29kZVVSSUNvbXBvbmVudCIsIkpTT04iLCJzdHJpbmdpZnkiLCJkYXRhIiwic291cmNlTWFwcGluZyIsIkJPQVJEX0xFTkdUSCIsIlNoaXAiLCJjbGVhclN0YXJ0aW5nQm9hcmQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZXh0Q29udGVudCIsInJlbmRlckdyaWQiLCJyb3ciLCJjb2wiLCJzdGF0dXMiLCJyZW5kZXJCb2FyZCIsIm5vZGUiLCJnYW1lQm9hcmQiLCJwbGF5ZXIiLCJnYW1lU3RhcnQiLCJnYW1lIiwiZGl2IiwiY3JlYXRlRWxlbWVudCIsImJvYXJkIiwiZ2V0Qm9hcmQiLCJqIiwiaW5uZXJIVE1MIiwiZ2V0SUQiLCJhcHBlbmRDaGlsZCIsImJpbmRFdmVudHMiLCJnZXRBZGphY2VudENlbGxzIiwiZGlyZWN0aW9uIiwiY2VsbHMiLCJOdW1iZXIiLCJyZW5kZXJTdGFydGluZ1NoaXAiLCJwbGF5ZXIxIiwicDFCb2FyZCIsImUiLCJ0YXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJzaGlwIiwiZ2V0RmxlZXQiLCJ2YWxpZENvb3JkaW5hdGVzIiwiZ2V0RGlyZWN0aW9uIiwiZm9yRWFjaCIsImMiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmVTaGlwIiwicXVlcnlTZWxlY3RvckFsbCIsImQiLCJyZW1vdmUiLCJwbGFjZVNoaXAiLCJzaGlmdCIsImxvYWRHYW1lIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJpbmQiLCJwMiIsImNvbnRhaW5zIiwic3RhcnRHYW1lIiwicmVuZGVyTWVzc2FnZUJveCIsIm1lc3NhZ2UiLCJjb250YWluZXIiLCJtc2ciLCJidG4iLCJyZXN0YXJ0IiwiYXBwZW5kIiwiY2xlYXJTY3JlZW4iLCJHYW1lQm9hcmQiLCJQbGF5ZXIiLCJHYW1lIiwiY3B1IiwiY3B1Qm9hcmQiLCJnZXRwbGF5ZXIxIiwiZ2V0cGxheWVyMiIsImdldFAxQm9hcmQiLCJnZXRQMkJvYXJkIiwiaW5pdEdhbWUiLCJzZXRUdXJuIiwicmFuZG9tUGxhY2VtZW50IiwiaXNHYW1lT3ZlciIsImlzQWxsU2hpcFN1bmsiLCJyZWNlaXZlQXR0YWNrIiwiY29tcEF0dGFjayIsInJhbmRvbUNvb3JkIiwiQXJyYXkiLCJmaWxsIiwic2hpcExpc3QiLCJnZXRTaGlwTGlzdCIsImFscmVhZHlQbGFjZWQiLCJoaXQiLCJfaTMiLCJfc2hpcExpc3QiLCJzIiwiaXNTdW5rIiwiX3JhbmRvbUNvb3JkIiwiX3JhbmRvbUNvb3JkMiIsIl9zbGljZWRUb0FycmF5IiwiX3JhbmRvbUNvb3JkMyIsIl9yYW5kb21Db29yZDQiLCJTSElQX0xFTkdUSCIsImNhcnJpZXIiLCJiYXR0bGVzaGlwIiwiZGVzdHJveWVyIiwic3VibWFyaW5lIiwicGF0cm9sQm9hdCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIlNISVBfTElTVCIsImFyZ3VtZW50cyIsInR1cm4iLCJmbGVldCIsIl90b0NvbnN1bWFibGVBcnJheSIsInNldEZsZWV0IiwiZ2V0VHVybiIsImF0dGFjayIsImVuZW15Qm9hcmQiLCJ0eXBlIiwiaGl0cyIsInNldERpcmVjdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=