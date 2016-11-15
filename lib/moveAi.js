"use strict";

//function that chooses the moves for the ai to make
var moveAi = function aiMover() {

	//provides the state for the miniMax function
	var State = function state(board) {
		var newBoard = [];
		return newBoard.concat(board);
	};

	//checks whose turn it is in the miniMax algorithm
	var getOpponent = function opponent(playerTurn) {
		if (playerTurn === userTurn) {
			userTurn = false;
			return userToken;
		} else if (!userTurn) {
			return aiToken;
		}
	};

	//determines scoring of miniMax states
	var score = function checkScore(board) {
		if (isWinner(userBoard)) {
			return 10;
		} else if (isWinner(aiBoard)) {
			return -10;
		}
		return 0;
	};

	var miniMax = function minMax(board, turnChecker) {
		var scores = [],
		    moves = [],
		    boardCopy = [];

		var currMoves = State(oldBoard);
		var opponent = getOpponent(!userTurn);

		for (var i = 0; i < currMoves.length; i++) {
			boardCopy = oldBoard.slice();
			boardCopy[currMoves[i]] = turnChecker;
			score.push(miniMax(boardCopy, getOpponent(opponent)));
			moves.push(currMoves[i]);
		}

		if (userTurn) {
			var maxScoreIndex = scores.indexOf(Math.max.apply(null, scores));
			var move = moves[maxScoreIndex];
			board[move] = userTurn;
			return scores[maxScoreIndex];
			console.log(scores);
		} else {
			var minScoreIndex = scores.indexOf(Math.min.apply(null, scores));
			var _move = moves[minScoreIndex];
			board[_move] = player;
			return scores[minScoreIndex];
			console.log(scores);
		}
	};

	userTurn = true;
	moveCount++;
	console.log(miniMax(oldBoard, userTurn));
	isWinner(aiBoard);
	boardChecker(aiBoard);
};