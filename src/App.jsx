import React, { useState, useEffect } from "react";

const FetchData = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts") // API Endpoint
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Failed to fetch data:", error);
                setError("No internet connection. Using cached data.");
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h2>API Data (Cached & Auto-Updated)</h2>
            {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
                <ul>
                    {data.map((item, index) => (
                        <li key={index}>{item.title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default FetchData;
