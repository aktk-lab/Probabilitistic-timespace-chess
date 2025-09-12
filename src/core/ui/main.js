import { Engine } from '../core/chessEngine.js';
import { projectB } from '../core/projectB.js';
import { renderBoard } from './boardView.js';

const elA = document.getElementById('boardA');
const elB = document.getElementById('boardB');
const elSAN = document.getElementById('san');
const elPlay = document.getElementById('playSan');
const elReset = document.getElementById('reset');
const elSeed = document.getElementById('seed');

const engine = new Engine();
let seed = Number(elSeed.value) || 123456789;
let pendingFrom = null; // クリック移動: 最初のマス選択

function renderAll(){
  const fenA = engine.fen();
  const fenB = projectB(fenA, seed, engine.ply());
  renderBoard(elA, fenA, { highlights: engine.lastMove, onSquareClick: handleSquareClick });
  renderBoard(elB, fenB, { highlights: engine.lastMove });
}

function handleSquareClick(name){
  if (!pendingFrom){
    pendingFrom = name;
    renderBoard(elA, engine.fen(), { highlights:{ from:name }, onSquareClick: handleSquareClick });
    return;
  }
  const from = pendingFrom, to = name;
  if (engine.moveSquares(from, to)){
    pendingFrom = null; renderAll();
  } else {
    pendingFrom = null; renderAll(); // 無効なら選択し直し
  }
}

// SAN 入力
elPlay.addEventListener('click', () => {
  const san = elSAN.value.trim(); if (!san) return;
  if (engine.moveSAN(san)){ elSAN.value = ''; renderAll(); }
  else alert('不正な手: ' + san);
});

// リセット
elReset.addEventListener('click', () => { engine.reset(); pendingFrom = null; renderAll(); });

// Seed 変更
elSeed.addEventListener('change', () => { seed = Number(elSeed.value) || 0; renderAll(); });

// 初期表示
renderAll();
