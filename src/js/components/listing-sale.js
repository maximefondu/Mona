export default class listingSale {

    constructor() {
        this.monthsActive = []
        this.$listing = document.querySelector(".js-listing")

        if(this.$listing){
            this.init()
        }
    }

    init(){
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
        this.getData().forEach( data =>{
            const parent = document.querySelector(`.js-listing-container-${this.getMonth(data)}`)

            const container     = this.setElement("div", ["listing__list"])
            const numberBill    = this.setElement("div", ["listing__item", "_small"], data.countBill)
            const client        = this.setElement("div", ["listing__item", "_medium"], this.getClient(data))

            container.append(numberBill)
            container.append(client)
            container.append( this.setServices(data) )
            container.append( this.setHours(data) )
            container.append( this.setHTVA(data) )
            container.append( this.setTVAC(data) )
            container.append( this.setTVA(data) )
            parent.append(container)
        })
    }

    setServices(data){
        const container = this.setElement("div", ["listing__item", "_big"])

        this.createDetailsButton(container, data)
        this.createService(container, data, "name", "")

        return container
    }

    setHours(data){
        const value     = "hours"
        const symbol    = "h"
        const container = this.setElement("div", ["listing__item", "_small", "_right"])
        const hours     = this.setElement("div", [], `${data[value]}${symbol}`)
        container.append(hours)

        this.createService(container, data, value, symbol)

        return container
    }

    setHTVA(data){
        const value     = "htva"
        const symbol    = "€"
        const container = this.setElement("div", ["listing__item", "_small", "_right"])
        const htva      = this.setElement("div", [], `${data[value]}${symbol}`)
        container.append(htva)

        this.createService(container, data, value, symbol)

        return container
    }

    setTVAC(data){
        const value     = "tvac"
        const symbol    = "€"
        const container = this.setElement("div", ["listing__item", "_small", "_right"])
        const tvac      = this.setElement("div", [], `${data[value]}${symbol}`)
        container.append(tvac)

        this.createService(container, data, value, symbol)

        return container
    }

    setTVA(data){
        const value     = "tva"
        const symbol    = "€"
        const container = this.setElement("div", ["listing__item", "_small", "_right"])
        const tva       = this.setElement("div", [], `${data[value]}${symbol}`)
        container.append(tva)

        this.createService(container, data, value, symbol)

        return container
    }


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

    createDetailsButton(container, data){
        let visible = false

        data.services.forEach( service => {
            if(service.details.length > 0){
                visible = true
            }
        })

        if(data.services.length > 1){
            visible = true
        }

        if(visible){
            const button = this.setElement("button", ["listing__button"], "Voir détails")
            container.append(button)
        }
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
}


