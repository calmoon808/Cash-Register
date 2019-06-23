var calculatorModule = (function(){
    let memory = 0;
    let total = 0;
    let calculator = {};
    //load function
    calculator.load = function(x){
        if (typeof x === 'number'){
            total = x;
            return x;
        } else {
            throw error;
        }
    }
    //get total function
    calculator.getTotal = function(){
        return total;
    }
    //add function
    calculator.add = function(x){
        if (typeof x === 'number'){
            total += x;  
        } else {
            throw error;
        } 
    }
    //subtract function
    calculator.subtract = function(x){
        if (typeof x === 'number'){
            total -= x;  
        } else {
            throw error;
        } 
    }
    //multiply function
    calculator.multiply = function(x){
        if (typeof x === 'number'){
            total *= x;  
        } else {
            throw error;
        } 
    }
    //divide function
    calculator.divide = function(x){
        if (typeof x === 'number'){
            total /= x;  
        } else {
            throw error;
        } 
    }

    //clear current display function
    calculator.clear = function(){
        total = 0;
    }

    //recall memory function
    calculator.recallMemory = function(){
        return memory;
    }

    //save memory function
    calculator.saveMemory = function(x){
        if(x === 'w'){
            memory = total;
        } else if (x === 'a'){
            memory += total;
        }
    }
    //clear memory functuon
    calculator.clearMemory = function(){
        memory = 0;
    }

    return calculator;
})();