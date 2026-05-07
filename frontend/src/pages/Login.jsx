import "./CreateAccount.css"
import {useState} from "react";

export default function CreateAccount() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const backendUrl = import.meta.env.VITE_API_URL;

    async function sendForm(event){
        event.preventDefault(); // stoppar sidreload //KRÄVS FÖR SUBMIT!
        console.log("Submitting form:", {name,password,});

        const res = await fetch(`${backendUrl}/api/logIn`, {
        method: "POST",
            headers: {"Content-Type": "application/json",},
            body: JSON.stringify({name, password}),
        });
        
        console.log("Response status:", res.status);

        const data = await res.json();
        console.log("Response body:", data);
    }

    return (
        <div>
            <h1>Log in</h1>
            <form onSubmit={sendForm}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                <input type="text" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>     
                <button type="submit">Done!</button>
            </form>
        </div>
    )
}