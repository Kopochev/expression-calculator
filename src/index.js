function eval() {
    // Do not use eval!!!
    return;
}
function calc(expr) {
    let splitExpr = expr;
    if (!Array.isArray(splitExpr)) {
        splitExpr = splitExpr.split(' ');
    }
    splitExpr =  splitExpr.filter(element => element!=='');
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
        let partExpr = '';
        let counter;
        let copy  = splitExpr;
        for (let i = 0; i < splitExpr.length; i++) {
            if (splitExpr[i] === '(') {
                counter = i;
                partExpr = '';
                continue;
            }
            if (splitExpr[i] === ')') {
                let calcPart = calc(partExpr);
                splitExpr = splitExpr.split('');
                splitExpr.splice(counter, i - counter + 1, String(calcPart) );
                splitExpr = splitExpr.join('');
                i = 0; 
            }
            partExpr += splitExpr[i];
        }
    }
    let calculate = calc(splitExpr);
    return calculate;
}
module.exports = {
    expressionCalculator
}