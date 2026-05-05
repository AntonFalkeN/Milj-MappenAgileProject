import "./CreateAccount.css"


export default function CreateAccount() {
    return (
        <div>
            <h1>Create Account</h1>
            <form>
                <input type="text" placeholder="Name"/>
                <input type="text" placeholder="Password"/>
                <input type="text" placeholder="Confirm Passowrd"/>
            </form>
        </div>
    )
}