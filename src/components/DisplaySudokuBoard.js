/********
 * DisplaySusokuBoard manage displaying the board and minipad 
 * 
 */

import React, { useEffect, useState } from "react";
import MiniNumberPad from "./MiniNumberPad";
import {useIsMobile} from "../hooks/useIsMobile";
import { BiLoaderAlt } from 'react-icons/bi'; 

const DisplaySudokuBoard = ({ puzzle, userInput, hintCells, selectedCell, incorrectCells, setSelectedCell, handleInputChange,handleNumberSelect }) => {

   //console.log(puzzle)
  const isMobile = useIsMobile();

    return (
    <>
     
      {!puzzle.length ? (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg">
         <BiLoaderAlt className="text-6xl text-blue-500 mb-4 animate-spin" />
          <p className="text-xl text-gray-600">puzzle loading!</p>
        </div>
      ) : (
        
          <div  className="grid grid-cols-9 gap-0 border-2 border-gray-800">
         { puzzle.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isIncorrect = incorrectCells.some(
              ([i, j]) => i === rowIndex && j === colIndex
            );
            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`
                  w-10 h-10 text-center outline-none
                  border border-gray-300 font-bold
                  ${rowIndex % 3 === 0 ? "border-t-2 border-t-gray-800" : ""}
                  ${colIndex % 3 === 0 ? "border-l-2 border-l-gray-800" : ""}
                  ${rowIndex === 8 ? "border-b-2 border-b-gray-800" : ""}
                  ${colIndex === 8 ? "border-r-2 border-r-gray-800" : ""}
                  ${ // decide background color - cliecked, wrong, hint, etc
                    cell !== 0
                      ? " bg-gray-100"
                      :   isIncorrect
                      ? "bg-red-200"
                      :
                      (selectedCell && selectedCell.rowIndex === rowIndex && selectedCell.colIndex === colIndex )
                        ? 'bg-blue-200' 
                      : hintCells.has(`${rowIndex}-${colIndex}`)
                      ? "bg-yellow-200"
                     
                      : "bg-white"
                  }
                  ${
                    userInput[rowIndex][colIndex] &&
                    userInput[rowIndex][colIndex].length > 1
                      ? "text-xs"
                      : "text-lg"
                  }
                  ${puzzle[rowIndex][colIndex] === 0 ? "text-blue-600" : ""}
                  flex items-center justify-center 
                   ${isMobile ? 'cursor-pointer' : ''}
                `}
                onClick={() => setSelectedCell({ rowIndex, colIndex })}
              >
               {isMobile ? (
                  userInput[rowIndex][colIndex] || (cell !== 0 ? cell : '')
                ) : (
                  <input
                    type="text"
                    value={userInput[rowIndex][colIndex]}
                    onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                    disabled={cell !== 0}
                    className="w-full h-full text-center outline-none bg-transparent"
                  />
                )}
              </div>
            );
          })
        )}
         </div>
        )}
     
      
      {isMobile && <MiniNumberPad handleNumberSelect={handleNumberSelect} />    }
    </>
  );
};

export default DisplaySudokuBoard;
