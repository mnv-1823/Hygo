interface Rule {
    operator: string;
    precedence: number;
}

let rules1: Rule[] = [
    { operator: '+', precedence: 1 },
    { operator: '-', precedence: 1 },
    { operator: '*', precedence: 2 },
    { operator: '/', precedence: 2 },
    { operator: '%', precedence: 2 }
];

function updateRulesList1(): void {
    const rulesList = document.getElementById('rulesList');
    if (!rulesList) return;
    rulesList.innerHTML = '';
    
    rules1.forEach(rule => {
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

function addRule1(): void {
    const operatorInput = document.getElementById('operatorInput') as HTMLInputElement;
    const precedenceInput = document.getElementById('precedenceInput') as HTMLInputElement;
    
    if (!operatorInput || !precedenceInput) return;
    
    const operator = operatorInput.value;
    const precedence = parseInt(precedenceInput.value);
    
    if (operator && precedence && !rules1.find(r => r.operator === operator)) {
        rules1.push({ operator, precedence });
        updateRulesList1();
        operatorInput.value = '';
        precedenceInput.value = '';
    }
}

function removeRule1(operator: string): void {
    rules1 = rules1.filter(rule => rule.operator !== operator);
    updateRulesList1();
}

function updateRulePrecedence1(operator: string, newPrecedence: string): void {
    const rule = rules1.find(r => r.operator === operator);
    if (rule) {
        rule.precedence = parseInt(newPrecedence);
    }
}

function appendCharacter1(char: string): void {
    const display = document.getElementById('display') as HTMLInputElement;
    if (!display) return;
    
    if (display.value === '0' && char !== '.') {
        display.value = char;
    } else {
        display.value += char;
    }
}

function clearDisplay1(): void {
    const display = document.getElementById('display') as HTMLInputElement;
    if (display) {
        display.value = '0';
    }
}

function deleteLastChar1(): void {
    const display = document.getElementById('display') as HTMLInputElement;
    if (display) {
        display.value = display.value.slice(0, -1) || '0';
    }
}

function evaluateExpression1(expression: string): string {
    const precedence: Record<string, number> = rules1.reduce((acc, rule) => {
        acc[rule.operator] = rule.precedence;
        return acc;
    }, {} as Record<string, number>);

    const tokens = expression.match(/\d+\.?\d*|[-+*/%]|[^0-9\s]/g);
    if (!tokens) return 'Error';

    const output: string[] = [];
    const operators: string[] = [];

    for (const token of tokens) {
        if (!isNaN(parseFloat(token))) {
            output.push(token);
        } else if (precedence[token] !== undefined) {
            while (
                operators.length && 
                precedence[operators[operators.length - 1]] >= precedence[token]
            ) {
                output.push(operators.pop()!);
            }
            operators.push(token);
        } else {
            return 'Error';
        }
    }

    while (operators.length) {
        output.push(operators.pop()!);
    }

    const stack: number[] = [];
    for (const token of output) {
        if (!isNaN(parseFloat(token))) {
            stack.push(parseFloat(token));
        } else {
            const b = stack.pop();
            const a = stack.pop();
            if (a === undefined || b === undefined) return 'Error';
            
            let result: number | string;
            switch (token) {
                case '+': result = a + b; break;
                case '-': result = a - b; break;
                case '*': result = a * b; break;
                case '/': result = b !== 0 ? a / b : 'Error'; break;
                case '%': result = a % b; break;
                default: return 'Error';
            }
            
            if (typeof result === 'string') return 'Error';
            stack.push(result);
        }
    }

    return stack.length === 1 ? stack[0].toString() : 'Error';
}

function calculate1(): void {
    const display = document.getElementById('display') as HTMLInputElement;
    if (!display) return;
    
    try {
        display.value = evaluateExpression1(display.value);
    } catch (error) {
        display.value = 'Error';
    }
}

// Initialize rules list
updateRulesList1();
