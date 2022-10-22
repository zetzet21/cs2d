import { useEffect, useRef, useState } from "react"
import Message from "./message.js"
import "./chat.css"
let messages = [];

export default function Chat(props) {
   
   const { server, data } = props;
   const [state, setState] = useState();
   const input = useRef();
   async function getMessages() {
      messages = await server.getMessages();
   }

      setInterval(() => {
         getMessages();
         setState(!state);
      }, 1000)
   


   async function sendMessage() {
      if (input.current.value) {
         await server.sendMessage(data.name, input.current.value);
         input.current.value = "";
         setState();
      }
   }



   return (
      <div className="chatWindow">
         <div className="mesh">
            {messages.map((element, index) => {
               return (<Message key={index} message={element}></Message>)
            })}
         </div>
         <div className="i">
            <input className="input" ref={input} placeholder="Введите сообщение..."></input>
            <button className="send" onClick={sendMessage}></button>
         </div>
      </div>
   )
}