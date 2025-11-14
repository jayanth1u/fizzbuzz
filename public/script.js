const numberInput = document.getElementById('numberInput');
const checkButton = document.getElementById('checkButton');
const resultDiv = document.getElementById('result');

// API endpoint (change this to your server URL when deployed)
const API_URL = 'http://localhost:3000/fizzbuzz';

async function checkFizzBuzz() {
    const num = parseInt(numberInput.value);
    
    if (!num || num < 1) {
        showResult('Please enter a valid number', 'number');
        return;
    }
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ number: num })
        });
        
        const data = await response.json();
        
        if (data.result === 'FizzBuzz') {
            showResult(data.result, 'fizzbuzz');
        } else if (data.result === 'Fizz') {
            showResult(data.result, 'fizz');
        } else if (data.result === 'Buzz') {
            showResult(data.result, 'buzz');
        } else {
            showResult(data.result, 'number');
        }
    } catch (error) {
        console.error('Error:', error);
        showResult('Error connecting to server', 'number');
    }
}

function showResult(text, type) {
    resultDiv.textContent = text;
    resultDiv.className = `result ${type}`;
    resultDiv.classList.remove('hidden');
}

checkButton.addEventListener('click', checkFizzBuzz);

numberInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        checkFizzBuzz();
    }
});