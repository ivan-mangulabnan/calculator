const display = document.querySelector(`#display`);
const allButtons = document.querySelector(`.buttons-area`);
const decimalPoint = document.querySelector(`#decimal`);
const buttonsRight = document.querySelector(`.buttons-right`);

let operatorIsActive = false;

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

    if (event.target.matches('button')) {
        
        document.querySelectorAll('button').forEach(button => {
            button.style.backgroundColor = '';
            button.style.color = '';
        });

        if (event.target.matches(`.buttons-right > button`)) {
            if (event.target.id !== `equals`) {
                event.target.style.backgroundColor = '#bc3254';
                event.target.style.color = '#ffffff';
            }
        }
    }

})

allButtons.addEventListener(`mousedown`, (event) => {
    
    if (event.target.matches(`button`)) {
        applyDesignToButtons(event.target);
    }
})

function applyDesignToButtons(button) {
    if (button.matches(`.buttons-right > button`)) {
        if (button.id !== `equals`) {
            button.style.backgroundColor = `#e34a7e`; 
            button.style.color = ``;
        } else {
            button.style.backgroundColor = `#bc3254`;
            button.style.color = `#ffffff`;
        }
    } else if (button.matches(`.buttons-left-top > button`)) {
        if (button.id === `plusMinus` || button.id === `clear` || button.id === `clearOne`) {
            button.style.backgroundColor = `#4AE3AF`;
            button.style.color = `black`;
        } else {
            button.style.backgroundColor = `#1EC28A`;
            button.style.color = `#ffffff`;
        }
    } else if (button.matches(`.buttons-left-bot > button`)) {
        if (button.id === `decimal`) {
            button.style.backgroundColor = `#4AE3AF`;
            button.style.color = `black`;
        } else {
            button.style.backgroundColor = `#1EC28A`;
            button.style.color = `#ffffff`;
        }
    }
}

const keyToButtonID = {
    '1': 'one',
    '2': 'two',
    '3': 'three',
    '4': 'four',
    '5': 'five',
    '6': 'six',
    '7': 'seven',
    '8': 'eight',
    '9': 'nine',
    '0': 'zero',
    'Backspace': 'clearOne',
    'Enter': 'equals',
    '+': 'add',
    '-': 'sub',
    '*': 'mul',
    '/': 'div',
    '.': 'decimal',
};

document.addEventListener(`keydown`, handleKeyDown);
document.addEventListener(`keyup`, () => {
    const buttonLeft = document.querySelectorAll(`.buttons-left-top > button, .buttons-left-bot > button`);
    const buttonRight = document.querySelectorAll(`.buttons-right > button`);

    buttonLeft.forEach(button => {
        button.style.backgroundColor = ``;
        button.style.color = ``;
    })

    buttonRight.forEach(button => {
        if (button.id === `equals`) {
            button.style.backgroundColor = ``;
            button.style.color = ``;
        }
    })

})

function handleKeyDown(event) {
    const buttonID = keyToButtonID[event.key];
    const buttonsRight = document.querySelectorAll(`.buttons-right > button`);
    const buttonsLeft = document.querySelectorAll(`.buttons-left-top > button, .buttons-left-bot > button`);

    if (event.key >= `0` && event.key <= `9`) {
        show(event.key);
    } else if (event.key === `Backspace`) {
        clearOne();
    } else if (event.key === `.`) {
        let split = display.textContent.split(``);
        if (!split.includes(`.`)) {
            decimal();
        }
    } else if (event.key === `Enter`) {
        operate();
    }

    buttonsRight.forEach(button => {
        button.style.backgroundColor = ``;
        button.style.color = ``;

        if (buttonID == button.id) {

            if (button.id == 'equals') {
                applyDesignToButtons(button);
            } else {
                button.style.backgroundColor = '#bc3254';
                button.style.color = '#ffffff';
            }
        }     
    })

    buttonsLeft.forEach(button => {
        if (buttonID == button.id) {
            applyDesignToButtons(button);
        }
    })
}

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
        display.textContent = `0`;
    } else if (displayText.length === 2) {
        if (split.includes(`-`)) {
            display.textContent = `0`;
        } else if (split.includes(`.`) && split[0] === `0`) {
            display.textContent = `0`;
            decimalPoint.disabled = false;
        } else {
            split.pop();
            display.textContent = split.join(``);
        }
    } else {
        let dec = split.pop();
        if (dec === `.`) {
            decimalPoint.disabled = false;
        }
        display.textContent = split.join(``);
    }
}


const MAX_LENGTH = 10;
let showSecondOperand = false;

function show(value) {
    isOperatorClicked = false;
    let displayNum = display.textContent;
    let split = displayNum.split(``);
    let filter = split.filter(item => /\d/.test(item));
    document.querySelector(`#clearOne`).disabled = false;

        if (displayNum === `0`) {
            display.textContent = value;
            showSecondOperand = true;
        } else {
            if (showSecondOperand == false) {
                display.textContent = value;
                showSecondOperand = true;
            } else {
                if (filter.length < MAX_LENGTH) {
                    display.textContent += value;
                }
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

const MAX_DISPLAY_VALUE = 9999999999;

function operate() {

    let arr = operationArr;
    let displayNum = display.textContent;

    if (arr.length === 2) {
        arr.push(display.textContent);
        let ans;

        let filteredArr = arr.filter(item => /^-?\d+(\.(\d+)?)?$|^\d+(e(\+|\-))?\d+$/.test(item));
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

        if (ans === `Nice`) {
            display.textContent = ans;
            document.querySelectorAll(`button`).forEach(button => {
                if (button.id !== `clear`) {
                    button.disabled = true;
                }
            })
        } else {
            let newString = ans.toString();
            let split = newString.split(``);

            if (ans > MAX_DISPLAY_VALUE || split.length > MAX_LENGTH) {
                let ex = ans.toExponential();
                let fix = parseFloat(ex).toFixed();
                let prec = parseFloat(fix).toPrecision(1);

                display.textContent = prec;
                operationArr = [prec];
                document.querySelector(`#clearOne`).disabled = true;
            } else {
                display.textContent = ans;
                operationArr = [ans];
            }
            
            showSecondOperand = false;
            decimalPoint.disabled = false;
        }

    } else {
        display.textContent = displayNum;
    }
}

// Make the oprations play out using keyboard.
// fix the disabled buttons but still producing effects.