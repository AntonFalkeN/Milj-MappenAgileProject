import ReturnButton from "../components/ReturnButton";
import { useState } from "react";
import "./CreateAccount.css";

export default function CreateAccount() {
const [name, setName] = useState("");
const [password, setPassword] = useState("");
const [confirmedPassword, setConfirmedPassword] = useState("");
const [showPopup, setShowPopup] = useState(false);

const backendUrl = import.meta.env.VITE_API_URL;

function confirmPassword() {
    return password === confirmedPassword;
}

async function sendForm(event) {
    event.preventDefault();

    if (!confirmPassword()) {
    setShowPopup(false);
    console.log("Passwords do not match");
    return;
    }

    const account = { name, password };

    console.log("Submitting form:", account);

    try {
    const res = await fetch(`${backendUrl}/api/createAccount`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(account),
    });

    const data = await res.json();
    console.log("Response:", data);

    setShowPopup(true);
    } catch (err) {
    console.error("Request failed:", err);
    }
}

return (
    <div className="createAccountPage">
    <div className="createAccountContent">
        <ReturnButton />

        <h1 className="title">Create Account</h1>

        <form className="card" onSubmit={sendForm}>
        <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />

        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <input
            type="password"
            placeholder="Confirm Password"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
        />

        {!showPopup && (
            <button type="submit">Create Account</button>
        )}
        </form>

        {showPopup && (
        <div className="popup">
            <h2>Account created successfully!</h2>
            <ReturnButton />
        </div>
        )}
    </div>
    </div>
);
}