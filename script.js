class Calculator{
    constructor(previousOperandDisplay, currentOperandDisplay){
        this.previousOperandDisplay = previousOperandDisplay;
        this.currentOperandDisplay = currentOperandDisplay;

        this.currentOperand = "";
        this.previousOperand = "";
        this.operator = undefined;
    }

    appendNumber(number){
        if(number === "." && this.currentOperand.includes(".")) return;
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    deleteNumber(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    allClear(){
        this.currentOperand = ""
        this.previousOperand = ""
        this.operation = undefined;
    }

    addOperation(operator){
        if(this.currentOperand === "") return;
        if(this.previousOperand !== "") this.calculate()
        this.operation = operator;
        this.previousOperand = this.currentOperand;
        this.currentOperand = ""
    }
    displayTextComma(num){
        const stringNumber = num.toString();
        const integerDigs = parseFloat(stringNumber.split(".")[0])
        const decDigs = stringNumber.split(".")[1]
        let integerDisplay;

        if(isNaN(integerDigs)){
            integerDisplay = ''
        }
        else{
            integerDisplay = integerDigs.toLocaleString("en")
        }

        if (decDigs != null){
            return `${integerDisplay}.${decDigs}`        
        }
        else{
            return integerDisplay
        }
        
    }
    updateDisplay(){
        this.currentOperandDisplay.innerText = this.displayTextComma(this.currentOperand)
        if(this.operation != null){
            this.previousOperandDisplay.innerText = `${this.previousOperand} ${this.operation}`
        }
        else{
            this.previousOperandDisplay.innerText = ""
        }
    }

    calculate(){
        if(this.previousOperand === "" || this.currentOperand === "") return;
        let total;
        let previous = parseFloat(this.previousOperand)
        let current = parseFloat(this.currentOperand);
        switch(this.operation){
            case "*":
                total = previous * current;
                break;
            case "÷":
                total = previous / current;
                break;
            case "+":
                total = previous + current; 
                break;
            case "-":
                total = previous - current;
                break;
            default:
                break;
        }
        this.currentOperand = total;
        this.previousOperand = ""
        this.operation = undefined;
    }
}

let previousOperandDisplay = document.querySelector("[data-previous-operand]");
let currentOperandDisplay = document.querySelector("[data-current-operand]")
let numberButton = document.querySelectorAll("[data-number]");
let operationButton = document.querySelectorAll("[data-operation]")
let equalButton = document.querySelector("[data-equal]");
let deleteButton = document.querySelector("[data-delete]");
let allClearButton = document.querySelector("[data-all-clear]");

const calculator = new Calculator(previousOperandDisplay, currentOperandDisplay);

numberButton.forEach(num => {
    num.addEventListener("click", ()=>{
        calculator.appendNumber(num.innerText);
        calculator.updateDisplay();
    })
})
document.addEventListener('keydown', function(event){
    if(isNaN(+event.key) == false){
        calculator.appendNumber(event.key)
        calculator.updateDisplay();
    }
    switch(event.key){
        case ".":
            calculator.appendNumber(event.key)
            calculator.updateDisplay();
            break;
        case "*":
            calculator.addOperation("*");
            calculator.updateDisplay();
            break;
        case "/":
            calculator.addOperation("÷");
            calculator.updateDisplay();
            break;
        case "+":
            calculator.addOperation("+");
            calculator.updateDisplay();
            break;
        case "-":
            calculator.addOperation("-");
            calculator.updateDisplay();
            break; 
        case "Backspace":
            calculator.deleteNumber();
            calculator.updateDisplay();
            break;
        case "Enter":
            calculator.calculate();
            calculator.updateDisplay()
            break;
    }        
    
});

deleteButton.addEventListener("click", ()=>{
    calculator.deleteNumber();
    calculator.updateDisplay()
})

allClearButton.addEventListener("click", () =>{
    calculator.allClear();
    calculator.updateDisplay();
})

operationButton.forEach(operator =>{
    operator.addEventListener("click", ()=>{
        calculator.addOperation(operator.innerText);
        calculator.updateDisplay();
    })
})

equalButton.addEventListener("click", function(){
    calculator.calculate();
    calculator.updateDisplay()
})

