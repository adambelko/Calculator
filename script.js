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

for (x of calcNumber) {
    x.addEventListener("click", e => {
        showNumber(e.target.innerText);
        getNumber(e.target.innerText);
    });
}

for (x of calcOperator){
    x.addEventListener("click", e => getOperator(e.target.innerText));
}

calcEquals.addEventListener("click", operate);
clearAll.addEventListener("click", clearDisplay);
deleteNum.addEventListener("click", deleteNumber);
document.addEventListener("keydown", e => keyboardListener(e));

let num1;
let num2;
let currentInput = [];
let resetDisplay = false;
let operator = null;
let showOperator = null;
let result = null;

function getNumber(currentNumber) {
    currentInput.push(currentNumber);           
} 

function showNumber(number) {
    if (resetDisplay === true) resetDisplayFn();
    displayBottom.textContent += `${number}`; 
}

function getOperator(currentOperator) {
    if (operator !== null) {
        showOperator = currentOperator;
        return operate();
    } else if (result !== null) {
        operator = currentOperator; //here is problem 
        (console.log("operator " + operator))
        num2 = Number(currentInput.join(""));
        return operate()
    } else {
        num1 = Number(currentInput.join(""));
        operator = currentOperator;
        console.log(num1);
        console.log(currentOperator);
        while (currentInput.length) currentInput.pop();
        displayTop.textContent = `${num1}`+ " " + `${operator}` + " "; 
        resetDisplay = true;
    }
}

function operate() {
    if (result !== null) {
        console.log("num2 " + num2)
        console.log("showOperator " + showOperator);
        displayTop.textContent = `${test(result, num2)}` + " " + `${operator}`;
        displayBottom.textContent = test(result, num2);
        result = test(result, num2);
        while (currentInput.length) currentInput.pop();
        resetDisplay = true;
        operator = null;

    } else {
        num2 = Number(currentInput.join(""));
        console.log(num2);
        displayTop.textContent = `${processCalculation(num1, num2)}` + " " + `${showOperator}`;
        displayBottom.textContent = processCalculation(num1, num2);
        result = processCalculation(num1, num2);
        while (currentInput.length) currentInput.pop();
        console.log("result else operate " + result);
        operator = null;
        resetDisplay = true;
    }
}

function test(num1, num2) {
    if (showOperator === "+") return sum(num1, num2);
    if (showOperator === "-") return subtract(num1, num2);
    if (showOperator === "÷") return divide(num1, num2);
    if (showOperator === "x") return multiply(num1, num2);
}
 
function processCalculation(num1, num2) {
    if (operator === "+") return sum(num1, num2);
    if (operator === "-") return subtract(num1, num2);
    if (operator === "÷") return divide(num1, num2);
    if (operator === "x") return multiply(num1, num2);
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