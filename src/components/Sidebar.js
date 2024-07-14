import React, { useState, useEffect  } from 'react';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import Modal from '../util/modal.js';
//import { createUserProfile, getUserProfile } from '../util/userProfile';
import AuthComponent from './AuthComponent';

const Sidebar = ({ onDifficultyChange, user, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
<>
    <button className="menu-button" onClick={toggleSidebar}>
        ☰ Menu
      </button>

      <div className={`sidebar ${isSidebarVisible ? 'sidebar-visible' : ''}`}>
      <h2>Menu</h2>
      {user ? ( 
        <div>
          <h3>Welcome, {user?? (user?.displayName || user?.email)}</h3>
          <button onClick={() => setUser(null)}>Logout</button>
        </div>) 
        : <></>}
    
          <button onClick={() => onDifficultyChange('easy')}>Easy</button>
          <button onClick={() => onDifficultyChange('medium')}>Medium</button>
          <button onClick={() => onDifficultyChange('hard')}>Hard</button>
         
          {!user ? <AuthComponent setUser={setUser} /> : <></>}
    </div>
    </>
  );
};

export default Sidebar;