import { renderBoard } from './modules/dom';
import Game from './modules/game';
import './styles/global.css';


const game = Game();
game.initGame();

renderBoard(document.querySelector('.starting.board'), game.getP1Board(), game.getplayer1(), false, game);

