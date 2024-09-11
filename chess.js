const gameBoard = document.querySelector('#gameboard')
const playerDisplay = document.querySelector('#player')
const infoDisplay = document.querySelector('#info-display')
const err = document.querySelector('#error')
const width = 8
// const resetButton = document.getElementById('reset')

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

// resetButton.addEventListener('click', resetGame)

// function resetGame() {
//   resetGameBoard
//   resetGame()
// }

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

    gameBoard.append(square)

    if (index <= 15) {
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
  square.addEventListener('dragstart', dragstart)
  square.addEventListener('dragover', dragover)
  square.addEventListener('drop', dragDrop)
})

let startPositionId
let draggedPiece

function dragstart(e) {
  startPositionId = e.target.parentNode.getAttribute('square-id')
  draggedElement = e.target
}

function dragover(e) {
  e.preventDefault()
}

function dragDrop(e) {
  e.stopPropagation()
  const correctTurn = draggedPiece.firstChild.classList.contains(playerTurn)
  const taken = e.target.classList.contains('piece')
  const valid = checkIfValidMove(e.target)
  const opponentPiece = playerTurn === 'white' ? 'black' : 'white'

  const takenByOpponent = e.target.firstChild?.classList.contains(opponentPiece)

  if (correctTurn) {
    if (takenByOpponent && valid) {
      e.target.parentNode.appendChild(draggedPiece)
      e.target.remove()
      checkForWin()
      changePlayer()
      return
    }
  }
  if (taken && !takenByOpponent) {
    err.textContent = 'Invalid move'
    setTimeout(() => (infoDisplay.textContent = ''), 3000)
    return
  }
  if (valid) {
    console.log(valid, 'is this valid')

    e.target.appendChild(draggedPiece)
    checkForWin()
    changePlayer()
  }
}

function checkIfValid(target) {
  const targetId = Number(target.parentNode.getAttribute('square-id'))
  const piece = draggedPiece
  const startId = Number(startPositionId)

  console.log(startPositionId, targetId, piece)

  console.log(startPositionId, targetId, pieceId)
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

function checkIfValidMove() {
  const targetId =
    number()(target.getAttribute('square-id')) ||
    number()(target.getAttribute('startPositionID'))
  const piece = clickedPiece.firstChild.firstChild
  const target = allSquares[targetId]
  console.log(startId, targetId, pieceId)

  switch (piece) {
    case 'pawn':
      const starterRow = [8, 9, 10, 11, 12, 13, 14, 15]
      if (
        (starterRow.includes(startId) && startId + width * 2 === targetId) ||
        startId + width === targetId ||
        (startId + width - 1 === targetId &&
          document.querySelector(`[square-id = "${startId + width - 1}"]`)
            .firstChild) ||
        (startId + width + 1 === targetId &&
          document.querySelector(`[square-id = "${startId + width + 1}"]`)
            .firstChild)
      ) {
        return true
      }
      break
    case 'knight':
      if (
        startId + width * 2 + 1 === targetId ||
        startId + width * 2 - 1 === targetId ||
        startId + width - 2 === targetId ||
        startId + width + 2 === targetId ||
        startId - width * 2 + 1 === targetId ||
        startId - width * 2 - 1 === targetId ||
        startId - width + 2 === targetId ||
        startId - width - 2 === targetId
      ) {
        return true
      }
      break

    case 'bishop':
      if (
        startId + width + 1 === targetId ||
        (startId + width * 2 + 2 === targetId &&
          !document.querySelector(`[square-id = "${startId + width + 1}"]`)
            .firstChild) ||
        (startId + width * 3 + 3 === targetId &&
          !document.querySelector(`[square-id = "${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`)
            .firstChild) ||
        (startId + width * 4 + 4 === targetId &&
          !document.querySelector(`[square-id = "${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`)
            .firstChild) ||
        (startId + width * 5 + 5 === targetId &&
          !document.querySelector(`[square-id = "${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 4 + 4}"]`)
            .firstChild) ||
        (startId + width * 6 + 6 === targetId &&
          !document.querySelector(`[square-id = "${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 5 + 5}"]`)
            .firstChild) ||
        (startId + width * 7 + 7 === targetId &&
          !document.querySelector(`[square-id = "${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 5 + 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 6 + 6}"]`)
            .firstChild) ||
        startId + width - 1 === targetId ||
        (startId + width * 2 - 2 === targetId &&
          !document.querySelector(`[square-id = "${startId + width - 1}"]`)
            .firstChild) ||
        (startId + width * 3 - 3 === targetId &&
          !document.querySelector(`[square-id = "${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`)
            .firstChild) ||
        (startId + width * 4 - 4 === targetId &&
          !document.querySelector(`[square-id = "${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 - 3}"]`)
            .firstChild) ||
        (startId + width * 5 - 5 === targetId &&
          !document.querySelector(`[square-id = "${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 4 - 4}"]`)
            .firstChild) ||
        (startId + width * 6 - 6 === targetId &&
          !document.querySelector(`[square-id = "${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 5 - 5}"]`)
            .firstChild) ||
        (startId + width * 7 - 7 === targetId &&
          !document.querySelector(`[square-id = "${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 5 - 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 6 - 6}"]`)
            .firstChild) ||
        startId - width - 1 === targetId ||
        (startId - width * 2 - 2 === targetId &&
          !document.querySelector(`[square-id = "${startId - width - 1}"]`)
            .firstChild) ||
        (startId - width * 3 - 3 === targetId &&
          !document.querySelector(`[square-id = "${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`)
            .firstChild) ||
        (startId - width * 4 - 4 === targetId &&
          !document.querySelector(`[square-id = "${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`)
            .firstChild) ||
        (startId - width * 5 - 5 === targetId &&
          !document.querySelector(`[square-id = "${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 4 - 4}"]`)
            .firstChild) ||
        (startId - width * 6 - 6 === targetId &&
          !document.querySelector(`[square-id = "${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 5 - 5}"]`)
            .firstChild) ||
        (startId - width * 7 - 7 === targetId &&
          !document.querySelector(`[square-id = "${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 5 - 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 6 - 6}"]`)
            .firstChild) ||
        startId - width + 1 === targetId ||
        (startId - width * 2 + 2 === targetId &&
          !document.querySelector(`[square-id = "${startId - width + 1}"]`)
            .firstChild) ||
        (startId - width * 3 + 3 === targetId &&
          !document.querySelector(`[square-id = "${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`)
            .firstChild) ||
        (startId - width * 4 + 4 === targetId &&
          !document.querySelector(`[square-id = "${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 + 3}"]`)
            .firstChild) ||
        (startId - width * 5 + 5 === targetId &&
          !document.querySelector(`[square-id = "${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 4 + 4}"]`)
            .firstChild) ||
        (startId - width * 6 + 6 === targetId &&
          !document.querySelector(`[square-id = "${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 5 + 5}"]`)
            .firstChild) ||
        (startId - width * 7 + 7 === targetId &&
          !document.querySelector(`[square-id = "${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 5 + 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 6 + 6}"]`)
            .firstChild)
      ) {
        return true
      }
      break

    case 'rook':
      if (
        startId + width === targetId ||
        (startId + width * 2 === targetId &&
          !document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild) ||
        (startId + width * 3 === targetId &&
          !document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild) ||
        (startId + width * 4 === targetId &&
          !document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3}"]`)
            .firstChild) ||
        (startId + width * 5 === targetId &&
          !document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 4}"]`)
            .firstChild) ||
        (startId + width * 6 === targetId &&
          !document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 5}"]`)
            .firstChild) ||
        (startId + width * 7 === targetId &&
          !document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 6}"]`)
            .firstChild) ||
        startId - width === targetId ||
        (startId - width * 2 === targetId &&
          !document.querySelector(`[square-id="${startId - width}"]`)
            .firstChild) ||
        (startId - width * 3 === targetId &&
          !document.querySelector(`[square-id="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 2}"]`)
            .firstChild) ||
        (startId - width * 4 === targetId &&
          !document.querySelector(`[square-id="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3}"]`)
            .firstChild) ||
        (startId - width * 5 === targetId &&
          !document.querySelector(`[square-id="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 4}"]`)
            .firstChild) ||
        (startId - width * 6 === targetId &&
          !document.querySelector(`[square-id="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 5}"]`)
            .firstChild) ||
        (startId - width * 7 === targetId &&
          !document.querySelector(`[square-id="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 6}"]`)
            .firstChild) ||
        startId + 1 === targetId ||
        (startId + 2 === targetId &&
          !document.querySelector(`[square-id="${startId + 1}"]`).firstChild) ||
        (startId + 3 === targetId &&
          !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 2}"]`).firstChild) ||
        (startId + 4 === targetId &&
          !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 3}"]`).firstChild) ||
        (startId + 5 === targetId &&
          !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 3}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 4}"]`).firstChild) ||
        (startId + 6 === targetId &&
          !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 3}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 4}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 5}"]`).firstChild) ||
        (startId + 7 === targetId &&
          !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 3}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 4}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 5}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 6}"]`).firstChild) ||
        startId - 1 === targetId ||
        (startId - 2 === targetId &&
          !document.querySelector(`[square-id="${startId - 1}"]`).firstChild) ||
        (startId - 3 === targetId &&
          !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 2}"]`).firstChild) ||
        (startId - 4 === targetId &&
          !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 3}"]`).firstChild) ||
        (startId - 5 === targetId &&
          !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 3}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 4}"]`).firstChild) ||
        (startId - 6 === targetId &&
          !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 3}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 4}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 5}"]`).firstChild) ||
        (startId - 7 === targetId &&
          !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 3}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 4}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 5}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 6}"]`).firstChild)
      ) {
        return true
      }
      break

    case 'queen':
      if (
        startId + width + 1 === targetId ||
        (startId + width * 2 + 2 === targetId &&
          !document.querySelector(`[square-id = "${startId + width + 1}"]`)
            .firstChild) ||
        (startId + width * 3 + 3 === targetId &&
          !document.querySelector(`[square-id = "${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`)
            .firstChild) ||
        (startId + width * 4 + 4 === targetId &&
          !document.querySelector(`[square-id = "${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`)
            .firstChild) ||
        (startId + width * 5 + 5 === targetId &&
          !document.querySelector(`[square-id = "${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 4 + 4}"]`)
            .firstChild) ||
        (startId + width * 6 + 6 === targetId &&
          !document.querySelector(`[square-id = "${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 5 + 5}"]`)
            .firstChild) ||
        (startId + width * 7 + 7 === targetId &&
          !document.querySelector(`[square-id = "${startId + width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 5 + 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 6 + 6}"]`)
            .firstChild) ||
        startId + width - 1 === targetId ||
        (startId + width * 2 - 2 === targetId &&
          !document.querySelector(`[square-id = "${startId + width - 1}"]`)
            .firstChild) ||
        (startId + width * 3 - 3 === targetId &&
          !document.querySelector(`[square-id = "${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`)
            .firstChild) ||
        (startId + width * 4 - 4 === targetId &&
          !document.querySelector(`[square-id = "${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 - 3}"]`)
            .firstChild) ||
        (startId + width * 5 - 5 === targetId &&
          !document.querySelector(`[square-id = "${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 4 - 4}"]`)
            .firstChild) ||
        (startId + width * 6 - 6 === targetId &&
          !document.querySelector(`[square-id = "${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 5 - 5}"]`)
            .firstChild) ||
        (startId + width * 7 - 7 === targetId &&
          !document.querySelector(`[square-id = "${startId + width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 5 - 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 6 - 6}"]`)
            .firstChild) ||
        startId - width - 1 === targetId ||
        (startId - width * 2 - 2 === targetId &&
          !document.querySelector(`[square-id = "${startId - width - 1}"]`)
            .firstChild) ||
        (startId - width * 3 - 3 === targetId &&
          !document.querySelector(`[square-id = "${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`)
            .firstChild) ||
        (startId - width * 4 - 4 === targetId &&
          !document.querySelector(`[square-id = "${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`)
            .firstChild) ||
        (startId - width * 5 - 5 === targetId &&
          !document.querySelector(`[square-id = "${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 4 - 4}"]`)
            .firstChild) ||
        (startId - width * 6 - 6 === targetId &&
          !document.querySelector(`[square-id = "${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 5 - 5}"]`)
            .firstChild) ||
        (startId - width * 7 - 7 === targetId &&
          !document.querySelector(`[square-id = "${startId - width - 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 - 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 - 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 4 - 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 5 - 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 6 - 6}"]`)
            .firstChild) ||
        startId - width + 1 === targetId ||
        (startId - width * 2 + 2 === targetId &&
          !document.querySelector(`[square-id = "${startId - width + 1}"]`)
            .firstChild) ||
        (startId - width * 3 + 3 === targetId &&
          !document.querySelector(`[square-id = "${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`)
            .firstChild) ||
        (startId - width * 4 + 4 === targetId &&
          !document.querySelector(`[square-id = "${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 + 3}"]`)
            .firstChild) ||
        (startId - width * 5 + 5 === targetId &&
          !document.querySelector(`[square-id = "${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 4 + 4}"]`)
            .firstChild) ||
        (startId - width * 6 + 6 === targetId &&
          !document.querySelector(`[square-id = "${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 5 + 5}"]`)
            .firstChild) ||
        (startId - width * 7 + 7 === targetId &&
          !document.querySelector(`[square-id = "${startId - width + 1}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 2 + 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 3 + 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 4 + 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId - width * 5 + 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id = "${startId + width * 6 + 6}"]`)
            .firstChild) ||
        startId + width === targetId ||
        (startId + width * 2 === targetId &&
          !document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild) ||
        (startId + width * 3 === targetId &&
          !document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild) ||
        (startId + width * 4 === targetId &&
          !document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3}"]`)
            .firstChild) ||
        (startId + width * 5 === targetId &&
          !document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 4}"]`)
            .firstChild) ||
        (startId + width * 6 === targetId &&
          !document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 5}"]`)
            .firstChild) ||
        (startId + width * 7 === targetId &&
          !document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId + width * 6}"]`)
            .firstChild) ||
        startId - width === targetId ||
        (startId - width * 2 === targetId &&
          !document.querySelector(`[square-id="${startId - width}"]`)
            .firstChild) ||
        (startId - width * 3 === targetId &&
          !document.querySelector(`[square-id="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 2}"]`)
            .firstChild) ||
        (startId - width * 4 === targetId &&
          !document.querySelector(`[square-id="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3}"]`)
            .firstChild) ||
        (startId - width * 5 === targetId &&
          !document.querySelector(`[square-id="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 4}"]`)
            .firstChild) ||
        (startId - width * 6 === targetId &&
          !document.querySelector(`[square-id="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 5}"]`)
            .firstChild) ||
        (startId - width * 7 === targetId &&
          !document.querySelector(`[square-id="${startId - width}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 2}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 3}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 4}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 5}"]`)
            .firstChild &&
          !document.querySelector(`[square-id="${startId - width * 6}"]`)
            .firstChild) ||
        startId + 1 === targetId ||
        (startId + 2 === targetId &&
          !document.querySelector(`[square-id="${startId + 1}"]`).firstChild) ||
        (startId + 3 === targetId &&
          !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 2}"]`).firstChild) ||
        (startId + 4 === targetId &&
          !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 3}"]`).firstChild) ||
        (startId + 5 === targetId &&
          !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 3}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 4}"]`).firstChild) ||
        (startId + 6 === targetId &&
          !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 3}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 4}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 5}"]`).firstChild) ||
        (startId + 7 === targetId &&
          !document.querySelector(`[square-id="${startId + 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 3}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 4}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 5}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId + 6}"]`).firstChild) ||
        startId - 1 === targetId ||
        (startId - 2 === targetId &&
          !document.querySelector(`[square-id="${startId - 1}"]`).firstChild) ||
        (startId - 3 === targetId &&
          !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 2}"]`).firstChild) ||
        (startId - 4 === targetId &&
          !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 3}"]`).firstChild) ||
        (startId - 5 === targetId &&
          !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 3}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 4}"]`).firstChild) ||
        (startId - 6 === targetId &&
          !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 3}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 4}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 5}"]`).firstChild) ||
        (startId - 7 === targetId &&
          !document.querySelector(`[square-id="${startId - 1}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 2}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 3}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 4}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 5}"]`).firstChild &&
          !document.querySelector(`[square-id="${startId - 6}"]`).firstChild)
      ) {
        return true
      }
      break

    case 'king':
      if (
        startId + 1 === targetId ||
        startId - 1 === targetId ||
        startId + width === targetId ||
        startId + width + 1 === targetId ||
        startId + width - 1 === targetId ||
        startId - width === targetId ||
        startId - width + 1 === targetId ||
        startId - width - 1 === targetId
      ) {
        return true
      }
      break
    default:
      break
  }
  function changePlayer() {
    if (playerTurn === 'black') {
      reverseIds()
      playerTurn = 'white'
      playerDetails.textContent = 'white'
    } else {
      revertIds()
      playerTurn = 'black'
      playerDetails.textContent = 'black'
    }
  }

  function reverseIds() {
    const allSquares = document.querySelectorAll('#gameboard .square')
    allSquares.forEach((square, i) => {
      square.setAttribute('square-id', width * width - 1 - i)
    })
  }

  function revertIds() {
    const allSquares = document.querySelectorAll('#gameboard .square')
    allSquares.forEach((square, i) => {
      square.setAttribute('square-id', i)
    })
  }

  function checkForWin() {
    const kings = Array.from(document.querySelectorAll('#king'))

    if (!kings.some((king) => king.firstChild.classList.contains('white'))) {
      infoDisplay.innerHTML = 'Black Player Wins!'
      const allSquares = document.querySelectorAll('.square')
      allSquares.forEach((square) =>
        square.firstChild?.setAttribute('draggable', false)
      )
    }
    if (!kings.some((king) => king.firstChild.classList.contains('black'))) {
      infoDisplay.innerHTML = 'White Player Wins!'
      const allSquares = document.querySelectorAll('.square')
      allSquares.forEach((square) =>
        square.firstChild?.setAttribute('draggable', false)
      )
    }
  }
}
