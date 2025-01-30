let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');
let dropdown = document.getElementById('operationOrder'); 
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

function calculateOperation(a, operator, b) {
    switch (operator) {
        case '+': return add(a, b);
        case '-': return subtract(a, b);
        case '*': return multiply(a, b);
        case '/': return divide(a, b);
        default: return null;
    }
}


function calculate(expression) {
    try {
        let operatorsOrder = dropdown.value.split(' '); 

        let numbers = expression.split(/[\+\-\*\/]/).map(Number); 
        let operators = expression.match(/[\+\-\*\/]/g); 

        if (!operators) return numbers[0]; 

      
        operatorsOrder.forEach(op => {
            console.log(operators);
            while (operators.includes(op)) {
                let index = operators.indexOf(op);
                let result = calculateOperation(numbers[index], op, numbers[index + 1]);

                numbers.splice(index, 2, result); 
                operators.splice(index, 1); 
            }
        });

        return numbers[0];
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
        } else if (e.target.innerHTML == 'Del') {
            string = string.substring(0, string.length - 1);
            input.value = string;
        } else {
            string += e.target.innerHTML;
            input.value = string;
        }
    });
});
