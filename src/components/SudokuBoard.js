/******
 * SUdokuBoard handles thw whole board and functionalities.
 * displaying is delegated to other components
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import BottomComponent from "./BottomComponent";
import DisplaySudokuBoard from "./DisplaySudokuBoard";

const SudokuBoard = ({ difficulty }) => {
  const [puzzle, setPuzzle] = useState([]); // initial state of sudoku board
  const [solution, setSolution] = useState([]); // complete solution of sudoku board
  const [userInput, setUserInput] = useState([]); // updated sudoku board with user input
  const [message, setMessage] = useState(""); // display appropriate message
  const [stat, setStat] = useState(""); // show number of correct, wrong, empty cell
  const [hintCells, setHintCells] = useState(new Set()); // store hint cells
  const [isSolved, setIsSolved] = useState(false); // boolean for sudoku is solved
  const [resetTimer, setResetTimer] = useState(false); // boolean to reset timer
  const [incorrectCells, setIncorrectCells] = useState([]); // array of incorrect cells when 'check' button is cliced
  const [selectedCell, setSelectedCell] = useState(null);
const[beginTime, setBeginTime] = useState(0)
  const API_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
  console.log("API_URL is ",API_URL )

 

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
          const initialUserInput = puzzle.map((row) => // init userInput and count number of empty cell for display stat 
            row.map((cell) =>{
              if(cell !== 0)
                return cell
              else
              emptyCell++;
            return ""
          })); 
          
        setPuzzle(puzzle);
        setSolution(solution);
        setUserInput(initialUserInput);
        setMessage("");
        setHintCells(new Set()); // Reset hinted cell
        setIsSolved(false); 
        setResetTimer(!resetTimer); // for timer reset
        setStat("Correct : 0     Wrong : 0    Empty : " + `${emptyCell}`);
        setBeginTime(Date.now());
        console.log(beginTime)
      })
      .catch((error) => {
        console.error("There was an error fetching the puzzle!", error);
      });
  };

 
  const handleNumberSelect = (number) => {
    if (selectedCell) {
      const { rowIndex, colIndex } = selectedCell;
      let prevVal = userInput[rowIndex][colIndex]
      let newVal = number === 'x' ? prevVal.slice(0,-1) : prevVal + number.toString()
      handleInputChange({ target: { value:  newVal } }, rowIndex, colIndex);
      //setSelectedCell(null);
    }
  };

  const handleInputChange = (e, row, col, num) => {
    const value = e ? e.target.value.replace(/[^1-9]/g, "") : num;
    const newBoard = userInput.map((r, rowIndex) =>
      r.map((cell, colIndex) =>
        rowIndex === row && colIndex === col
          ? (value !== "" ? value : "")
          : cell
      )
    );
    setUserInput(newBoard);
  };
const handleGameCompleted = async (correctCount) => {
  // This function is called when the game is solved
  setMessage(`COMPLETED!!!  ${correctCount} cells solved.`);
  setIsSolved(true);
  
  let userId = localStorage.getItem('userId');
 // console.log(userId);
  if(!userId) return;
  let endTime = Date.now();
  console.log(beginTime, endTime)
  const duration = Math.floor((endTime - beginTime) / 1000); // Time in seconds

  try {
    await axios.post(`${API_URL}/user/saveSudokuTime`, { time: duration, difficulty:difficulty }, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    console.log('Sudoku time saved successfully');
  } catch (error) {
    console.error('Error saving Sudoku time:', error);
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
    puzzle.forEach((row, i) => {
      row.forEach((_, j) => {
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
      });
    });
    
   
    // Construct the stat and message
    setStat(
      `Correct : ${correctCount}     Wrong : ${wrongCount}    Empty : ${emptyCount}`
    );
    setIncorrectCells(incorrectCells);

    // if game is completed 
    if (wrongCount == 0 && emptyCount == 0) {
      handleGameCompleted(correctCount)
    }


   
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
    <div className="p-4 w-3/4 max-w-96 min-w-64 mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Sudoku Game
      </h1>

      <div className="text-lg font-semibold mb-4">
        Difficulty : {difficulty}
      </div>
      <DisplaySudokuBoard 
        puzzle={puzzle}
        userInput={userInput}
        hintCells={hintCells}
        selectedCell={selectedCell}
        incorrectCells={incorrectCells} 
        setSelectedCell={setSelectedCell}
        handleInputChange={handleInputChange}
        handleNumberSelect={handleNumberSelect}
      />
     
 
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
