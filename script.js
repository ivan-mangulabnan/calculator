const display = document.querySelector(`#display`);
const allButtons = document.querySelector(`.buttons-area`);
const decimalPoint = document.querySelector(`#decimal`);


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

function clearDisplay() {
    decimalPoint.disabled = false;
    display.textContent = `0`;
}


function clearOne() {
    let displayText = display.textContent;
    let split = displayText.split(``);

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
function operatorToUse(operator) {
    let operand = display.textContent;

    if (operationArr.length === 0 || operationArr.length === 1) {
            operationArr = [];
            operationArr.push(operand, operator);
            decimalPoint.disabled = false;
            showSecondOperand = false;
    } else {
        operate();
        operationArr.push(operator);
        console.log(`here`);
    }
}

function operate() {

    let arr = operationArr;
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
                ans = `nice try :)`;
            } else {
                ans = map.reduce((total, item) => {
                    return total /= item;
                });
            }
            break;
    }

    display.textContent = ans; // You need to find a way to make the answer fixed at 9 digits. And it should return answers with decimal point.
    operationArr = [ans];
    showSecondOperand = false;
    decimalPoint.disabled = false;
}

