const Gameboard = (() => {
	const rows = 3;
	const cols = 3;
	// const board = [
	// 	["", "x", ""],
	// 	["", "", ""],
	// 	["", "", ""],
	// ];

	const board = [
		["o", "x", "x"],
		["x", "o", "o"],
		["x", "o", "x"],
	];

	const getBoard = () => board;
	const getSpecificCell = (row, col) => board[row][col];
	const setSpecificCell = (row, col, player) => {
		if (getSpecificCell(row, col) === "") {
			board[row][col] = player;
		}
	};

	const printBoard = () => {
		let boardString = "";
		for (let row = 0; row < rows; row++) {
			let currentRow = "";
			for (let col = 0; col < cols; col++) {
				currentRow = currentRow + " " + getSpecificCell(row, col);
			}
			boardString += currentRow + "\n";
		}
		console.log(boardString);
	};

	return { getBoard, getSpecificCell, setSpecificCell, printBoard };
})();

// TODO: their name, their symbol (X/O)
const Player = ((sign) => {
	let playerSign = sign;
})();

// TODO: game controller; controlling the game state and flow
// player turns go here
function GameController() {
	const board = Gameboard();
	// TODO: change these into Player objects
	const players = [player1, player2];

	let currentPlayer = players[0];

	const getCurrentPlayer = () => currentPlayer;
	const setCurrentPlayer = () => {
		if (currentPlayer === players[0]) {
			currentPlayer = players[1];
		} else {
			currentPlayer = players[0];
		}
	};
}
