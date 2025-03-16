// Fibonacci function (heavy computation)
const fibonacci = (n) => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
};

// Listen for messages from React component
self.onmessage = (event) => {
    const num = event.data;
    const result = fibonacci(num);
    self.postMessage(result); // Send result back to main thread
};
