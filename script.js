class calculator{
    constructor(prevOperandTextEl,currOperandTextEl){
        this.prevOperandTextEl=prevOperandTextEl
        this.currOperandTextEl=currOperandTextEl
        this.clear()
        this.updateDisplay()
    }
    
    clear(){
        this.currOperand=''
        this.prevOperand=''
        this.operation=undefined
    }

    delete(){
        this.currOperand=this.currOperand.toString().slice(0,-1)
    }

    appendNumber(number){
        if(number==='.'&& this.currOperand.includes('.')) return
        this.currOperand=this.currOperand.toString() +number.toString()
    }
    
    chooseOperation(operation){
        if(this.currOperand==='') return
        if(this.prevOperand!==''){
            this.compute()
        }
        this.operation=operation
        // this.prevOperand=this.currOperand
        this.prevOperand=this.currOperand + operation
        this.currOperand=""
    }
    
    compute(){
        let computation
        const prev=parseFloat(this.prevOperand)
        const curr=parseFloat(this.currOperand)
        if(isNaN(prev)||isNaN(curr)) return
        switch (this.operation) {
            case '+':
                computation=prev+curr
                break;
            case '-':
                computation=prev-curr
                break;
            case '*':
                computation=prev*curr
                break;
            case '÷':
                computation=prev/curr
                break;
            default:
                break;
        }
        this.currOperand=computation
        this.operation=undefined
        this.prevOperand=''
    }
    
    updateDisplay(){
        this.currOperandTextEl.innerText=this.currOperand
        // if(this.operation!=null){
            this.prevOperandTextEl.innerText=this.prevOperand
            // this.prevOperandTextEl.innerText=`${this.prevOperand} ${this.operation}`
        // }
    }
}


const numberButtons=document.querySelectorAll('[data-number]')
const operationButtons=document.querySelectorAll('[data-operation]')
const equalButtons=document.querySelectorAll('[data-equal]')
const deleteButtons=document.querySelectorAll('[data-delete]')
const allClearButtons=document.querySelectorAll('[data-all-clear]')
const prevOperandTextEl=document.querySelector('.previous-operand')
const currOperandTextEl=document.querySelector('.current-operand')

const calc=new calculator(prevOperandTextEl,currOperandTextEl)

numberButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calc.appendNumber(button.innerText)
        calc.updateDisplay()
    })
})

operationButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calc.chooseOperation(button.innerText)
        calc.updateDisplay()
    })
})

equalButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calc.compute()
        calc.updateDisplay()
    })
})

allClearButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calc.clear()
        calc.updateDisplay()
    })
})

deleteButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calc.delete()
        calc.updateDisplay()
    })
})
