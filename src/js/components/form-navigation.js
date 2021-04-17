import formValdiation from './form-validation'
import formSubmitSale from './sale/form-submit-sale'
import formSubmitPurchase from './purchase/form-submit-purchase'

export default class formNavigation {

    constructor() {
        this.currentStep    = 0
        this.$buttonNext    = document.querySelector(".js-form-next")
        this.$buttonBack    = document.querySelector(".js-form-back")
        this.$formContainer = document.querySelectorAll(".js-form-container")
        this.$formHead      = document.querySelectorAll(".js-form-head")

        if(this.$buttonNext){
            this.init()
        }
    }

    init(){

        this.$buttonNext.addEventListener('click', ()=>{

            this.currentStep = parseInt(this.$buttonNext.getAttribute("data-index"))

            if(this.currentStep >= this.$formContainer.length - 1){
                this.validation()
            }else{
                this.nextStep()
            }
        })

        this.$buttonBack.addEventListener('click', ()=>{
            this.prevStep()
        })
    }

    /* Steps */

    nextStep(){
        const succes = new formValdiation().init(this.currentStep)

        if(succes){
            this.currentStep++
            this.$buttonNext.setAttribute("data-index", this.currentStep)

            this.toggleNextStep()
            this.toggleButtonBack()
            this.toggleLabelButton()
            this.toggleTabs()
        }
    }

    prevStep(){
        this.currentStep--

        this.$buttonNext.setAttribute("data-index", this.currentStep)

        this.toggleNextStep()
        this.toggleButtonBack()
        this.toggleTabs()
        this.toggleLabelButton()
    }

    validation(){
        const succes = new formValdiation().init(this.currentStep)

        if(succes){
            if( this.getAttribute(document.body, "type") === "sale" ) {
                new formSubmitSale
            }else{
                new formSubmitPurchase
            }
        }
    }



    /* Utils */

    toggleNextStep(){
        this.$formContainer.forEach( item =>{
            item.classList.remove("is-active")
        })
        this.$formContainer[this.currentStep].classList.add("is-active")
    }

    toggleButtonBack(){
        if(this.currentStep === 0){
            this.$buttonBack.classList.add("is-disable")
        }else{
            this.$buttonBack.classList.remove("is-disable")
        }
    }

    toggleTabs(){
        this.$formHead.forEach( item => {
            item.classList.remove("is-active")
        })

        for (let i = 0; i <= this.currentStep; i++) {
            this.$formHead[i].classList.add("is-active")
        }
    }

    toggleLabelButton(){
        const label = this.$buttonNext.querySelector(".button__label")

        if(this.currentStep >= this.$formContainer.length - 1){
            label.textContent = "Valider"
        }else{
            label.textContent = "Suivant"
        }
    }

    getAttribute(item, attr){
        return item.getAttribute(`data-${attr}`)
    }
}


