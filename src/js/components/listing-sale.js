export default class listingSale {

    constructor() {
        this.$container = document.querySelector(".js-listing-sale")

        if(this.$container){
            this.init()
        }
    }

    init(){
        if(this.getData()){
            this.getDataReverse().forEach( (data, index) => {
                this.generateLine(data,index + 1)
            })
        }
    }

    generateLine(data, index){
        const template = document.createElement("template")
        template.innerHTML = `<div class="grid listing__item">
                                <div class="grid__item _1 listing__label">${index}</div>
                                <div class="grid__item _3 listing__label">${this.getClient(data)}</div>
                                <div class="grid__item _1 listing__label">${this.getHours(data)}</div>
                                <div class="grid__item _1 listing__label">${this.getPriceWithoutTva(data)}€</div>
                                <div class="grid__item _1 listing__label">${this.getPriceWithTva(data)}€</div>
                                <div class="grid__item _1 listing__label">${this.getTva(data)}€</div>
                              </div>`
        this.$container.append(template.content)
    }

    getClient(data){
        const name = data.name + " " + data.forename
        return data.company ? data.company : name
    }

    getHours(data){
        let hours = 0
        data.services.forEach( item =>{
            hours += parseFloat( item.hours )
        })

        return hours
    }

    getPriceWithoutTva(data){
        const number = this.getHours(data) * 42
        return number.toFixed(2)
    }

    getPriceWithTva(data){
        const number = this.getPriceWithoutTva(data) * 1.21
        return number.toFixed(2)
    }

    getTva(data){
        const number = this.getPriceWithTva(data) - this.getPriceWithoutTva(data)
        return number.toFixed(2)
    }

    getData(){
        return localStorage.getItem("bill-sell") ? JSON.parse( localStorage.getItem("bill-sell") ) : false
    }

    getDataReverse(){
        return this.getData().reverse()
    }
}
