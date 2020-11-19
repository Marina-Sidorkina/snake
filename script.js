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
  ],
  tickNumber: 0,
  timer: 0;
  tick: function() {
    game.tickNumber++;
    graphics.drawGame();
    game.timer = window.setTimeout(game.tick, 500);
  }
}

const snake = {
  parts: [
    {x: 4, y: 2},
    {x: 3, y: 2},
    {x: 2, y: 2}
  ],
  facing: 'E',
  move: function() {}
}

const graphics = {
  canvas: document.getElementById('canvas'),
  squareSize: 30,
  drawBoard: function(ctx) {
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
  },
  drawSnake: function(ctx) {
    snake.parts.forEach(function drawPart(part) {
      let partXLocation = part.x * graphics.squareSize;
      let partYLocation = part.y * graphics.squareSize;
      ctx.fillStyle = 'green';
      ctx.fillRect(partXLocation, partYLocation, graphics.squareSize, graphics.squareSize);
    })
  },
  drawGame: function() {
    const ctx = graphics.canvas.getContext('2d');
    graphics.drawBoard(ctx);
    graphics.drawSnake(ctx);
  }
}

const gameControl = {
  startGame: function() {
    game.tick();
  }
}

graphics.drawGame();
gameControl.startGame();