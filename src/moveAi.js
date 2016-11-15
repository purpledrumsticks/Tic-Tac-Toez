//function that chooses the moves for the ai to make
const moveAi = function aiMover () {

	//provides the state for the miniMax function
	const State = function state (board) {
	  let newBoard = [];
		return newBoard.concat(board);
	}

	//checks whose turn it is in the miniMax algorithm
	const getOpponent = function opponent (playerTurn) {
		if (playerTurn === userTurn) {
			userTurn = false;
			return userToken;
		} else if (!userTurn) {
			return aiToken;
		}
	}

  //determines scoring of miniMax states
	const score = function checkScore (board) {
		if (isWinner(userBoard)) {
			return 10;
		} else if (isWinner(aiBoard)) {
			return -10;
		}
		return 0;
	}

	const miniMax = function minMax (board, turnChecker) {
		let scores = [],
		moves = [],
		boardCopy = [];

		let currMoves = State(oldBoard);
		let opponent = getOpponent(!userTurn);

		for(var i = 0; i < currMoves.length; i++) {
			boardCopy = oldBoard.slice();
			boardCopy[currMoves[i]] = turnChecker;
			score.push(miniMax(boardCopy, getOpponent(opponent)));
			moves.push(currMoves[i]);
		}

		if (userTurn) {
			let maxScoreIndex = scores.indexOf(Math.max.apply(null, scores));
			let move = moves[maxScoreIndex];
			board[move] = userTurn;
			return scores[maxScoreIndex];
			console.log(scores);
		} else {
			let minScoreIndex = scores.indexOf(Math.min.apply(null, scores));
			let move = moves[minScoreIndex];
			board[move] = player;
			return scores[minScoreIndex];
			console.log(scores);
		}
	}

  userTurn = true;
	moveCount++;
	console.log(miniMax(oldBoard, userTurn));
	isWinner(aiBoard);
	boardChecker(aiBoard);
}
