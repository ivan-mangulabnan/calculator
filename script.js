const display = document.querySelector(`#display`);
const allButtons = document.querySelector(`.buttons-area`);

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
        case `clear` : 
            clearDisplay();
            break;
        case `clearOne` : 
            clearOne();
            break;
        default :
            show(`no`);
    }
})

function clearDisplay() {
    display.textContent = `0`;
}

function clearOne(displayText) {
    displayText = display.textContent;
    if (displayText.length === 1) {
        clearDisplay();
    } else {
        let splitValue = displayText.split(``);
        splitValue.pop();
        display.textContent = splitValue.join(``);
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