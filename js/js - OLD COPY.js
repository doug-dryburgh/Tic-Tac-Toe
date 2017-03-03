$(document).ready(function () {
    var playerPiece;
    var computerPiece;
    var playerTurn;
    var win;
    var squareChosen;
    var playerScore = 0;
    var computerScore = 0;
    var playerTiles = ["B1", "B2", "B3"];
    var computerTiles = [];
    var winningCombos = [["A1", "A2", "A3"], ["B1", "B2", "B3"], ["C1", "C2", "C3"], ["A1", "B1", "C1"], ["A2", "B2", "C2"], ["A3", "B3", "C3"], ["A1", "B2", "C3"], ["A3", "B2", "C1"]];
    //GAME SQUARES
    /* var A1;
     var A2;
     var A3;
     var B1;
     var B2;
     var B3;
     var C1;
     var C2;
     var C3; */
    var compChoice = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
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
                assignSquare();
                updateCompChoice();
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
    /* function computerMove() {
                NOOB MODE
        var pick = compChoice[Math.floor(Math.random() * compChoice.length)];
        squareChosen = pick; 
        $("h2", "#" + pick).html(computerPiece);
        assignSquare();
        updateCompChoice();
        checkWin();
        if (!win) {
            playerTurn = true;
            turnUpdate();
        } 
    }
        //
        //MEDIUM MODE WORK IN PROGRESS
        var remainingTiles;
        var nextMove;
        var chosenTiles = ["A3", "B2"];
        for (var i = 0; i < winningCombos.length; i++) {
            remainingTiles = winningCombos[i].filter(function (val) {
                return chosenTiles.indexOf(val) < 0;
            });
            if (remainingTiles.length < 2 && $("#" + remainingTiles + " > h2").html() === "") {
                squareChosen = remainingTiles;
                alert(squareChosen);
                break;
            }
        }
    }
    /* execute this code last
    $("h2", "#" + squareChosen).html(computerPiece);
    assignSquare();
    updateCompChoice();
    checkWin();
    if (!win) {
        playerTurn = true;
        turnUpdate(); */
    //UPDATE COMPCHOICE
    function updateCompChoice() {
        var index = compChoice.indexOf(squareChosen);
        compChoice.splice(index, 1);
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
    //FUNCTION TO ASIGN SQUARE
    function assignSquare() {
        var piece;
        if (playerTurn) {
            piece = playerPiece;
        }
        else {
            piece = computerPiece;
        }
        console.log(squareChosen);
        switch (squareChosen) {
        case "A1":
            A1 = piece;
            break;
        case "B1":
            A2 = piece;
            break;
        case "C1":
            A3 = piece;
            break;
        case "A2":
            B1 = piece;
            break;
        case "B2":
            B2 = piece;
            break;
        case "C2":
            B3 = piece;
            break;
        case "A3":
            C1 = piece;
            break;
        case "B3":
            C2 = piece;
            break;
        case "C3":
            C3 = piece;
        }
    }
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
    }
    /*
        if (A1 == piece && A2 == piece && A3 == piece) {
            win = true;
            scoreUpdate();
        }
        else if (B1 == piece && B2 == piece && B3 == piece) {
            win = true;
            scoreUpdate();
        }
        else if (C1 == piece && C2 == piece && C3 == piece) {
            win = true;
            scoreUpdate();
        }
        else if (A1 == piece && B1 == piece && C1 == piece) {
            win = true;
            scoreUpdate();
        }
        else if (A2 == piece && B2 == piece && C2 == piece) {
            win = true;
            scoreUpdate();
        }
        else if (A3 == piece && B3 == piece && C3 == piece) {
            win = true;
            scoreUpdate();
        }
        else if (A3 == piece && B2 == piece && C1 == piece) {
            win = true;
            scoreUpdate();
        }
        else if (A1 == piece && B2 == piece && C3 == piece) {
            win = true;
            scoreUpdate();
        }
        else if (compChoice.length < 1) {
            win = true;
            tie();
        }
    } */
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
        compChoice = ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"];
        win = "";
        A1 = "";
        A2 = "";
        A3 = "";
        B1 = "";
        B2 = "";
        B3 = "";
        C1 = "";
        C2 = "";
        C3 = "";
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
    $("#test").click(function () {
        checkWin();
    });
});