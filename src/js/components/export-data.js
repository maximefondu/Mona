export default class exportData {

    constructor() {
        this.$button = document.querySelector(".js-export-data")
        this.$succes = document.querySelector(".js-import-export-succes")

        if(this.$button){
            this.init()
        }
    }

    init(){
        this.$button.addEventListener("click", ()=>{

            this.filterData()

            let dataUriBills = 'data:application/json;charset=utf-8,'+ encodeURIComponent(this.data)
            const linkElementBills = document.createElement('a')
            linkElementBills.setAttribute('href', dataUriBills)
            linkElementBills.setAttribute('download', this.nameFile())
            linkElementBills.click()

            this.success()
        })
    }

    filterData(){
        this.data = {}
        this.bills = JSON.parse(localStorage.getItem("bills"))
        this.settings = JSON.parse(localStorage.getItem("settings"))

        this.data['bills'] = this.bills
        this.data['settings'] = this.settings
        this.data = JSON.stringify(this.data)
    }

    nameFile(){
        const date = new Date()
        const mounth = (date.toLocaleString('default', { month: 'long' })).toLowerCase()
        return `bills-data-${mounth}.json`
    }

    success(){
        this.$succes.textContent="Les données ont bien été exporter !"
        this.$succes.classList.add("is-active")
        setTimeout( ()=>{
            this.$succes.classList.remove("is-active")
        }, 5000)
    }
}


