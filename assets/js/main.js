/* 

Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco.

Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
Attenzione: **nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.

In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina. 

Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.

La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).

Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.

BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

*/

//const btn
const btnPlay = document.querySelector('#btn_play');
const btnReset = document.querySelector('#btn_reset');

//const grid
const grid = document.querySelector('.grid');

//select difficulty el
let selectDifficultyEl = document.querySelector('select');

//limit
let limit;
/* let limit = 100; */

//const bombs
const bombsNumber = 16;
let bombsArray = [];

let resultEl = document.querySelector('.result');
let gameOverEl = document.createElement('h1');
resultEl.append(gameOverEl);
let scoreEl = document.createElement('div');
resultEl.append(scoreEl);

scoreEl.style.color = 'white';
scoreEl.style.paddingBottom = '1rem';

let gameOver = false;

let score = 0;


changeDifficulty();
console.log(limit);

//al click del button play si genera una griglia di gioco
btnPlay.addEventListener('click', function (e) {

    //console.log('click');

    btnPlay.style.display = 'none';
    btnReset.style.display = 'inline-block';
    selectDifficultyEl.style.display = 'none';

    const gridEl = document.querySelector('.grid');

    generateBombs(limit);
    generateGrid(gridEl, limit);


});

//al click del button reset la griglia scompare
btnReset.addEventListener('click', function (e) {
    btnPlay.style.display = 'inline-block';
    btnReset.style.display = 'none';
    selectDifficultyEl.style.display = 'inline-block';

    bombsArray = [];
    score = 0;
    gameOver = false;
    gameOverEl.innerHTML = '';
    scoreEl.innerHTML = '';

    for (let i = 0; i < limit; i++) {

        // Select the first element with class "cell"
        const cells = document.querySelector(".cell");
        //remove the selected element from the dom
        cells.remove();

    }
});



/* ########## FUNCTIONS ########## */

//creo una funzione per generare la griglia
function generateGrid(domEl, limit) {

    //genero la griglia 
    for (let i = 0; i < limit; i++) {

        //const cellEl = document.createElement('div');
        //cellEl.className = 'cell';
        //cellEl.append(i + 1);
        //domEl.append(cellEl);
        //console.log(cellEl);

        //generate the grid
        //Ogni cella ha un numero progressivo da 1 a 100.
        const cellMarkupEl = generateCell(i + 1, 'div', 'cell', limit);

        /* //cliccando sulla cella, la cella si colora di azzurro ed emette un messaggio in console
        cellEl.addEventListener('click', function () {
            //console.log('click on', cellEl);
            this.classList.toggle('point');
        }) */

        //append to the dom element
        grid.append(cellMarkupEl);

    }
}

function generateCell(numb, el, css_class, limit) {

    //console.log(this);

    //generate the grid cell
    const cellMarkupEl = document.createElement(el);
    cellMarkupEl.append(numb);
    cellMarkupEl.classList.add(css_class);
    cellMarkupEl.style.width = `calc(100% / ${Math.sqrt(limit)})`;

    //Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
    cellMarkupEl.addEventListener('click', function (ev) {
        console.log(this);

        if (!gameOver) {
            if (bombsArray.includes(numb)) {
                this.classList.add('bomb');
                gameOverEl.innerHTML = '💥 BOOOM!!! Hai perso 💣';
                gameOver = true;
                scoreEl.innerHTML = `Hai totalizzato un punteggio di: ${score}`;
            } else {
                if (!this.classList.contains('point') && !gameOver) {
                    this.classList.toggle('point');
                    score++;
                    console.log(score + ' questo è il punteggio');
                    if (score === limit - bombsArray.length) {
                        gameOverEl.innerHTML = '🌷 Complimenti! Hai vinto! 🌸';
                        gameOver = true;
                        scoreEl.innerHTML = `Hai totalizzato il punteggio massimo di: ${score}`;
                    }
                }
            }
            console.log(this.innerText);
        }
    })

    return cellMarkupEl;
}

function changeDifficulty() {

    //const difficulty
    limit = Number(document.getElementById('difficulty').value);
    //console.log(difficulty);

    return limit;
}

function generateBombs(limit) {

    // ciclo 16 volte
    while (bombsArray.length < bombsNumber) {
        const bomb = Math.floor(Math.random() * limit) + 1;

        if (!bombsArray.includes(bomb)) {
            bombsArray.push(bomb);
        }
    }

    console.log(bombsArray);

    return bombsArray;
}
