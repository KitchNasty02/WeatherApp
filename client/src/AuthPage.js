import { useState, useEffect } from "react";



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
        let user = {
            email: loginEmail,
            password: loginPassword
        }

        let authURL = "http://localhost:3010/api/auth";
        const response = await fetch(authURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        }).then((res) => res.json()).catch((err) => {
            setError(err);
        })

        // let isLoggedIn = await response.json();
        // // login
        // console.log(`Is user logged in? ${isLoggedIn.message}`)


    }

    // called when user presses signup button
    const handleSignup = (event) => {
        console.log("signup clicked");

        event.preventDefault();
    }


    return (
        <div>
            <h1>AuthPage</h1>
            
            {/* this is for login */}
            <form onSubmit={handleLogin}>
                <label htmlFor="loginEmail">Email: </label>
                <input name="loginEmail" type="email" onChange={(e) => setLoginEmail(e.target.value)} required></input>
                <br/>
                <label htmlFor="loginPassword">Password: </label>
                <input name="loginPassword" type="password" onChange={(e) => setLoginPassword(e.target.value)} required></input>
                <br/>
                <button type="submit">Login</button>
            </form>

            {/* this is for signup (do another form)*/}

            <button type="submit" onClick={handleSignup}>Signup</button>

            <br/>
            <br/>
            <p>Email: {loginEmail}</p>
            <p>Password: {loginPassword}</p>
            <p>Error: {error}</p>
        </div>
    )

};


export default AuthPage;

