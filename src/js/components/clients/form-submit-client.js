import formValdiation from './../form-validation'

export default class formSubmitClient {
    constructor() {
        this.object = {}
        this.$buttonSubmit = document.querySelector(".js-button-submit-client")
        this.$inputs = document.querySelectorAll(".js-form-input")

        if(this.$buttonSubmit){
            this.init()
        }
    }

    init(){
        this.$buttonSubmit.addEventListener('click', ()=>{
            const succes = new formValdiation().init(0)
            if(succes){
                this.getDatas()
                this.setLocalStorage()
                this.redirection()
            }
        })
    }

    getDatas(){
        this.$inputs.forEach( $input => {
            const key = this.getId($input)
            const value = this.getValue($input)

            this.object[key] = value
        })
    }

    setLocalStorage(){
        let data = this.getLocalStorage("clients") ? this.getLocalStorage("clients") : []

        data = data.concat([this.object])

        localStorage.setItem('clients', JSON.stringify(data));
    }

    redirection(){
        document.location.href="./listing-client.html"
    }

    getLocalStorage(key){
        return JSON.parse( localStorage.getItem(key) )
    }

    getId(item){
        return item.getAttribute("id")
    }

    getValue(item){
        return item.value
    }
}