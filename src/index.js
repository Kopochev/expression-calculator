function eval() {
    // Do not use eval!!!
    return;
}
function calc(expr) {
    let splitExpr = expr;
    if (!Array.isArray(splitExpr)) {
        splitExpr = splitExpr.split(' ');
    }
    for (let i = 0; i < splitExpr.length; i++) {

        if (splitExpr[i] === '*') {
            splitExpr[i] = Number(splitExpr[i - 1]) * Number(splitExpr[i + 1]);
            splitExpr.splice(i - 1, 1);
            splitExpr.splice(i, 1);
            i--;
        }
        if (splitExpr[i] === '/') {
            splitExpr[i] = Number(splitExpr[i - 1]) / Number(splitExpr[i + 1]);
            splitExpr.splice(i - 1, 1);
            splitExpr.splice(i, 1);
            i--;
        }

    }
    for (let i = 0; i < splitExpr.length; i++) {
        if (splitExpr[i] === '+') {
            splitExpr[i] = Number(splitExpr[i - 1]) + Number(splitExpr[i + 1]);
            splitExpr.splice(i - 1, 1);
            splitExpr.splice(i, 1);
            i--;
        }
        if (splitExpr[i] === '-') {
            splitExpr[i] = Number(splitExpr[i - 1]) - Number(splitExpr[i + 1]);
            splitExpr.splice(i - 1, 1);
            splitExpr.splice(i, 1);
            i--;
        }
    }
    return Number(splitExpr.join(''))
}
function expressionCalculator(expr) {
    let splitExpr = expr.replace(/\s/g, '');
    splitExpr = splitExpr.replace(/[+]/g, ' + ').replace(/[-]/g, ' - ').replace(/[*]/g, ' * ').replace(/[/]/g, ' / ').replace(/[(]/g, ' ( ').replace(/[)]/g, ' ) ');
    let countLeftBrackets = 0;
    let countRightBrackets = 0;
    for (let i = 0; i < splitExpr.length; i++) {
        if (splitExpr[i] === '(') {
            countLeftBrackets++;
        }
        if (splitExpr[i] === ')') {
            countRightBrackets++;
        }

    }
    if (countLeftBrackets !== countRightBrackets) {
        throw new Error('ExpressionError: Brackets must be paired');
    }

    if (expr.includes('/ 0')) {
        throw new Error('TypeError: Division by zero.')
    }

    if (countLeftBrackets > 0) {
        let brackets = splitExpr.match(/(\([0-9\+\/\*\-. ]+\))/g);
        brackets = brackets.join('');
        let start = brackets;

        brackets = brackets.replace('(', '').replace(')', '');

        splitExpr = splitExpr.replace(start, calc(brackets));
        splitExpr = splitExpr.replace(/\s/g, '');
        splitExpr = splitExpr.replace(/[+]/g, ' + ').replace(/[-]/g, ' - ').replace(/[*]/g, ' * ').replace(/[/]/g, ' / ').replace(/[(]/g, ' (').replace(/[)]/g, ') ');
    }

    splitExpr = splitExpr.split(' ');
    for (let i = 0; i < splitExpr.length; i++) {

        if (splitExpr[i] == '') {
            splitExpr.splice(i, 3, ('-' + splitExpr[i + 2]))
        }
    }

    let calculate = calc(splitExpr);

    return calculate;
}
module.exports = {
    expressionCalculator
}