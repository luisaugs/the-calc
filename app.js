const screen = document.querySelector('#scr');
const container = document.querySelector('.container-btn');
const userInfo = document.querySelector('.user-info');
const dot = document.querySelector('#dot');

let valueOne = '';
let valueTwo = '';
let operator = '';
let valueBuffer = '';
let result;
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const operators = ['+', '-', '/', 'x', '%', '^'];

container.addEventListener('click', e => {
    if (e.target.textContent.length == 1) {
        screen.classList.remove('screen-result')
        const testValue = e.target.textContent.trim();
        dot.classList.remove('dot-block')
        if (numbers.includes(testValue)) {
            valueBuffer += testValue;
            if (valueBuffer.startsWith('.')) {
                valueBuffer = "0" + valueBuffer;
            }
            if (verificarDecimal(valueBuffer) == 1) {
                dot.classList.add('dot-block')
            }
            getValue(valueBuffer);
        } else if (operators.includes(testValue)) {
            if (!valueOne) {
                alertUser('Enter a value for the first operand!');
            }
            getOperator(testValue);
        } else if (testValue === "=") {
            calculate(valueOne, valueTwo, operator);
        } else if (testValue === "C") {
            clearValue();
        }
    }
})

const getOperator = (value) => {
    if (!valueOne) return
    operator = value;
    updateUI(value);
    valueBuffer = '';
}

const clearValue = () => {
    if (!operator) {
        valueOne = '';
        valueBuffer = '';
        updateUI(valueOne);
    } else {
        valueTwo = '';
        valueBuffer = '';
        updateUI(valueTwo);
    }
}

const calculate = (num1, num2, oper) => {

    if (!oper || !num1) {
        alertUser('Enter 2 values a select an operation to do a calculation!');
        return;
    }

    const v1 = Number(num1);
    const v2 = Number(num2);

    if (!v2) {
        alertUser('The second value has been setted to 0 🙄');
    }
    // console.log(v1, v2, oper);

    if (Number.isFinite(v1) && Number.isFinite(v2)) {
        if (oper == '+') result = v1 + v2;
        if (oper == '-') result = v1 - v2;
        // if (oper == '^') result = v1 ** v2;
        if (oper == '^') {
            result = power(v1, v2);
        }
        if (oper == 'x') {
            result = multiply(v1, v2);
        }
        if (oper == '%') {
            result = percentage(v1, v2);
        }
        if (oper == '/') {
            if (!v1 && !v2) {
                alertUser('Indeterminate');
                reset();
                updateUI("");
                return;
            } else if (!v2) {
                alertUser('Infinity');
                reset();
                updateUI("");
                return;
            } else {
                // result = v1 / v2;
                result = division(v1, v2);
            }
        }
        // console.log(result)
        showResult(result);

    } else {
        alertUser('You can´t operate with infinity😵');
        reset();
        updateUI("");
        return;
    }

}

const showResult = (value) => {

    const resultToShow = value.toString();

    if (resultToShow.length > 14) {
        alertUser('Value too long to display!😅');
        reset();
        updateUI("");
    } else {
        updateUI(value);
        screen.classList.add('screen-result');
        // console.log(value)
        reset();
        valueOne = value.toString();
    }
}

const alertUser = (text) => {
    userInfo.innerText = text;
    userInfo.classList.remove('hide');
    setTimeout(() => {
        userInfo.classList.add('hide');
        userInfo.innerText = '';
    }, 3000);
}

const updateUI = (value) => {
    screen.textContent = value;
}

const reset = () => {
    valueOne = '';
    valueTwo = '';
    operator = '';
    valueBuffer = '';
    // result = 0;
}


const getValue = (value) => {
    if (value.length > 14) {
        alertUser('You can´t enter more than 14 digits!');
        return
    }
    if (!operator) {
        valueOne = value;
        updateUI(valueOne);
    } else {
        valueTwo = value;
        updateUI(valueTwo);
    }
}

// Cheks if the entry has more than one point
const verificarDecimal = (value) => {

    const nroComas = Array.from(value).reduce((acc, curr) => {
        if (curr === ".")
            acc++;
        return acc;
    }, 0)
    // console.log(nroComas)
    return nroComas;
}


// The operations below has these arrangements to avoid problems with the values to show on "screen".
const percentage = (v1, v2) => {
    const perResult = v1 * v2/100;
    
    if (Number.isInteger(perResult)) {
        return perResult;
    } else {
        return Number(perResult.toFixed(12));
    }
}


const division = (v1, v2) => {
    const divResult = v1 / v2;
    
    if (Number.isInteger(divResult)) {
        return divResult;
    } else {
        const newDivResult = simplifyValue(divResult);
        // console.log(newDivResult)
        return newDivResult;
    }
}

const simplifyValue = (value) => {

    const truncatedValue = Math.trunc(value)
    if (truncatedValue > 9) {
        alertUser('The result has been rounded to 3 digits😅');
        return Number(value.toFixed(3));
    } else {
        return Number(value.toFixed(10));
    }
}

const multiply = (v1, v2) => {
    const mulResult = v1 * v2;

    if (Number.isInteger(mulResult)){
        return mulResult;
    } else {
        if (mulResult > 0 && mulResult < 1 ) {
            return Number(mulResult.toFixed(10));
        }
        if (mulResult < 0 && mulResult > -1 ) {
            return Number(mulResult.toFixed(10));
        }
        if (mulResult > 1 ) {
            alertUser('The result has been rounded to 3 digits😅');
            return Number(mulResult.toFixed(3));
        }
    }
}


const power = (v1, v2) => {

    const pwrResult = v1 ** v2;

    if (Number.isInteger(pwrResult)) {
        return pwrResult;
    } else {
        alertUser('The result has been rounded to 3 digits😅');
        return Number(pwrResult.toFixed(3));
    }
}

// About me!
alertUser('Thanks for use it!!! 😎');
console.log("Luis Augsburger - Web developer");
console.log("https://twitter.com/augsburger_luis");