import {saveData} from "./save-data";

export default class formValidation {

    constructor() {
        this.error          = false
        this.$submit        = document.querySelector(".js-form-submit")
        this.$submitLabel   = document.querySelector(".js-form-submit-label")
        this.$back          = document.querySelector(".js-form-back")
        this.$groupForm     = document.querySelectorAll(".form-group")
        this.$tabs          = document.querySelectorAll(".js-form-tabs")

        if(this.$submit){
            this.init()
        }
    }

    init(){

        /* Back */
        this.$back.addEventListener('click', ()=>{
            const indexButton = this.getIndex(this.$back)

            this.updateButtonSend("0", "Suivant")

            this.updateTabs(indexButton)

            this.displayStep(indexButton)
        })

        /* Next step */
        this.$submit.addEventListener("click", ()=>{
            const indexButton       = this.getIndex(this.$submit)
            this.$inputs            = document.querySelectorAll("input")
            this.$textarea          = document.querySelectorAll("textarea")
            this.error              = false

            if(!indexButton){

                //step 1
                // this.formValidationStep1()
                if(!this.error){

                    // Disable back button
                    this.$back.classList.add("is-active")

                    this.updateButtonSend("1", "Valider")

                    this.updateTabs(indexButton)

                    this.displayStep(indexButton + 1)

                }
            }else{

                //step 2
                // this.formValidationStep2()
                if(!this.error){

                    if(saveData()){
                        document.location.href="/list-sale.html"
                    }else{
                        console.log("error")
                    }


                }
            }

            this.resetErrors()
        })

    }

    resetErrors(){
        this.$inputs.forEach( item =>{
            item.addEventListener('focus', ()=>{
                item.classList.remove("_error")
            })
        })


        this.$textarea.forEach( item =>{
            item.addEventListener('click', ()=>{
                item.classList.remove("_error")
            })
        })
    }

    updateButtonSend(index, text){
        // Update index button
        this.$submit.setAttribute("data-index", index)

        // Update label button
        this.$submitLabel.textContent=text
    }

    updateTabs(indexButton){
        this.$tabs.forEach( item => {
            item.classList.remove("is-active")

            if(indexButton === this.getIndex(item)){
                item.classList.add("is-active")
            }
        })
    }

    displayStep(indexButton){
        this.$groupForm.forEach( group =>{
            const index = this.getIndex(group)
            group.classList.remove("is-active")

            if(indexButton === index){
                group.classList.add("is-active")
            }
        })
    }


    /* Form valdiation step 1 */
    formValidationStep1(){

        this.checkName()
        this.checkForename()
        this.checkAddress()
        this.checkAddressNumber()
        this.checkZipcode()
        this.checkCity()
        this.checkLand()

    }

    checkName(){
        const item = "name"
        const value = this.getValue(item)

        if(!value && value === ""){
            this.setError(item)
        }
    }

    checkForename(){
        const item = "forename"
        const value = this.getValue(item)

        if(!value && value === ""){
            this.setError(item)
        }
    }

    checkAddress(){
        const item = "address"
        const value = this.getValue(item)

        if(!value && value === ""){
            this.setError(item)
        }
    }

    checkAddressNumber(){
        const item = "address-number"
        const value = this.getValue(item)

        if(!value && value === ""){
            this.setError(item)
        }
    }

    checkZipcode(){
        const item = "zipcode"
        const value = this.getValue(item)

        if(!value && value === ""){
            this.setError(item)
        }
    }

    checkCity(){
        const item = "city"
        const value = this.getValue(item)

        if(!value && value === ""){
            this.setError(item)
        }
    }

    checkLand(){
        const item = "land"
        const value = this.getValue(item)

        if(!value && value === ""){
            this.setError(item)
        }
    }


    /* Form valdiation step 2 */
    formValidationStep2(){
        this.$serviceDescription    = document.querySelectorAll(".js-form-service-description")
        this.$serviceHours          = document.querySelectorAll(".js-form-service-hours")

        this.$serviceDescription.forEach( item => {
            const id = item.getAttribute("id")
            const value = this.getValue(id)

            if(!value && value === ""){
                this.setError(id)
            }
        })

        this.$serviceHours.forEach( item => {
            const id = item.getAttribute("id")
            const value = this.getValue(id)

            if(!value && value === "" && parseInt(value) !== NaN){
                this.setError(id)
            }
        })
    }


    /* Utils */
    getIndex(item){
        return parseInt( item.getAttribute("data-index") )
    }

    getItemById(id){
        return document.querySelector(`#${id}`)
    }

    getValue(id){
        return this.getItemById(id).value
    }

    setError(id){
        this.error = true
        this.getItemById(id).classList.add("_error")
    }
}
