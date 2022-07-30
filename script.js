const calcNumber = document.querySelectorAll(".number"); 
const calcOperator = document.querySelectorAll(".operator");
const calcDecimal = document.querySelector(".decimal");
const calcEquals = document.querySelector(".equals");
const screenTop = document.querySelector(".screenTop");
const screenBottom = document.querySelector(".screenBottom");
const clearAll = document.querySelector(".clear");
const deleteNum = document.querySelector(".delete");

const displayTop = document.createElement("span");
const displayBottom = document.createElement("span");
screenTop.appendChild(displayTop);
screenBottom.appendChild(displayBottom);

calcEquals.addEventListener("click", operate);
clearAll.addEventListener("click", clearDisplay);
deleteNum.addEventListener("click", deleteNumber);
document.addEventListener("keydown", e => keyboardListener(e));

for (x of calcNumber) {
    x.addEventListener("click", e => {
        showNumber(e.target.innerText);
        getNumber(e.target.innerText);
    });
}

for (x of calcOperator){
    x.addEventListener("click", e => getOperator(e.target.innerText));
}

let num1;
let num2;
let currentInput = [];
let resetDisplay = false;
let operator = null;
let nextOperator = null;
let result = null;

function showNumber(number) {
    if (resetDisplay === true) resetDisplayFn();
    displayBottom.textContent += `${number}`; 
}

function getNumber(currentNumber) {
    currentInput.push(currentNumber);           
} 

function getOperator(currentOperator) {
    if (operator !== null) {
        nextOperator = currentOperator;          // next operators
        return operate();
    } else if (result !== null) {
        nextOperator = currentOperator
        return operate();
    } else {
        num1 = Number(currentInput.join(""));
        operator = currentOperator;             // first operator declared
        console.log(num1);
        console.log(currentOperator);
        while (currentInput.length) currentInput.pop();
        displayTop.textContent = `${num1}`+ " " + `${operator}` + " "; 
        resetDisplay = true;
    }
}

function operate() {
    if (result !== null) {
        num2 = Number(currentInput.join(""));
        console.log("nextOperator " + nextOperator);
        displayTop.textContent = `${processCalculation(operator, result, num2)}` + " " + `${nextOperator}`;
        displayBottom.textContent = processCalculation(operator, result, num2);
        result = processCalculation(operator, result, num2);
        while (currentInput.length) currentInput.pop();
        operator = nextOperator;
        nextOperator = null;
        resetDisplay = true;

    } else {                                    // initial (num) [operator] (num)
        num2 = Number(currentInput.join(""));
        console.log(num2);
        displayTop.textContent = `${processCalculation(operator, num1, num2)}` + " " + `${nextOperator}`;
        displayBottom.textContent = processCalculation(operator, num1, num2);
        result = processCalculation(operator, num1, num2);
        while (currentInput.length) currentInput.pop();
        console.log("equals " + result);
        operator = nextOperator;
        nextOperator = null;
        resetDisplay = true;
    }
}
 
function processCalculation(selectedOperator, num1, num2) {
    if (selectedOperator === "+") return sum(num1, num2);
    if (selectedOperator === "-") return subtract(num1, num2);
    if (selectedOperator === "÷") return divide(num1, num2);
    if (selectedOperator === "x") return multiply(num1, num2);
}

function sum(a, b) {
    return a + b;
}

function subtract(a, b) { 
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function clearDisplay() {
    displayTop.textContent = "";
    displayBottom.textContent = "";
    operator = null;
    result = null;
    while (currentInput.length) currentInput.pop();
    if (num1) while (num1.length) num1.pop();
    if (num2) while (num2.length) num2.pop();
}

function deleteNumber() {
    currentInput.pop();
    number = Number(currentInput.join(""));
    displayBottom.textContent = number;
}

function resetDisplayFn() {
    displayBottom.textContent = "";
    resetDisplay = false;
}

function keyboardListener(e) {
    if (e.key >= 0 && e.key <= 9) {
        showNumber(e.key);
        getNumber(e.key);
    }
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") getOperator(e.key);
    // if (e.key === "Enter" || e.key ==="=")
    // if (e.key === ".") 
    // if (e.key === "Backspace" || e.key === "Delete") deleteNumber();
    if (e.key === "Escape") clearDisplay();
}