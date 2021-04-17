export default class listingPurchase {

    constructor() {
        this.$listing = document.querySelector(".js-listing-purchase")

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
            const client        = this.setElement("div", ["listing__item", "_medium"], data.company)

            container.append(client)
            container.append( this.setProducts(data), this.setHTVA(data), this.setTVAC(data), this.setTVA(data), this.setPaid(data, index) )

            parent.append(container)

            this.remove = this.setElement("button", ["listing__remove"])
            this.removeItem(this.remove, index)
            container.append( this.remove )
        })
    }

    setProducts(data){
        const container = this.setElement("div", ["listing__item", "_extra-big"])

        if(this.haveOneElement(data)){
            const button = this.setElement("button", ["listing__button"], "Voir détails")
            container.append(button)
            this.showDetails(button)
        }else{
            container.classList.add("_oneElement")
        }

        this.createProduct(container, data, "name", "")

        return container
    }

    setHTVA(data){
        const value     = "htva"
        const symbol    = "€"
        const container = this.setElement("div", ["listing__item", "_small", "_right"])
        const htva      = this.setElement("div", [], `${data[value]}${symbol}`)
        container.append(htva)

        if(this.haveOneElement(data)) {
            this.createProduct(container, data, value, symbol)
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
            this.createProduct(container, data, value, symbol)
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
            this.createProduct(container, data, value, symbol)
        }

        return container
    }

    createProduct(container, data, value, symbol){
        const parent = this.setElement("ul", ["_parent"])
        data.products.forEach( product => {
            const list = this.setElement("li", ["_list"])
            const item = this.setElement("div", ["_title"], `${product[value]}${symbol}` )

            list.append(item)
            parent.append(list)
        })
        container.append(parent)
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

    haveOneElement(data){
        let visible = false

        if(data.products.length > 1){
            visible = true
        }

        return visible
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
                localStorage.setItem("purchase", JSON.stringify(data))

                //Clean DOM and regenerate
                this.$listing.innerHTML = ""
                this.setListing()
            })
        })
    }

    isPaid(data){
        return data.payed ? true : false
    }

    setPaid(data, index){
        const paid = this.isPaid(data) ? "_paid" : "_not-paid"
        const parent = this.setElement("div", ["listing__item", "_small", "_right"])
        const button = this.setElement("button", [paid, "paid"])
        this.setDate(button, data.payed)
        parent.append(button)

        if( !this.isPaid(data) ) {
            button.addEventListener('click', (e) => {
                //Create modal
                const parent = this.setElement("div", ["modal"])
                const back = this.setElement("div", ["modal__back"])
                const input = this.setElement("input", ["form-input"])
                const submit = this.setElement("button", ["button"])
                const submitLabel = this.setElement("span", ["button__label"], "Valider")
                input.setAttribute("type", "date")
                parent.append(input, submit)
                submit.append(submitLabel)
                document.body.append(back)
                document.body.append(parent)

                back.addEventListener('click', () => {
                    parent.remove()
                    back.remove()
                })

                //Set date
                submit.addEventListener('click', () => {
                    const storage = this.getData().reverse()
                    storage[index].payed = input.value
                    localStorage.setItem("purchase", JSON.stringify(storage))

                    button.classList.remove("_not-paid")
                    button.classList.add("_paid")
                    this.setDate(button, input.value)

                    parent.remove()
                    back.remove()
                })
            })
        }

        return parent
    }

    setDate(item, value){
        const date = new Date(value)
        item.setAttribute("data-date", `${date.getDate()} ${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`)
    }

    /* Get */

    getData(){
        const data = JSON.parse( localStorage.getItem("purchase") )
        return data ? data.reverse() : false
    }

    getMonth(data){
        const date = new Date(data.date);
        return date.toLocaleString('default', { month: 'long' })
    }

    reverseIndex(index){
        return this.getData().length - index -1
    }
}


