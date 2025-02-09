import socketIO from "socket.io-client"
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Join from "./Components/join.jsx"
import Chat from "./Components/Chat.jsx"


const ENDPOINT = "http://localhost:4000"
const socket = socketIO(ENDPOINT,{transports:['websocket']});

function App() {

  return (
    <div className="App">
   
        <Routes>
        <Route path="/" element={<Join/>}></Route>
        <Route path="/chat" element={<Chat/>}></Route>
        </Routes>
      </div>
  );
}

export default App;
