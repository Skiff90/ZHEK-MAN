function spawnCoin() {
  const coin = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
  };
  coins.push(coin);
}

function spawnGhost() {
  const ghost = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speed: 1,
  };
  ghosts.push(ghost);
}

setInterval(spawnCoin, 3000);
setInterval(spawnGhost, 5000);
