
const PIECES = { p:'♟', r:'♜', n:'♞', b:'♝', q:'♛', k:'♚',
                 P:'♙', R:'♖', N:'♘', B:'♗', Q:'♕', K:'♔' };

export function renderBoard(container, fen, opts = {}){
  const { highlights=null, onSquareClick=null } = opts;
  container.innerHTML = '';
  const rows = fen.split(' ')[0].split('/');
  rows.forEach((row, rIdx) => {
    let expanded = '';
    for (const ch of row) expanded += /[1-8]/.test(ch) ? ' '.repeat(parseInt(ch)) : ch;
    for (let c=0;c<8;c++){
      const div = document.createElement('div');
      div.className = 'square ' + ((rIdx+c)%2 ? 'dark':'light');
      const file = 'abcdefgh'[c], rank = 8 - rIdx, name = file + rank;
      if (highlights){
        if (highlights.from === name) div.classList.add('highlight-from');
        if (highlights.to   === name) div.classList.add('highlight-to');
      }
      const ch = expanded[c];
      div.textContent = PIECES[ch] || (ch==='?'?'?':'');
      if (onSquareClick){
        div.style.cursor = 'pointer';
        div.addEventListener('click', () => onSquareClick(name));
        div.addEventListener('touchend', () => onSquareClick(name), {passive:true});
      }
      container.appendChild(div);
    }
  });
}
