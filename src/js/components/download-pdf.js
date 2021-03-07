import {jsPDF} from "jspdf";
import timeFormat from "hh-mm-ss";

export default class downloadPdf {

    constructor(index) {
        this.options = {
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        }

        this.index = index

        this.init()
    }

    init() {
        this.pdf = new jsPDF(
            this.options
        )

        this.deadline()

        this.setContent()
        this.setHeaderFrom()
        this.setHeaderTo()
        this.setGlobalData()
        this.setHeadListing()
        this.setListing()
        this.setCum()
        this.setFooter()
        this.initPdf()
    }

    initPdf() {
        this.pdf.html(this.content, {
            callback: (doc)=> {
                doc.save(this.getNamePdf(), {})
            }
        })
    }

    setContent() {
        this.content = this.setElement("div", ["bill"])
        this.head = this.setElement("div", ["_head"])
    }

    setHeaderFrom() {
        const from = this.setElement("div", false)
        const name = this.setElement("p", ["_bold"], this.getSettings().name + " " + this.getSettings().forename)
        const address = this.setElement("p", false, this.getSettings().address)
        const city = this.setElement("p", false, this.getSettings().zip_code + " " + this.getSettings().city)
        const land = this.setElement("p", false, this.getSettings().land)

        from.append(name)
        from.append(address)
        from.append(city)
        from.append(land)
        this.head.append(from)
        this.content.append(this.head)
    }

    setHeaderTo() {
        const to = this.setElement("div", false)
        const title = this.setElement("p", ["_light"], "Facturé à")
        const name = this.setElement("p", ["_bold"], this.getCompany())
        const address = this.setElement("p", false, this.getData().address)
        const city = this.setElement("p", false, this.getData().zip_code + " " + this.getData().city)
        const land = this.setElement("p", false, this.getData().land)
        const tva = this.setElement("p", false, this.getData().tva_number)

        to.append(title, name, address, city, land)

        if (this.getTva()) {
            to.append(tva)
        }

        this.head.append(to)
        this.content.append(this.head)
    }

    setGlobalData() {
        const title = this.setElement("p", ["_title"], "Facture")
        const content = this.setElement("div", ["_globalData"])
        const contentLeft = this.setElement("div", false)
        const date = this.setElement("p", false, `Date de facturation :<strong>${this.getDate()}</strong>`)
        const count = this.setElement("p", false, `N° : <strong>${this.getData().countBill}</strong>`)
        const deadline = this.setElement("p", false, `Échéance : <strong>${this.deadline()}</strong>`)

        contentLeft.append(count, date)
        content.append(contentLeft, deadline)
        this.content.append(title, content)
    }

    setHeadListing() {
        const grid = this.setElement("div", ["_grid", "_first"])
        const description = this.setElement("div", ["_item", "_6-12", "_bold"], "Description")
        const hours = this.setElement("div", ["_item", "_2-12", "_bold"], "Heure(s)")
        const htva = this.setElement("div", ["_item", "_2-12", "_bold"], "HTVA")
        const tvac = this.setElement("div", ["_item", "_2-12", "_bold"], "TVAC")

        grid.append(description, hours, htva, tvac)
        this.content.append(grid)
    }

    setListing() {
        const grid = this.setElement("div", ["_grid"])
        const description = this.setElement("div", ["_item", "_6-12"])
        const hours = this.setElement("div", ["_item", "_2-12"])
        const htva = this.setElement("div", ["_item", "_2-12"])
        const tvac = this.setElement("div", ["_item", "_2-12"])

        //services
        this.setServices(description, "name", "")
        this.setServices(hours, "hours", "h")
        this.setServices(htva, "htva", "€")
        this.setServices(tvac, "tvac", "€")

        this.content.append(grid)
        grid.append(description)
        grid.append(hours)
        grid.append(htva)
        grid.append(tvac)
    }

    setCum(){
        const parent    = this.setElement("div", ["_sum"])
        const sum       = this.setElement("div", ["_title"], "Total :")
        const container = this.setElement("div", ["_container"])
        const numbers = this.setElement("div", ["_numbers"])
        const htva      = this.setElement("div", false, `<strong>${this.getData().htva}€</strong>`)
        const tva      = this.setElement("div", false, `<strong>${this.getData().tva}€</strong>`)
        const tvac      = this.setElement("div", false, `<strong>${this.getData().tvac}€</strong>`)
        numbers.append(htva, tva, tvac)
        container.append(sum, numbers)
        parent.append(container)
        this.content.append(parent)
    }

    setFooter() {
        const parent = this.setElement("div", ["_footer"])

        const ibanContainer = this.setElement("div", false)
        const ibanLabel     = this.setElement("p", false, "<strong>IBAN</strong>")
        const ibanValue     = this.setElement("p", false, this.getSettings().iban)
        ibanContainer.append(ibanLabel, ibanValue)

        const tvaContainer  = this.setElement("div", false)
        const tvaLabel      = this.setElement("p", false, "<strong>Numéro d'entreprise</strong>")
        const tvaValue      = this.setElement("p", false, this.getSettings().number_tva)
        tvaContainer.append(tvaLabel, tvaValue)

        const emailContainer  = this.setElement("div", false)
        const emailLabel      = this.setElement("p", false, "<strong>E-mail</strong>")
        const emailValue      = this.setElement("p", false, this.getSettings().email)
        emailContainer.append(emailLabel, emailValue)

        const telContainer  = this.setElement("div", false)
        const telLabel      = this.setElement("p", false, "<strong>Téléphone</strong>")
        const telValue      = this.setElement("p", false, this.getSettings().tel)
        telContainer.append(telLabel, telValue)

        parent.append(ibanContainer, tvaContainer, emailContainer, telContainer)
        this.content.append(parent)
    }


    deadline(){
        const dateCurrent = new Date()
        const deadline =  new Date( dateCurrent.setDate(dateCurrent.getDate() + 7) )

        return `${deadline.getDate()} ${deadline.toLocaleString('default', { month: 'long' })} ${deadline.getFullYear()}`
    }

    setElement(type, classes, value) {
        const item = document.createElement(type)

        if (classes) {
            classes.forEach(classe => {
                item.classList.add(classe)
            })
        }

        if (value) {
            item.innerHTML = value
        }

        return item
    }

    setServices(parent, key, symbol) {
        const container = this.setElement("div", ["_services"])

        this.getData().services.forEach(service => {
            const parentService = this.setElement("div", ["_service"])
            let title = this.setElement("p", ["_title"],`${service[key]}${symbol}`)

            if(symbol == "h"){
                title = this.setElement("p", ["_title"], `${this.setFormatHours(service)}`)
            }

            const parentDetails = this.setElement("div", ["_details"])

            service.details.forEach(detail => {
                if (detail[key]) {
                    let item = this.setElement("p", ["_detail"], `${detail[key]}${symbol}`)

                    if(symbol == "h"){
                        item = this.setElement("p", ["_detail"], `${this.setFormatHours(detail)}`)
                    }
                    
                    parentDetails.append(item)
                }
            })

            container.append(parentService)
            parentService.append(title)
            parentService.append(parentDetails)
            parent.append(container)
        })
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
    

    /* Function get */

    getData() {
        const data = JSON.parse(localStorage.getItem("bills"))
        return data ? data[this.index] : false
    }

    getSettings() {
        const settings = JSON.parse(localStorage.getItem("settings"))
        return settings ? settings : false
    }

    getCompany() {
        return this.getData().company ? this.getData().company : this.getData().name + " " + this.getData().forename
    }

    getDate() {
        return `${this.getData().date.day} ${this.getData().date.month} ${this.getData().date.year}`
    }

    getTva() {
        return this.getData().tva_number ? this.getData().tva_number : false
    }

    getNamePdf(){
        return (`facture-${this.getData().countBill}-${this.getData().company ? this.getData().company : this.getData().name + "-" + this.getData().forename}`).toLowerCase()
    }
}


