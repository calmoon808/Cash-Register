//initiate variables
let newDiv, newButton, newQuery, newImg; 

//make display box
newDiv = makeElem('div', '#display', '0');
document.querySelector('#calculator').appendChild(newDiv);
const display = document.querySelector('#display');


//make rows for numbers
for (let i = 1; i < 5; i++){
    newDiv = makeElem('div', '#numRow' + i);
    document.querySelector('#numpad').appendChild(newDiv);
}

//make rows for calculator operators and functions
for (let i = 1; i < 5; i++){
    newDiv = makeElem('div', '#row' + i);
    document.querySelector('#operatorsFuncs').appendChild(newDiv);
}

//make rows for clear/etc buttons
for (let i = 1; i < 5; i++){
    newDiv = makeElem('div', '#etcRow' + i);
    document.querySelector('#clearEtc').appendChild(newDiv);
}
//add clear/etc buttons
newQuery = document.querySelector('#clearEtc').children;
for (let i = 0, n = newQuery.length; i < n; i++){
    if (i === 0){
        newButton = makeElem('button', '.buttonEtc', 'a');
        document.querySelector('#etcRow' + (i + 1)).appendChild(newButton);
        newButton = makeElem('button', '.buttonEtc', 'b');
        document.querySelector('#etcRow' + (i + 1)).appendChild(newButton);
    } else if (i === 1){
        newButton = makeElem('button', '.buttonEtc', 'c');
        document.querySelector('#etcRow' + (i + 1)).appendChild(newButton);
        newButton = makeElem('button', '.buttonEtc', 'd');
        document.querySelector('#etcRow' + (i + 1)).appendChild(newButton);
    } else if (i === 2){
        newButton = makeElem('button', '.buttonEtc', 'e');
        document.querySelector('#etcRow' + (i + 1)).appendChild(newButton);
        newButton = makeElem('button', '.buttonEtc', 'f');
        document.querySelector('#etcRow' + (i + 1)).appendChild(newButton);
    } else {
        newButton = makeElem('button', '.buttonEtc', 'Clear');
        newButton.id = 'clearButton';
        document.querySelector('#etcRow' + (i + 1)).appendChild(newButton);
    }
}
//add buttons to rows
let count = 9;
for (let i = 1; i < 5; i ++){
    if (i === 4){
        newButton = makeElem('button', '.button', '0');
        document.querySelector('#numRow4').appendChild(newButton);
        newButton = makeElem('button', '.button', '00');
        document.querySelector('#numRow4').appendChild(newButton);
        newButton = makeElem('button', '#decimal', '.');
        newButton.className = 'button';
        document.querySelector('#numRow4').appendChild(newButton);
        newButton = makeElem('button', '.buttonOperator', '+');
        document.querySelector('#row4').appendChild(newButton);
        newButton = makeElem('button', '#equals', '=');
        newButton.className = 'buttonFunc'
        document.querySelector('#row4').appendChild(newButton);
    } else {
        for (let j = 1; j < 4; j++, count--){
            newButton = makeElem('button', '.button', count);
            document.querySelector('#numRow' + i).prepend(newButton);
        }
        if (i === 1){
            newButton = makeElem('button', '.buttonOperator', '÷');
            document.querySelector('#row' + i).appendChild(newButton);
            newButton = makeElem('button', '.buttonFunc', 'Get Balance');
            document.querySelector('#row' + i).appendChild(newButton);
        } else if (i === 2){
            newButton = makeElem('button', '.buttonOperator', 'x');
            document.querySelector('#row' + i).appendChild(newButton);
            newButton = makeElem('button', '.buttonFunc', 'Deposit Cash');
            document.querySelector('#row' + i).appendChild(newButton);
        } else if (i === 3){
            newButton = makeElem('button', '.buttonOperator', '-');
            document.querySelector('#row' + i).appendChild(newButton);
            newButton = makeElem('button', '.buttonFunc', 'Withdraw Cash');
            document.querySelector('#row' + i).appendChild(newButton);
        }
    }
}

//make element function
function makeElem(elem, label, info){
    var elemBox = document.createElement(elem);
    if (label[0] === '#'){
        elemBox.id = label.slice(1);
    } else if (label[0] === '.'){
        elemBox.className = label.slice(1);
    }
    if (info){
        elemBox.innerHTML = info;
    }
    return elemBox;
}

//decimal point event listener
newQuery = document.querySelector('#decimal');
newQuery.addEventListener('click', function(){
    if (!display.textContent.includes('.')){
        display.innerHTML = display.textContent + '.';
    } else {
        display.innerHTML = display.textContent;
    }
})

//number button event listeners
newQuery = document.querySelectorAll('.button');
for (let i = 0, n = newQuery.length - 1; i < n; i++){
    newQuery[i].addEventListener('click', function(){
        if (display.textContent === '0') {
            display.innerHTML = this.textContent;
        } else if (display.textContent.length === 16){
            display.textContent = display.textContent;
        } else {
            display.innerHTML = display.textContent + this.textContent;
        }
        if (display.textContent[0] != '+' && display.textContent[0] != 'x' && display.textContent[0] != '-' && display.textContent[0] != '÷'){
            calculatorModule.load(parseFloat(display.textContent));
        }
    })
}

//button operator event listeners
newQuery = document.querySelectorAll('.buttonOperator');
for (let i = 0, n = newQuery.length; i < n; i++){
    newQuery[i].addEventListener('click', function(){
        if (!display.textContent.includes(this.textContent)){
            display.innerHTML = this.textContent + ' ';
        } else {
            if (display.innerHTML[0] === '÷'){
                calculatorModule.divide(parseFloat(display.textContent.slice(2)));
                display.innerHTML = this.textContent + ' ';
            } else if (display.innerHTML[0] === '+'){
                calculatorModule.add(parseFloat(display.textContent.slice(2)));
                display.innerHTML = this.textContent + ' ';
            } else if (display.innerHTML[0] === '-'){
                calculatorModule.subtract(parseFloat(display.textContent.slice(2)));
                display.innerHTML = this.textContent + ' ';
            } else if (display.innerHTML[0] === 'x'){
                calculatorModule.multiply(parseFloat(display.textContent.slice(2)));
                display.innerHTML = this.textContent + ' ';
            }
        }
    })
}

//equal button event listener
newQuery = document.querySelector('#equals');
newQuery.addEventListener('click', function(){
    if (display.innerHTML[0] === '÷'){
        calculatorModule.divide(parseFloat(display.textContent.slice(2)));
        display.innerHTML = calculatorModule.getTotal().toFixed(2);
    } else if (display.innerHTML[0] === '+'){
        calculatorModule.add(parseFloat(display.textContent.slice(2)));
        display.innerHTML = calculatorModule.getTotal().toFixed(2);
    } else if (display.innerHTML[0] === '-'){
        calculatorModule.subtract(parseFloat(display.textContent.slice(2)));
        display.innerHTML = calculatorModule.getTotal().toFixed(2);
    } else if (display.innerHTML[0] === 'x'){
        calculatorModule.multiply(parseFloat(display.textContent.slice(2)));
        display.innerHTML = calculatorModule.getTotal().toFixed(2);
    }
})

//buttonFunc event listener
newQuery = document.querySelectorAll('.buttonFunc');

//get balance event listener
newQuery[0].addEventListener('click', function(){
    display.innerHTML = calculatorModule.recallMemory().toFixed(2);
})

//deposit event listener
newQuery[1].addEventListener('click', function(){
    calculatorModule.saveMemory('d');
    display.innerHTML = '0';
})

//withdraw event listener
newQuery[2].addEventListener('click', function(){
    if (calculatorModule.recallMemory() - parseFloat(display.textContent) > 0){
        calculatorModule.load(calculatorModule.recallMemory() - parseFloat(display.textContent));
        calculatorModule.saveMemory('w');
        display.innerHTML = '0';
    } else {
        display.innerHTML = 'Not enough money';
    }
})

//clear button event listener
newQuery = document.querySelector('#clearButton');
newQuery.addEventListener('click', function(){
    calculatorModule.clear();
    display.innerHTML = '0';
})