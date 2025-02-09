import { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Join.css"


let userName;
export default function Join() {

const [name , setName] = useState("");

const userJoin=(input)=>{
  userName = input.target.value;
  setName(userName)
}

  return (
    <div className="join-container">
      <div className="join-box">
        <h1 className="join-title">We Chat</h1>

        <div className="input-container">
          <input
            onChange={userJoin}
            type="text"
            id="joinInput"
            placeholder="Enter Your Name"
            className="join-input"
          />
        </div>

        <Link onClick={(e)=> !name ?e.preventDefault() : null} to="/chat">
          <button className="join-button">
            Join Chat
          </button>
        </Link>
      </div>
    </div>
  );
}
export {userName};