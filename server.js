const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// FizzBuzz endpoint
app.post('/fizzbuzz', (req, res) => {
    const { number } = req.body;
    
    if (!number || typeof number !== 'number') {
        return res.status(400).json({ 
            error: 'Please provide a valid number' 
        });
    }
    
    let result;
    
    if (number % 3 === 0 && number % 5 === 0) {
        result = 'FizzBuzz';
    } else if (number % 3 === 0) {
        result = 'Fizz';
    } else if (number % 5 === 0) {
        result = 'Buzz';
    } else {
        result = number.toString();
    }
    
    res.json({ 
        number: number,
        result: result 
    });
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`FizzBuzz server running on http://localhost:${PORT}`);
});