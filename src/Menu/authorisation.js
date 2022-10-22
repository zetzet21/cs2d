import { useRef } from "react";
import "./authorisation.css"



export default function Authorisation(props) {
    const { setData, server } = props;
    const login = useRef();
    const password = useRef()
    async function sendLoginHandler() {
        setData(await server.login(login.current.value, password.current.value));
    }

    return (
        <div className="login-form">
            <fieldset>
            <input ref={login} placeholder={"login"} type={"login"}></input>
            <input ref={password} placeholder={"password"} type={"password"}></input>
            <span> <a href="#" onClick={sendLoginHandler}></a></span>
            </fieldset>
        </div>
    )
}