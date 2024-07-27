/********
 * DisplaySusokuBoard manage displaying the board and minipad
 *
 */

import React, { useEffect, useState } from "react";
import MiniNumberPad from "./MiniNumberPad";
import GameCompletePage from "./GameCompletePage";
import { useIsMobile } from "../hooks/useIsMobile";
import { BiLoaderAlt } from "react-icons/bi";
import { useTranslation } from "react-i18next";

const DisplaySudokuBoard = ({
  puzzle,
  userInput,
  hintCells,
  selectedCell,
  incorrectCells,
  setSelectedCell,
  handleInputChange,
  handleNumberSelect,
  chartData,
  isSolved,
  difficulty,
}) => {
  const { t } = useTranslation();

  console.log(isSolved, chartData);
  const isMobile = useIsMobile();

  return (
    <>
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
      ) : (
        <div className="font-cursive grid grid-cols-9 border-2 border-gray-800 overflow-hidden">
          {puzzle.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
              const isIncorrect = incorrectCells.some(
                ([i, j]) => i === rowIndex && j === colIndex
              );
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`
                   relative
              before:content-[''] before:float-left before:pb-[100%]
              border-r border-b border-gray-300 font-cursive font-bold
               ${(rowIndex + 1) % 3 === 0 ? "border-b-2 border-b-gray-800" : ""}
              ${(colIndex + 1) % 3 === 0 ? "border-r-2 border-r-gray-800" : ""}
              ${rowIndex === 0 ? "border-t border-t-gray-300" : ""}
              ${colIndex === 0 ? "border-l border-l-gray-300" : ""}
                  ${
                    // decide background color - cliecked, wrong, hint, etc
                    cell !== 0
                      ? " bg-gray-100"
                      : isIncorrect
                      ? "bg-red-200"
                      : selectedCell &&
                        selectedCell.rowIndex === rowIndex &&
                        selectedCell.colIndex === colIndex
                      ? "bg-blue-200"
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
                   ${isMobile ? "cursor-pointer" : ""}
                `}
                  onClick={() => setSelectedCell({ rowIndex, colIndex })}
                >
                  <div className="absolute inset-0 flex items-center justify-center font-cursive">
                    {isMobile ? (
                      <span className="text-lg font-bold font-cursive">
                        {userInput[rowIndex][colIndex] ||
                          (cell !== 0 ? cell : "")}
                      </span>
                    ) : (
                      <input
                        type="text"
                        value={
                          userInput[rowIndex][colIndex] ||
                          (cell !== 0 ? cell : "")
                        }
                        className="w-full h-full text-center outline-none bg-transparent text-lg font-bold font-cursive"
                        readOnly={cell !== 0}
                        onChange={(e) =>
                          handleInputChange(e, rowIndex, colIndex)
                        }
                      />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {isMobile && <MiniNumberPad handleNumberSelect={handleNumberSelect} />}
    </>
  );
};

export default DisplaySudokuBoard;
