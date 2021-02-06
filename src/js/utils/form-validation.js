export default class formValidation {

    constructor() {
        this.error                  = false
        this.$submit                = document.querySelector(".js-form-submit")
        this.$submitLabel           = document.querySelector(".js-form-submit-label")
        this.$groupForm             = document.querySelectorAll(".form-group")

        this.init()
    }

    init(){

        this.$submit.addEventListener("click", ()=>{
            this.$inputs                = document.querySelectorAll("input")
            this.$textarea              = document.querySelectorAll("textarea")
            this.error = false

            const indexButton = this.getIndex(this.$submit)
            if(!indexButton){

                //step 1
                this.formValidationStep1()
                if(!this.error){

                    // Update index button
                    this.$submit.setAttribute("data-index", "1")

                    // Update label button
                    this.$submitLabel.textContent="Valider"

                    // Display next step
                    this.$groupForm.forEach( group =>{
                        const index = this.getIndex(group)
                        group.classList.remove("is-active")

                        if(indexButton + 1 === index){
                            group.classList.add("is-active")
                        }
                    })

                }
            }else{

                //step 2
                this.formValidationStep2()
                if(!this.error){
                    document.location.href="/list-sale.html"
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


    /* Form valdiation step 1 */
    formValidationStep1(){

        this.checkName()
        this.checkForename()
        this.checkAddress()
        this.checkAddressNumber()
        this.checkZipcode()
        this.checkCity()
        this.checkLand()
        this.checkTva()

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

    checkTva(){
        const item = "tva"
        const value = this.getValue(item)

        if(!value && value === "" && parseInt(value) !== NaN){
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
