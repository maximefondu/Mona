export default class admin {

    constructor() {
        this.date = new Date()
        this.$currentMonth     = document.querySelector(".js-current-month")
        this.$currentYear      = document.querySelector(".js-current-year")

        this.$sumMonthBills    = document.querySelector(".js-month-sum-bills")
        this.$sumYearBills     = document.querySelector(".js-year-sum-bills")

        this.$sumMonthPurchase = document.querySelector(".js-month-sum-purchase")
        this.$sumYearPurchase = document.querySelector(".js-year-sum-purchase")

        if(this.$currentMonth){
            this.init()
        }
    }

    init(){
        this.$currentMonth.textContent = this.getCurrentMonth()
        this.$currentYear.textContent = this.getCurrentYear()

        this.$sumMonthBills.textContent = this.sumBills(false)
        this.$sumYearBills.textContent = this.sumBills(true)
        this.$sumMonthPurchase.textContent = this.sumPurchase(false)
        this.$sumYearPurchase.textContent = this.sumPurchase(true)
    }

    getBills(){
        const data = JSON.parse( localStorage.getItem("bills") )
        return data ? data : []
    }

    getPurchase(){
        const data = JSON.parse( localStorage.getItem("purchase") )
        return data ? data : []
    }

    getCurrentMonth(){
        return this.date.toLocaleString('default', { month: 'long' })
    }

    getCurrentYear(){
        return this.date.getFullYear()
    }

    sumBills(all){
        let sum = 0
        let sumMonth = 0

        this.getBills().forEach( data =>{

            const value = parseFloat(data.htva)

            if(data.date.month === this.getCurrentMonth()){
                sumMonth += value
            }

            sum += value
        })

        if(all){
            return `${sum.toFixed(2)}€`
        }else{
            return `${sumMonth.toFixed(2)}€`
        }

    }

    sumPurchase(all){
        let sum = 0
        let sumMonth = 0

        this.getPurchase().forEach( data =>{

            const value = parseFloat(data.htva)
            let date = new Date(data.date)
            date = date.toLocaleString('default', { month: 'long' })

            if(date === this.getCurrentMonth()){
                sumMonth += value
            }

            sum += value
        })

        if(all){
            return `${sum.toFixed(2)}€`
        }else{
            return `${sumMonth.toFixed(2)}€`
        }
    }
}


