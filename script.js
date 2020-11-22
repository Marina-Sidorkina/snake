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
  fruit: [
    {x: 1, y: 1}
  ],
  tickNumber: 0,
  timer: 0,
  tick: function() {
    window.clearTimeout(game.timer);
    game.tickNumber++;
    const result = snake.move();
    if(result === 'gameover') {
      alert('Игра окончена');
      return;
    }
    graphics.drawGame();
    game.timer = window.setTimeout(game.tick, 500);
  },
  isEmpty: function(location) {
    return game.board[location.y][location.x] === ' ';
  },
  isWall: function(location) {
    return game.board[location.y][location.x] === '#';
  },
  isFruit: function(location) {
    for(let fruitNumber = 0; fruitNumber < game.fruit.length; fruitNumber++) {
      let fruit = game.fruit[fruitNumber];
      if(location.x === fruit.x && location.y === fruit.y) {
        game.fruit.splice(fruitNumber, 1)
        return true;
      }
    }
    return false;
  }
}

const snake = {
  parts: [
    {x: 4, y: 2},
    {x: 3, y: 2},
    {x: 2, y: 2}
  ],
  facing: 'E',
  nextLocation: function() {
    const snakeHead = snake.parts[0];
    let targetX = snakeHead.x;
    let targetY = snakeHead.y;
    targetY = snake.facing === 'N' ? targetY - 1 : targetY;
    targetY = snake.facing === 'S' ? targetY + 1 : targetY;
    targetX = snake.facing === 'W' ? targetX - 1 : targetX;
    targetX = snake.facing === 'E' ? targetX + 1 : targetX;
    return {x: targetX, y: targetY};
  },
  move: function() {
    const location = snake.nextLocation();
    if(game.isEmpty(location)) {
      snake.parts.unshift(location);
      snake.parts.pop();
    }
    if(game.isWall(location)) {
      return 'gameover';
    }
    if(game.isFruit(location)) {
      snake.parts.unshift(location);
      game.score++;
    }
  }
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
  draw: function(ctx, source, color) {
    source.forEach(function drawPart(part) {
      let partXLocation = part.x * graphics.squareSize;
      let partYLocation = part.y * graphics.squareSize;
      ctx.fillStyle = color;
      ctx.fillRect(partXLocation, partYLocation, graphics.squareSize, graphics.squareSize);
    });
  },
  drawGame: function() {
    const ctx = graphics.canvas.getContext('2d');
    ctx.clearRect(0, 0, graphics.canvas.width, graphics.canvas.height);
    graphics.drawBoard(ctx);
    graphics.draw(ctx, snake.parts, 'green');
    graphics.draw(ctx, game.fruit, 'red');
  }
}

const gameControl = {
  processInput: function (keyPressed) {
    const key = keyPressed.key.toLowerCase();
    let targetDirection = snake.facing;
    if(key == 'w') targetDirection = 'N';
    if(key == 'a') targetDirection = 'W';
    if(key == 's') targetDirection = 'S';
    if(key == 'd') targetDirection = 'E';
    snake.facing = targetDirection;
    game.tick();
  },
  startGame: function() {
    window.addEventListener('keypress', gameControl.processInput, false)
    game.tick();
  }
}

graphics.drawGame();
gameControl.startGame();