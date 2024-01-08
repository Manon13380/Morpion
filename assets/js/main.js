let game = document.querySelector(".game");
let player = document.querySelector('.player');
let gameContainer = "";
let isPlayable = true;
let isCpuMode = true;
let turn = 0;
let playerOneTurn = true
let map = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];

function displayButton() {
    document.querySelector('#gameOne').style.display = "none";
    document.querySelector('#twoPlayers').style.display = "block";
    document.querySelector('#vsBot').style.display = "block";
}

function displayMap(cpuMode) {
    isCpuMode = cpuMode
    document.querySelector('#twoPlayers').style.display = "none";
    document.querySelector('#vsBot').style.display = "none";
    document.querySelector('.player').style.display = "block";
    player.innerHTML = "Player One";
    gameContainer = document.createElement('div');
    gameContainer.classList.add('gameContainer');
    game.appendChild(gameContainer);
    gameContainer.style.gap = "0";
    map.forEach((el) => {
        let rowContainer = document.createElement('div');
        rowContainer.classList.add('row');
        gameContainer.appendChild(rowContainer);
        el.forEach((value, index) => {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            rowContainer.appendChild(cell);
            cell.addEventListener('click', () => {
                morpion(el,index,cell)
            },{ once: true })  
        })
    })
}

function morpion (el,index,cell) {
        turn += 1;
        let image = document.createElement('img');
        cell.appendChild(image);
        if (isPlayable) {
            if (!playerOneTurn) {
                image.src = "./assets/images/rond.png";
                player.innerHTML = "Player One";
                player.style.color = "rgb(110, 178, 237)";
                el.splice((index), 1, 2);
                playerOneTurn = !playerOneTurn
                endGame()
            }
            else {
                image.src = "./assets/images/croix.png";
                player.innerHTML = "Player Two";
                player.style.color = "red";
                el.splice((index), 1, 1)
                playerOneTurn = !playerOneTurn
                endGame()
                if (isCpuMode && isPlayable) {
                    bot()
                }
            }
        }
}

function bot() {
    if (turn < 9) {
        let random = randomize(0, document.querySelectorAll('.cell').length - 1)
        while (document.querySelectorAll('.cell')[random].innerHTML != "") {
            random = randomize(0, document.querySelectorAll('.cell').length - 1)
        }
        document.querySelectorAll('.cell')[random].click()
    }
}

function endGame() {
    let column = [[], [], []];
    // vérification ligne pleine + création tableau de colonnes
    for (let i = 0; i < map.length; i++) {
        if (map[i].indexOf(0) == -1) {
            winner(map[i][0], map[i][1], map[i][2]);
            if (!isPlayable) {
                switch (i) {
                    case 0:
                        gameContainer.classList.add('win-hor-top');
                        break;
                    case 1:
                        gameContainer.classList.add('win-hor-center');
                        break;
                    case 2:
                        gameContainer.classList.add('win-hor-bottom');
                        break;
                }
                return
            }
        }
        for (let j = 0; j < map.length; j++) {
            column[j].push(map[i][j]);
        }
    }
    // vérification colonnes pleine
    for (let index = 0; index < column.length; index++) {
        if (column[index].indexOf(0) == -1) {
            winner(column[index][0], column[index][1], column[index][2])
            if (!isPlayable) {
                switch (index) {
                    case 0:
                        gameContainer.classList.add('win-vert-left');
                        break;
                    case 1:
                        gameContainer.classList.add('win-vert-center');
                        break;
                    case 2:
                        gameContainer.classList.add('win-vert-right');
                        break;
                }
                return
            }
        }
    }
    //vérification diagonales pleine
    if (map[0][0] != 0 && map[1][1] != 0 && map[2][2] != 0) {
        winner(map[0][0], map[1][1], map[2][2]);
        if (!isPlayable) {
            gameContainer.classList.add('win-diag-left');
            return
        }
    }
    else if (map[0][2] != 0 && map[1][1] != 0 && map[2][0] != 0) {
        winner(map[0][2], map[1][1], map[2][0]);
        if (!isPlayable) {
            gameContainer.classList.add('win-diag-right');
            return
        }
    }
    // vérification match nul
    if (map[0].indexOf(0) == -1 && map[1].indexOf(0) == -1 && map[2].indexOf(0) == -1) {
        if (isPlayable) {
            player.innerHTML = "Match Nul";
            document.querySelector("#restart").style.display = "block";
            player.style.marginBottom = "-35px";
            player.style.color = "rgb(187, 213, 236)";
        }
    }
}

function winner(cellOne, cellTwo, cellThree) {
    let result = cellOne + cellTwo + cellThree;
    let sentence = "";
    let color = "";
    if (result == 3 || result == 6) {
        isPlayable = false;
        document.querySelector("#restart").style.display = "block";
        player.style.marginBottom = "-35px";
        if (result == 3) {
            sentence = "Player One Win !!!";
            color = "rgb(110, 178, 237)";
        }
        else {
            if (isCpuMode) {
                sentence = "The Bot Win !!!";
                color = "red";
            }
            else {
               sentence = "Player Two Win !!!";
               color = "red";
            }
        }
        player.innerHTML = sentence;
        player.style.color = color;
    }
}

function restart() {
    isPlayable = true;
    document.querySelector("#restart").style.display = "none";
    document.querySelector(".player").style.display = "none";
    document.querySelector("#gameOne").style.display = "block";
    player.style.marginBottom = "0";
    isCpuMode = true;
    playerOneTurn = true
    turn = 0;
    gameContainer.remove();
    map = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
    ];
}

function randomize(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}