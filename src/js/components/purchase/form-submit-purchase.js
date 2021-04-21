export default class formSubmitPurchase {

    constructor() {
        this.object = {}
        this.$formContainer = document.querySelectorAll(".js-form-container")
        this.$inputsContact = this.$formContainer[0].querySelectorAll(".js-form-input")
        this.$products = document.querySelectorAll(".js-products")

        this.init()
    }

    init(){
        this.setContactData()
        this.setProductsData()
        this.setLocalStorage()
        this.redirection()
    }

    setContactData(){
        this.$inputsContact.forEach( $input => {
            const key = this.getId($input)
            const value = this.getValue($input)

            this.object[key] = value
        })
    }

    setProductsData(){
        let products = []
        let priceCum = 0

        this.$products.forEach( ($product, index) =>{
            let product = {}
            const $inputs   = $product.querySelectorAll(".js-form-input")
            const name      = $inputs[0].value
            const price     = parseFloat($inputs[1].value)

            product["name"] = name
            product["htva"] = price.toFixed(2)
            product["tvac"] = this.setTVAC(price).toFixed(2)
            product["tva"] = this.setTVA(price).toFixed(2)

            products.push(product)

            priceCum += price
        })

        this.setPriceCum(priceCum)

        this.object["products"] = products
    }

    setPriceCum(price){
        this.object["htva"] = price.toFixed(2)
        this.object["tvac"] = this.setTVAC(price).toFixed(2)
        this.object["tva"] = this.setTVA(price).toFixed(2)
    }

    setTVAC(price){
        return price * parseFloat( this.object["tva_rate"] )
    }

    setTVA(price){
        return this.setTVAC(price) - price
    }

    setLocalStorage(){
        let data = this.getLocalStorage("purchase") ? this.getLocalStorage("purchase") : []

        data = data.concat([this.object])

        localStorage.setItem('purchase', JSON.stringify(data));
    }

    redirection(){
        document.location.href="./listing-purchase.html"
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


