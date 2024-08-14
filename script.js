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
function show(value) {
    let currentLength = display.textContent;

    if(currentLength === `0`) {
        display.textContent = value;
    } else {
        if (currentLength.length !== MAX_LENGTH) {
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
    let currentDisplay = display.textContent;
    let split = currentDisplay.split(``);
    if (split.includes(`.`)) {
        decimalPoint.disabled = true;
    } else {
        display.textContent += `.`;
        decimalPoint.disabled = true;
    }
}

let operationArr = [];
function operatorToUse(operator) {
    let operand = display.textContent;

    if (operationArr.length === 0) {
        operationArr.push(operand, operator);
        display.textContent = `0`;
        decimalPoint.disabled = false;
    }
    
}

function operate() {

    if (operationArr.length === 2) {
        
        let arr = operationArr;
        let operandTwo = display.textContent;
        arr.push(operandTwo);
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

        display.textContent = ans;
        operationArr = [];
    }
}

