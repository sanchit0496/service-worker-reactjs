// import React, { useState, useEffect } from "react";

// const App = () => {
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetch("https://jsonplaceholder.typicode.com/posts") // API Endpoint
//             .then((response) => response.json())
//             .then((data) => {
//                 setData(data);
//                 setLoading(false);
//             })
//             .catch((error) => {
//                 console.error("Failed to fetch data:", error);
//                 setError("No internet connection. Using cached data.");
//                 setLoading(false);
//             });
//     }, []);

//     return (
//         <div>
//             <h2>API Data (Cached & Auto-Updated)</h2>
//             {loading ? <p>Loading...</p> : error ? <p>{error}</p> : (
//                 <ul>
//                     {data.map((item, index) => (
//                         <li key={index}>{item.title}</li>
//                     ))}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default App;



import React, { useState } from "react";
// Import worker properly in Vite
import FibonacciWorker from "../src/workers/fibonacciWorker.js?worker";

const FibonacciCalculator = () => {
    const [number, setNumber] = useState(40);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const worker = new FibonacciWorker(); // Create worker instance

    const calculateFibonacci = () => {
        setLoading(true);
        worker.postMessage(number); // Send input to worker

        worker.onmessage = (event) => {
            setResult(event.data); // Get result from worker
            setLoading(false);
        };
    };

    return (
        <div>
            <h2>Fibonacci Calculator (Web Worker)</h2>
            <input
                type="number"
                value={number}
                onChange={(e) => setNumber(Number(e.target.value))}
            />
            <button onClick={calculateFibonacci} disabled={loading}>
                {loading ? "Calculating..." : "Calculate"}
            </button>
            {result !== null && <p>Result: {result}</p>}
        </div>
    );
};

export default FibonacciCalculator;
