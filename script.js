"use strict";
const classNumber = document.querySelectorAll(".number"); 
const classOperator = document.querySelectorAll(".operator");
const decimalBtn = document.querySelector(".decimal");
const equalsBtn = document.querySelector(".equals");
const screenTop = document.querySelector(".screenTop");
const screenBottom = document.querySelector(".screenBottom");
const clearBtn = document.querySelector(".clear");
const deleteBtn = document.querySelector(".delete");

const displayTop = document.createElement("span");
const displayBottom = document.createElement("span");
screenTop.appendChild(displayTop);
screenBottom.appendChild(displayBottom);

equalsBtn.addEventListener("click", operate);
clearBtn.addEventListener("click", clearDisplay);
deleteBtn.addEventListener("click", deleteLastNumber);
document.addEventListener("keydown", e => keyboardListener(e));

for (let x of classNumber) {
    x.addEventListener("click", e => {
        showNumber(e.target.innerText);
        saveNumber(e.target.innerText);
    });
}

for (let x of classOperator){
    x.addEventListener("click", e => getOperator(e.target.innerText));
}

let num1;
let num2;
let input = [];
let resetBottomDisplay = false;
let operator = null;

function showNumber(number) {
    if (resetBottomDisplay === true) resetDisplay();
    displayBottom.textContent += `${number}`; 
}

function saveNumber(selectedNumber) {
    input.push(selectedNumber);
} 

function getOperator(selectedOperator) {
    if (operator !== null ) operate();
    if (num1 === undefined) num1 = Number(input.join(""));
    operator = selectedOperator;
    while (input.length) input.pop();
    displayTop.textContent = num1 + " " + operator;
    resetBottomDisplay = true;
}

function operate() {           
    num2 = Number(input.join(""));
    displayTop.textContent = calculate(operator, num1, num2);
    displayBottom.textContent = calculate(operator, num1, num2);
    num1 = calculate(operator, num1, num2);
    while (input.length) input.pop();
    resetBottomDisplay = true;
}
 
function calculate(operator, num1, num2) {
    if (operator === "+") return sum(num1, num2);
    if (operator === "-") return subtract(num1, num2);
    if (operator === "÷" || operator === "/") return divide(num1, num2);
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
    while (input.length) input.pop();
    operator = null;
    num1 = undefined;
    num2 = undefined;
}

function deleteLastNumber() {
    input.pop();
    const number = Number(input.join(""));
    displayBottom.textContent = number;
}

function resetDisplay() {
    displayBottom.textContent = "";
    resetBottomDisplay = false;
}

function keyboardListener(e) {
    if (e.key >= 0 && e.key <= 9) {
        showNumber(e.key);
        saveNumber(e.key);
    }
    if (e.key === "*") getOperator("x");
    if (e.key === "/") getOperator("÷");
    if (e.key === "+" || e.key === "-") getOperator(e.key);
    if (e.key === "Enter" || e.key === "=") operate();
    // if (e.key === ".") getOperator(e.key);
    if (e.key === "Backspace" || e.key === "Delete") deleteLastNumber();
    if (e.key === "Escape") clearDisplay();
}