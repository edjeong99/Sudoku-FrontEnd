import React from "react";
import { useAuth } from "../hooks/AuthProvider";
import GameTimeChart from "../components/GameTimeChart";

const GameCompletePage = ({ chartData, difficulty }) => {
  const auth = useAuth();
  const { numOfPlayed, avgTime, bestTime, nickName } = auth.user || {};

  console.log(auth.user)
  console.log(numOfPlayed, avgTime, bestTime, nickName)

  return (
    <>
      {auth.user && numOfPlayed &&(
        <div className="mt-5 mb-5">
          {/* <p>{`For ${difficulty} level : `}</p> */}

          <p>
            {nickName}'s stats for {difficulty} level :{" "}
          </p>
          <p> {`Games Played :  ${numOfPlayed[difficulty]}`}</p>
          <p> {`Avgerage Time :  ${avgTime[difficulty]}`}</p>
          <p> {`Best Time :  ${bestTime[difficulty]}`}</p>
        </div>
      )}
      <GameTimeChart chartData={chartData} />
    </>
  );
};

export default GameCompletePage;
