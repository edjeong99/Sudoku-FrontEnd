import React, { useState } from 'react';
import { useAuth } from '../hooks/AuthProvider';

const AuthComponent = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
    displayName: ""
  });
  const [isSignUp, setIsSignUp] = useState(false);
  

  const auth = useAuth();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleClick = () => {
    console.log(input)
    if(isSignUp)
      auth.handleSignUp(input)
    else
      auth.handleSignIn(input)

  };


  return (
    <div className="mt-10">
    <h3 className="text-lg mb-4 text-black text-center font-bold">
      {isSignUp ? 'Sign Up' : 'Sign In'}
    </h3>
    <label className="text-black" htmlFor="user-email">Email:</label>
    <input
      type="email"
      name="email"
      // value={email}
      onChange={handleInput}
      placeholder="example@gmail.com"
      className="w-full px-3 py-2 mb-3 text-sm text-gray-700 bg-white border rounded-md focus:outline-none focus:border-blue-500"
    />
            <label className="text-black" htmlFor="password">Password:</label>

    <input
      type="password"
      name="password"

      // value={password}
      onChange={handleInput}
      placeholder="Password"
      className="w-full px-3 py-2 mb-3 text-sm text-gray-700 bg-white border rounded-md focus:outline-none focus:border-blue-500"
    />
    {isSignUp && (
      <>
     <label className="text-black" htmlFor="displayName">Name:</label>

      <input
        type="text"
         name="displayName"
        // value={displayName}
        onChange={handleInput}
        placeholder="John Smith"
        className="w-full px-3 py-2 mb-3 text-sm text-gray-700 bg-white border rounded-md focus:outline-none focus:border-blue-500"
      />
      </>
    )}
    <button 
      onClick={handleClick}
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
    {auth?.message && <p className="text-sm text-black">{auth.message}</p>}
  </div>
  );
};

export default AuthComponent;
