function drawPacMan() {
  ctx.beginPath();
  ctx.arc(
    pacMan.x,
    pacMan.y,
    pacMan.radius,
    pacMan.startAngle * Math.PI,
    pacMan.endAngle * Math.PI
  );
  ctx.lineTo(pacMan.x, pacMan.y);
  ctx.fillStyle = pacMan.color;
  ctx.fill();
  ctx.closePath();
}

function drawGhosts() {
  ctx.fillStyle = "red";
  ghosts.forEach((ghost, index) => {
    ctx.beginPath();
    ctx.arc(ghost.x, ghost.y, ghostRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    const angle = Math.atan2(pacMan.y - ghost.y, pacMan.x - ghost.x);
    ghost.x += Math.cos(angle) * ghost.speed;
    ghost.y += Math.sin(angle) * ghost.speed;

    const distance = Math.sqrt(
      (pacMan.x - ghost.x) ** 2 + (pacMan.y - ghost.y) ** 2
    );
    if (distance < pacMan.radius + ghostRadius) {
      gameOver = true;
    }
  });
}

function drawCoins() {
  ctx.fillStyle = "gold";
  coins.forEach((coin, index) => {
    ctx.beginPath();
    ctx.arc(coin.x, coin.y, coinRadius, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    const distance = Math.sqrt(
      (pacMan.x - coin.x) ** 2 + (pacMan.y - coin.y) ** 2
    );
    if (distance < pacMan.radius + coinRadius) {
      coins.splice(index, 1);
      score++;
    }
  });
}

function drawScore() {
  ctx.fillStyle = "black";
  ctx.font = "20px Arial";
  ctx.fillText("Рахунок: " + score, 10, 30);
}

function drawGameOver() {
  ctx.fillStyle = "red";
  ctx.font = "40px Arial";
  ctx.fillText("Гра закінчена", canvas.width / 2 - 100, canvas.height / 2);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
  if (gameOver) {
    clearCanvas();
    drawGameOver();
    return;
  }

  clearCanvas();

  if (pacMan.direction === "right") {
    pacMan.x += pacMan.speed;
  } else if (pacMan.direction === "left") {
    pacMan.x -= pacMan.speed;
  } else if (pacMan.direction === "up") {
    pacMan.y -= pacMan.speed;
  } else if (pacMan.direction === "down") {
    pacMan.y += pacMan.speed;
  }

  drawPacMan();
  drawGhosts();
  drawCoins();
  drawScore();

  requestAnimationFrame(update);
}
