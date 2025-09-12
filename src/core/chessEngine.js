// 棋譜状態の唯一のソース。window.Chess を使用（index.htmlで読み込み済み）
export class Engine {
  constructor(fen = null){
    this.game = new window.Chess();
    if (fen && fen !== 'startpos') this.game.load(fen);
    this.lastMove = null; // {from,to}
  }
  fen(){ return this.game.fen(); }
  ply(){ return this.game.history().length; }
  reset(){ this.game = new window.Chess(); this.lastMove = null; }
  moveSAN(san){
    const mv = this.game.move(san, { sloppy:true });
    if (!mv) return false;
    this.lastMove = { from: mv.from, to: mv.to };
    return true;
  }
  moveSquares(from, to){
    const mv = this.game.move({ from, to, promotion:'q' });
    if (!mv) return false;
    this.lastMove = { from: mv.from, to: mv.to };
    return true;
  }
}
