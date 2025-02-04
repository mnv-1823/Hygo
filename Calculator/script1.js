var rules = [
    { operator: '+', precedence: 1 },
    { operator: '-', precedence: 1 },
    { operator: '*', precedence: 2 },
    { operator: '/', precedence: 2 },
    { operator: '%', precedence: 2 }
];
function updateRulesList() {
    var rulesList = document.getElementById('rulesList');
    if (!rulesList)
        return;
    rulesList.innerHTML = '';
    rules.forEach(function (rule) {
        var ruleElement = document.createElement('div');
        ruleElement.className = 'rule-item';
        ruleElement.innerHTML = "\n            <span>".concat(rule.operator, "</span>\n            <input type=\"number\" value=\"").concat(rule.precedence, "\" \n                   onchange=\"updateRulePrecedence('").concat(rule.operator, "', this.value)\" \n                   min=\"1\" style=\"width: 60px;\">\n            <span class=\"delete-rule\" onclick=\"removeRule('").concat(rule.operator, "')\">\u00D7</span>\n        ");
        rulesList.appendChild(ruleElement);
    });
}
function addRule() {
    var operatorInput = document.getElementById('operatorInput');
    var precedenceInput = document.getElementById('precedenceInput');
    if (!operatorInput || !precedenceInput)
        return;
    var operator = operatorInput.value;
    var precedence = parseInt(precedenceInput.value);
    if (operator && precedence && !rules.find(function (r) { return r.operator === operator; })) {
        rules.push({ operator: operator, precedence: precedence });
        updateRulesList();
        operatorInput.value = '';
        precedenceInput.value = '';
    }
}
function removeRule(operator) {
    rules = rules.filter(function (rule) { return rule.operator !== operator; });
    updateRulesList();
}
function updateRulePrecedence(operator, newPrecedence) {
    var rule = rules.find(function (r) { return r.operator === operator; });
    if (rule) {
        rule.precedence = parseInt(newPrecedence);
        updateRulesList();
    }
}
function appendCharacter(char) {
    var display = document.getElementById('display');
    if (!display)
        return;
    if (display.value === '0' && char !== '.') {
        display.value = char;
    }
    else {
        display.value += char;
    }
}
function clearDisplay() {
    var display = document.getElementById('display');
    if (display) {
        display.value = '0';
    }
}
function deleteLastChar() {
    var display = document.getElementById('display');
    if (display) {
        display.value = display.value.slice(0, -1) || '0';
    }
}
function evaluateExpression(expression) {
    var precedence = rules.reduce(function (acc, rule) {
        acc[rule.operator] = rule.precedence;
        return acc;
    }, {});
    var tokens = expression.match(/\d+\.?\d*|[-+*/%]|[^0-9\s]/g);
    if (!tokens)
        return 'Error';
    var output = [];
    var operators = [];
    for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
        var token = tokens_1[_i];
        if (!isNaN(parseFloat(token))) {
            output.push(token);
        }
        else if (precedence[token] !== undefined) {
            while (operators.length &&
                precedence[operators[operators.length - 1]] >= precedence[token]) {
                output.push(operators.pop());
            }
            operators.push(token);
        }
        else {
            return 'Error';
        }
    }
    while (operators.length) {
        output.push(operators.pop());
    }
    var stack = [];
    for (var _a = 0, output_1 = output; _a < output_1.length; _a++) {
        var token = output_1[_a];
        if (!isNaN(parseFloat(token))) {
            stack.push(parseFloat(token));
        }
        else {
            var b = stack.pop();
            var a = stack.pop();
            if (a === undefined || b === undefined)
                return 'Error';
            var result = void 0;
            switch (token) {
                case '+':
                    result = a + b;
                    break;
                case '-':
                    result = a - b;
                    break;
                case '*':
                    result = a * b;
                    break;
                case '/':
                    result = b !== 0 ? a / b : 'Error';
                    break;
                case '%':
                    result = a % b;
                    break;
                default: return 'Error';
            }
            if (typeof result === 'string')
                return 'Error';
            stack.push(result);
        }
    }
    return stack.length === 1 ? stack[0].toString() : 'Error';
}
function calculate() {
    var display = document.getElementById('display');
    if (!display)
        return;
    try {
        display.value = evaluateExpression(display.value);
    }
    catch (error) {
        display.value = 'Error';
    }
}
// Make functions available globally for onclick in HTML
window.addRule = addRule;
window.removeRule = removeRule;
window.updateRulePrecedence = updateRulePrecedence;
window.appendCharacter = appendCharacter;
window.clearDisplay = clearDisplay;
window.deleteLastChar = deleteLastChar;
window.calculate = calculate;
// Initialize rules list
updateRulesList();
