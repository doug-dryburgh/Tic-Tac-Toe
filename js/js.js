$(document).ready(function () {
    var difficulty = "medium";
    var playerPiece;
    var computerPiece;
    var playerTurn;
    var win;
    var squareChosen;
    var playerScore = 0;
    var computerScore = 0;
    var playerTiles = [];
    var computerTiles = [];
    var winningCombos = [["A1", "A2", "A3"], ["B1", "B2", "B3"], ["C1", "C2", "C3"], ["A1", "B1", "C1"], ["A2", "B2", "C2"], ["A3", "B3", "C3"], ["A1", "B2", "C3"], ["A3", "B2", "C1"]];
    var randomChoice = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
    //PIECE SELECTION
    $("#X").click(function () {
        playerPiece = "X";
        computerPiece = "O";
        $("#selection").fadeOut(200);
        setTimeout(function () {
            $("#gameContainer").fadeIn(200);
        }, 200);
        firstMove();
    });
    $("#O").click(function () {
        playerPiece = "O";
        computerPiece = "X";
        $("#selection").fadeOut(200);
        setTimeout(function () {
            $("#gameContainer").fadeIn(200);
        }, 200);
        firstMove();
    });
    //DIFFICULTY
    $("#noob").click(function () {
        difficulty = "noob";
        $("#medium").removeClass("difficulty");
        $("#noob").addClass("difficulty");
    });
    $("#medium").click(function () {
        difficulty = "medium";
        $("#noob").removeClass("difficulty");
        $("#medium").addClass("difficulty");
    });
    //FIRST MOVE
    function firstMove() {
        if (playerPiece === "X") {
            playerTurn = true;
            turnUpdate();
        }
        else {
            turnUpdate();
            setTimeout(computerMove, 1500);
        }
    }
    //PLAYER MOVE
    $(".gameSquare").click(function (event) {
        if (playerTurn) {
            if ($("#" + event.target.id + " > h2").html() !== "") {
                alert("Choose an empty square!");
            }
            else {
                squareChosen = event.target.id;
                $("h2", this).html(playerPiece);
                updateRandomChoice();
                playerTiles.push(squareChosen);
                checkWin();
                if (!win) {
                    playerTurn = false;
                    turnUpdate();
                    setTimeout(computerMove, 1500);
                }
            }
        }
        else {
            alert("Wait for your turn!");
        }
    });
    //COMPUTER MOVE
    function computerMove() {
        if (difficulty === "noob") {
            // NOOB MODE
            squareChosen = randomChoice[Math.floor(Math.random() * randomChoice.length)];
        }
        else {
            //MEDIUM MODE WORK IN PROGRESS
            var moveMade = false;
            for (var i = 0; i < winningCombos.length; i++) {
                var comp2x = winningCombos[i].filter(function (val) {
                    return computerTiles.indexOf(val) < 0;
                });
                //IF COMP HAS 2 IN ROW WITH AN EMPTY SQUARE IT TAKES THAT SQUARE
                if (comp2x.length < 2 && $("#" + comp2x + " > h2").html() === "") {
                    squareChosen = comp2x[0];
                    moveMade = true;
                    break;
                }
            }
            //IF IT DOESN'T HAVE 2 IN ROW NEXT WILL CHECK IF PLAYER DOES AND TRY TO BLOCK
            if (!moveMade) {
                for (var j = 0; j < winningCombos.length; j++) {
                    var player2x = winningCombos[j].filter(function (val) {
                        return playerTiles.indexOf(val) < 0;
                    });
                    if (player2x.length < 2 && $("#" + player2x + " > h2").html() === "") {
                        squareChosen = player2x[0];
                        moveMade = true;
                        break;
                    }
                }
            }
            //IF PLAYER DOES NOT HAVE 2 IN ROW NEXT WILL CHECK IF IT HAS 1 WITH 2 FREE SPACES
            if (!moveMade) {
                for (var k = 0; k < winningCombos.length; k++) {
                    var comp1x = winningCombos[k].filter(function (val) {
                        return computerTiles.indexOf(val) < 0;
                    });
                    if (comp1x.length < 3 && $("#" + comp1x[0] + " > h2").html() === "" && $("#" + comp1x[1] + " > h2").html() === "") {
                        squareChosen = comp1x[0];
                        moveMade = true;
                        break;
                    }
                }
            }
            if (!moveMade) {
                squareChosen = randomChoice[Math.floor(Math.random() * randomChoice.length)];
            }
        }
        // execute this code last
        computerTiles.push(squareChosen);
        $("h2", "#" + squareChosen).html(computerPiece);
        updateRandomChoice();
        checkWin();
        if (!win) {
            playerTurn = true;
            turnUpdate();
        }
    }
    //UPDATE RANDOMCHOICE
    function updateRandomChoice() {
        var index = randomChoice.indexOf(squareChosen);
        randomChoice.splice(index, 1);
    }
    //TURN INDICATOR
    function turnUpdate() {
        if (playerTurn) {
            $("#turn").html("Your turn " + playerPiece);
            $("#compThink").fadeOut(200);
        }
        else {
            $("#turn").html("Computer's turn " + computerPiece);
            $("#compThink").fadeIn(200);
        }
    }
    //PLAY AGAIN
    $("#anotherPlay").click(function () {
        $("#playAgain").fadeOut(200);
        setTimeout(function () {
            $("#gameContainer").fadeIn(200);
        }, 200);
        resetBoard();
    });
    //FUNCTION TO CHECK FOR WINNER
    function checkWin() {
        var tiles;
        if (playerTurn) {
            tiles = playerTiles;
        }
        else {
            tiles = computerTiles;
        }
        for (var i = 0; i < winningCombos.length; i++) {
            var remainingTiles = winningCombos[i].filter(function (val) {
                return tiles.indexOf(val) < 0;
            });
            if (remainingTiles.length === 0) {
                win = true;
                scoreUpdate();
            }
        }
        if (!win && randomChoice.length === 0) {
            tie();
        }
    }
    //SCORE UPDATE
    $("#score").html("You: " + playerScore + "<br>Computer: " + computerScore);

    function scoreUpdate() {
        if (playerTurn) {
            playerScore++;
            $("#score").html("You: " + playerScore + "<br>Computer: " + computerScore);
            $("#win_loseMessage").html("You are too good!");
            $("#win_loseFace").attr("src", "images/sad.png");
            setTimeout(function () {
                $("#gameContainer").fadeOut(200);
                setTimeout(function () {
                    $("#playAgain").fadeIn(200);
                }, 200)
            }, 1500);
        }
        else {
            computerScore++;
            $("#score").html("You: " + playerScore + "<br>Computer: " + computerScore);
            $("#win_loseMessage").html("Better luck next time!");
            $("#win_loseFace").attr("src", "images/happy.png");
            setTimeout(function () {
                $("#gameContainer").fadeOut(200);
                setTimeout(function () {
                    $("#playAgain").fadeIn(200);
                }, 200)
            }, 1500);
        }
    }
    //TIE GAME
    function tie() {
        $("#win_loseMessage").html("Tie game!");
        $("#win_loseFace").attr("src", "images/sleepy.png");
        setTimeout(function () {
            $("#gameContainer").fadeOut(200);
            setTimeout(function () {
                $("#playAgain").fadeIn(200);
            }, 200)
        }, 1500);
    }
    //RESET BOARD
    function resetBoard() {
        randomChoice = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
        playerTiles = [];
        computerTiles = [];
        win = "";
        $("#A1 > h2").html("");
        $("#A2 > h2").html("");
        $("#A3 > h2").html("");
        $("#B1 > h2").html("");
        $("#B2 > h2").html("");
        $("#B3 > h2").html("");
        $("#C1 > h2").html("");
        $("#C2 > h2").html("");
        $("#C3 > h2").html("");
        turnUpdate();
        firstMove();
    }
});