let score = document.querySelector('.score');
let gameScreen = document.querySelector('.gameScreen');
let startScreen = document.querySelector('.startScreen');

startScreen.addEventListener('click', startGame);

document.addEventListener('keydown', keyPressed);
document.addEventListener('keyup', keyPressed);

let controls = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
}

let player = {
    speed: 5,
    score: 0,
    start: false
}

function start() {
    let car = document.querySelector('.car');
    let road = gameScreen.getBoundingClientRect();
    if (controls.ArrowLeft && player.x > road.left) {
        player.x -= player.speed;
    }
    if (controls.ArrowRight && player.x < road.right) {
        player.x += player.speed;
    }
    if (controls.ArrowUp && player.y < road.top) {
        player.y -= player.speed;
    }
    if (controls.ArrowDown && player.y > road.bottom) {
        player.y += player.speed;
    }

    if (player.start) {
        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        requestAnimationFrame(start);
    }
}

function keyPressed(e) {
    if (controls[e.key] !== false) {
        controls[e.key] = true;
    }
}

function keyReleased(e) {
    if (controls[e.key] !== true) {
        controls[e.key] = false;
    }
}

function startGame() {
    player.start = true;
    startScreen.classList.add('hide');
    gameScreen.classList.remove('hide');

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    car.innerText("Car");
    player.x = car.offsetLeft;
    player.y = car.offsetTop;
    car.style.backgroundColor = "red";
    gameScreen.appendChild(car);
    requestAnimationFrame(start);

    for (let x = 0; x < 5; x++) {
        let roadLines = document.createElement('div');
        roadLines.setAttribute('class', 'line');
        roadLines.y = x * 150;
        roadLines.style.top = roadLines.y + 'px';
        gameScreen.appendChild(roadLines);
    }

}