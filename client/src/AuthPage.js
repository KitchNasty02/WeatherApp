import { useState } from "react";



function AuthPage() {
    // used for users logging in
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // used for users creating an account
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupName, setSignupName] = useState("");

    const [error, setError] = useState("");

    // USE USEEFFECT? since we have to send async to API to authorized login

    // called when user presses login button
    const handleLogin = async (event) => {
        console.log("login clicked");

        event.preventDefault();
        setError("");
        
        // check fields are entered
        if (!loginEmail || !loginPassword) {
            setError("Fill in all fields");
            return;
        }

        // validate against backend
        let authURL = "http://localhost:3000/api/auth";
        const response = await fetch(authURL, {
            method: "POST" //maybe add more parameters
        })
        // LOOK AT ZYBOOKS

    }

    // called when user presses signup button
    const handleSignup = (event) => {
        console.log("signup clicked");

        event.preventDefault();
    }


    return (
        <div>
            <h1>AuthPage</h1>

            <button type="submit" onClick={handleLogin}>Login</button>
            <button type="submit" onClick={handleSignup}>Signup</button>
        </div>
    )

};


export default AuthPage;

