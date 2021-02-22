import downloadPdf from "./../download-pdf"

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
        this.monthsActive.reverse().forEach( month => {
            const container = this.setElement("div", [`listing__container`, `js-listing-container-${month}`])
            const title = this.setElement("h2", ["title", "_small", "_uppercase", "_grey"], this.addUppercaseFirstLetter(month))
            container.append(title)
            this.$listing.append(container)
        })
    }

    setItems(){
        this.getData().forEach( (data, index) =>{
            const parent = document.querySelector(`.js-listing-container-${this.getMonth(data)}`)
            const container     = this.setElement("div", ["listing__list"])
            const numberBill    = this.setElement("div", ["listing__item", "_small"], data.countBill)
            const client        = this.setElement("div", ["listing__item", "_medium"], this.getClient(data))
            const download      = this.setElement("button", ["listing__download"])

            if(this.lastItem(index)){
                this.remove = this.setElement("button", ["listing__remove"])
                this.removeItem(this.remove, index)
            }

            this.downloadPdf(download, index)

            container.append(numberBill)
            container.append(client)
            container.append( this.setServices(data) )
            container.append( this.setHours(data) )
            container.append( this.setHTVA(data) )
            container.append( this.setTVAC(data) )
            container.append( this.setTVA(data) )
            container.append( download )

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

        return container
    }

    setHours(data){
        const value     = "hours"
        const symbol    = "h"
        const container = this.setElement("div", ["listing__item", "_small", "_right"])
        const hours     = this.setElement("div", [], `${data[value]}${symbol}`)
        container.append(hours)

        if(this.haveOneElement(data)){
            this.createService(container, data, value, symbol)
        }

        return container
    }

    setHTVA(data){
        const value     = "htva"
        const symbol    = "€"
        const container = this.setElement("div", ["listing__item", "_small", "_right"])
        const htva      = this.setElement("div", [], `${data[value]}${symbol}`)
        container.append(htva)

        if(this.haveOneElement(data)) {
            this.createService(container, data, value, symbol)
        }

        return container
    }

    setTVAC(data){
        const value     = "tvac"
        const symbol    = "€"
        const container = this.setElement("div", ["listing__item", "_small", "_right"])
        const tvac      = this.setElement("div", [], `${data[value]}${symbol}`)
        container.append(tvac)

        if(this.haveOneElement(data)) {
            this.createService(container, data, value, symbol)
        }

        return container
    }

    setTVA(data){
        const value     = "tva"
        const symbol    = "€"
        const container = this.setElement("div", ["listing__item", "_small", "_right"])
        const tva       = this.setElement("div", [], `${data[value]}${symbol}`)
        container.append(tva)

        if(this.haveOneElement(data)) {
            this.createService(container, data, value, symbol)
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
                const data = this.getData()
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
x
    /* Utils */

    createService(container, data, value, symbol){
        const parent = this.setElement("ul", ["_parent"])
        data.services.forEach( service => {
            const list = this.setElement("li", ["_list"])
            const item = this.setElement("div", ["_title"], `${service[value]}${symbol}` )

            list.append(item)
            parent.append(list)

            this.createDetail(list, service, value, symbol)
        })
        container.append(parent)
    }

    createDetail(parent, service, value, symbol){
        service.details.forEach( detail => {
            const child = this.setElement("div", ["_item"], `${detail[value]}${symbol}`)
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

        if(data.services.length > 1){
            visible = true
        }

        return visible
    }

    getData(){
        const data = JSON.parse( localStorage.getItem("bills") )
        return data ? data : false
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
}


