import Game from "../game/game";
import Chat from "./chat/Chat.js";
import { useState } from "react";
import "./authorisation.css"
import "./menu.css"

export default function Header(props) {
   const { server, data, setData } = props;
   const [state, setState] = useState("menu")

   async function logout() {
      setData(await server.logout())
      // game.destroy(true, false);
      // game = null;
   }

   function gameStart() {
      setState("game")
   }

   function openChat() {
      setState(state === "chat" ? "menu" : "chat");
   }

   return (
      <div>
         {state === "game" ?
            <Game server={server} /> :
            <div className="menu">
               <div>
                  <button className="button" onClick={gameStart}>ИГРАТЬ</button>
                  <button className="button">ПЕРСОНАЛИЗАЦИЯ</button>
                  <button className="button">НАСТРОЙКИ</button>
                  <button className="button" onClick={logout}>ВЫЙТИ</button>
                  <button className="buttonChat" onClick={openChat}></button>
               </div>
               {state === "chat" ?
                  <Chat server={server} data={data}></Chat> : ""
               }
            </div>
         }
      </div>
   );
}