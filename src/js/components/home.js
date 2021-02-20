export default class admin {

    constructor() {
        this.date = new Date()
        this.$currentMonth     = document.querySelector(".js-current-month")
        this.$sumMonth         = document.querySelector(".js-month-sum")
        this.$currentYear      = document.querySelector(".js-current-year")
        this.$sumYear          = document.querySelector(".js-year-sum")

        if(this.$currentMonth){
            this.init()
        }
    }

    init(){
        this.$currentMonth.textContent = this.getCurrentMonth()
        this.$sumMonth.textContent = this.sum(false)
        this.$currentYear.textContent = this.getCurrentYear()
        this.$sumYear.textContent = this.sum(true)
    }

    getData(){
        const data = JSON.parse( localStorage.getItem("bills") )
        return data ? data : false
    }

    getCurrentMonth(){
        return this.date.toLocaleString('default', { month: 'long' })
    }

    getCurrentYear(){
        return this.date.getFullYear()
    }

    sum(all){
        let sum = 0
        let sumMonth = 0
        this.getData().forEach( data =>{

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
}


