export default class formNavigation {

    constructor() {
        this.$buttons     = document.querySelectorAll(".js-form-naviation-button")
        this.$sectionForm = document.querySelectorAll(".js-form-section")
        this.$submit      = document.querySelector(".js-form-submit-label")

        this.init()
    }

    init(){

        this.$buttons.forEach( item =>{
            item.addEventListener("click", ()=>{

                this.setButtons(item)

                this.setSections(item)

                this.setButtonSend(item)

            })
        })

    }

    setButtons(item){

        const indexCurrent = this.getIndex(item)


        this.$buttons.forEach( item =>{
            const index = this.getIndex(item)
            if(index === indexCurrent){
                item.classList.remove("is-disable")
                item.classList.remove("is-completed")
            }else if(index === indexCurrent - 1){
                item.classList.add("is-completed")
            }else{
                item.classList.add("is-disable")
            }
        })
    }

    setSections(item){
        this.resetSections()

        this.$sectionForm.forEach( section =>{
            if( this.getIndex(section) === this.getIndex(item) ){
                section.classList.add("is-active")
            }
        })
    }

    resetSections(){
        this.$sectionForm.forEach( section =>{
            section.classList.remove("is-active")
        })
    }

    getIndex(item){
        return parseInt( item.getAttribute("data-index") )
    }

    setButtonSend(item){

        const index = this.getIndex(item)

        if(index === this.$buttons.length - 1){
            this.$submit.textContent = "Valider"
        }else{
            this.$submit.textContent = "Suivant"
        }
    }
}
