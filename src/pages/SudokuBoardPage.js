/******
 * SUdokuBoard handles thw whole board and functionalities.
 * displaying is delegated to other components
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import BottomComponent from "../components/BottomComponent";
import DisplaySudokuBoard from "../components/DisplaySudokuBoard";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "../hooks/useIsMobile";
import MiniNumberPad from "../components/MiniNumberPad";
import { BiLoaderAlt } from "react-icons/bi";
import GameCompletePage from "./GameCompletePage";
import { useAuth } from "../hooks/AuthProvider";

const SudokuBoardPage = ({ difficulty }) => {
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
  const [beginTime, setBeginTime] = useState(0);
  const [chartData, setChartData] = useState({
    allTimes: [],
    playerTime: null,
  });
  const [allTimes, setAllTimes] = useState([]);
  const API_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const auth = useAuth();

  
  useEffect(() => {
    fetchPuzzle();
  
  }, [difficulty]);

  const getAllTimes = () => {
    const replaceZeroWithPrevious = (data) => {
      const replacedData = [...data];
      let lastNonZero = null;
      for (let i = 0; i < data.length; i++) {
        if (data[i] === 0) {
          replacedData[i] = lastNonZero !== null ? lastNonZero : data[i];
        } else {
          lastNonZero = data[i];
        }
      }
      return replacedData;
    };

    // Find the max completion time
    const maxTime = Math.max(...allTimes);

    // Create an array from 0 to maxTime
    const timeRange = Array.from({ length: maxTime + 1 }, (_, i) => i);
    // Count frequency of each completion time
    const timeFrequency = allTimes.reduce((acc, time) => {
      acc[time] = (acc[time] || 0) + 1;
      return acc;
    }, {});

    const allPlayersData = replaceZeroWithPrevious(
      timeRange.map((time) => timeFrequency[time] || 0)
    );

    axios
      .get(`${API_URL}/getAllTimes`)
      .then((response) => {
        let times = response.data.allTimes;
        const maxTime = Math.max(...times);
        const timeRange = Array.from({ length: maxTime + 1 }, (_, i) => i);
        // Count frequency of each completion time
        const timeFrequency = times.reduce((acc, time) => {
          acc[time] = (acc[time] || 0) + 1;
          return acc;
        }, {});
        const allPlayersData = replaceZeroWithPrevious(
          timeRange.map((time) => timeFrequency[time] || 0)
        );
        setAllTimes(allPlayersData);
        //    console.log(allPlayersData)
      })
      .catch((error) => {
        console.error("There was an error fetching the allTImes!", error);
      });
  };

  const fetchPuzzle = () => {
   
    axios
      .get(`${API_URL}/play/generate?difficulty=${difficulty}`)
      .then((response) => {
        let emptyCell = 0;
        //    console.log(response.data);
        const { puzzle, solution } = response.data;
        const initialUserInput = puzzle.map(
          (
            row // init userInput and count number of empty cell for display stat
          ) =>
            row.map((cell) => {
              if (cell !== 0) return cell;
              else emptyCell++;
              return "";
            })
        );

        setPuzzle(puzzle);
        setSolution(solution);
        setUserInput(initialUserInput);
        setMessage("");
        setHintCells(new Set()); // Reset hinted cell
        setIsSolved(false);
        setResetTimer(!resetTimer); // for timer reset
        setStat(`✔️ 0,   ❌ 0,   🔲  ${emptyCell}`)

        setBeginTime(Date.now());
      })
      .catch((error) => {
        console.error("There was an error fetching the puzzle!", error);
      });
      getAllTimes();
  };

  const handleNumberSelect = (number) => {
    if (selectedCell) {
      const { rowIndex, colIndex } = selectedCell;
      let prevVal = userInput[rowIndex][colIndex];
      let newVal =
        number === "x" ? prevVal.slice(0, -1) : prevVal + number.toString();
      handleInputChange({ target: { value: newVal } }, rowIndex, colIndex);
      //setSelectedCell(null);
    }
  };

  const handleInputChange = (e, row, col, num) => {
    const value = e ? e.target.value.replace(/[^1-9]/g, "") : num;
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
  };

  /*  
saves users game time.  retrieve all completed times for this difficulty
*/
  const handleGameCompleted = (correctCount) => {
    // This function is called when the game is solved
    setMessage(`COMPLETED!!!  ${correctCount} cells solved.`);
    setIsSolved(true);
    let playTime = Math.floor((Date.now() - beginTime) / 1000);
    const duration = Math.floor(playTime); // Time in seconds
    setChartData({ allTimes: allTimes, playerTime: playTime });


console.log(auth.user)
    axios
      .post(
        `${API_URL}/user/updateStats`,
        { time: duration, difficulty: difficulty, userId : auth.user?._id },
        )
      .then((response) => {
        const { user, message } = response.data;
        console.log(user);
        auth.setUser(user)
      })
      .catch((error) => {
        console.error("Error saving Sudoku time:", error);
      });
  };

  const handleCheckClick = () => {
    let wrongCount = 0;
    let correctCount = 0;
    let emptyCount = 0;
    const incorrectCells = [];

    // Calculate the counts
    puzzle.forEach((row, i) => {
      row.forEach((_, j) => {
        const userInputValue = userInput[i][j];
        const solutionValue = solution[i][j];
        const originalValue = puzzle[i][j];

        if (originalValue === 0) {
          // cell was empth and should check if user input is correct
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
    setStat(`✔️ ${correctCount},   ❌ ${wrongCount},   🔲  ${emptyCount}`)


    setIncorrectCells(incorrectCells);

    // if game is completed
    if (wrongCount == 0 && emptyCount == 0) {
      handleGameCompleted(correctCount);
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

      const response = await axios.post(`${API_URL}/play/hint`, {
        puzzle: puzzleForHint,
      });
      const hint = response.data;

      handleInputChange(null, hint.row, hint.col, hint.num.toString());

      setHintCells(new Set([...hintCells, `${hint.row}-${hint.col}`]));
    } catch (error) {
      console.error("Error fetching hint!", error);
      setMessage("Error fetching hint!");
    }
  };

  return (
    <div className="p-2 sm:p-4 w-full max-w-[500px] mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Sudoku Game
      </h1>

      <div className="text-lg font-semibold mb-4">
        {t("Difficulty")} :{t(difficulty)}
      </div>
      {!puzzle.length ? (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg">
          <BiLoaderAlt className="text-6xl text-blue-500 mb-4 animate-spin" />
          <p className="text-xl text-gray-600">{t("Loading")}</p>
        </div>
      ) : isSolved ? (
        chartData &&
        chartData.allTimes &&
        chartData.allTimes.length > 0 && (
          <GameCompletePage chartData={chartData} difficulty={difficulty} />
        )
      ) :(
      <DisplaySudokuBoard
        puzzle={puzzle}
        userInput={userInput}
        hintCells={hintCells}
        selectedCell={selectedCell}
        incorrectCells={incorrectCells}
        setSelectedCell={setSelectedCell}
        handleInputChange={handleInputChange}
       />)}
     {isMobile && <MiniNumberPad handleNumberSelect={handleNumberSelect} />}
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

export default SudokuBoardPage;
