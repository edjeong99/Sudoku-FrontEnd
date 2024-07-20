import React, { useState } from 'react';
import { signUp, signIn } from '../util/auth';

const AuthComponent = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    console.log(email, password, displayName)
    try {
      const response = await signUp(email, password, displayName);
      console.log(response);
      setUser({displayName : response.displayName, email : response.email, uid :response.uid});
      console.log(response.displayName, response.email, response.uid)
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.uid);
      setMessage(`Sign-up successful! Welcome, ${displayName}`);
    } catch (error) {
      setMessage('Sign-up failed');
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await signIn(email, password);
      setUser({displayName : response.displayName, email : response.email, uid :response.uid});
      console.log(response.displayName, response.email, response.uid)
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.uid);
      
      setMessage(`Sign-in successful! Welcome back, ${response.result.email}`);
    } catch (error) {
      setMessage('Sign-in failed');
    }
  };

  return (
    <div className="mt-10">
    <h3 className="text-lg mb-4 text-black text-center font-bold">
      {isSignUp ? 'Sign Up' : 'Sign In'}
    </h3>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email"
      className="w-full px-3 py-2 mb-3 text-sm text-gray-700 bg-white border rounded-md focus:outline-none focus:border-blue-500"
    />
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
      className="w-full px-3 py-2 mb-3 text-sm text-gray-700 bg-white border rounded-md focus:outline-none focus:border-blue-500"
    />
    {isSignUp && (
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Display Name"
        className="w-full px-3 py-2 mb-3 text-sm text-gray-700 bg-white border rounded-md focus:outline-none focus:border-blue-500"
      />
    )}
    <button 
      onClick={isSignUp ? handleSignUp : handleSignIn}
      className="w-full px-4 py-2 mb-3 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      {isSignUp ? 'Sign Up' : 'Sign In'}
    </button>
    <button 
      onClick={() => setIsSignUp((prev) => !prev)}
      className="w-full px-4 py-2 mb-3 text-sm font-medium text-blue-500 bg-white rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
    </button>
    <p className="text-sm text-black">{message}</p>
  </div>
  );
};

export default AuthComponent;
