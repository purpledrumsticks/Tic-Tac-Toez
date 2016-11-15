const ticTacToes = $(function() {

			//globals
			let moveCount = 0,
			onePlayer = false,
			twoPlayer = false,
			playerOneTurn = false,
			playerTwoTurn = false,
			playerOneToken = "X",
			playerTwoToken = "O",
			playerOneBoard = [],
			playerTwoBoard = [],
			userToken = "X",
		  aiToken = "O",
			userTurn = false,
			aiTurn = false,
			board = [0,0,0,0,0,0,0,0,0],
			userBoard = [],
			aiBoard = [];

		const mainMenus = (function selectionScreens () {

			//determines what is run if a one player game is selected
			$('.onePlayer').click(() => {
				$('.playerSelect').css('display', 'none');
				$('.pieceSelect').css('display', 'block');
				onePlayer = true;
			});

			//determines what is run if a two player game is selected
			$('.twoPlayer').click(() => {
				$('.playerSelect').css('display', 'none');
				$('.pieceSelect').css('display', 'block');
				twoPlayer = true;
			});

			//determines what is run if the player decides to play as X
			$('.ex').click(() => {
				$('.pieceSelect').css('display', 'none');
				$('.gameBoard').css('display', 'block');
				if (onePlayer) {
					userTurn = true;
					return onePlayerGame();
				}
				  playerOneTurn = true;
				  return twoPlayerGame();
			});

			//determines what is run if a player decides to play as O
			$('.oh').click(() => {
				$('.pieceSelect').css('display', 'none');
				$('.gameBoard').css('display', 'block');
				if (onePlayer) {
					userToken = "O";
					aiToken = "X";
					userTurn = true;
					return onePlayerGame();
				}
					playerOneToken = "O";
					playerTwoToken = "X";
					playerOneTurn = true;
					return twoPlayerGame();
			});
		}());

		//iterator function that checks for a winner
		const isWinner = function winCheck (board) {
			let winningCombos = [
				[0,1,2], [3,4,5], [6,7,8], // horizontal
				[0,3,6], [1,4,7], [2,5,8], // vertical
				[2,4,6], [0,4,8]           // diagonal
			];

			for(let i = 0; i < winningCombos.length; i++) {
				let count = 0;
				for(let j = 0; j < board.length; j++) {
					if(winningCombos[i].toString().indexOf(board[j]) !== -1) {
						count++;
					}
					if(count === 3) {
						return true;
					}
				}
			}
			return false;
		}

    //resets the game
		const reset = function resetTheGame () {
			setTimeout(location.reload.bind(location), 2000);
		}

		const onePlayerGame = function onePlaya () {

			//runs when an actual human clicks a cell
			const userClick = function clicked () {
				$('.cell').on('click', (ev) => {
				 let userIndexNumber = Number(ev.target.className.split(" ")[0]);
					 $(ev.target).text(userToken);
					 userBoard.push(userIndexNumber);
					 board.splice(userIndexNumber, 1, userToken);
					 moveCount++;
					 userTurn = false;
					 aiTurn = true;
					 $('.disabled' + userIndexNumber).css('pointerEvents', 'none');
					 isWinner(userBoard);
					 boardChecker(userBoard);
				});
			}

      $('.cell').on('click', userClick());

			const moveAi = function moveTheAi () {
				let randomIndexNumber = Math.floor(Math.random() * 8) + 1;
				let domNode = $("." + Math.round(randomIndexNumber));
					if (board[randomIndexNumber] === 0) {
						board.splice(randomIndexNumber, 1, aiToken);
						aiBoard.push(randomIndexNumber);
						domNode.text(aiToken);
						$('.disabled' + randomIndexNumber).css('pointerEvents', 'none');
						userTurn = true;
						aiTurn = false;
						moveCount++;
						isWinner(aiBoard);
						boardChecker(aiBoard);
					} else if (board[randomIndexNumber] !== 0 && moveCount < 9 && !userTurn){
						return moveAi();
					}
			}

			//checks the state of the provided board and then runs based off of that information
			const boardChecker = function checkPlayersBoards (board) {
				//if someone has won...
				if (isWinner(aiBoard)) {
					$('.gameBoard').css('display', 'none');
					$('.aiWinner').css('display', 'block');
					$('.new').css('display', 'block');
					aiTurn = true;
					userTurn = false;
					reset();
				} else if (isWinner(userBoard)) {
					$('.gameBoard').css('display', 'none');
					$('.winner1').css('display', 'block');
					$('.new').css('display', 'block');
					userTurn = true;
					aiTurn = false;
					reset();
				}

				if (moveCount === 9 && !isWinner(board)) {
					$('.gameBoard').css('display', 'none');
					$('.draw').css('display', 'block');
					$('.new').css('display', 'block');
					userTurn = false;
					aiTurn = false;
					reset();
				}

				if (aiTurn) {
						moveAi();
					}
			}

    };


		const twoPlayerGame = function twoPlaya () {
		  console.log('Two player game!');

			//runs when an actual human clicks a cell
			const twoPlayerClick = function clicker () {
				$('.cell').on('click', (ev) => {
				 let playerIndexNumber = Number(ev.target.className.split(" ")[0]);
         if (playerOneTurn) {
					 $(ev.target).text(playerOneToken);
					 playerOneBoard.push(playerIndexNumber);
					 board.splice(playerIndexNumber, 1, playerOneToken);
					 moveCount++;
					 playerOneTurn = false;
					 playerTwoTurn = true;
					 $('.disabled' + playerIndexNumber).css('pointerEvents', 'none');
					 isWinner(playerOneBoard);
					 boardChecker(playerOneBoard);
				 } else if (playerTwoTurn) {
					 $(ev.target).text(playerTwoToken);
					 playerTwoBoard.push(playerIndexNumber);
					 board.splice(playerIndexNumber, 1, playerTwoToken);
					 moveCount++;
					 playerTwoTurn = false;
					 playerOneTurn = true;
					 $('.disabled' + playerIndexNumber).css('pointerEvents', 'none');
					 isWinner(playerTwoBoard);
					 boardChecker(playerTwoBoard);
				 }
				});
			}

			$('.cell').on('click', twoPlayerClick());

			const boardChecker = function checkPlayersBoards (board) {
				//if someone has won...
				if (isWinner(playerOneBoard)) {
					$('.gameBoard').css('display', 'none');
					$('.winner1').css('display', 'block');
					$('.new').css('display', 'block');
					playerOneTurn = true;
					playerTwoTurn = false;
					reset();
				} else if (isWinner(playerTwoBoard)) {
					$('.gameBoard').css('display', 'none');
					$('.winner2').css('display', 'block');
					$('.new').css('display', 'block');
					playerTwoTurn = true;
					playerOneTurn = false;
					reset();
				}

				if (moveCount === 9 && !isWinner(board)) {
					$('.gameBoard').css('display', 'none');
					$('.draw').css('display', 'block');
					$('.new').css('display', 'block');
					playerOneTurn = false;
					playerTwoTurn = false;
					reset();
				}
			}

		};

}());
