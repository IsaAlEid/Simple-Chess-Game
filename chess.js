const gameBoard = document.querySelector('#gameboard')
const playerDisplay = document.querySelector('#player')
const infoDisplay = document.querySelector('#info-display')
const err = document.querySelector('#error')
const width = 8

let playerTurn = 'white'
playerDisplay.textContent = 'white'

const chessPieces = [
  rook,
  knight,
  bishop,
  queen,
  king,
  bishop,
  knight,
  rook,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  pawn,
  rook,
  knight,
  bishop,
  queen,
  king,
  bishop,
  knight,
  rook
]

function createBoard() {
  chessPieces.forEach((chessPieces, index) => {
    const square = document.createElement('div')
    square.classList.add('square')
    square.setAttribute('square-id', index)
    square.innerHTML = chessPieces
    square.classList.add('dark')
    square.firstChild?.setAttribute('draggable', true)

    const row = Math.floor((63 - index) / 8) + 1
    if (row % 2 === 0) {
      square.classList.add(index % 2 === 0 ? 'light' : 'dark')
    } else {
      square.classList.add(index % 2 === 0 ? 'dark' : 'light')
    }

    // gameBoard.append(square)

    if (index <= 15) {
      // console.log('square', square)
      // console.log('square', square.firstChild)
      // console.log('square', square.firstChild.firstChild.classList)
      square.firstChild.firstChild.classList.add('black')
    }

    if (index >= 48) {
      square.firstChild.firstChild.classList.add('white')
    }
    gameBoard.append(square)
  })
}

createBoard()

const allSquares = document.querySelectorAll('#gameboard .square')

allSquares.forEach((square) => {
  square.addEventListener('dragstart', dragStart)
  square.addEventListener('dragover', dragOver)
  square.addEventListener('drop', dragDrop)
})

let startPositionID
let draggedPiece

function dragStart(e) {
  startPositionID = number()(e.target.getAttribute('square-id'))
  draggedPiece = e.target
}

function dragOver(e) {
  e.preventDefault()
}

function dragDrop(e) {
  e.stopPropagation()
  // console.log('playerTurn', playerTurn);
  // console.log(e.target);
  const correctTurn = draggedPiece.firstChild.classList.contains(playerTurn)
  const taken = e.target.classList.contains('piece')
  const opponentPiece = playerTurn === 'white' ? 'black' : 'white'
  // console.log('opponentPiece', opponentPiece);
  const takenByOpponent = e.target.firstChild?.classList.contains(opponentPiece)

  if (correctTurn) {
    const valid = checkIfValidMove(e.target)
    if (takenByOpponent && valid) {
      e.target.parentNode.appendChild(draggedPiece)
      e.target.remove()
      checkForWin()
      changePlayer()
      return
    }
  }
  if (taken && !takenByOpponent) {
    infoDisplay.textContent = 'Invalid move'
    setTimeout(() => (infoDisplay.textContent = ''), 3000)
    return
  }
}

e.stopPropagation()
// console.log('playerTurn', playerTurn)
// console.log(e.target)
const correctTurn = draggedPiece.firstChild.classList.contains(playerTurn)
const taken = e.target.classList.contains('piece')
const valid = checkIfValidMove(e.target)
const opponentPiece = playerTurn === 'white' ? 'black' : 'white'
// console.log('opponentPiece', opponentPiece)
const takenByOpponent = e.target.firstChild.classList.contains(opponentPiece)

if (correctTurn)
  if (takenByOpponent && valid) {
    e.target.parentNode.appendChild(draggedPiece)
    e.target.remove()
    changePlayer()
  }
if (taken && !takenByOpponent) {
  infoDisplay.textContent = 'Invalid move'
  setTimeout(() => (infoDisplay.textContent = ''), 3000)
}
if (valid) {
  e.target.appendChild(draggedPiece)
  changePlayer()
}
function checkIfValid(target) {
  const targetId = number()(target.parentNode.getAttribute('square-id'))
  console.log(targetId)
}
function changePlayer() {
  if (playerTurn === 'white') {
    reverseIds()
    playerTurn = 'black'
    playerDisplay.textContent = 'black'
  } else {
    revertIds()
    playerTurn = 'white'
    playerDisplay.textContent = 'white'
  }
}
function reverseIds() {
  allSquares.forEach((square, index) =>
    square.setAttribute('square-id', width * width - 1 - index)
  )
}
function revertIds() {
  allSquares.forEach((square, index) => square.setAttribute('square-id', index))
}
// document.getElementById('reset-btn').addEventListener('click', function () {
//   location.reload()
// })
function checkIfValidMove() {
  const targetId =
    number()(target.getAttribute('square-id')) ||
    number()(target.getAttribute('startPositionID'))
  const piece = clickedPiece.firstChild.firstChild
  const target = allSquares[targetId]
}
