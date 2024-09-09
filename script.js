// Isa Al-Eid
// September 4th, 2024
// Pseudo Code – Simple Chess Game
// I.	Game Screen lay-out
// a.	Header :
// i.	Game title : “Chess Game”
// ii.	Buttons
// 1.	“New Game” (to start a new game)
// 2.	“Quit Game” (to quit the game)
// 3.	“Undo Move” (to undo the last moved performed)
// 4.	“Restart” (to Reset the game/start over)
// b.	Main area:
// i.	Chessboard:
// 1.	A box grid set at 8x8 squares
// 2.	Each square hold one chess piece
// 3.	The squares are of two colors (e.g., black and white)
// 4.	The bottom left corner being (a1) is black; the top right corner would (h8) is white.
// ii.	Pieces
// 1.	Each chess piece will be displayed on their respective square.
// 2.	The pieces will be represented by either icons or images.
// 3.	The whites pieces will star on the bottom two rows (i.e. rank 1 and 2)
// 4.	The black pieces will star on the  top two rows (i.e. ranks 7 and 8)
// 5.	Side Panels:
// a.	Player information
// i.	Displays the players current turn (e.g. “Whites turn”).
// ii.	A list to show both players captured pieces.
// b.	Move History:
// i.	Using standard chess notation, a list will show all moves made (e.g. “e2 to e4”).
// c.	Game Status:
// i.	Displays game alert messages (e.g. “Check”, “Checkmate” ‘Stalemate”).
// ii.	Shows the winner at the end of the Game (e.g. “Black wins”).
// c.	Footer:
// i.	Controls:
// 1.	“Save Game” (to save current game state)
// 2.	“Load Game” (to load a previously saved game)
// ii.	Tips and/or Instructions
// 1.	A small are for showing basic tips and/or instructions on what the players needs to do (e.g. “Try dragging a piece to move it”).
