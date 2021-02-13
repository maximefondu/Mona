export default class formValdiation {

    constructor() {
        this.succes = true
        this.$formContainer = document.querySelectorAll(".js-form-container")
    }

    init(currentStep){

        this.inputs = this.$formContainer[currentStep].querySelectorAll(".js-form-input.required")

        this.inputs.forEach( input =>{
            const value = this.getValue(input)
            this.check(value, input)
        })

        return this.succes
    }

    getValue(item){
        return item.value
    }

    check(value, input){
        if(!value && value === ""){
            this.setError(input)
        }
    }

    setError(input){
        this.succes = false
        input.classList.add("_error")
    }
}


