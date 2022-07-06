const calcNumber = document.querySelectorAll(".number"); 
const calcOperator = document.querySelectorAll(".operator");
const calcDecimal = document.querySelector(".decimal");
const calcEquals = document.querySelector(".equals");
const screenTop = document.querySelector(".screenTop");
const screenBottom = document.querySelector(".screenBottom");

const displayTop = document.createElement("span");
const displayBottom = document.createElement("span");
screenTop.appendChild(displayTop);
screenBottom.appendChild(displayBottom);

for (x of calcNumber) {
    x.addEventListener("click", e => {
        showNumber(e.target.innerText)
        getNumber(e.target.innerText)
    });
}

for (x of calcOperator){
    x.addEventListener("click", e => getOperator(e.target.innerText));
}

calcEquals.addEventListener("click", operate);

let num1;
let num2;
let currentInput = [];
let resetDisplay = false;
let operator

function getNumber(currentNumber) {
    currentInput.push(currentNumber);           
} 

function showNumber(number) {
    if (resetDisplay === true) displayBottom.textContent = "";
    displayBottom.textContent += `${number}`; 
}

function getOperator(currentOperator) {
    operator = currentOperator;
    num1 = Number(currentInput.join(""));
    console.log(num1)
    console.log(currentOperator);
    while (currentInput.length) currentInput.pop();
    displayTop.textContent = `${num1}` + " " + `${operator}` + " "; 
    resetDisplay = true;
}

function operate() {
    num2 = Number(currentInput.join(""));
    console.log(num2)
    displayTop.textContent = `${num1}` + " " + `${operator}` + " " + `${num2}`;
    displayBottom.textContent = processCalculation()
}
 
function processCalculation() {
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
