import formValdiation from './form-validation'

export default class admin {

    constructor() {
        this.object = []
        this.$submit = document.querySelector(".js-submit-data")
        this.$inputs = document.querySelectorAll(".js-form-input")
        this.$success = document.querySelector(".js-form-success")

        if(this.$submit){
            this.init()
        }
    }

    init(){
        this.$submit.addEventListener('click', ()=>{

            const succes = new formValdiation().init(0)
            if(succes){
                this.getData()
                this.setLocalStorage()
                this.success()
            }
        })

        this.setValue()
    }

    getData(){
        this.$inputs.forEach( $input => {
            const key = this.getId($input)
            const value = this.getValue($input)

            this.object[key] = value
        })
    }

    setValue(){
        const data = localStorage.getItem("settings") ? JSON.parse(localStorage.getItem("settings")) : []

        this.$inputs.forEach( $input => {
            const key = this.getId($input)

            if(data[key]){
                $input.value = data[key]
            }

        })
    }

    setLocalStorage(){
        const settings = localStorage.getItem("settings") ? JSON.parse( localStorage.getItem("settings") ) : {}
        const data = Object.assign(settings, this.object)
        localStorage.setItem("settings", JSON.stringify(data))
    }

    success(){
        this.$success.textContent="Vos données ont bien été sauvegardées !"
        this.$success.classList.add("is-active")
        setTimeout( ()=>{
            this.$success.classList.remove("is-active")
        }, 5000)
    }

    getId(item){
        return item.getAttribute("id")
    }

    getValue(item){
        return item.value
    }
}


