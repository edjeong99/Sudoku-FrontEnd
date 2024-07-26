import React from "react";
import { useAuth } from '../hooks/AuthProvider';
import GameTimeChart from './GameTimeChart';

const GameCompletePage = ({chartData, difficulty}) => {

    const auth = useAuth();

    const {timeStat} = auth.user;


return(
<>
<div className="mt-5 mb-5">
    {/* <p>{`For ${difficulty} level : `}</p> */}
  <p> {`Games Played :  ${timeStat.count[difficulty]}`}</p>
  <p> {`Avgerage Time :  ${timeStat.avgTime[difficulty]}`}</p>
</div>
<GameTimeChart chartData={chartData} />
</>
)
}

export default GameCompletePage;