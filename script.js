let firstNumber;
let secondNumber;
let operator;
let secondOperator;
let answer;
let operatorList = ["+", "-", "/", "*"];

const screen = document.querySelector(".screen");
const topScreen = document.querySelector("#topscreen");
const bottomScreen = document.querySelector("#bottomscreen");
const numBtn = document.querySelectorAll(".num-btn");
const del = document.querySelector("#delete");
const clear = document.querySelector("#clear");
const dot = document.querySelector("#dot");
const ops = document.querySelectorAll(".ops-btn");
const equals = document.querySelector("#equals")

numBtn.forEach((button) =>
    button.addEventListener('click', () => addNumber(button.textContent)));

clear.addEventListener('click', clearScreen);
del.addEventListener('click', () => bottomScreen.textContent = bottomScreen.textContent.slice(0, -1))
dot.addEventListener('click', () => {
    if (bottomScreen.textContent.includes(".")) {
        return
    } else {
        bottomScreen.textContent += "."
    };
});

//let opsButtons = (e) => {
//    let id = e.target.getAttribute('id');
//        if (id === "plus") {
//            operator = "+";
//        } else if ( id === "subtract") {
//            operator = "-";
//        } else if ( id === "multiply") {
//            operator = "*";
//        } else if ( id === "divide") {
//            operator = "/";
//        } else {
//            return
//        };
//
//        if (typeof firstNumber === "number" || typeof firstNumber === "float") {
//            secondNumber = parseFloat(bottomScreen.textContent);
//            if (!Number.isNaN(secondNumber)) {
//                topScreen.textContent += secondNumber;
//                bottomScreen.textContent = "";
//                let answer = operate(operator, firstNumber, secondNumber);
//                topScreen.textContent = firstNumber + " " + operator + " " + secondNumber + "  = " + answer;
//                bottomScreen.textContent = "";
//                firstNumber = answer;
//                if (id === "plus" || id === "subtract" || id === "multiply" || id === "divide" || id === "equals") {
//                    topScreen.textContent = firstNumber;
//                }
//            }
//        } else {
//           firstNumber = parseFloat(bottomScreen.textContent);
//           let firstOperator = operator;
//           topScreen.textContent = firstNumber + " " + firstOperator;
//           bottomScreen.textContent = "";
//        };
//};

ops.forEach((button) => {
    button.addEventListener('click', () => pickOperator(button.textContent));
});

equals.addEventListener('click', calculate);

function operate(op, num1, num2) {
    if (op === "+") {
        return add(num1, num2);
    } else if (op === "-") {
        return subtract(num1, num2);
    } else if (op === "*") {
        return multiply(num1, num2);
    } else if (op === "/") {
        if(num2 === 0 || num2 === "0") {
            alert("Bro you can't divide by 0 dummy")
        } else {
            return divide(num1, num2);
        }
    } else {
        return "What the hell you tryna do huh?"
    };
}

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function divide(num1, num2) {
{ return num1 / num2;
    };
}

function multiply(num1, num2) {
    return num1 * num2;
}

function clearScreen() {
    bottomScreen.textContent = "";
    topScreen.textContent = "";
    firstNumber = "";
    secondNumber = "";
    operator = "";
    answer = "";
}

function addNumber(num) {
    bottomScreen.textContent += num;
}

function pickOperator(op) {

    if (bottomScreen.textContent === "" && topScreen.textContent.includes("=")) {
        firstNumber = answer;
        operator = op;
        topScreen.textContent = firstNumber + " " + operator;
        return
    };

    if (bottomScreen.textContent === "") {
        return;
    }

    let anyOperator = operatorList.some(op => topScreen.textContent.includes(op))
    if (bottomScreen.textContent !== "" && anyOperator && !topScreen.textContent.includes("=")) {
        secondNumber = bottomScreen.textContent;
        answer = roundUp(
            operate(operator, Number(firstNumber), Number(secondNumber))
            );
        operator = op;
        topScreen.textContent = answer + " " + operator;
        firstNumber = answer;
        bottomScreen.textContent = "";
        return
    };

    firstNumber = bottomScreen.textContent;
    operator = op;
    topScreen.textContent = firstNumber + " " + operator;
    bottomScreen.textContent = "";
};  

function calculate() {
    if (operator === "" || bottomScreen.textContent === "") {
        return
    };
    secondNumber = bottomScreen.textContent;
    answer = roundUp(
        operate(operator, Number(firstNumber), Number(secondNumber))
        );
    topScreen.textContent = firstNumber + " " + operator + " " + secondNumber + "  = " + answer;
    operator = "";
    bottomScreen.textContent = "";
}

function roundUp(num) {
    return Math.round(num * 1000) / 1000;
}