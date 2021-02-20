export default class formProductsPurchase {

    constructor() {
        this.$container  = document.querySelector(".js-products-container");
        this.$productAdd = document.querySelector(".js-products-add");

        if(this.$container){
            this.init()
        }
    }

    init() {
        this.createProduct(true)

        this.$productAdd.addEventListener('click', ()=>{
            this.createProduct(false)
        })
    }

    createProduct(isFirst){
        const parent        = this.setElement("div", ["form-row", "js-products"])
        const parentName    = this.setElement("div", ["form-field", "_3-4"])
        const nameLabel     = this.setElement("label", ["form-label"], "Nom des produit(s) ou service(s)*")
        const nameInput     = this.setElement("input", ["form-input", "required", "js-form-input"])
        const parentPrice   = this.setElement("div", ["form-field", "_1-4"])
        const priceLabel    = this.setElement("label", ["form-label"], "Prix HTVA*")
        const priceInput    = this.setElement("input", ["form-input", "required", "js-form-input"])
        const remove        = this.setElement("button", ["remove"])

        nameInput.setAttribute("placeholder", "Nom du produit")
        priceInput.setAttribute("placeholder", "0")
        priceInput.setAttribute("type", "number")

        parent.append(parentName)

        if(isFirst){
            parentName.append(nameLabel)
        }

        parentName.append(nameInput)
        parent.append(parentPrice)

        if(isFirst){
            parentPrice.append(priceLabel)
        }

        parentPrice.append(priceInput)
        parent.append(remove)
        this.$container.append(parent)

        this.removeProduct(parent, remove)
    }

    removeProduct(item, button){
        button.addEventListener('click', ()=>{
            item.remove()
        })
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
}


