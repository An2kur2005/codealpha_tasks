let displayString = ''; 
let mathString = '';    
const mainDisplay = document.getElementById('main-display');
const historyDisplay = document.getElementById('history-row');

function appendNumber(num) {
    if (displayString === '0') {
        displayString = num;
        mathString = num;
    } else {
        displayString += num;
        mathString += num;
    }
    updateUI();
}

function appendOperator(op) {
    if (displayString === '') return;
    displayString += ` ${op} `;
    mathString += op;
    updateUI();
}

function appendSci(type, label) {
    displayString += label;
    if (type === 'sqrt') mathString += 'Math.sqrt(';
    else if (type === 'sin') mathString += 'Math.sin(Math.PI/180*';
    else if (type === 'cos') mathString += 'Math.cos(Math.PI/180*';
    else if (type === 'log') mathString += 'Math.log10(';
    else if (type === 'pow') mathString += '**2'; 
    updateUI();
}

function clearDisplay() {
    displayString = '';
    mathString = '';
    mainDisplay.innerText = '0';
    historyDisplay.innerText = 'SYSTEM READY';
}

function deleteLast() {
    displayString = displayString.slice(0, -1);
    mathString = mathString.slice(0, -1);
    updateUI();
}

function calculate() {
    try {
        // Auto-close open brackets
        let openCount = (mathString.match(/\(/g) || []).length;
        let closeCount = (mathString.match(/\)/g) || []).length;
        while(openCount > closeCount) {
            mathString += ')';
            displayString += ')';
            closeCount++;
        }

        const result = eval(mathString);
        historyDisplay.innerText = displayString;
        
        // Handle floating point decimals professionally
        const finalResult = Number.isInteger(result) ? result : parseFloat(result.toFixed(6));
        
        mainDisplay.innerText = finalResult;
        displayString = finalResult.toString();
        mathString = finalResult.toString();
    } catch (e) {
        mainDisplay.innerText = "SYNTAX ERROR";
        setTimeout(clearDisplay, 2000);
    }
}

function updateUI() {
    mainDisplay.innerText = displayString || '0';
}

// Keyboard Support
document.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '+') appendOperator('+');
    if (e.key === '-') appendOperator('-');
    if (e.key === '*') appendOperator('*');
    if (e.key === '/') appendOperator('/');
    if (e.key === 'Enter' || e.key === '=') calculate();
    if (e.key === 'Backspace') deleteLast();
    if (e.key === 'Escape') clearDisplay();
});