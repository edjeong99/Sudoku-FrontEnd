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
    const { email, password, nickName } = data;
    console.log(email, password, nickName);
    try {
      const response = await signUp(email, password, nickName);
      console.log(response);
      setUser({
        nickName: response.nickName,
        email: response.email,
        _id: response._id,
      });
      console.log(response.nickName, response.email, response._id);
      localStorage.setItem("token", response.token);
      localStorage.setItem("_userId", response._id);
      setMessage(`Sign-up successful! Welcome, ${nickName}`);
    } catch (error) {
      console.log(error.message);
      setMessage("Sign-up failed");
    }
  };
  const handlelogOut = () => {
    setUser(null);
    setToken("");
    localStorage.removeItem("site");
    setMessage("Logout Successfully");
  };

  return (
    <AuthContext.Provider
      value={{ token, user, setUser, message, handleSignUp, handleSignIn, handlelogOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
