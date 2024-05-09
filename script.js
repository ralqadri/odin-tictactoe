const Gameboard = (() => {
	const rows = 3;
	const cols = 3;
	// board: empty
	const board = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];

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

	const resetBoard = () => {
		for (let row = 0; row < rows; row++) {
			for (let col = 0; col < cols; col++) {
				board[row][col] = "";
			}
		}
	};

	return {
		getRows,
		getCols,
		getBoard,
		getCell,
		setSpecificCell,
		checkFinished,
		printBoard,
		resetBoard,
	};
})();

function GameController() {
	const board = Gameboard;
	// for getWinner
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

	let players;
	let currentPlayer;

	const initializeGame = () => {
		players = [Player("Player 1", "X"), Player("Player 2", "O")];
		currentPlayer = players[0];
	};

	const restartGame = () => {
		initializeGame();
		board.resetBoard();
	};

	const getCurrentPlayer = () => currentPlayer;
	const switchCurrentPlayer = () => {
		if (currentPlayer === players[0]) {
			currentPlayer = players[1];
		} else {
			currentPlayer = players[0];
		}
	};

	initializeGame();

	const setMove = (row, col) => {
		if (
			row < rows &&
			col < cols &&
			board.setSpecificCell(row, col, currentPlayer.getSign())
		) {
			document.querySelector(
				`[data-row="${row}"][data-col="${col}"]`
			).textContent = currentPlayer.getSign();

			if (!isOver()) {
				switchCurrentPlayer();
			} else {
				let winner = getWinner();
			}

			display.showStatus(isOver());
		}
	};

	// this is terrible & shouldn't be hardcoded but whatever (maybe i'll fix it later)
	const getWinner = () => {
		// check for horizontal winner
		for (let row = 0; row < rows; row++) {
			if (
				board.getCell(row, 0) !== "" &&
				board.getCell(row, 0) === board.getCell(row, 1) &&
				board.getCell(row, 0) === board.getCell(row, 2)
			) {
				return findPlayerBySign(board.getCell(row, 0));
			}
		}

		// check for vertical winner
		for (let col = 0; col < cols; col++) {
			if (
				board.getCell(0, col) !== "" &&
				board.getCell(0, col) === board.getCell(1, col) &&
				board.getCell(0, col) === board.getCell(2, col)
			) {
				return findPlayerBySign(board.getCell(0, col));
			}
		}

		// check for diagonal winner
		if (
			board.getCell(0, 0) !== "" &&
			board.getCell(0, 0) === board.getCell(1, 1) &&
			board.getCell(0, 0) === board.getCell(2, 2)
		) {
			return findPlayerBySign(board.getCell(0, 0));
		}

		if (
			board.getCell(0, 2) !== "" &&
			board.getCell(0, 2) === board.getCell(1, 1) &&
			board.getCell(0, 2) === board.getCell(2, 0)
		) {
			return findPlayerBySign(board.getCell(0, 2));
		}

		return null;
	};

	const isOver = () => {
		if (board.checkFinished() && getWinner() === null) {
			return true;
		}

		if (getWinner() === null) {
			return false;
		} else {
			return true;
		}
	};

	const findPlayerBySign = (sign) => {
		return players.find((player) => player.getSign() === sign);
	};

	return {
		getCurrentPlayer,
		switchCurrentPlayer,
		setMove,
		getWinner,
		isOver,
		restartGame,
	};
}

// TODO: displayController() - will handle the display/DOM logic of the game
function displayController() {
	const cellElements = document.querySelectorAll(".cell");

	cellElements.forEach((cell) =>
		cell.addEventListener("click", (e) => {
			if (!game.isOver()) {
				game.setMove(cell.dataset.row, cell.dataset.col);
			}
		})
	);

	const showStatus = (isOver) => {
		const gameStatus = document.querySelector(".status");
		if (isOver) {
			winner = game.getWinner();
			if (winner !== null) {
				gameStatus.textContent = `${winner.getName()} (${winner.getSign()}) has won!`;
			} else {
				gameStatus.textContent = `The game is tied!`;
			}
		} else {
			let currentPlayer = game.getCurrentPlayer();
			gameStatus.textContent = `${currentPlayer.getName()} (${currentPlayer.getSign()})'s  turn`;
		}
	};

	const resetDisplay = () => {
		cellElements.forEach((cell) => (cell.textContent = ""));
	};

	const restartButton = document.querySelector(".restart-btn");
	restartButton.addEventListener("click", (e) => {
		game.restartGame();
		resetDisplay();
		showStatus();
	});

	return { showStatus };
}

const game = GameController();
const display = displayController();

display.showStatus();
