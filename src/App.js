import React, { useState } from "react";
import SudokuBoardPage from "./pages/SudokuBoardPage";
import SidebarPage from "./pages/SidebarPage";
import "./App.css";
import HowToPlayPage from "./pages/HowToPlayPage";
import AuthProvider from "./hooks/AuthProvider";


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
      <AuthProvider>
        <SidebarPage
          sidebarOpen={sidebarOpen}
          onDifficultyChange={changeDifficulty}
          onOpenPopup={openPopup}
        />
        <HowToPlayPage isOpen={isPopupOpen} onClose={closePopup} />
        <SudokuBoardPage difficulty={difficulty} key={key} />
      </AuthProvider>
    </div>
  );
}

export default App;
