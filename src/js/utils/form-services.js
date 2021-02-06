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

        const template = document.createElement("template")

        template.innerHTML = `<div class="form-row _without-label">
                            <div class="form-field">
                                <textarea id="description-${this.serviceGenerate}" class="form-textarea js-form-service-description" placeholder="Ex. Pomme"></textarea>
                            </div>
                            <div class="form-field">
                                <input class="form-input js-form-service-hours" type="number" id="hours-${this.serviceGenerate}" placeholder="ex. 2">
                            </div>
                            <button type="button" class="js-form-delete form-delete">delete</button>
                        </div>`

        this.$container.append(template.content)
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
