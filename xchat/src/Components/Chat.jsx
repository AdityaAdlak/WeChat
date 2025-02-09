import { useEffect, useState } from "react";
import {userName} from "../Components/join"
import socketIO from "socket.io-client"
import "../Styles/chat.css"
import Messages from "./Messages";
import ReactScrollToBottom from "react-scroll-to-bottom"
import { useNavigate } from "react-router-dom";

const ENDPOINT = "http://localhost:4000"
let socket;

export default function Chat()
{
    const navigate = useNavigate();
    const [id,setID]= useState("")
    const [wemessages , setWeMessages] = useState([])

    const send = ()=>{
        const message = document.getElementById("chatInput").value;
        socket.emit("message",{message,id});
        document.getElementById("chatInput").value = "";
    }



useEffect(() => {
    socket = socketIO(ENDPOINT,{transports : ["websocket"]});


    socket.on("connect",()=>{
        alert("Connected")
        setID(socket.id)
    })

    socket.emit("joined",{ userName })
    // comes when new user joined...


    socket.on("welcome",(data)=>{
     setWeMessages((prevMessage)=>[...prevMessage,data])
    })
    
    socket.on("userJoined",(data)=>{
        setWeMessages((prevMessage)=>[...prevMessage,data])
    })
    // emit means sending the data

    socket.on("leave",(data)=>{
        setWeMessages((prevMessage)=>[...prevMessage,data])
        console.log(data.user);
        console.log(data.message)
    })
    return ()=>{
        socket.emit("disconect",(data)=>{
            setWeMessages((prevMessage) => [...prevMessage,data])
            console.log(data.user)
        });

        socket.off();
    }
}, [])


    useEffect(() => {
     
        socket.on("sendMessage",(data)=>{
            setWeMessages((prevMessage)=>[...prevMessage,data])
            console.log(data.user , data.message , data.id)
        })
      return () => {
        socket.off();
      }
    }, [wemessages])
    


    return (
        <div className="chatPage">
            <div className="chatContainer">
                <div className="header">
                    <h1 className="title">WE CHAT</h1>
                    <button onClick={()=>navigate(-1)}><img className="logo" src="https://www.shutterstock.com/image-vector/cross-button-icon-cancel-close-260nw-1976622584.jpg" height="25px" width="25px"></img></button>
                </div>

                <ReactScrollToBottom className="chatbox">

                <div style={{ display: "flex", flexDirection: "column" }}>
                    {wemessages.map((item, index) => (
                            <Messages key={index} msg={item.message} classs={item.id===id ? 'right' : 'left'} user={item.id===id ? '' : item.user}/>
                     ))}
            </div>

                </ReactScrollToBottom>

                <div className="inputBox">
                    <input type="text" id="chatInput"></input>
                    <button className="sendBtn" onClick={send}>Send</button>
                </div>
            </div>
        </div>
    )
}