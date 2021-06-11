// Author:

// Global UI Variables
let canvasDiv;
let canvas;
let textDiv;
let textP;
let buttonDiv;
let resetButton;

// Global Game Variables
let snake;
let food;
let resolution;
let scaledWidth;
let scaledHeight;
let score;

function setup() {
  canvasDiv = createDiv();
  canvas = createCanvas(640, 480);canvas.parent(canvasDiv);

  textDiv = createDiv();
  textP = createP();
  textP.parent(textDiv);

  buttonDiv = createDiv();
  resetButton = createButton("Reset Game");
  resetButton.mousePressed(resetGame);
  resetButton.parent(buttonDiv);

  resolution = 20;

  scaledWidth = floor(width / resolution);
  scaledHeight = floor(height / resolution);

  frameRate(5);

  resetGame();

}

function draw() {
  // Scale the canvas according to resolution, then refresh the background
  scale(resolution);
  background(220);

  // Check if snake is eating the food
  if(snake.eat(food)) {
    createFood();
    score++;
    textP.html("Score: " + score);
  };
  
  // Draw the snake
  snake.update();
  snake.show();

  // Draw the food
  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);

  // Check for game over
  if(snake.endGame()) {
    textP.html("YOU LOSE. Final Score: " + score);
    background(255, 0, 0);

    noLoop();
    buttonDiv.style("display", "block");
  }

}

function createFood() {
  let x = floor(random(scaledWidth))
  let y = floor(random(scaledHeight));

  food = createVector(x, y);
}

function keyPressed() {
  if(keyCode === UP_ARROW && snake.yDirection === 0) {
    snake.setDirection(0, -1);
  } 
  else if(keyCode === DOWN_ARROW && snake.yDirection === 0) {
    snake.setDirection(0, 1);
  } 
  else if(keyCode === LEFT_ARROW && snake.xDirection === 0) {
    snake.setDirection(-1, 0);
  } 
  else if(keyCode === RIGHT_ARROW && snake.xDirection === 0) {
    snake.setDirection(1, 0);
  } 

}

function resetGame() {
  snake = new Snake();
  createFood();
  score = 0;
  textP.html("Score: " + score);
  loop();
  buttonDiv.style("display", "none");
}
