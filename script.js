const display = document.querySelector(`#display`);
const allButtons = document.querySelector(`.buttons-area`);
const decimalPoint = document.querySelector(`#decimal`);
const buttonsRight = document.querySelector(`.buttons-right`);


allButtons.addEventListener(`click`, (event) => {
    
    switch(event.target.id) {
        case `nine` : 
            show(`9`);
            break;
        case `eight` : 
            show(`8`);
            break;
        case `seven` : 
            show(`7`);
            break;
        case `six` : 
            show(`6`);
            break;
        case `five` : 
            show(`5`);
            break;
        case `four` : 
            show(`4`);
            break;
        case `three` : 
            show(`3`);
            break;
        case `two` : 
            show(`2`);
            break;
        case `one` : 
            show(`1`);
            break;
        case `zero` : 
            show(`0`);
            break;
        case `clear` : 
            clearDisplay();
            break;
        case `clearOne` : 
            clearOne();
            break;
        case `plusMinus` : 
            plusMinus();      
            break;
        case `decimal` : 
            decimal();
            break;
        case `add` : 
            operatorToUse(`+`);    
            break;
        case `sub` : 
            operatorToUse(`-`);     
            break;
        case `mul` : 
            operatorToUse(`×`);     
            break;
        case `div` : 
            operatorToUse(`÷`);
            break;
        case `equals` : 
            operate();
            break;
    }
})

allButtons.addEventListener(`mouseover`, (event) => { //4AE3AF
    
    if (event.target.matches(`.buttons-right > button`)) {
        if (event.target.id !== `equals`) {
            event.target.style.backgroundColor = `#bc3254`; 
            event.target.style.color = `#ffffff`;
        } else {
            event.target.style.backgroundColor = `#e34a7e`;
        }
    } else if (event.target.matches(`.buttons-left-top > button`)) {
        if (event.target.id === `plusMinus` || event.target.id === `clear` || event.target.id === `clearOne`) {
            event.target.style.backgroundColor = `#1EC28A`;
            event.target.style.color = `#ffffff`;
        } else {
            event.target.style.backgroundColor = `#4AE3AF`;
        }
    } else if (event.target.matches(`.buttons-left-bot > button`)) {
        if (event.target.id === `decimal`) {
            event.target.style.backgroundColor = `#1EC28A`;
            event.target.style.color = `#ffffff`;
        } else {
            event.target.style.backgroundColor = `#4AE3AF`;
        }
    }
})

allButtons.addEventListener(`mouseout`, (event) => {
    
    document.querySelectorAll(`button`).forEach(() => {
        event.target.style.backgroundColor = ``;
        event.target.style.color = ``;
    });
})

function clearDisplay() {
    operationArr = [];
    showSecondOperand = false;
    display.textContent = `0`;
    isOperatorClicked = false;

    document.querySelectorAll(`button`).forEach(button => {
        button.disabled = false;
    })
}

function clearOne() {
    let displayText = display.textContent;
    let split = displayText.split(``);
    isOperatorClicked = false;

    if (displayText.length === 1) {
        clearDisplay();
    } else if (displayText.length === 2) {
        if (split.includes(`-`)) {
            clearDisplay();
        } else if (split.includes(`.`) && split[0] === `0`) {
            clearDisplay();
        } else {
            split.pop();
            display.textContent = split.join(``);
        }
    } else {
        split.pop();
        display.textContent = split.join(``);
    }
}


const MAX_LENGTH = 10;
let showSecondOperand = false;

function show(value) {
    isOperatorClicked = false;
    let displayNum = display.textContent;

    if (displayNum === `0`) {
        display.textContent = value;
        showSecondOperand = true;
    } else {
        if (showSecondOperand == false) {
            display.textContent = value;
            showSecondOperand = true;
        } else {
            display.textContent += value;
        }
    }
}

function plusMinus() {

    let currentDisplay = display.textContent;
    isOperatorClicked = false;

    const split = currentDisplay.split(``);
    if (currentDisplay != 0) {
        if (!split.includes(`-`)) {
            split.unshift(`-`);
            display.textContent = split.join(``);
        } else {
            split.shift();
            display.textContent = split.join(``);
        }
    }
}

function decimal() {

    let displayNum = display.textContent;
    isOperatorClicked = false;

    if (displayNum === `0`) {
        display.textContent += `.`;
        showSecondOperand = true;
        decimalPoint.disabled = true;
    } else {
        if (showSecondOperand == false) {
            display.textContent = `0.`
            showSecondOperand = true;
            decimalPoint.disabled = true;
        } else {
            display.textContent += `.`;
            showSecondOperand = true;
            decimalPoint.disabled = true;
        }
    }
}

let operationArr = [];
let isOperatorClicked = false;

function operatorToUse(operator) {
    let operand = display.textContent;

    if (operationArr.length === 0 || operationArr.length === 1) {
        isOperatorClicked = true;
        operationArr = [];
        operationArr.push(operand, operator);
        decimalPoint.disabled = false;
        showSecondOperand = false;
    } else {
        if (isOperatorClicked == true) {
            operationArr.pop()
            operationArr.push(operator);
        } else {
            operate();
            operationArr.push(operator);
            isOperatorClicked = true;
        }
    }
}

function operate() {

    let arr = operationArr;
    let displayNum = display.textContent;

    if (arr.length === 2) {
        arr.push(display.textContent);
        let ans;

        let filteredArr = arr.filter(item => /^-?\d+(\.(\d+)?)?$/.test(item));
        let map = filteredArr.map(item => parseFloat(item));
        
        switch(operationArr[1]) {
            case `+`:
                ans = map.reduce((total, item) => {
                    return total += item;
                });
                break;
            case `-`:
                ans = map.reduce((total, item) => {
                    return total -= item;
                });
                break;
            case `×`:
                ans = map.reduce((total, item) => {
                    return total *= item;
                });
                break;
            case `÷`:
                if (map[1] === 0) {
                    ans = `Nice`;
                } else {
                    ans = map.reduce((total, item) => {
                        return total /= item;
                    });
                }
                break;
        }

        // display.textContent = ans;
        if (ans === `Nice`) {
            display.textContent = ans;
            document.querySelectorAll(`button`).forEach(button => {
                if (button.id !== `clear`) {
                    button.disabled = true;
                }
            })
        } else {
            display.textContent = ans;
            operationArr = [ans];
            showSecondOperand = false;
            decimalPoint.disabled = false;
        }

    } else {
        display.textContent = displayNum;
    }
}

// Create functions for colors.
// Create click buttons.
// Find more bugs in the calculations.
// ClearOne function bug.