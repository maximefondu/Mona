export default class exportData {

    constructor() {
        this.$button = document.querySelector(".js-import-data")
        this.$input  = document.querySelector(".js-import-data-input")
        this.$succes = document.querySelector(".js-import-export-succes")

        if(this.$button){
            this.init()
        }
    }

    init(){
        this.$input.addEventListener("change", ()=>{

            this.$input.files[0].text()
            .then(( data ) =>{
                this.updateData( JSON.parse(data) )
            })
            .catch( ( error ) =>{
                this.error(error)
            })

        })
    }

    updateData(datas){
        this.cleanLocalStorage()

        Object.keys(datas).forEach(key => {
            localStorage.setItem(key, JSON.stringify(datas[key]))
        });

        this.success()
    }

    cleanLocalStorage(){
        localStorage.removeItem("bills")
        localStorage.removeItem("settings")
    }

    success(){
        this.$succes.textContent="Les données ont bien été importer !"
        this.$succes.classList.add("is-active")
        setTimeout( ()=>{
            this.$succes.classList.remove("is-active")
        }, 5000)
    }

    error(error){
        this.$succes.textContent=`Une erreur c'est produite : ${error}`
        this.$succes.classList.add("is-active")
        setTimeout( ()=>{
            this.$succes.classList.remove("is-active")
        }, 5000)
    }
}


