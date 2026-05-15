import ReturnButton from "../components/ReturnButton";
import { useState } from "react";
import "./CreateAccount.css";
import SearchGlass from "../components/SearchGlass.jsx";


export default function CreateAccount() {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const backendUrl = import.meta.env.VITE_API_URL;

    async function sendForm(event){
        event.preventDefault(); // stoppar sidreload //KRÄVS FÖR SUBMIT!
        
        if(confirmPassword()){
            const account = {name: name, password: password}
            console.log("Submitting form:", {name,password,});
            const res = await fetch(`${backendUrl}/api/createAccount`, {
                method: "POST",
                headers: {"Content-Type": "application/json",},
                body: JSON.stringify(account),
            });
        
            console.log("Response status:", res.status);

            const data = await res.json();
            console.log("Response body:", data);
            setShowPopup(true);
            return true;
        } 
        else {
            setShowPopup(false);
            console.log("Passwords do not match");
            return false;
        }
        
    }

    function confirmPassword(){
        if(password === confirmedPassword){
            return true;
        }
        return false;
    }

    return (
        <div>
            <ReturnButton />
            <h1>Create Account</h1>
            <form onSubmit={sendForm}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>  
                <input type="text" placeholder="Confirm Password" value={confirmedPassword} onChange={(e) => setConfirmedPassword(e.target.value)}/>
                {!showPopup &&(<button type = "submit">Create Account</button>)}
            </form>
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
                <h2>Account created successfully!</h2>
                <ReturnButton />
                </div>
            )}
        </div>

        
    )
}