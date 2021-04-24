export default class selectClient {
    constructor() {
        this.$select = document.querySelector(".js-select-client")
        this.$inputs = document.querySelectorAll(".js-form-input")
        this.client = false

        if(this.$select){
            this.init()
        }
    }

    init(){
        this.data = this.getLocalStorage("clients")
        this.initOptionsSelect()
        this.getClient()
    }

    initOptionsSelect(){
        this.data.forEach( data => {
            const name = data.company ? data.company : `${data.forename} ${data.name}`
            const option = this.setElement("option", [], name)
            option.value = name
            this.$select.append(option)
        })
    }

    getClient(){
        this.$select.addEventListener("change", () =>{
            const value = this.$select.value
            this.client = this.data.find( (item)=>{
                const name = item.company ? item.company : `${item.forename} ${item.name}`
                return name === value
            })
            this.precompleteForm()
        })
    }

    precompleteForm(){
        this.$inputs.forEach( input => {
            const id = this.getId(input)
            input.value = this.client ? this.client[id] : ""
        })
    }

    getLocalStorage(key){
        return JSON.parse( localStorage.getItem(key) )
    }

    setElement(type, classes, value){
        const item = document.createElement(type)

        if(classes){
            classes.forEach( classe =>{
                item.classList.add(classe)
            })
        }

        if(value){
            item.textContent = value
        }

        return item
    }

    getId(item){
        return item.getAttribute("id")
    }
}