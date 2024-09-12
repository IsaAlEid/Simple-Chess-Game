const gameBoard = document.querySelector('#gameBoard')
const playerDisplay = document.querySelector('#player')
const infoDisplay = document.querySelector('#info-display')
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
function resetGame() {
  gameBoard.innerHTML = ''

  chessPieces = [
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

  playerTurn = 'white'
  playerDisplay.textContent = 'white'

  createBoard()
}

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

const allSquares = document.querySelectorAll('.square')

allSquares.forEach((square) => {
  square.addEventListener('dragstart', dragStart)
  square.addEventListener('dragover', dragOver)
  square.addEventListener('drop', dragDrop)
})

let startPositionId
let draggedPiece

function dragStart(e) {
  startPositionId = e.target.parentNode.getAttribute('square-id')
  draggedPiece = e.target
}

function dragOver(e) {
  e.preventDefault()
}

function dragDrop(e) {
  e.stopPropagation()
  const correctTurn = draggedPiece.firstChild.classList.contains(playerTurn)
  const taken = e.target.classList.contains('piece')
  const valid = checkIfValid(e.target)
  const opponentTurn = playerTurn === 'black' ? 'white' : 'black'
  const takenByOpponent = e.target.firstChild?.classList.contains(opponentTurn)

  if (correctTurn) {
    if (takenByOpponent && valid) {
      e.target.appendChild(draggedPiece)
      e.target.remove()
      checkForWin()
      changePlayer()
      return
    }
    if (taken && !takenByOpponent) {
      infoDisplay.textContent = 'invalid move'
      setTimeout(() => ((infoDisplay.textContent = ''), 2000))
      return
    }

    if (valid) {
      e.target.append(draggedPiece)
      checkForWin()
      changePlayer()
      return
    }
  }
}
function checkIfValid(target) {
  const targetId =
    Number(target.getAttribute('square-id')) ||
    Number(target.parentNode.getAttribute('square-id'))
  Number(startPositionId)
  const piece = draggedPiece.firstChild.getAttribute('piece')
  switch (piece) {
    case 'pawn':
      const starterRow = [8, 9, 10, 11, 12, 13, 14, 15]
      if (
        (starterRow.includes(startId) && startId + width * 2 === targetId) ||
        startId + width === targetId ||
        startId + width - 1 === targetId ||
        (targetId &&
          document.querySelector(`[square-id="${startIdId + width - 1}"]`)
            .firstChild) ||
        (startId + width + 1 === targetId &&
          document.querySelector(`[square-id="${startIdId + width + 1}"]`)
            .firstChild)
      ) {
        return true
      }
      break
    case knight:
      if (
        startId + width * 2 + 1 === targetId ||
        startId + width * 2 - 1 === targetId ||
        startId + width - 2 === targetId ||
        startId + width + 2 === targetId ||
        tartId - width * 2 + 1 === targetId ||
        startId - width * 2 - 1 === targetId ||
        startId - width - 2 === targetId ||
        startId - width + 2 === targetId
      ) {
        return true
      }
      break
    case bishop:
      if (
        startId + width + 1 === targetId ||
        (startId + width * 2 + 2 === targetId &&
          document.querySelector(`[square-id="${startId + width + 1}"]`)
            .firstChild) ||
        (startId + width * 3 + 3 === targetId &&
          document.querySelector(`[square-id="${startId + width + 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2 + 2}"]`)
            .firstChild) ||
        (startId + width * 4 + 4 === targetId &&
          document.querySelector(`[square-id="${startId + width + 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2 + 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 3 + 3}"]`)
            .firstChild) ||
        (startId + width * 5 + 5 === targetId &&
          document.querySelector(`[square-id="${startId + width + 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2 + 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 3 + 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 4 + 4}"]`)
            .firstChild) ||
        (startId + width * 6 + 6 === targetId &&
          document.querySelector(`[square-id="${startId + width + 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2 + 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 3 + 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 4 + 4}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 5 + 5}"]`)
            .firstChild) ||
        (startId + width * 7 + 7 === targetId &&
          document.querySelector(`[square-id="${startId + width + 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2 + 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 3 + 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 4 + 4}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 5 + 5}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 6 + 6}"]`)
            .firstChild) ||
        // --

        startId - width - 1 === targetId ||
        (startId - width * 2 - 2 === targetId &&
          document.querySelector(`[square-id="${startId - width - 1}"]`)
            .firstChild) ||
        (startId + width * 3 - 3 === targetId &&
          document.querySelector(`[square-id="${startId - width - 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2 - 2}"]`)
            .firstChild) ||
        (startId + width * 4 - 4 === targetId &&
          document.querySelector(`[square-id="${startId - width - 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2 - 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 3 - 3}"]`)
            .firstChild) ||
        (startId - width * 5 - 5 === targetId &&
          document.querySelector(`[square-id="${startId - width - 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2 - 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 3 - 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 4 - 4}"]`)
            .firstChild) ||
        (startId + width * 6 - 6 === targetId &&
          document.querySelector(`[square-id="${startId - width - 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2 - 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 3 - 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 4 - 4}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 5 - 5}"]`)
            .firstChild) ||
        (startId - width * 7 - 7 === targetId &&
          document.querySelector(`[square-id="${startId + width + 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2 - 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 3 - 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 4 - 4}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 5 - 5}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 6 - 6}"]`)
            .firstChild) ||
        // --

        startId - width + 1 === targetId ||
        (startId - width * 2 + 2 === targetId &&
          document.querySelector(`[square-id="${startId - width + 1}"]`)
            .firstChild) ||
        (startId - width * 3 + 3 === targetId &&
          document.querySelector(`[square-id="${startId - width + 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2 + 2}"]`)
            .firstChild) ||
        (startId - width * 4 + 4 === targetId &&
          document.querySelector(`[square-id="${startId - width + 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2 + 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 3 + 3}"]`)
            .firstChild) ||
        (startId - width * 5 + 5 === targetId &&
          document.querySelector(`[square-id="${startId - width + 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2 + 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 3 + 3}"]`)
            .firstChild === targetId &&
          document.querySelector(`[square-id="${startId - width * 4 + 4}"]`)
            .firstChild) ||
        (startId - width * 6 + 6 &&
          document.querySelector(`[square-id="${startId - width + 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2 + 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 3 + 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 4 + 4}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 5 + 5}"]`)
            .firstChild) ||
        (startId - width * 7 + 7 === targetId &&
          document.querySelector(`[square-id="${startId - width + 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2 + 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 3 + 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 4 + 4}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 5 + 5}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 6 + 6}"]`)
            .firstChild) ||
        // --

        startId + width - 1 === targetId ||
        (startId + width * 2 - 2 === targetId &&
          document.querySelector(`[square-id="${startId + width - 1}"]`)
            .firstChild) ||
        (startId + width * 3 - 3 === targetId &&
          document.querySelector(`[square-id="${startId + width - 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2 - 2}"]`)
            .firstChild) ||
        (startId + width * 4 - 4 === targetId &&
          document.querySelector(`[square-id="${startId + width - 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2 - 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 3 - 3}"]`)
            .firstChild) ||
        (startId + width * 5 - 5 === targetId &&
          document.querySelector(`[square-id="${startId + width - 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2 - 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 3 - 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 4 - 4}"]`)
            .firstChild) ||
        (startId + width * 6 - 6 === targetId &&
          document.querySelector(`[square-id="${startId + width - 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2 - 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 3 - 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 4 - 4}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 5 - 5}"]`)
            .firstChild) ||
        (startId + width * 7 - 7 === targetId &&
          document.querySelector(`[square-id="${startId + width - 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2 - 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 3 - 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 4 - 4}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 5 - 5}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 6 - 6}"]`)
            .firstChild)
      ) {
        return true
      }
      break
    case rook:
      if (
        startId + width === targetId ||
        (startId + width * 2 === targetId &&
          document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild) ||
        (startId + width * 3 === targetId &&
          document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild) ||
        (startId + width * 4 === targetId &&
          document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 3}"]`)
            .firstChild) ||
        (startId + width * 5 === targetId &&
          document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 4}"]`)
            .firstChild) ||
        (startId + width * 6 === targetId &&
          document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 4}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 5}"]`)
            .firstChild) ||
        (startId + width * 7 === targetId &&
          document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 4}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 5}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 6}"]`)
            .firstChild) ||
        // --
        startId - width === targetId ||
        (startId - width * 2 &&
          document.querySelector(`[square-id="${startId - width}"])`)
            .firstChild) ||
        (startId - width * 3 &&
          document.querySelector(`[square-id="${startId - width}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2}"])`)
            .firstChild) ||
        (startId - width * 4 &&
          document.querySelector(`[square-id="${startId - width}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 3}"])`)
            .firstChild) ||
        (startId - width * 5 &&
          document.querySelector(`[square-id="${startId - width}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 3}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 4}"])`)
            .firstChild) ||
        (startId - width * 6 &&
          document.querySelector(`[square-id="${startId - width}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 3}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 4}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 5}"])`)
            .firstChild) ||
        (startId - width * 7 &&
          document.querySelector(`[square-id="${startId - width}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 3}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 4}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 5}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 6}"])`)
            .firstChild) ||
        // --
        startId + 1 === targetId ||
        (startId + 2 &&
          document.querySelector(`[square-id="${startId + 1}"])`).firstChild) ||
        (startId + 3 &&
          document.querySelector(`[square-id="${startId + 1}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 2}"])`).firstChild) ||
        (startId + 4 &&
          document.querySelector(`[square-id="${startId + 1}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 2}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 3}"])`).firstChild) ||
        (startId + 5 &&
          document.querySelector(`[square-id="${startId + 1}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 2}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 3}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 4}"])`).firstChild) ||
        (startId + 6 &&
          document.querySelector(`[square-id="${startId + 1}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 2}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 3}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 4}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 5}"])`).firstChild) ||
        (startId + 7 &&
          document.querySelector(`[square-id="${startId + 1}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 2}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 3}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 4}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 5}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 6}"])`).firstChild) ||
        // --
        startId - 1 === targetId ||
        (startId - 2 &&
          document.querySelector(`[square-id="${startId - 1}"])`).firstChild) ||
        (startId - 3 &&
          document.querySelector(`[square-id="${startId - 1}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 2}"])`).firstChild) ||
        (startId - 4 &&
          document.querySelector(`[square-id="${startId - 1}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 2}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 3}"])`).firstChild) ||
        (startId - 5 &&
          document.querySelector(`[square-id="${startId - 1}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 2}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 3}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 4}"])`).firstChild) ||
        (startId - 6 &&
          document.querySelector(`[square-id="${startId - 1}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 2}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 3}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 4}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 5}"])`).firstChild) ||
        (startId - 7 &&
          document.querySelector(`[square-id="${startId - 1}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 2}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 3}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 4}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 5}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 6}"])`).firstChild)
      ) {
        return true
      }

      break
    case queen:
      if (
        startId + width + 1 === targetId ||
        (startId + width * 2 + 2 === targetId &&
          document.querySelector(`[square-id="${startId + width + 1}"]`)
            .firstChild) ||
        (startId + width * 3 + 3 === targetId &&
          document.querySelector(`[square-id="${startId + width + 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2 + 2}"]`)
            .firstChild) ||
        (startId + width * 4 + 4 === targetId &&
          document.querySelector(`[square-id="${startId + width + 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2 + 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 3 + 3}"]`)
            .firstChild) ||
        (startId + width * 5 + 5 === targetId &&
          document.querySelector(`[square-id="${startId + width + 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2 + 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 3 + 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 4 + 4}"]`)
            .firstChild) ||
        (startId + width * 6 + 6 === targetId &&
          document.querySelector(`[square-id="${startId + width + 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2 + 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 3 + 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 4 + 4}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 5 + 5}"]`)
            .firstChild) ||
        (startId + width * 7 + 7 === targetId &&
          document.querySelector(`[square-id="${startId + width + 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2 + 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 3 + 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 4 + 4}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 5 + 5}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 6 + 6}"]`)
            .firstChild) ||
        // --

        startId - width - 1 === targetId ||
        (startId - width * 2 - 2 === targetId &&
          document.querySelector(`[square-id="${startId - width - 1}"]`)
            .firstChild) ||
        (startId + width * 3 - 3 === targetId &&
          document.querySelector(`[square-id="${startId - width - 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2 - 2}"]`)
            .firstChild) ||
        (startId + width * 4 - 4 === targetId &&
          document.querySelector(`[square-id="${startId - width - 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2 - 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 3 - 3}"]`)
            .firstChild) ||
        (startId - width * 5 - 5 === targetId &&
          document.querySelector(`[square-id="${startId - width - 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2 - 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 3 - 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 4 - 4}"]`)
            .firstChild) ||
        (startId + width * 6 - 6 === targetId &&
          document.querySelector(`[square-id="${startId - width - 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2 - 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 3 - 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 4 - 4}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 5 - 5}"]`)
            .firstChild) ||
        (startId - width * 7 - 7 === targetId &&
          document.querySelector(`[square-id="${startId + width + 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2 - 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 3 - 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 4 - 4}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 5 - 5}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 6 - 6}"]`)
            .firstChild) ||
        // --

        startId - width + 1 === targetId ||
        (startId - width * 2 + 2 === targetId &&
          document.querySelector(`[square-id="${startId - width + 1}"]`)
            .firstChild) ||
        (startId - width * 3 + 3 === targetId &&
          document.querySelector(`[square-id="${startId - width + 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2 + 2}"]`)
            .firstChild) ||
        (startId - width * 4 + 4 === targetId &&
          document.querySelector(`[square-id="${startId - width + 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2 + 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 3 + 3}"]`)
            .firstChild) ||
        (startId - width * 5 + 5 === targetId &&
          document.querySelector(`[square-id="${startId - width + 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2 + 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 3 + 3}"]`)
            .firstChild === targetId &&
          document.querySelector(`[square-id="${startId - width * 4 + 4}"]`)
            .firstChild) ||
        (startId - width * 6 + 6 &&
          document.querySelector(`[square-id="${startId - width + 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2 + 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 3 + 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 4 + 4}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 5 + 5}"]`)
            .firstChild) ||
        (startId - width * 7 + 7 === targetId &&
          document.querySelector(`[square-id="${startId - width + 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2 + 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 3 + 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 4 + 4}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 5 + 5}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 6 + 6}"]`)
            .firstChild) ||
        // --

        startId + width - 1 === targetId ||
        (startId + width * 2 - 2 === targetId &&
          document.querySelector(`[square-id="${startId + width - 1}"]`)
            .firstChild) ||
        (startId + width * 3 - 3 === targetId &&
          document.querySelector(`[square-id="${startId + width - 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2 - 2}"]`)
            .firstChild) ||
        (startId + width * 4 - 4 === targetId &&
          document.querySelector(`[square-id="${startId + width - 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2 - 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 3 - 3}"]`)
            .firstChild) ||
        (startId + width * 5 - 5 === targetId &&
          document.querySelector(`[square-id="${startId + width - 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2 - 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 3 - 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 4 - 4}"]`)
            .firstChild) ||
        (startId + width * 6 - 6 === targetId &&
          document.querySelector(`[square-id="${startId + width - 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2 - 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 3 - 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 4 - 4}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 5 - 5}"]`)
            .firstChild) ||
        (startId + width * 7 - 7 === targetId &&
          document.querySelector(`[square-id="${startId + width - 1}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2 - 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 3 - 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 4 - 4}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 5 - 5}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 6 - 6}"]`)
            .firstChild) ||
        // --

        startId + width === targetId ||
        (startId + width * 2 === targetId &&
          document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild) ||
        (startId + width * 3 === targetId &&
          document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild) ||
        (startId + width * 4 === targetId &&
          document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 3}"]`)
            .firstChild) ||
        (startId + width * 5 === targetId &&
          document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 4}"]`)
            .firstChild) ||
        (startId + width * 6 === targetId &&
          document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 4}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 5}"]`)
            .firstChild) ||
        (startId + width * 7 === targetId &&
          document.querySelector(`[square-id="${startId + width}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 2}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 3}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 4}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 5}"]`)
            .firstChild &&
          document.querySelector(`[square-id="${startId + width * 6}"]`)
            .firstChild) ||
        // --
        startId - width === targetId ||
        (startId - width * 2 &&
          document.querySelector(`[square-id="${startId - width}"])`)
            .firstChild) ||
        (startId - width * 3 &&
          document.querySelector(`[square-id="${startId - width}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2}"])`)
            .firstChild) ||
        (startId - width * 4 &&
          document.querySelector(`[square-id="${startId - width}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 3}"])`)
            .firstChild) ||
        (startId - width * 5 &&
          document.querySelector(`[square-id="${startId - width}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 3}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 4}"])`)
            .firstChild) ||
        (startId - width * 6 &&
          document.querySelector(`[square-id="${startId - width}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 3}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 4}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 5}"])`)
            .firstChild) ||
        (startId - width * 7 &&
          document.querySelector(`[square-id="${startId - width}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 2}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 3}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 4}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 5}"])`)
            .firstChild &&
          document.querySelector(`[square-id="${startId - width * 6}"])`)
            .firstChild) ||
        // --
        startId + 1 === targetId ||
        (startId + 2 &&
          document.querySelector(`[square-id="${startId + 1}"])`).firstChild) ||
        (startId + 3 &&
          document.querySelector(`[square-id="${startId + 1}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 2}"])`).firstChild) ||
        (startId + 4 &&
          document.querySelector(`[square-id="${startId + 1}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 2}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 3}"])`).firstChild) ||
        (startId + 5 &&
          document.querySelector(`[square-id="${startId + 1}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 2}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 3}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 4}"])`).firstChild) ||
        (startId + 6 &&
          document.querySelector(`[square-id="${startId + 1}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 2}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 3}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 4}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 5}"])`).firstChild) ||
        (startId + 7 &&
          document.querySelector(`[square-id="${startId + 1}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 2}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 3}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 4}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 5}"])`).firstChild &&
          document.querySelector(`[square-id="${startId + 6}"])`).firstChild) ||
        // --
        startId - 1 === targetId ||
        (startId - 2 &&
          document.querySelector(`[square-id="${startId - 1}"])`).firstChild) ||
        (startId - 3 &&
          document.querySelector(`[square-id="${startId - 1}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 2}"])`).firstChild) ||
        (startId - 4 &&
          document.querySelector(`[square-id="${startId - 1}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 2}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 3}"])`).firstChild) ||
        (startId - 5 &&
          document.querySelector(`[square-id="${startId - 1}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 2}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 3}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 4}"])`).firstChild) ||
        (startId - 6 &&
          document.querySelector(`[square-id="${startId - 1}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 2}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 3}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 4}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 5}"])`).firstChild) ||
        (startId - 7 &&
          document.querySelector(`[square-id="${startId - 1}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 2}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 3}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 4}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 5}"])`).firstChild &&
          document.querySelector(`[square-id="${startId - 6}"])`).firstChild)
      ) {
        return true
      }
      break
    case king:
      if (
        startId + width + 1 === targetId ||
        startId + width === targetId ||
        startId + width - 1 === targetId ||
        startId + 1 === targetId ||
        startId - 1 === targetId ||
        startId - width + 1 === targetId ||
        startId - width === targetId ||
        startId - width - 1 === targetId
      ) {
        return true
      }
  }
}

function changePlayer() {
  reverseIds
  if (playerTurn === 'white') {
    playerTurn = 'black'
    playerDisplay.textContent = 'black'
  } else {
    revertIds
    playerTurn = 'white'
    playerDisplay.textContent = 'white'
  }
  function reverseIds() {
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach((square, i) =>
      square.setAttribute('squareId', width * width - 1 - i)
    )
  }
  function revertIds() {
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach((square, i) => square.setAttribute('squareId', i))
    const startId = Number(startPositionId)
    const piece = draggedPiece.startId
    console.log(targetId, targetId)
    console.log(startId, startId)
    console.log(piece, piece)
  }
}
function checkForWin() {
  const kings = array.from(document.querySelectorAll('.king'))
  if (!kings.some((king) => king.firstChild.classlist.contains('white'))) {
    infoDisplay.innerHTML = 'Black wins'
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach((square) =>
      square.firstChild?.setAttribute('draggable', false)
    )
  }
  if (!kings.some((king) => king.firstChild.classlist.contains('black'))) {
    infoDisplay.innerHTML = 'White wins'
    const allSquares = document.querySelectorAll('.square')
    allSquares.forEach((square) =>
      square.firstChild?.setAttribute('draggable', false)
    )
  }
}
