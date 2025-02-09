import "../Styles/message.css";

export default function Messages({ msg, type = "received" ,user,classs}) {
    if(user){
    return (
        <div className= {`messageBox ${type} ${classs}`}>
            {`${user} : ${msg}`}
        </div>
    );
}
    else{
        return(
        <div className={`messageBox ${type} ${classs}`}>
            {`you : ${msg}`}
            {console.log(user)}
        </div>
        )
    }
}
