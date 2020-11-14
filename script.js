const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const squareSize = 30;
const board = [
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
];
let currentYOffset = 0;

board.forEach(function checkLine(line) {
  line = line.split('');
  let currentXOffset = 0;
  line.forEach(function checkCharacter(character) {
    if(character === '#') {
      ctx.fillStyle = 'black';
      ctx.fillRect(currentXOffset, currentYOffset, squareSize, squareSize);
    }
    currentXOffset += squareSize;
  })
  currentYOffset += squareSize;
});