export default class listingClient {

    constructor() {
        this.years= []
        this.yearsFilter= []
        this.$listing = document.querySelector(".js-listing-client")

        if(this.$listing && this.getClients()){
            this.init()
        }
    }

    init(){
        this.getYearsActive()
        this.setContainer()
        this.setList()
    }

    getYearsActive(){
        this.getBills().forEach( data => {
            const year = data.date.year

            //if not in array push in
            const result = this.years.find( item => item == year )
            if(result === undefined){
                this.years.push(year)
            }
        })
    }

    setContainer(){
        this.years.forEach(year=>{
            const container = this.setElement("div", [`listing__container`, `js-listing-container-${year}`])
            const title = this.setElement("h2", ["title", "_small", "_uppercase", "_grey"], year)
            container.append(title)
            this.$listing.append(container)
        })
    }

    setList(){

        this.years.forEach( year => {
            const bills = this.getBills().filter( (item)=>{
                return item.date.year === year
            })

            this.getClients().forEach( (data, index) =>{
                const parent = document.querySelector(`.js-listing-container-${year}`)
                const company = data.company ?? ""
                const tva = data.tva_number ?? ""
                const name = data.name ?? ""
                const forename = data.forename ?? ""

                let prices = bills
                    .filter( (item)=>{
                        if(item.company){
                            return item.company  === company
                        }else if(item.name){
                            return item.name === name
                        }
                    })

                if(prices.length > 0){
                    prices = prices.reduce( (value, item)=>{
                            return {
                                "htva": (parseFloat(value.htva) + parseFloat(item.htva)).toFixed(2),
                                "tvac": (parseFloat(value.tvac) + parseFloat(item.tvac)).toFixed(2),
                                "tva": (parseFloat(value.tva) + parseFloat(item.tva)).toFixed(2),
                            }
                        })

                    const container     = this.setElement("div", ["listing__list"])
                    const $company      = this.setElement("div", ["listing__item", "_medium"], company)
                    const $tvaNumber    = this.setElement("div", ["listing__item", "_extramedium"], tva)
                    const $forename     = this.setElement("div", ["listing__item", "_extramedium"], name + " " + forename)
                    const $htva         = this.setElement("div", ["listing__item", "_small"], `${prices.htva}€`)
                    const $tvac         = this.setElement("div", ["listing__item", "_small"], `${prices.tvac}€`)
                    const $tva          = this.setElement("div", ["listing__item", "_small"], `${prices.tva}€`)
                    const $remove       = this.setElement("button", ["listing__remove"])

                    this.removeclient($remove, index)

                    container.append($company, $tvaNumber, $forename, $htva, $tvac, $tva, $remove)
                    parent.append(container)
                }

            })
        })
    }

    removeclient(button, index){
        button.addEventListener('click', ()=>{
            //Create modal
            const parent = this.setElement("div", ["modal"])
            const text   = this.setElement("p", ["modal__text"], "Êtes-vous sûr de vouloir supprimer ce client ?")
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
                let data = this.getClients()
                data.splice(index, 1)
                localStorage.setItem("clients", JSON.stringify(data))

                //Clean DOM and regenerate
                this.$listing.innerHTML = ""
                this.init()
            })
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


    /* Get */

    getClients(){
        const data = JSON.parse( localStorage.getItem("clients") )
        return data ?? false
    }

    getBills(){
        const data = JSON.parse( localStorage.getItem("bills") )
        return data ?? false
    }
}


