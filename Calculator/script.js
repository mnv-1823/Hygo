let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
let string = '';
let arr = Array.from(buttons);

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'Error';
    }
    return a / b;
}




function calculate(expression) {
    try {
        let result = new Function('add', 'subtract', 'multiply', 'divide', `return ${expression}`)
            (add, subtract, multiply, divide);
        return result;
    } catch (error) {
        return 'Error';
    }
}

arr.forEach(button => {
    button.addEventListener('click', (e) => {
        if (e.target.innerHTML == '=') {
            string = calculate(string);
            input.value = string;
        } else if (e.target.innerHTML == 'C') {
            string = "";
            input.value = string;
        } else if (e.target.innerHTML == 'DEL') {
            string = string.substring(0, string.length - 1);
            input.value = string;
        } else {
            string += e.target.innerHTML;
            input.value = string;
        }
    });
});
