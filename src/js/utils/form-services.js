export default class formServices {

    constructor() {
        this.$container = document.querySelector(".js-form-services-container")
        this.$add = document.querySelector(".js-form-services-add")

        this.init()
    }

    init(){

        this.serviceGenerate = 1

        this.$add.addEventListener('click', ()=>{

            this.generateService()
            this.removeService()

            this.serviceGenerate++

        })


    }

    generateService(){

        const service = `<div class="form-row _without-label">
                            <div class="form-field">
                                <textarea class="form-textarea" placeholder="Ex. Pomme"></textarea>
                            </div>
                            <div class="form-field">
                                <input class="form-input" type="number" placeholder="ex. 2">
                            </div>
                            <button type="button" class="js-form-delete form-delete">delete</button>
                        </div>`

        this.$container.innerHTML += service
    }

    removeService(){
        this.$remove = document.querySelectorAll(".js-form-delete")

        this.$remove.forEach( item =>{
            item.addEventListener('click', ()=>{
                item.parentElement.remove()
            })
        })
    }
}
