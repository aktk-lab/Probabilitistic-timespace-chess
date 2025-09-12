// A面のFENを受け取り、B面用（確率投影）に変換
import { mulberry32 } from './rng.js';

export function projectB(trueFen, seed, ply){
  if (!trueFen || trueFen === 'startpos'){
    trueFen = new window.Chess().fen();
  }
  const rng = mulberry32(seed + ply);
  const parts = trueFen.split(' ');
  const rows = parts[0].split('/');
  const projectedRows = rows.map(row => {
    let out = '';
    for (const ch of row){
      if (/[1-8]/.test(ch)) { out += ch; continue; }
      // 例：20%で不確定「?」に置換（ここをあなたの仕様に差し替え）
      out += (rng() < 0.20) ? '?' : ch;
    }
    return out;
  });
  parts[0] = projectedRows.join('/');
  return parts.join(' ');
}
