import "./CreateAccount.css"
import {useState} from "react";
import ReturnButton from "../components/ReturnButton.jsx";
import { useAuth } from "../context/useAuth";
import CreateAccount from "./CreateAccount.jsx";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const backendUrl = import.meta.env.VITE_API_URL;
    const [showPopup, setShowPopup] = useState(false);
    const { refreshUser } = useAuth();
    const navigate = useNavigate();
    const onCreateAccount = () => {
    navigate("/create-account");
    };

    async function sendForm(event){
        event.preventDefault(); // stoppar sidreload //KRÄVS FÖR SUBMIT!
        console.log("Submitting form:", {username,password,});

        const res = await fetch(`${backendUrl}/api/logIn`, {
        method: "POST",
            headers: {"Content-Type": "application/json",},
            credentials: "include",
            body: JSON.stringify({username, password}),
        });
        
        console.log("Response status:", res.status);

        const data = await res.json();
        console.log("Response body:", data);
        if(res.ok){
            setShowPopup(true);
        }

        await refreshUser();
    }

    return (
            <div>
                <ReturnButton />
                <Button id="create-account-button" onClick={onCreateAccount} variant="login-button" text="Create Account" />
                <h1>Log in</h1>
                {!showPopup && (
                    <form onSubmit={sendForm}>
                        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>     
                        <button type="submit">Done!</button>
                    </form>
                )}
                {showPopup && (
                    <div style={{
                    position: "fixed",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "#1f351f",
                    padding: "20px",
                    border: "1px solid black",
                    borderRadius: "10px",
                    zIndex: 1000
                    }}>
                    <h2>Welcome {username}!</h2>
                    <ReturnButton />
                    </div>
                )}
            </div>
    )
}