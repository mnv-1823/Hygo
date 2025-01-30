let rules = [
    { operator: '+', precedence: 1 },
    { operator: '-', precedence: 1 },
    { operator: '*', precedence: 2 },
    { operator: '/', precedence: 2 },
    { operator: '%', precedence: 2 }
];

function updateRulesList() {
    const rulesList = document.getElementById('rulesList');
    rulesList.innerHTML = '';
    
    rules.forEach(rule => {
        const ruleElement = document.createElement('div');
        ruleElement.className = 'rule-item';
        ruleElement.innerHTML = `
            <span>${rule.operator}</span>
            <input type="number" value="${rule.precedence}" 
                   onchange="updateRulePrecedence('${rule.operator}', this.value)" 
                   min="1" style="width: 60px;">
            <span class="delete-rule" onclick="removeRule('${rule.operator}')">×</span>
        `;
        rulesList.appendChild(ruleElement);
    });
}

function addRule() {
    const operator = document.getElementById('operatorInput').value;
    const precedence = parseInt(document.getElementById('precedenceInput').value);

    if (operator && precedence && !rules.find(r => r.operator === operator)) {
        rules.push({ operator, precedence });
        updateRulesList();
        document.getElementById('operatorInput').value = '';
        document.getElementById('precedenceInput').value = '';
    }
}

function removeRule(operator) {
    rules = rules.filter(rule => rule.operator !== operator);
    updateRulesList();
}

function updateRulePrecedence(operator, newPrecedence) {
    const rule = rules.find(r => r.operator === operator);
    if (rule) {
        rule.precedence = parseInt(newPrecedence);
    }
}

function appendCharacter(char) {
    const display = document.getElementById('display');
    if (display.value === '0' && char !== '.') {
        display.value = char;
    } else {
        display.value += char;
    }
}

function clearDisplay() {
    document.getElementById('display').value = '0';
}

function deleteLastChar() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1) || '0';
}

function evaluateExpression(expression) {
    const precedence = rules.reduce((acc, rule) => {
        acc[rule.operator] = rule.precedence;
        return acc;
    }, {});

    const tokens = expression.match(/\d+\.?\d*|[-+*/%]|[^0-9\s]/g);
    if (!tokens) return 'Error';

    const output = [];
    const operators = [];

    tokens.forEach(token => {
        if (!isNaN(token)) {
            output.push(token);
        } else if (precedence[token] !== undefined) {
            while (
                operators.length && 
                precedence[operators[operators.length - 1]] >= precedence[token]
            ) {
                output.push(operators.pop());
            }
            operators.push(token);
        } else {
            return 'Error';
        }
    });

    while (operators.length) {
        output.push(operators.pop());
    }

    const stack = [];
    for (const token of output) {
        if (!isNaN(token)) {
            stack.push(parseFloat(token));
        } else {
            const b = stack.pop();
            const a = stack.pop();
            if (a === undefined || b === undefined) return 'Error';
            
            let result;
            switch (token) {
                case '+': result = a + b; break;
                case '-': result = a - b; break;
                case '*': result = a * b; break;
                case '/': result = b !== 0 ? a / b : 'Error'; break;
                case '%': result = a % b; break;
                default: return 'Error';
            }
            
            if (result === 'Error') return 'Error';
            stack.push(result);
        }
    }

    return stack.length === 1 ? stack[0].toString() : 'Error';
}

function calculate() {
    const display = document.getElementById('display');
    try {
        display.value = evaluateExpression(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}

// Initialize rules list
updateRulesList();