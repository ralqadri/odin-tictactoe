const Gameboard = (() => {
	const rows = 3;
	const cols = 3;
	// board: empty
	const board = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];

	// board: O winning
	// const board = [
	// 	["O", "X", "X"],
	// 	["O", "O", "X"],
	// 	["X", "O", "O"],
	// ];

	// board: X winning
	// const board = [
	// 	["X", "O", "O"],
	// 	["X", "X", "O"],
	// 	["O", "X", "X"],
	// ];

	// board: tie
	// const board = [
	// 	["X", "O", "X"],
	// 	["X", "O", "O"],
	// 	["O", "X", "X"],
	// ];

	const getRows = () => rows;
	const getCols = () => cols;

	const getBoard = () => board;
	const getCell = (row, col) => board[row][col];
	const setSpecificCell = (row, col, sign) => {
		if (getCell(row, col) === "") {
			board[row][col] = sign;
			return true;
		} else {
			return false;
		}
	};

	const printBoard = () => {
		let boardString = "";
		for (let row = 0; row < rows; row++) {
			let currentRow = "";
			for (let col = 0; col < cols; col++) {
				if (getCell(row, col) !== "") {
					currentRow = currentRow + " " + getCell(row, col);
				} else {
					currentRow = currentRow + " " + "_";
				}
			}
			boardString += currentRow + "\n";
		}
		console.log(boardString);
	};

	const checkFinished = () => {
		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				if (getCell(row, col) === "") {
					return false;
				}
			}
		}
		return true;
	};

	return {
		getRows,
		getCols,
		getBoard,
		getCell,
		setSpecificCell,
		printBoard,
		checkFinished,
	};
})();

function GameController() {
	const board = Gameboard;
	// for checkWinner
	const rows = Gameboard.getRows();
	const cols = Gameboard.getCols();

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

	const setMove = () => {
		// let row = prompt("Enter row number:");
		// let col = prompt("Enter col number:");
		if (
			row < rows &&
			col < cols &&
			board.setSpecificCell(row, col, currentPlayer.getSign())
		) {
			board.printBoard();
			if (!gameOver()) {
				switchCurrentPlayer();
			} else {
				let winner = checkWinner();
				declareWinner(winner);
			}
		} else if (row > 3) {
			console.log(`There is no Row ${row} silly!`);
		} else if (col > 3) {
			console.log(`There is no Column ${col} silly!`);
		} else {
			console.log(`Cell [${row}][${col}] is already chosen by another player!`);
		}
		setMove();
	};

	// this is terrible & shouldn't be hardcoded but whatever (maybe i'll fix it later)
	const checkWinner = () => {
		// check for horizontal winner
		for (let row = 0; row < rows; row++) {
			if (
				board.getCell(row, 0) !== "" &&
				board.getCell(row, 0) === board.getCell(row, 1) &&
				board.getCell(row, 0) === board.getCell(row, 2)
			) {
				return board.getCell(row, 0);
			}
		}

		// check for vertical winner
		for (let col = 0; col < cols; col++) {
			if (
				board.getCell(0, col) !== "" &&
				board.getCell(0, col) === board.getCell(1, col) &&
				board.getCell(0, col) === board.getCell(2, col)
			) {
				return board.getCell(0, col);
			}
		}

		// check for diagonal winner
		if (
			board.getCell(0, 0) !== "" &&
			board.getCell(0, 0) === board.getCell(1, 1) &&
			board.getCell(0, 0) === board.getCell(2, 2)
		) {
			return board.getCell(0, 0);
		}

		if (
			board.getCell(0, 2) !== "" &&
			board.getCell(0, 2) === board.getCell(1, 1) &&
			board.getCell(0, 2) === board.getCell(2, 0)
		) {
			return board.getCell(0, 2);
		}

		return null;
	};

	const gameOver = () => {
		if (board.checkFinished() && checkWinner() === null) {
			return true;
		}

		if (checkWinner() === null) {
			return false;
		} else {
			return true;
		}
	};

	const findPlayerBySign = (sign) => {
		return players.find((player) => player.getSign() === sign);
	};

	const declareWinner = (winnersign) => {
		const winner = findPlayerBySign(winnersign);

		if (winnersign !== null) {
			console.log(`Winner is "${winner.getName()} (${winner.getSign()})"!`);
		} else {
			console.log(`The game is tied!`);
		}
	};

	return { getCurrentPlayer, switchCurrentPlayer, setMove, checkWinner };
}

// TODO: displayController() - will handle the display/DOM logic of the game
function displayController() {}

const game = GameController();
game.setMove();
