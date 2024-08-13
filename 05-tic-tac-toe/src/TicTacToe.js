import { useState } from "react";

const initialState = new Array(9).fill(null);

const winningConditions = [
  // horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  // vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  // diagonal
  [0, 4, 8],
  [2, 4, 6],
];

function TicTacToe() {
  const [board, setBoard] = useState(() => initialState);
  const [player, setPlayer] = useState("X");
  const [result, setResult] = useState("");
  const [winCells, setWinCells] = useState([]);

  const checkResult = function (board) {
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        setWinCells([a, b, c]);
        return board[a];
      }
    }
    return null;
  };

  const swapPlayer = function () {
    setPlayer((player) => (player === "X" ? "O" : "X"));
  };

  const handlePlayerMove = function (index) {
    if (board.at(index) || result) return;

    setBoard((prevBoard) => {
      const newBoard = prevBoard.toSpliced(index, 1, player);
      const result = checkResult(newBoard);

      if (result) setResult(result);
      if (!newBoard.includes(null)) setResult("draw");

      return newBoard;
    });
    swapPlayer();
  };

  const handleReset = function () {
    setBoard(initialState);
    setPlayer("X");
    setResult("");
    setWinCells([]);
  };

  return (
    <>
      <div className="info">
        {result ? (
          <>
            <p>{result === "draw" ? "Draw" : `Player "${result}" won!`}</p>
            <button onClick={handleReset}>Reset</button>
          </>
        ) : (
          <span>Player "{player}" move</span>
        )}
      </div>
      <div className="board">
        {Array.from({ length: 9 }, (_, index) => (
          <Cell
            key={index}
            index={index}
            board={board}
            onMove={handlePlayerMove}
            winCells={winCells}
          />
        ))}
      </div>
    </>
  );
}
export default TicTacToe;

function Cell({ index, board, onMove, winCells }) {
  return (
    <div
      className={`cell ${winCells.includes(index) && "win"}`}
      onClick={() => onMove(index)}
    >
      {board.at(index)}
    </div>
  );
}
