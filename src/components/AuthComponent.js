import React, { useState } from 'react';
import { signUp, signIn } from '../util/auth';

const AuthComponent = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await signUp(email, password, displayName);
      setUser(response.result);
      setMessage(`Sign-up successful! Welcome, ${response.result.email}`);
    } catch (error) {
      setMessage('Sign-up failed');
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await signIn(email, password);
      setUser(response.result);
      setMessage(`Sign-in successful! Welcome back, ${response.result.email}`);
    } catch (error) {
      setMessage('Sign-in failed');
    }
  };

  return (
    <div className="mt-4">
    <h3 className="text-lg font-semibold mb-4 text-white">
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
    <p className="text-sm text-white">{message}</p>
  </div>
  );
};

export default AuthComponent;
