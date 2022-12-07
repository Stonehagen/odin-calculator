let displayValue = "";
let numA = 0;
let numB = 0;
let operation = '';
let operationSet = '';

function operate(operator, a, b) {
    switch (operator) {
        case 'plus':
            return add(a, b);
        case 'minus':
            return subtract(a, b);
        case 'multi':
            return multipy(a, b);
        case 'div':
            return divide(a, b);
    }
}

function add(a, b) {
    return (a + b).toFixed(1);
}

function subtract(a, b) {
    return (a - b).toFixed(1);
}

function multipy(a, b) {
    return (a * b).toFixed(1);
}

function divide(a, b) {
    return (a / b).toFixed(1);
}

function showOnDisplay() {
    display.innerHTML = displayValue;
}

function addToDisplay(num) {
    if (operation) {
        clearDisplayValue() 
        safeOperation()
    }
    if (displayValue === 'E1' || displayValue == '0') {
        displayValue = '';
    }
    displayValue.length >= 9 ? displayValue : displayValue += num;
    showOnDisplay();
}

function setDisplayValue(num) {
    num > 99999999 ? displayValue = 'E1' : displayValue = num;
    showOnDisplay();
}

function setNumA() {
    numA = (displayValue === '') ? 0 : +displayValue;
}

function setNumB() {
    numB = (displayValue === '') ? 0 : +displayValue;
}

function clearDisplayValue() {
    displayValue = '';
}

function setOperation(strOp) {
    operation = strOp;
}

function safeOperation() {
    operationSet = operation;
    operation = '';
}

function clearNumB() {
    numB = 0;
}

function removeOperation() {
    operationSet = '';
}

function clearNumA() {
    numA = 0;
}

function wipeData() {
    safeOperation();
    removeOperation();
    clearNumA();
    clearNumB();
    setDisplayValue(0);
}

const display = document.querySelector('.display');
const numButtons = document.querySelectorAll('.key.num');
const opButtons = document.querySelectorAll('.key.op');
const eqButton = document.querySelector('#equal');
const pointButton = document.querySelector('.key.point');
const clearButton = document.querySelector('#clear');

numButtons.forEach( number => number.addEventListener('click', e => {
    addToDisplay(e.target.id);   
}));

opButtons.forEach( operator => operator.addEventListener('click', e => {
    if (numA && operationSet) {
        setNumB();
        setDisplayValue(operate(operationSet, numA, numB));
        clearNumB();
    }
    setNumA();
    setOperation(e.target.id)
    
}));

eqButton.addEventListener('click', e => {
    if (numA && operationSet) {
        setNumB();
        setDisplayValue(operate(operationSet, numA, numB));
        removeOperation();
        setNumA();
        clearNumB();
    }
});

pointButton.addEventListener('click', e => addToDisplay('.'));

clearButton.addEventListener('click', e =>  wipeData());