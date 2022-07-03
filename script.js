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

let operator;
let number;
let numberTwo;
let num1;
let num2;
let input = [];
let inputTwo = [];


function getNumber() {
    for (const x of calcNumber) {
        x.addEventListener("click", e => {
            number = e.currentTarget.id         // targeting "id" of a clicked element("number-*")
            number = number.replace(/\D/g, ""); //extracting text from my "id" to get number only
            input.push(number);
            displayBottom.textContent = `${input.join("")}`;
        });
    }
}

function getSecondNumber() {
    for (const x of calcNumber) {
        x.addEventListener("click", e => {
            numberTwo = e.currentTarget.id         
            numberTwo = numberTwo.replace(/\D/g, "");
            inputTwo.push(numberTwo);
            num2 = Number(inputTwo.join(""));
            displayBottom.textContent = `${inputTwo.join("")}`;
            displayTop.textContent = `${num1}` + " " + `${operator}` + " " + `${num2}`;
            calcEquals.addEventListener("click", e => operate(operator, num1, num2))
        });
    }
}

function getOperator() {
    for (const x of calcOperator) {
        x.addEventListener("click", e => {
            if (e.currentTarget.id === "add") operator = "+";
            num1 = Number(input.join(""));
            displayTop.textContent = `${num1}` + " " + `${operator}` + " "; 
            displayBottom.textContent = `${num1}`;
            getSecondNumber()
        })
    }
}



function sum(a, b) {
    const result = a + b;
    displayBottom.textContent = `${result}`;
}

function subtract(a, b) { 
    const result = a - b;
    return result;
}

function multiply(a, b) {
    const result = a * b;
    return result;
}

function divide(a, b) {
    const result = a / b;
    return result;
}


function operate(operator, num1, num2) {
    if (operator === "+") sum(num1, num2);
}

getNumber();
getOperator();
