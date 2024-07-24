import { useContext, createContext, useState } from "react";
import { signUp, signIn } from "../util/auth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [message, setMessage] = useState("");

  const handleSignIn = async (data) => {
    const { email, password } = data;
    try {
      const response = await signIn(email, password);
      console.log(response);
      setUser(response.user);
      setToken(response.token);

      localStorage.setItem("token", response.token);

      setMessage("Sign-in successful!");
    } catch (error) {
      setMessage("Sign-in failed");
    }
  };
  const handleSignUp = async (data) => {
    const { email, password, displayName } = data;
    console.log(email, password, displayName);
    try {
      const response = await signUp(email, password, displayName);
      console.log(response);
      setUser({
        displayName: response.displayName,
        email: response.email,
        uid: response.uid,
      });
      console.log(response.displayName, response.email, response.uid);
      localStorage.setItem("token", response.token);
      localStorage.setItem("userId", response.uid);
      setMessage(`Sign-up successful! Welcome, ${displayName}`);
    } catch (error) {
      setMessage("Sign-up failed");
    }
  };
  const handlelogOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    setMessage("Logout Successfully");
  };

  return(
  <AuthContext.Provider
    value={{ token, user, message, handleSignUp, handleSignIn, handlelogOut }}
  >
    {children}
  </AuthContext.Provider>
  )
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
