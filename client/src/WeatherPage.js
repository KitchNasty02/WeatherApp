import { useState } from "react";
import { Navigate } from "react-router-dom";


function WeatherPage() {
    const [logout, setLogout] = useState(null);

    const [zip, setZip] = useState("");
    const [zipError, setZipError] = useState("");

    const [searchError, setSearchError] = useState("");

    const handleSearch = async (event) => {
        console.log("Search pressed");
        event.preventDefault();
        setZipError("");

        // TODO -- validate zip (check with re)
        if (!zip) {
            setZipError("Enter a zip code");
            return;
        }


        try {
            const API_URL = `http://localhost:3010/api/curweather?zip=${zip}`;
            const response = await fetch(API_URL);

            const data = await response.json();

            if (!response.ok) {
                setSearchError(data.message);
                return;
            }
            
            console.log(data.weather);

        }
        catch (err) {
            setSearchError(err.message);
        }



    }

    const handleLogout = () => {
        console.log("Logout user");
        setLogout(true);
    }

    if (logout) {
        return <Navigate to="/"/>;
    }

    return (
        <div>
            <h1>Weather Page</h1>
            <button type="submit" onClick={handleLogout}>Logout</button>

            <br/><br/>

            <form onSubmit={handleSearch}>
                <label htmlFor="zip">Enter zip: </label>
                <input name="zip" type="text" onChange={(e) => setZip(e.target.value)}></input>
                <button name="search" type="submit">Search</button>
            </form>

            <p>Zip Error: {zipError}</p>
            <p>Search Error: {searchError}</p>
        </div>
    )


}

export default WeatherPage;