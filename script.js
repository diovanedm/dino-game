const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;


function handleKeyUp(event) {
    if (event.keyCode === 32) {
        !isJumping ? jump() : ''; // === (isJumping == false)
    }
}

function jump() {
    isJumping = true;
    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 20)

        }
        position += 20;
        dino.style.bottom = position + 'px'
    }, 20);
}

function refresh() {
    window.location.reload();
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1200;
    let randomTime = Math.random() * 6000;

    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + 'px';
    background.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval)
            background.removeChild(cactus);
        } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            // Game over
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over">Fim do jogo</h1>';

            let btnRefresh = document.createElement('button');
            btnRefresh.classList.add('btnRefresh');
            btnRefresh.onclick = refresh;

            let textContent = document.createTextNode('Jogar novamente')
            btnRefresh.appendChild(textContent);

            document.querySelector('body').appendChild(btnRefresh);


            // '<button onclick="refresh()">Jogar novamente</button>'
        } else {
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        }
    }, 20)

    setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);



