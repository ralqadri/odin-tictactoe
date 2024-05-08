const Gameboard = (() => {
	const rows = 3;
	const cols = 3;
	const board = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];

	// const board = [
	// 	["o", "x", "x"],
	// 	["x", "o", "o"],
	// 	["x", "o", "x"],
	// ];

	const getBoard = () => board;
	const getSpecificCell = (row, col) => board[row][col];
	const setSpecificCell = (row, col, sign) => {
		if (getSpecificCell(row, col) === "") {
			board[row][col] = sign;
		} else {
			// TODO: handle player switching when cell cannot be played
			console.log(`Cell [${row}][${col}] cannot be played!`);
		}
	};

	const printBoard = () => {
		let boardString = "";
		for (let row = 0; row < rows; row++) {
			let currentRow = "";
			for (let col = 0; col < cols; col++) {
				if (getSpecificCell(row, col) !== "") {
					currentRow = currentRow + " " + getSpecificCell(row, col);
				} else {
					currentRow = currentRow + " " + "_";
				}
			}
			boardString += currentRow + "\n";
		}
		console.log(boardString);
	};

	return { getBoard, getSpecificCell, setSpecificCell, printBoard };
})();

// TODO: game controller; controlling the game state and flow
function GameController() {
	const board = Gameboard;

	const Player = (name, sign) => {
		const playerName = name;
		const playerSign = sign;

		const getName = () => playerName;
		const getSign = () => playerSign;
		const setName = (newName) => {
			playerName = newName;
		};

		return { getName, getSign };
	};

	let players = [Player("Player 1", "X"), Player("Player 2", "O")];
	let currentPlayer = players[0];
	const getCurrentPlayer = () => currentPlayer;
	// TODO: maybe make this shorter later using ternary operators because this is way too long
	const switchCurrentPlayer = () => {
		if (currentPlayer === players[0]) {
			currentPlayer = players[1];
			console.log(
				`Player is now passed to ${currentPlayer.getName()} (${currentPlayer.getSign()})`
			);
		} else {
			currentPlayer = players[0];
			console.log(
				`Player is now passed to ${currentPlayer.getName()} (${currentPlayer.getSign()})`
			);
		}
	};

	const setMove = (row, col) => {
		board.setSpecificCell(row, col, currentPlayer.getSign());
		board.printBoard();
		switchCurrentPlayer();
	};

	// TODO: remove "board" later when done debugging
	return { getCurrentPlayer, switchCurrentPlayer, setMove, board };
}

const game = GameController();
