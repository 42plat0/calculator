class Calculator{
    constructor(previousOperand, currentOperand){
        this.previousOperand = previousOperand;
        this.currentOperand = currentOperand;
    }
    appendNumber(number){
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    deleteNumber(){

    }
    allClear(){

    }
    updateDisplay(){
        currentOperandDisplay.textContent = this.currentOperand
    }
}

let previousOperandDisplay = document.querySelector("[data-previous-operand]");
let currentOperandDisplay = document.querySelector("[data-current-operand]")
let number = document.querySelectorAll("[data-number]");
let operation = document.querySelectorAll("[data-operation]")
let equal = document.querySelector("[data-equal]");
let deleteNum = document.querySelector("[data-delete]");
let allClear = document.querySelector("[data-all-clear]");

let currentOperand = '';
let previousOperand = '';
let operator = '';

const calculator = new Calculator(previousOperand, currentOperand);

number.forEach(number => {
    number.addEventListener("click", (num)=>{
        calculator.appendNumber(num.target.innerText);
        calculator.updateDisplay();
    })
})