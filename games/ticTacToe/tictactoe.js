const board=document.getElementById('board');
const gameOverScreen = document.getElementById('gameOverScreen');
const replayBtn = document.getElementById('replayBtn');
const exitBtn = document.getElementById('exitBtn');
const winnerText = document.getElementById('winner');
const gameOverText = document.getElementById('gameOverText');

let current='X',cells=[];
function showGameOver(text) {
    gameOverText.innerText = text;
    gameOverScreen.style.opacity = '1';
    gameOverScreen.style.pointerEvents = 'auto';
    gameOverScreen.style.display = 'flex';
}

function hideGameOver() {
    gameOverScreen.style.opacity = '0';
    gameOverScreen.style.pointerEvents = 'none';
    setTimeout(() => {
        gameOverScreen.style.display = 'none';
    }, 300);
}

function checkWinner(){
    const combos=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for(let c of combos){
        if(cells[c[0]].innerText && cells[c[0]].innerText===cells[c[1]].innerText && cells[c[1]].innerText===cells[c[2]].innerText){
            winnerText.innerText=current+" wins!";
            setTimeout(() => showGameOver(current + " wins!"), 500);
            return true;
        }
    }
    if(cells.every(cell=>cell.innerText)) {
        winnerText.innerText="Draw!";
        setTimeout(() => showGameOver("Draw!"), 500);
        return false;
    }
    return false;
}
function initGame() {
    winnerText.innerText = '';
    gameOverScreen.style.opacity = '0';
    gameOverScreen.style.pointerEvents = 'none';
    gameOverScreen.style.display = 'none';
    current = 'X';
    cells = [];
    const board = document.getElementById('board');
    board.innerHTML = '';
    for(let i=0;i<9;i++){
        const cell=document.createElement('div'); cell.className='cell';
        cell.addEventListener('click',()=>{
            if(!cell.innerText && !winnerText.innerText){
                cell.innerText=current;
                if(!checkWinner()){current=current==='X'?'O':'X';}
            }
        });
        board.appendChild(cell);
        cells.push(cell);
    }
}
replayBtn.addEventListener('click', () => {
    hideGameOver();
    setTimeout(initGame, 300);
});

exitBtn.addEventListener('click', () => {
    window.location.href = '../../index.html';
});

initGame();
