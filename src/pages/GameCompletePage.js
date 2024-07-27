import React from "react";
import { useAuth } from '../hooks/AuthProvider';
import GameTimeChart from '../components/GameTimeChart';

const GameCompletePage = ({chartData, difficulty}) => {

    const auth = useAuth();

    const timeStat = auth.user?.timeStat;
    const nickName = auth.user?.nickName


return(
<>
{auth.user && <div className="mt-5 mb-5">
    {/* <p>{`For ${difficulty} level : `}</p> */}
   
  <p>{nickName}</p>
  <p> {`Games Played :  ${timeStat.count[difficulty]}`}</p>
  <p> {`Avgerage Time :  ${timeStat.avgTime[difficulty]}`}</p>
</div>
}
<GameTimeChart chartData={chartData} />
</>
)
}

export default GameCompletePage;