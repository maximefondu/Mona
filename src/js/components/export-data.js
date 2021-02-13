export default class exportData {

    constructor() {
        this.button = document.querySelector(".js-export-data")

        console.log(this.button)

        if(this.button){
            this.init()
        }
    }

    init(){
        this.button.addEventListener("click", ()=>{
            this.bills = localStorage.getItem("bills")
            this.settings = localStorage.getItem("settings")



            let dataUriBills = 'data:application/json;charset=utf-8,'+ encodeURIComponent(this.bills)
            let dataUriSettings = 'data:application/json;charset=utf-8,'+ encodeURIComponent(this.settings)

            let linkElementBills = document.createElement('a')
            linkElementBills.setAttribute('href', dataUriBills)
            linkElementBills.setAttribute('download', this.nameFile("bills"))
            linkElementBills.click()

            let linkElementSettings = document.createElement('a')
            linkElementSettings.setAttribute('href', dataUriSettings)
            linkElementSettings.setAttribute('download', this.nameFile("settings"))
            linkElementSettings.click()
        })
    }

    nameFile(name){
        const date = new Date()
        const mounth = date.toLocaleString('default', { month: 'long' })
        return `${name}-data-${mounth}.json`
    }
}


