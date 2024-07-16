import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Timer from './Timer';

const SudokuBoard = ({difficulty}) => {
    const [puzzle, setPuzzle] = useState([]);
    const [solution, setSolution] = useState([]);
    const [userInput, setUserInput] = useState([]);
    const [message, setMessage] = useState('');
    const [incorrectCells, setIncorrectCells] = useState([]);
    const [hint, setHint] = useState(null);
    const [highlightedCell, setHighlightedCell] = useState(null);
    const [hintCells, setHintCells] = useState(new Set()); // State to track hint cells
    const [isSolved, setIsSolved] = useState(false);
    const [resetTimer, setResetTimer] = useState(false);

    const API_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

    useEffect(() => {
      fetchPuzzle(); // Default difficulty
    }, [difficulty]);

    useEffect(() => {
      if (resetTimer) {
        setResetTimer(false);
      }
    }, [resetTimer]);

    const fetchPuzzle = () => {
        axios.get(`${API_URL}/generate?difficulty=${difficulty}`)
      .then(response => {
        console.log(response.data)
        const { puzzle, solution } = response.data;
        setPuzzle(puzzle);
        setSolution(solution);
        setUserInput(puzzle.map(row => row.map(cell => (cell !== 0 ? cell : ''))));
        setMessage('');
        setIncorrectCells([]);
        setHint(null);
        setHighlightedCell(null); // Reset highlighted cell
        setIsSolved(false); // for timer reset
        setResetTimer(true); // for timer reset
      })
      .catch(error => {
        console.error('There was an error fetching the puzzle!', error);
      });
  };
  

    const handleInputChange = (e, row, col, num) => {
     // console.log(e?.target)
      const value = e ? e.target.value.replace(/[^1-9]/g, '') : num
     // console.log(value)
     
      const newBoard = userInput.map((r, rowIndex) =>
        r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? (value !== '' ? value : '') : cell))
      );
      setUserInput(newBoard);
  
      // Apply multi-numbers class if input contains multiple digits
      if(e){
      if (value.length > 1) {
        e.target.classList.add('multi-numbers');
      } else {
        e.target.classList.remove('multi-numbers');
      }
    }
    };
  
    const handleCheckClick = () => {
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
          const originalValue = puzzle[i][j]; // Assuming solution is the initial puzzle
  
          if (originalValue === 0) {
            if (userInputValue === '' || userInputValue.length > 1) {
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
  
      // Construct the message
      let message = '';
      if (wrongCount > 0 || emptyCount > 0) {
        message = `There are `;
        if (wrongCount > 0) {
          message += `${wrongCount} incorrect entries, `;
        }
        if (emptyCount > 0) {
          message += `${emptyCount} empty box(es), `;
        }
        message += `to solve. Keep trying!`;
      } else {
        message = 'Puzzle solved correctly!';
        setIsSolved(true);
      }
      // Add count of correct cells to the message
      message += ` You got ${correctCount} cells correct.`;
  
      // Update state
      setIncorrectCells(incorrectCells);
      setMessage(message);
    };
  
    const requestHint = async () => {
      try {
        const puzzleForHint = userInput.map(row => row.map(cell => (cell === '' ? 0 : parseInt(cell, 10))));

        console.log(puzzleForHint)
        const response = await axios.post(`${API_URL}/hint`, { puzzle: puzzleForHint });
        const hint = response.data;
        console.log(hint)
        setHint(hint);
        handleInputChange(null, hint.row, hint.col, hint.num.toString())
        setHighlightedCell({ row: hint.row, col: hint.col });
        setHintCells(new Set([...hintCells, `${hint.row}-${hint.col}`] ));
console.log(hintCells)

        setTimeout(() => {
          setHighlightedCell(null);
        }, 5000);
      } catch (error) {
        console.error('Error fetching hint!', error);
        setMessage('Error fetching hint!');
      }
    };


    return (
      <div className="max-w-lg mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Sudoku Game</h1>
 
  <div className="text-lg font-semibold mb-4">Difficulty : {difficulty}</div>
  <div className="grid grid-cols-9 gap-0 border-2 border-gray-800">
    {puzzle.map((row, rowIndex) => (
      row.map((cell, colIndex) => {
        const isIncorrect = incorrectCells.some(([i, j]) => i === rowIndex && j === colIndex);
        return (
          <input
            key={`${rowIndex}-${colIndex}`}
            type="text"
            value={userInput[rowIndex][colIndex]}
            onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
            disabled={cell !== 0}
            className={`
              w-10 h-10 text-center outline-none
              border border-gray-300
              ${rowIndex % 3 === 0 ? 'border-t-2 border-t-gray-800' : ''}
              ${colIndex % 3 === 0 ? 'border-l-2 border-l-gray-800' : ''}
              ${rowIndex === 8 ? 'border-b-2 border-b-gray-800' : ''}
              ${colIndex === 8 ? 'border-r-2 border-r-gray-800' : ''}
              ${cell !== 0 ? 'font-bold bg-gray-100' : 'bg-white'}
              ${highlightedCell && highlightedCell.row === rowIndex && highlightedCell.col === colIndex ? 'bg-blue-200' : ''}
              ${hintCells.has(`${rowIndex}-${colIndex}`) ? 'bg-yellow-200' : ''}
              ${userInput[rowIndex][colIndex] && userInput[rowIndex][colIndex].length > 1 ? 'text-xs' : 'text-lg'}
              ${puzzle[rowIndex][colIndex] === 0 ? 'text-blue-600' : ''}
              ${isIncorrect ? 'bg-red-200' : ''}
            `}
          />
        );
      })
    ))}
  </div>
  <div className="mt-4 flex justify-center space-x-4">
    <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleCheckClick}>Check Solution</button>
    <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => fetchPuzzle(difficulty)}>New Game</button>
    <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600" onClick={requestHint}>Hint</button>
  </div>
  {message && <div className="mt-4 text-center text-lg font-semibold text-gray-700 w-[340px]">{message}</div>}
  <Timer isSolved={isSolved} reset={resetTimer} />
</div>
    );
  };
  
  export default SudokuBoard;