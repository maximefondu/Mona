export default class formSubmitSale {

    constructor() {
        this.object = {}
        this.$formContainer = document.querySelectorAll(".js-form-container")
        this.$inputsContact = this.$formContainer[0].querySelectorAll(".js-form-input")
        this.$services = document.querySelectorAll(".js-form-service")
        this.$servicesExternal = document.querySelectorAll(".js-form-service-external")
        this.externalsServiceCum = {}
        this.serviceSumHours = 0
        this.date = new Date()

        this.getContactData()
        this.getServiceData()
        this.getDetailsData()
        this.getServiceExternData()
        this.setPriceSum()
        this.setDate()
        this.setNumberBill()
        this.setLocalStorage()
        this.redirection()
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
        let hoursServices = 0

        this.$services.forEach( ($service, index) =>{
            let service = {}
            const $inputs   = $service.querySelectorAll(".js-form-input")
            const name      = $inputs[0].value
            const hours     = parseFloat( $inputs[1].value )

            service["hours"] = hours
            service["name"] = name
            service["htva"] = this.setPriceHTVA(hours).toFixed(2)
            service["tvac"] = this.setPriceTVAC(hours).toFixed(2)
            service["tva"] = this.setTVA(hours).toFixed(2)

            services.push(service)

            hoursServices += hours
        })

        this.serviceSumHours = hoursServices

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

    getServiceExternData(){
        let products = []
        let priceSumHtva = 0
        let priceSumTvac = 0
        let priceSumTva = 0

        this.$servicesExternal.forEach( (service, index) =>{
            let product = {}
            const $inputs   = service.querySelectorAll(".js-form-input")
            const name      = $inputs[0].value
            const price     = parseFloat($inputs[1].value)
            const priceTVAC = price * 1.21
            const TVA = priceTVAC - price

            product["name"] = name
            product["htva"] = price.toFixed(2)
            product["tvac"] = priceTVAC.toFixed(2)
            product["tva"] = TVA.toFixed(2)

            products.push(product)

            priceSumHtva += price
            priceSumTvac += priceTVAC
            priceSumTva += TVA
        })

        this.externalsServiceCum["htva"] = priceSumHtva
        this.externalsServiceCum["tvac"] = priceSumTvac
        this.externalsServiceCum["tva"] = priceSumTva

        this.object["servicesExternal"] = products
    }

    setDate(){
        this.object.date = {
            day : this.date.getDate(),
            month : this.date.toLocaleString('default', { month: 'long' }),
            year : this.date.getFullYear()
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

                localStorage.setItem("settings", JSON.stringify(Object.assign(bill, {
                    "count" : bill.count,
                    "year": this.date.getFullYear()
                })))

            }else{
                bill.count++

                localStorage.setItem("settings", JSON.stringify(Object.assign(bill, {
                    "count" : bill.count,
                    "year": this.date.getFullYear()
                })))
            }
        }

        this.object.countBill = `${bill.year}-${bill.count}`
    }

    setPriceHTVA(hours){
        const data = localStorage.getItem("settings") ? this.getLocalStorage("settings") : false
        const rate = parseFloat(data.rate)
        return hours * rate
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

    setPriceSum(){
        const hours = this.serviceSumHours

        const htva = this.setPriceHTVA(hours) + this.externalsServiceCum["htva"]
        const tvac = this.setPriceTVAC(hours) + this.externalsServiceCum["tvac"]
        const tva = this.setTVA(hours) + this.externalsServiceCum["tva"]

        this.object["htva"] = htva.toFixed(2)
        this.object["tvac"] = tvac.toFixed(2)
        this.object["tva"] = tva.toFixed(2)
        this.object["hours"] = parseFloat(hours)
    }

    redirection(){
        document.location.href="./listing-sale.html"
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


