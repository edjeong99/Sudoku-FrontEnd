import React, { useState, useEffect } from "react";
import SudokuBoard from "./components/SudokuBoard";
import Sidebar from "./components/Sidebar";
import "./App.css";
import HowToPlay from "./components/HowToPlay";
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [difficulty, setDifficulty] = useState("Easy");
  const [key, setKey] = useState(0); //key is used to refresh.  if same difficulty is clicked, the page is not refreshed
  // so add a new state that is changing to force a refresh game
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const changeDifficulty = (newDifficulty) => {
    console.log(newDifficulty);
    setDifficulty(newDifficulty);
    setKey((prevKey) => prevKey + 1);
  };


  return (
    <div className="flex h-screen">
      <Sidebar
        sidebarOpen={sidebarOpen}
        onDifficultyChange={changeDifficulty}
        onOpenPopup={openPopup} 
      />
 <HowToPlay isOpen={isPopupOpen} onClose={closePopup} />
      <SudokuBoard difficulty={difficulty} key={key} />
    </div>
  );
}

export default App;
