const calcNumber = document.querySelectorAll(".number"); 
const calcOperator = document.querySelectorAll(".operator");
const calcDecimal = document.querySelector(".decimal");
const calcEquals = document.querySelector(".equals");
const screenBottom = document.querySelector(".screenBottom");

const displayValue = document.createElement("span");
screenBottom.appendChild(displayValue);

let operator;
let number;
let input = [];

function getOperator() {
    for (const x of calcOperator) {
        x.addEventListener("click", e => {
            operator = e.currentTarget.id // targeting "id" of a clicked element(operator)
            console.log(operator);
        })
    }
}

function getNumber() {
    for (const x of calcNumber) {
        x.addEventListener("click", e => {
            number = e.currentTarget.id
            number = number.replace(/\D/g, ""); //extracting text from my "id" to get number only
            input.push(number);
            displayValue.textContent = `${input.join("")}`;
            console.log(input);
        });
    }
}

function sum(a, b) {
    const result = a + b;
    console.log(result);
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
    if (operator === "add") sum(num1, num2);
}

getOperator();
getNumber();