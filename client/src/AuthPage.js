import { useState, useEffect } from "react";

const LOGIN_URL = "http://localhost:3010/api/auth/login";
const SIGNUP_URL = "http://localhost:3010/api/auth/signup";

function AuthPage() {
    // used for users logging in
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    // used for users creating an account
    const [signupEmail, setSignupEmail] = useState("");
    const [signupPassword, setSignupPassword] = useState("");
    const [signupFirstName, setSignupFirstName] = useState("");
    const [signupLastName, setSignupLastName] = useState("");

    const [error, setError] = useState("");


    // called when user presses login button
    const handleLogin = async (event) => {
        event.preventDefault();
        setError("");
        
        // check fields are entered
        if (!loginEmail || !loginPassword) {
            setError("Fill in all fields");
            return;
        }

        try {
            // validate against backend
            const response = await fetch(LOGIN_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: loginEmail,
                    password: loginPassword
                })
            });

            if (!response.ok) {
                const errData = await response.json(); // wait for backend error messages
                setError(errData.message);
                return;
            }
            
            const data = await response.json();
            console.log(data.message);
        }
        catch (err) {
            // console.log(err);
            setError(err.message);
        }


    };

    // called when user presses signup button
    const handleSignup = (event) => {
        event.preventDefault();

        // TODO -- finish this to test with backend
        // very similar to login
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
            <form onSubmit={handleSignup}>
                <label htmlFor="fname">First: </label>
                <input name="fname" type="email" onChange={(e) => setSignupFirstName(e.target.value)} required></input>
                <br/>
                <label htmlFor="lname">Last: </label>
                <input name="lname" type="email" onChange={(e) => setSignupLastName(e.target.value)} required></input>
                <br/>
                <label htmlFor="signupEmail">Email: </label>
                <input name="signupEmail" type="email" onChange={(e) => setSignupEmail(e.target.value)} required></input>
                <br/>
                <label htmlFor="signupPassword">Password: </label>
                <input name="signupPassword" type="password" onChange={(e) => setSignupPassword(e.target.value)} required></input>
                <br/>
                <button type="submit">Sign Up</button>
            </form>

            <br/>
            <br/>
            <p>Email: {loginEmail}</p>
            <p>Password: {loginPassword}</p>
            <p>Error: {error}</p>
        </div>
    )

};


export default AuthPage;

