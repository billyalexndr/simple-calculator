console.log("Selamat Anda Berhasil Membuat Javascript pada Website");

const calculator = {
    displayNumber : '0',
    displayLovers : 'Bili dan Silpi',
    operator : null,
    firstNumber : null,
    isWaitForSecondNumber : false,
};

function updateDisplay() {
    document.querySelector('#displayNumber').innerText = calculator.displayNumber;
}

function clearCalculator() {
    calculator.displayNumber = '0';
    calculator.operator = null;
    calculator.firstNumber = null;
    calculator.isWaitForSecondNumber = false;
}

function inputDigit(digit) {
    if(calculator.displayNumber === '0') {
        calculator.displayNumber = digit;
    }else{
        calculator.displayNumber += digit;
    }
}

function inverseNumber() {
    if(calculator.displayNumber === '0'){
        return
    }
    calculator.displayNumber = calculator.displayNumber * -1
}

function handleOperator(operator) {
    if(!calculator.isWaitForSecondNumber) {
        calculator.operator = operator
        calculator.isWaitForSecondNumber = true
        calculator.firstNumber = calculator.displayNumber

        // mengatur ulang nilai display number supaya tombol selanjutnya dimulai dari angka pertama lagi
        calculator.displayNumber = '0'
    }else{
        alert('Operator sudah ditetapkan')
    }
}

function performCalculation() {
    if(calculator.firstNumber == null || calculator.operator == null){
        alert('Anda belum menetapkan operator')
        return
    }
    let result = 0
    if(calculator.operator === '+'){
        result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber);
    }else{
        result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber);
    }
    
    // if(result == 2){
    //     calculator.displayNumber = calculator.displayLovers
    // }else{
    //     calculator.displayNumber = result
    // }

    
    // objek yang akan dikirimkan sebagai argumen fungsi putHistory()
    const history1 = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: calculator.displayLovers
    }
    
    const history2 = {
        firstNumber: calculator.firstNumber,
        secondNumber: calculator.displayNumber,
        operator: calculator.operator,
        result: result
    }

    if(result == 2){
        putHistory(history1)
        calculator.displayNumber = calculator.displayLovers
    }else{
        putHistory(history2)
        calculator.displayNumber = result
    }
    renderHistory()
}


const buttons = document.querySelectorAll('.button')
for(const button of buttons) {
    button.addEventListener('click', function(event){
        // Mendapatkan object elemen yang di-klik
        const target = event.target

        if(target.classList.contains('clear')){
            clearCalculator()
            updateDisplay()
            return
        }
        
        if(target.classList.contains('negative')){
            inverseNumber()
            updateDisplay()
            return
        }

        if(target.classList.contains('equals')){
            performCalculation()
            updateDisplay()
            return
        }

        if (target.classList.contains('operator')) {
            handleOperator(target.innerText);
            return;
        }

        inputDigit(target.innerText)
        updateDisplay()
    })
}



