import React, { useState, useEffect } from 'react';
import SudokuBoard from "./components/SudokuBoard";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [difficulty, setDifficulty] = useState("easy");
    const [key, setKey] = useState(0);  //key is used to refresh.  if same difficulty is clicked, the page is not refreshed
    // so add a new state that is changing to force a refresh game
    const [user, setUser] = useState(null);


    const changeDifficulty = (newDifficulty) => {
        console.log(newDifficulty)
        setDifficulty(newDifficulty);
        setKey(prevKey => prevKey + 1);
      };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
      };

  return (
 <div className="app-container">

      <Sidebar sidebarOpen={sidebarOpen} 
      onDifficultyChange={changeDifficulty}
      user={user} 
      setUser={setUser} 
      />
      <div id="main" className={sidebarOpen ? 'sidebar-open' : ''}>
        <button className="menu-icon" onClick={toggleSidebar}>
          &#9776;
        </button>

        <SudokuBoard difficulty={difficulty} key={key} />
      </div>
    </div>
  );
};

export default App;
