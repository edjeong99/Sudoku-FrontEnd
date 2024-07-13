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
    <div>
      <h3>{isSignUp ? 'Sign Up' : 'Sign In'}</h3>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      {isSignUp && (
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="Display Name"
        />
      )}
      <button onClick={isSignUp ? handleSignUp : handleSignIn}>
        {isSignUp ? 'Sign Up' : 'Sign In'}
      </button>
      <button onClick={() => setIsSignUp((prev) => !prev)}>
        {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
      </button>
      <p>{message}</p>
    </div>
  );
};

export default AuthComponent;
