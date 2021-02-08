export default class listingSale {

    constructor() {
        this.$container = document.querySelector(".js-listing-sale")

        if(this.$container){
            this.init()
        }
    }

    init(){
        if(this.getData()){
            this.getData().forEach( (data, index) => {
                this.generateLine(data,index + 1)
            })
        }
    }

    generateLine(data, index){
        const template = document.createElement("template")
        template.innerHTML = `<div class="grid listing__item">
                                <div class="grid__item _1 listing__label">${index}</div>
                                <div class="grid__item _3 listing__label">
                                    <span>${this.getClient(data)}</span>
                                    <ul class="listing__subitem">
                                        ${this.printServices(data).innerHTML}
                                    </ul>
                                </div>
                                <div class="grid__item _1 listing__label u-text-align-right">
                                    ${this.printHours(data).innerHTML}
                                </div>
                                <div class="grid__item _1 listing__label u-text-align-right">
                                    ${this.printPriceWithoutTva(data).innerHTML}
                                </div>
                                <div class="grid__item _1 listing__label u-text-align-right">
                                    ${this.printPriceWithTva(data).innerHTML}
                                </div>
                                <div class="grid__item _1 listing__label u-text-align-right">
                                    ${this.printTva(data).innerHTML}
                                </div>
                              </div>`
        this.$container.append(template.content)
    }



    /* Get */
    getData(){
        return localStorage.getItem("bill-sell") ? JSON.parse( localStorage.getItem("bill-sell") ) : false
    }

    getClient(data){
        const name = data.name + " " + data.forename
        return data.company ? data.company : name
    }

    getHoursTotal(data){
        let total = 0

        data.services.forEach( item =>{
            total += parseFloat( item.hours )
        })

        return total
    }

    getPricePerHours(){
        return 42
    }

    getPriceWithoutTva(hours){
        return hours * this.getPricePerHours()
    }

    getPriceWithTva(hours){
        return this.getPriceWithoutTva(hours) * 1.21
    }

    getTva(hours){
        return this.getPriceWithTva(hours) - this.getPriceWithoutTva(hours)
    }


    /* Print DOM */
    printServices(data){
        let parent = document.createElement("div")

        data.services.forEach( service =>{
            const li = document.createElement("li")
            li.innerHTML = service.service
            parent.append(li)
        })

        return parent
    }

    printHours(data){
        const parent = document.createElement("div")
        const span = document.createElement("span")
        const ul = document.createElement("ul")
        ul.classList.add("listing__subitem")

        data.services.forEach( item =>{
            const li = document.createElement("li")
            li.innerHTML = item.hours
            ul.append(li)
        })

        span.textContent=this.getHoursTotal(data)

        parent.append(span)
        parent.append(ul)

        return parent
    }

    printPriceWithoutTva(data){
        const parent = document.createElement("div")
        const span = document.createElement("span")
        const ul = document.createElement("ul")
        ul.classList.add("listing__subitem")

        data.services.forEach( item =>{
            const li = document.createElement("li")
            li.innerHTML = `${ this.getPriceWithoutTva(item.hours).toFixed(2) }€`
            ul.append(li)
        })

        span.textContent = `${ this.getPriceWithoutTva(this.getHoursTotal(data).toFixed(2) )}€`

        parent.append(span)
        parent.append(ul)

        return parent
    }

    printPriceWithTva(data){
        const parent = document.createElement("div")
        const span = document.createElement("span")
        const ul = document.createElement("ul")
        ul.classList.add("listing__subitem")

        data.services.forEach( item =>{
            const li = document.createElement("li")
            li.innerHTML = `${ this.getPriceWithTva(item.hours).toFixed(2) }€`
            ul.append(li)
        })

        span.textContent = `${ this.getPriceWithTva(this.getHoursTotal(data)).toFixed(2) }€`

        parent.append(span)
        parent.append(ul)

        return parent
    }

    printTva(data){
        const parent = document.createElement("div")
        const span = document.createElement("span")
        const ul = document.createElement("ul")
        ul.classList.add("listing__subitem")

        data.services.forEach( item =>{
            const li = document.createElement("li")
            li.innerHTML = `${ this.getTva( item.hours ).toFixed(2) }€`
            ul.append(li)
        })

        span.textContent = `${ this.getTva( this.getHoursTotal(data) ).toFixed(2) }€`

        parent.append(span)
        parent.append(ul)

        return parent
    }
}
