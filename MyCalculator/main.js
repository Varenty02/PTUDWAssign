"use strict";
const input = document.getElementById('input');
const numbers = document.querySelectorAll('.numbers div');
const operators = document.querySelectorAll('.operators div');
const result = document.getElementById('result');
const clear = document.getElementById('clear');
let resultDisplayed = false;

function addInput(inputValue) {
    const currentString = input.innerHTML;
    const lastChar = currentString[currentString.length - 1];
    if (resultDisplayed === true && isOperator(lastChar)) {
        input.innerHTML = currentString.slice(0, -1) + inputValue;
    } else if (resultDisplayed === true) {
        resultDisplayed = false;
        input.innerHTML = inputValue;
    } else {
        input.innerHTML += inputValue;
    }
}

function isOperator(char) {
    return char === '+' || char === '-' || char === '×' || char === '÷';
}

for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', function(e) {
        addInput(e.target.innerHTML);
    });
}

for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener('click', function(e) {
        const currentString = input.innerHTML;
        const lastChar = currentString[currentString.length - 1];
        if (!currentString.length) {
            console.log('Enter a number first');
        } else if (isOperator(lastChar)) {
            input.innerHTML = currentString.slice(0, -1) + e.target.innerHTML;
        } else {
            input.innerHTML += e.target.innerHTML;
        }
    });
}

result.addEventListener('click', function() {
    const inputString = input.innerHTML;
    const numbersArray = inputString.split(/[\+\-\×\÷]/g).map(Number);
    const operatorsArray = inputString.replace(/[0-9]|\./g, '').split('');
    let result = numbersArray[0];
    for (let i = 0; i < operatorsArray.length; i++) {
        switch(operatorsArray[i]) {
            case '+':
                result += numbersArray[i+1];
                break;
            case '-':
                result -= numbersArray[i+1];
                break;
            case '×':
                result *= numbersArray[i+1];
                break;
            case '÷':
                result /= numbersArray[i+1];
                break;
            default:
                console.log('Invalid operator');
        }
    }
    input.innerHTML = result;
    resultDisplayed = true;
});

clear.addEventListener('click', function() {
    input.innerHTML = '';
});