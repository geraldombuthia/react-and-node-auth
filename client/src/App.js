import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Axios from "axios";
function App() {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState("");

  const register = () => {
    Axios({
      method: "post",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/register",
    }).then((res) => console.log(res));
  };
  const login = () => {
    Axios({
      method: "post",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/login",
    }).then((res) => console.log(res));
  };
  const getUser = () => {
    Axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/getUser",
    }).then((res) => setData(res.data));
  };
  return (
    <Router>
      <div className="App">
        <h1>Show</h1>
        <Routes>
          <Route path="/" element={
            <div className="register">
              <h1>Register</h1>
              <input
                type="text"
                placeholder="username"
                onChange={(e) => setRegisterUsername(e.target.value)}
              />
              <input
                type="text"
                placeholder="password"
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
              <button onClick={register}>Submit</button>
            </div>
          } />
          <Route path="/login" element={
            <div className="login">
              <h1>Login</h1>
              <input
                type="text"
                placeholder="username"
                onChange={(e) => setLoginUsername(e.target.value)}
              />
              <input
                type="text"
                placeholder="password"
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <button onClick={login}>Submit</button>
            </div>
          } />
          <Route path="/getuser" element={
            <div>
              <h1>Get User</h1>
              <button onClick={getUser}>Submit</button>
              {
                data.username ? <p>Welcome back <b>{data.username}</b></p> : "Login"
              }
            </div>
          } />
        </Routes>
        <div className="navbar">
          <p><Link to="/">Register</Link></p>
          <p><Link to="/login">Login</Link></p>
          <p><Link to="/getuser">Get user</Link></p>   
        </div>
      </div>
    </Router>
  );
}

export default App;
