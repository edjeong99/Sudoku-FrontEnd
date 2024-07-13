import React, { useState, useEffect  } from 'react';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import Modal from '../util/modal.js';
//import { createUserProfile, getUserProfile } from '../util/userProfile';
import AuthComponent from './AuthComponent';

const Sidebar = ({ onDifficultyChange, user, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);


  return (
    <div className="sidebar">
      <h2>Menu</h2>
      {user ?? ( 
        <div>
          <h3>Welcome, {user?? (user?.displayName || user?.email)}</h3>
          <button onClick={() => setUser(null)}>Logout</button>
        </div>) 
       /* (
        <div>
         <button onClick={() => {
            setShowModal(true);
            console.log(showModal)}}>
            {isLogin ? 'Login' : 'Sign up'}
          </button>
          {showModal && (
          <Modal onClose={() => setShowModal(false)} show={showModal}>
            {!isLogin && (
              <>
                <h3>Sign up</h3>
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <button onClick={handleEmailSignup}>Sign up</button>
              </>
            )}
            {isLogin && (
              <>
                <h3>Login</h3>
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
                <input 
                  type="password" 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <button onClick={handleEmailLogin}>Login</button>
              </>
            )}
                  <button onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Need an account? Sign up' : 'Have an account? Log in'}
            </button>
          </Modal>
        )
        
        }
        </div>
      )*/}
          <button onClick={() => onDifficultyChange('easy')}>Easy</button>
          <button onClick={() => onDifficultyChange('medium')}>Medium</button>
          <button onClick={() => onDifficultyChange('hard')}>Hard</button>
         
          <AuthComponent setUser={setUser} />
    </div>
  );
};

export default Sidebar;