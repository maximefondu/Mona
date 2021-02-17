import {jsPDF} from "jspdf";

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

        this.setContent()
        this.setHeaderFrom()
        this.setHeaderTo()
        this.setGlobalData()
        this.setHeadListing()
        this.setListing()
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
        const name = this.setElement("p", ["_bold"], this.getCompany())
        const address = this.setElement("p", false, this.getData().address)
        const city = this.setElement("p", false, this.getData().zip_code + " " + this.getData().city)
        const land = this.setElement("p", false, this.getData().land)
        const tva = this.setElement("p", false, this.getData().tva_number)

        to.append(name)
        to.append(address)
        to.append(city)
        to.append(land)

        if (this.getTva()) {
            to.append(tva)
        }

        this.head.append(to)
        this.content.append(this.head)
    }

    setGlobalData() {
        const title = this.setElement("p", ["_title"], "Facture")
        const content = this.setElement("div", ["_globalData"])
        const date = this.setElement("p", false, `Date : <strong>${this.getDate()}</strong>`)
        const count = this.setElement("p", false, `Numéro de facture : <strong>${this.getData().countBill}</strong>`)

        this.content.append(title)
        this.content.append(content)
        content.append(date)
        content.append(count)
    }

    setHeadListing() {
        const grid = this.setElement("div", ["_grid", "_first"])
        const description = this.setElement("div", ["_item", "_6-12", "_bold"], "Description")
        const hours = this.setElement("div", ["_item", "_2-12", "_bold"], "Heure(s)")
        const htva = this.setElement("div", ["_item", "_2-12", "_bold"], "HTVA")
        const tvac = this.setElement("div", ["_item", "_2-12", "_bold"], "TVAC")

        this.content.append(grid)
        grid.append(description)
        grid.append(hours)
        grid.append(htva)
        grid.append(tvac)
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

    setFooter() {
        const parent = this.setElement("div", ["_footer"])
        const email = this.setElement("p", false, `Email : ${this.getSettings().email}`)
        const tel = this.setElement("p", false, `Tél. : ${this.getSettings().tel}`)
        const iban = this.setElement("p", false, `IBAN : ${this.getSettings().iban}`)

        parent.append(email)
        parent.append(tel)
        parent.append(iban)
        this.content.append(parent)
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
            const title = this.setElement("p", ["_title"],`${service[key]}${symbol}`)
            const parentDetails = this.setElement("div", ["_details"])

            service.details.forEach(detail => {
                if (detail[key]) {
                    const item = this.setElement("p", ["_detail"], `${detail[key]}${symbol}`)
                    parentDetails.append(item)
                }
            })

            container.append(parentService)
            parentService.append(title)
            parentService.append(parentDetails)
            parent.append(container)
        })
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


