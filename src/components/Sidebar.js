import React, { useState, useEffect } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Modal from "../util/modal.js";
//import { createUserProfile, getUserProfile } from '../util/userProfile';
import AuthComponent from "./AuthComponent";
import { FaBars } from "react-icons/fa";
import { useIsMobile } from '../hooks/useIsMobile';

const Sidebar = ({ onDifficultyChange, user, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-col h-full lg:w-1/4 ">
      {/* Menu icon for small screens */}
      <div className={`!isMobile ? "hidden" :"" "p-4"`}>
        <FaBars className="text-2xl cursor-pointer" onClick={toggleSidebar} />
      </div>
      <div
        className={`lg:flex flex-col bg-green-500 text-white p-4 lg:w-full  ${
          (isOpen || !isMobile )? "block" : "hidden"
        }`}
        style={{ maxWidth: "200px" }}
      >
        <h2 className="text-lg font-bold mb-4">Menu</h2>
        {user ? (
          <div className="mb-4">
            <h3 className="text-lg mb-2">
              Welcome, {user?.displayName || user?.email}
            </h3>
            <button
              onClick={() => setUser(null)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </div>
        ) : null}

        <button
          onClick={() => {
            onDifficultyChange("Easy");
            setIsOpen(false);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 w-full"
        >
          Easy
        </button>
        <button
          onClick={() => {
            onDifficultyChange("Medium");
            setIsOpen(false);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 w-full"
        >
          Medium
        </button>
        <button
          onClick={() => {
            onDifficultyChange("Hard");
            setIsOpen(false);
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 w-full"
        >
          Hard
        </button>

        {!user ? <AuthComponent setUser={setUser} /> : <></>}
      </div>
    </div>
  );
};

export default Sidebar;
