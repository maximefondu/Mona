import downloadPdf from "./../download-pdf"
import timeFormat from "hh-mm-ss"

export default class listingSale {

    constructor() {
        this.$listing = document.querySelector(".js-listing")

        if(this.$listing && this.getData()){
            this.init()
        }
    }

    init(){
        this.setListing()
    }

    setListing(){
        this.monthsActive = []
        this.getMonthActive()
        this.setContainer()
        this.setItems()
    }

    getMonthActive(){
        this.getData().forEach( data => {
            const month = this.getMonth(data)
            //if not in array push in
            const result = this.monthsActive.find( item => item == month )
            if(result === undefined){
                this.monthsActive.push(month)
            }
        })
    }

    setContainer(){
        this.monthsActive.forEach( month => {
            const container = this.setElement("div", [`listing__container`, `js-listing-container-${month}`])
            const title = this.setElement("h2", ["title", "_small", "_uppercase", "_grey"], this.addUppercaseFirstLetter(month))
            container.append(title)
            this.$listing.append(container)
        })
    }

    setItems(){
        this.getData().forEach( (data, index) =>{
            index = this.reverseIndex(index)
            const parent        = document.querySelector(`.js-listing-container-${this.getMonth(data)}`)
            const container     = this.setElement("div", ["listing__list"])
            const numberBill    = this.setElement("div", ["listing__item", "_very-small"], data.countBill)
            const client        = this.setElement("div", ["listing__item", "_medium"], this.getClient(data))
            const download      = this.setElement("button", ["listing__download"])

            if(this.lastItem(index)){
                this.remove = this.setElement("button", ["listing__remove"])
                this.removeItem(this.remove, index)
            }

            this.downloadPdf(download, index)

            container.append(numberBill, client, this.setServices(data), this.setHours(data), this.setHTVA(data), this.setTVAC(data), this.setTVA(data), this.setPaid(data, index), download)

            if(this.lastItem(index)){
                container.append( this.remove )
            }

            parent.append(container)
        })
    }

    setServices(data){
        const container = this.setElement("div", ["listing__item", "_big"])

        if(this.haveOneElement(data)){
            const button = this.setElement("button", ["listing__button"], "Voir détails")
            container.append(button)
            this.showDetails(button)
        }else{
            container.classList.add("_oneElement")
        }

        this.createService(container, data, "name", "")

        // create service external
        this.createServiceExternal(container, data, "name", "")

        return container
    }

    setHours(data){
        const symbol    = "h"
        const container = this.setElement("div", ["listing__item", "_very-small", "_right"])
        const hours     = this.setElement("div", [], `${this.setFormatHours(data)}`)

        container.append(hours)

        if(this.haveOneElement(data)){
            this.createService(container, data, "", symbol)
        }

        return container
    }

    setHTVA(data){
        const value     = "htva"
        const symbol    = "€"
        const container = this.setElement("div", ["listing__item", "_very-small", "_right"])
        const htva      = this.setElement("div", [], `${data[value]}${symbol}`)
        container.append(htva)

        if(this.haveOneElement(data)) {
            this.createService(container, data, value, symbol)
            this.createServiceExternal(container, data, value, symbol)
        }

        return container
    }

    setTVAC(data){
        const value     = "tvac"
        const symbol    = "€"
        const container = this.setElement("div", ["listing__item", "_very-small", "_right"])
        const tvac      = this.setElement("div", [], `${data[value]}${symbol}`)
        container.append(tvac)

        if(this.haveOneElement(data)) {
            this.createService(container, data, value, symbol)
            this.createServiceExternal(container, data, value, symbol)
        }

        return container
    }

    setTVA(data){
        const value     = "tva"
        const symbol    = "€"
        const container = this.setElement("div", ["listing__item", "_very-small", "_right"])
        const tva       = this.setElement("div", [], `${data[value]}${symbol}`)
        container.append(tva)

        if(this.haveOneElement(data)) {
            this.createService(container, data, value, symbol)
            this.createServiceExternal(container, data, value, symbol)
        }

        return container
    }

    showDetails(button){
        button.addEventListener('click', ()=>{
            button.classList.toggle("is-active")
            const $parents = button.parentNode.parentNode.querySelectorAll("._parent")
            $parents.forEach( $parent =>{
                $parent.classList.toggle("is-active")
            })
        })
    }

    downloadPdf(button, index){
        button.addEventListener("click", ()=>{
            new downloadPdf(index)
        })
    }

    removeItem(button, index){
        button.addEventListener("click", ()=>{

            //Create modal
            const parent = this.setElement("div", ["modal"])
            const text   = this.setElement("p", ["modal__text"], "Êtes-vous sûr de vouloir supprimer cette facture")
            const div   = this.setElement("div", ["modal__buttons"])
            const yes    = this.setElement("button", ["modal__yes"], "Oui")
            const no     = this.setElement("button", ["modal__no"], "Non")
            parent.append(text)
            parent.append(div)
            div.append(yes)
            div.append(no)
            document.body.append(parent)

            no.addEventListener('click', ()=>{
                parent.remove()
            })

            yes.addEventListener('click', ()=>{
                parent.remove()

                //Remove data
                const data = this.getData().reverse()
                data.splice(index, 1)
                localStorage.setItem("bills", JSON.stringify(data))

                //Set number bill
                const settings = JSON.parse(localStorage.getItem("settings"))
                settings.count = settings.count - 1
                localStorage.setItem("settings", JSON.stringify(settings))

                //Clean DOM and regenerate
                this.$listing.innerHTML = ""
                this.setListing()
            })
        })
    }

    setPaid(data, index){

        const paid = this.isPaid(data) ? "_paid" : "_not-paid"
        const parent = this.setElement("div", ["listing__item", "_very-small", "_right"])
        const button = this.setElement("button", [paid, "paid"])
        parent.append(button)

        if( !this.isPaid(data) ){
            button.addEventListener('click', ()=>{
                //Create modal
                const parent    = this.setElement("div", ["modal"])
                const back      = this.setElement("div", ["modal__back"])
                const input     = this.setElement("input", ["form-input"])
                const submit    = this.setElement("button", ["button"])
                const submitLabel    = this.setElement("span", ["button__label"], "Valider")
                input.setAttribute("type", "date")
                parent.append(input, submit)
                submit.append(submitLabel)
                document.body.append(back)
                document.body.append(parent)

                back.addEventListener('click', ()=>{
                    parent.remove()
                    back.remove()
                })

                //Set date
                submit.addEventListener('click', ()=>{
                    const storage = this.getData().reverse()
                    storage[index].payed = input.value

                    localStorage.setItem("bills", JSON.stringify( storage ))

                    button.classList.remove("_not-paid")
                    button.classList.add("_paid")
                    this.setDate(button, input.value)

                    parent.remove()
                    back.remove()
                })
            })
        }else{
            this.setDate(button, data.payed)
        }

        return parent
    }

    setFormatHours(data){
        const time = data["hours"]
        const secondes = time * 3600
        const value = timeFormat.fromS(secondes, 'hh:mm').split(":").join("h")

        if(value.indexOf("0") == 0){
            return value.substring(1)
        }
        return value
    }


    /* Utils */

    isPaid(data){
        return data.payed ? true : false
    }

    setDate(item, value){
        const date = new Date(value)
        item.setAttribute("data-date", `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`)
    }

    createService(container, data, value, symbol){
        const parent = this.setElement("ul", ["_parent"])
        data.services.forEach( service => {
            const list = this.setElement("li", ["_list"])
            let item = this.setElement("div", ["_title"], `${service[value]}${symbol}` )

            if(symbol == "h"){
                item = this.setElement("div", ["_title"], `${this.setFormatHours(service)}` )
            }

            list.append(item)
            parent.append(list)

            this.createDetail(list, service, value, symbol)
        })
        container.append(parent)
    }

    createServiceExternal(container, data, value, symbol){
        if(data.servicesExternal){
            const parent = this.setElement("ul", ["_parent"])
            data.servicesExternal.forEach( service => {
                const list = this.setElement("li", ["_list"])
                let item = this.setElement("div", ["_title"], `${service[value]}${symbol}` )

                list.append(item)
                parent.append(list)
            })
            container.append(parent)
        }
    }

    createDetail(parent, service, value, symbol){
        service.details.forEach( detail => {
            let child = this.setElement("div", ["_item"], `${detail[value]}${symbol}`)

            if(symbol == "h"){
                child = this.setElement("div", ["_item"], `${this.setFormatHours(detail)}`)
            }

            parent.append( child )
        })
    }

    haveOneElement(data){
        let visible = false

        data.services.forEach( service => {
            if(service.details.length > 0){
                visible = true
            }
        })

        if(data.servicesExternal){
            if(data.servicesExternal.length > 1){
                visible = true
            }
        }

        if(data.services.length > 1){
            visible = true
        }

        if(data.servicesExternal){
            if(data.servicesExternal.length >= 1 && data.services.length >= 1){
                visible = true
            }
        }

        return visible
    }

    getData(){
        const data = JSON.parse( localStorage.getItem("bills") )
        return data ? data.reverse() : false
    }

    getClient(data){
        return data.company ? data.company : data.name
    }

    getMonth(data){
        return data.date.month
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

    addUppercaseFirstLetter(value){
        return value.charAt(0).toUpperCase() + value.slice(1)
    }

    lastItem(index){
        if(this.getData().length === index + 1){
            return true
        }else{
            return false
        }
    }

    reverseIndex(index){
        return this.getData().length - index -1
    }
}


