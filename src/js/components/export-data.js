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
        this.purchase = JSON.parse(localStorage.getItem("purchase"))
        this.clients = JSON.parse(localStorage.getItem("clients"))

        this.data['bills'] = this.bills
        this.data['settings'] = this.settings
        this.data['purchase'] = this.purchase
        this.data['clients'] = this.clients
        this.data = JSON.stringify(this.data)
    }

    nameFile(){
        const date = new Date()
        const day = date.getDate()
        const month = date.toLocaleString('default', { month: '2-digit' })
        const year = date.getFullYear()

        return `data-mona-${day}-${month}-${year}.json`
    }

    success(){
        this.$succes.textContent="Les données ont bien été exporter !"
        this.$succes.classList.add("is-active")
        setTimeout( ()=>{
            this.$succes.classList.remove("is-active")
        }, 5000)
    }
}


