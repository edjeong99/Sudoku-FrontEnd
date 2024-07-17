import React, { useEffect, useState } from "react";
import axios from "axios";

import BottomComponent from "./BottomComponent";

const SudokuBoard = ({ difficulty }) => {
  const [puzzle, setPuzzle] = useState([]); // initial state of sudoku board
  const [solution, setSolution] = useState([]); // complete solution of sudoku board
  const [userInput, setUserInput] = useState([]); // updated sudoku board with user input
  const [message, setMessage] = useState(""); // display appropriate message
  const [stat, setStat] = useState(""); // show number of correct, wrong, empty cell
  const [incorrectCells, setIncorrectCells] = useState([]); // array of incorrect cells when 'check' button is cliced
  const [hintCells, setHintCells] = useState(new Set()); // store hint cells
  const [isSolved, setIsSolved] = useState(false); // boolean for sudoku is solved
  const [resetTimer, setResetTimer] = useState(false); // boolean to reset timer

  const API_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

  useEffect(() => {
    fetchPuzzle();
  }, [difficulty]);

  const fetchPuzzle = () => {
    axios
      .get(`${API_URL}/generate?difficulty=${difficulty}`)
      .then((response) => {
        let emptyCell = 0;
        console.log(response.data);
          const { puzzle, solution } = response.data;
        setPuzzle(puzzle);
        setSolution(solution);
        setUserInput(  // init userInput and count number of empty cell for display stat 
          puzzle.map((row) =>
            row.map((cell) => {
              if (cell !== 0) {
                return cell;
              }
              emptyCell++;
              return "";
            })
          )
        );

        setMessage("");
        setHintCells(new Set()); // Reset hinted cell
        setIsSolved(false); 
        setResetTimer(!resetTimer); // for timer reset
        setStat("Correct : 0     Wrong : 0    Empty : " + `${emptyCell}`);
      })
      .catch((error) => {
        console.error("There was an error fetching the puzzle!", error);
      });
  };

  const handleInputChange = (e, row, col, num) => {
    // console.log(e?.target)
    const value = e ? e.target.value.replace(/[^1-9]/g, "") : num;
    // console.log(value)

    const newBoard = userInput.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col
          ? value !== ""
            ? value
            : ""
          : cell
      )
    );
    setUserInput(newBoard);

    // Apply multi-numbers class if input contains multiple digits
    if (e) {
      if (value.length > 1) {
        e.target.classList.add("multi-numbers");
      } else {
        e.target.classList.remove("multi-numbers");
      }
    }
  };

  const handleCheckClick = () => {
    console.log("handleCheckClick");
    let wrongCount = 0;
    let correctCount = 0;
    let emptyCount = 0;
    const incorrectCells = [];

    //  console.log(userInput)
    // Calculate the counts
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const userInputValue = userInput[i][j];
        const solutionValue = solution[i][j];
        const originalValue = puzzle[i][j]; 

        if (originalValue === 0) { // cell was empth and should check if user input is correct 
          if (userInputValue === "" || userInputValue.length > 1) {
            emptyCount++;
          } else if (userInputValue !== solutionValue.toString()) {
            wrongCount++;
            incorrectCells.push([i, j]);
          } else {
            correctCount++;
          }
        }
      }
    }
    console.log("incorrect cells", incorrectCells[0]);
    // Construct the stat and message

    if (wrongCount > 0 || emptyCount > 0) {
      setStat(
        `Correct : ${correctCount}     Wrong : ${wrongCount}    Empty : ${emptyCount}`
      );
    } else {
      setMessage(`COMPLETED!!!  ${correctCount} cells solved.`);
      setIsSolved(true);
    }

    // Update state
    setIncorrectCells(incorrectCells);
  };

  const requestHint = async () => {
    try {
      let numEmptyCells = 0;
      const puzzleForHint = userInput.map((row) =>
        row.map((cell) => {
          if (cell === "") {
            numEmptyCells++;
            return 0;
          }
          return parseInt(cell, 10);
        })
      );
      if (numEmptyCells === 0) {
        setMessage("No Empty cells to give a hint!");
        return;
      }
      console.log(puzzleForHint);
      const response = await axios.post(`${API_URL}/hint`, {
        puzzle: puzzleForHint,
      });
      const hint = response.data;
      console.log(hint);

      handleInputChange(null, hint.row, hint.col, hint.num.toString());

      setHintCells(new Set([...hintCells, `${hint.row}-${hint.col}`]));
      console.log(hintCells);
    } catch (error) {
      console.error("Error fetching hint!", error);
      setMessage("Error fetching hint!");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Sudoku Game
      </h1>

      <div className="text-lg font-semibold mb-4">
        Difficulty : {difficulty}
      </div>
      <div className="grid grid-cols-9 gap-0 border-2 border-gray-800">
        {puzzle.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isIncorrect = incorrectCells.some(
              ([i, j]) => i === rowIndex && j === colIndex
            );
            return (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                value={userInput[rowIndex][colIndex]}
                onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                disabled={cell !== 0}
                className={`
              w-10 h-10 text-center outline-none
              border border-gray-300 font-bold
              ${rowIndex % 3 === 0 ? "border-t-2 border-t-gray-800" : ""}
              ${colIndex % 3 === 0 ? "border-l-2 border-l-gray-800" : ""}
              ${rowIndex === 8 ? "border-b-2 border-b-gray-800" : ""}
              ${colIndex === 8 ? "border-r-2 border-r-gray-800" : ""}
              ${
                cell !== 0
                  ? " bg-gray-100"
                  : hintCells.has(`${rowIndex}-${colIndex}`)
                  ? "bg-yellow-200"
                  : isIncorrect
                  ? "bg-red-200"
                  : "bg-white"
              }
              ${
                userInput[rowIndex][colIndex] &&
                userInput[rowIndex][colIndex].length > 1
                  ? "text-xs"
                  : "text-lg"
              }
              ${puzzle[rowIndex][colIndex] === 0 ? "text-blue-600" : ""}
            
            `}
              />
            );
          })
        )}
      </div>
      <BottomComponent
        handleCheckClick={handleCheckClick}
        fetchPuzzle={fetchPuzzle}
        requestHint={requestHint}
        message={message}
        isSolved={isSolved}
        resetTimer={resetTimer}
        stat={stat}
      />
    </div>
  );
};

export default SudokuBoard;
