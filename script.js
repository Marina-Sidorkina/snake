const game = {
  board: [
    '###############',
    '#             #',
    '#             #',
    '#             #',
    '#    ####     #',
    '#    ####     #',
    '#             #',
    '#             #',
    '#             #',
    '###############'
  ]
}

const graphics = {
  canvas: document.getElementById('canvas'),
  squareSize: 30,
  drawBoard: function() {
    const ctx = canvas.getContext('2d');
    let currentYOffset = 0;

    game.board.forEach(function checkLine(line) {
      line = line.split('');
      let currentXOffset = 0;
      line.forEach(function checkCharacter(character) {
        if(character === '#') {
          ctx.fillStyle = 'black';
          ctx.fillRect(currentXOffset, currentYOffset, graphics.squareSize, graphics.squareSize);
        }
        currentXOffset += graphics.squareSize;
      })
      currentYOffset += graphics.squareSize;
    });
  }
}

graphics.drawBoard();