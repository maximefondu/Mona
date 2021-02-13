export default class formSubmit {

    constructor() {
        this.object = {}
        this.$formContainer = document.querySelectorAll(".js-form-container")
        this.$inputsContact = this.$formContainer[0].querySelectorAll(".js-form-input")
        this.$services = document.querySelectorAll(".js-form-service")
        this.date = new Date()

        this.getContactData()
        this.getServiceData()
        this.getDetailsData()
        this.setDate()
        this.setNumberBill()

        this.setLocalStorage()
    }


    getContactData(){
        this.$inputsContact.forEach( $input => {
            const key = this.getId($input)
            const value = this.getValue($input)

            this.object[key] = value
        })
    }

    getServiceData(){
        let services = []
        let service = {}

        this.$services.forEach( ($service, index) =>{
            const $inputs   = $service.querySelectorAll(".js-form-input")
            const name      = $inputs[0].value
            const hoursCum  = $inputs[1].value

            service["hours_cum"] = hoursCum
            service["name"] = name
            service["htva"] = this.setPriceHTVA(hoursCum).toFixed(2)
            service["tvac"] = this.setPriceTVAC(hoursCum).toFixed(2)
            service["tva"] = this.setTVA(hoursCum).toFixed(2)

            services.push(service)
        })

        this.object["services"] = services

    }

    getDetailsData(){
        const $parent = document.querySelectorAll(".js-service-group")

        $parent.forEach( (item, index) =>{
            let details = []

            const $details = item.querySelectorAll(".js-service-detail")
            $details.forEach( ($detail, index) =>{
                let detail = {}
                const $inputs   = $detail.querySelectorAll(".js-form-input")

                const name      = $inputs[0].value
                const hours     = $inputs[1].value

                detail["name"] = name
                detail["hours"] = hours
                detail["htva"] = this.setPriceHTVA(hours).toFixed(2)
                detail["tvac"] = this.setPriceTVAC(hours).toFixed(2)
                detail["tva"] = this.setTVA(hours).toFixed(2)

                details.push(detail)
            })

            this.object.services[index]["details"] = details
        })
    }

    setDate(){
        this.object.date = {
            day : this.date.getDay(),
            mounth : this.date.toLocaleString('default', { month: 'long' }),
            years : this.date.getFullYear()
        }
    }

    setNumberBill(){
        let bill = this.getLocalStorage("settings")

        if(bill === null){
            localStorage.setItem("settings", JSON.stringify({
                "count" : "1",
                "year": this.date.getFullYear()
            }))

            bill = this.getLocalStorage("settings")
        }else{
            if(bill.year !== this.date.getFullYear()){
                bill.count = 1
                bill.year = this.date.getFullYear()

                localStorage.setItem("settings", JSON.stringify({
                    "count" : bill.count,
                    "year": bill.year
                }))
            }else{
                bill.count++

                localStorage.setItem("settings", JSON.stringify({
                    "count" : bill.count,
                    "year": this.date.getFullYear()
                }))
            }
        }

        this.object.countBill = `${bill.year}-${bill.count}`
    }

    setPriceHTVA(hours){
        return hours * 42
    }

    setPriceTVAC(hours){
        return this.setPriceHTVA(hours) * 1.21
    }

    setTVA(hours){
        return this.setPriceTVAC(hours) - this.setPriceHTVA(hours)
    }

    setLocalStorage(){
        let data = this.getLocalStorage("bills") ? this.getLocalStorage("bills") : []

        data = data.concat([this.object])

        localStorage.setItem('bills', JSON.stringify(data));
    }


    /* Get */

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


