const CIRCLE_CLASS = 'circle'
const X_CLASS = 'x'
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const cellElements = document.querySelectorAll('[data-cell]')
const restartButton = document.querySelector("#restart-btn")
let circleTurn
let winner = circleTurn ? 'O' : 'X'

startGame()

function startGame () {
    circleTurn = false
    cellElements.forEach(cell => {
        cell.addEventListener('click', handleClick, { once: true })
    })   
}

function handleClick (e) {
    const cell = e.target
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    
    placeMark(cell, currentClass)
    switchElm ()

    if( checkWin (currentClass) ) {
        endGame (false)
    } else if (boardIsFull ()) {
        endGame (true)
    }
}


restartButton.addEventListener('click', function () {
    location.reload()
})



function placeMark (cell, currentClass) {
    cell.classList.add(currentClass)
}

function switchElm () {
    circleTurn = !circleTurn
}

function checkWin (currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function endGame (drow) {
    if (drow) {
        document.querySelector('.winning-message').classList.add('show')
        document.querySelector('#message').innerHTML = ''
    } else {
       document.querySelector('.winning-message').classList.add('show')
       document.querySelector('#message').innerHTML = `${circleTurn ? "X's" : "O's"} Win!`
    }
}


function boardIsFull () {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

