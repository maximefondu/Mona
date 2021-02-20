export default class formServicesSale {

    constructor() {
        this.serviceCount = 0
        this.$container  = document.querySelector(".js-form-service-container");
        this.$serviceAdd = document.querySelector(".js-service-add");

        if(this.$container){
            this.init()
        }
    }

    init(){
        this.createService(this.serviceCount, true)
        this.details(this.serviceCount)

        this.services()
    }


    /* Services */

    services(){
        this.$serviceAdd.addEventListener('click', ()=>{
            this.serviceCount++
            this.createService(this.serviceCount, false)
            this.removeService(this.serviceCount)
            this.details(this.serviceCount)
        })
    }

    createService(index, isFirst){
        const template = document.createElement("template")
        template.innerHTML = this.templateService(index, isFirst)
        this.$container.append(template.content)
    }

    removeService(index){
        const $buttonRemove = document.querySelector(`.js-service-group-remove-${index}`);
        $buttonRemove.addEventListener('click', ()=>{
            this.$serviceGroup = document.querySelector(`.js-service-group-${index}`);
            this.$serviceGroup.remove()
        })
    }

    templateService(index, isFirst){
        if(isFirst){
            return `<div class="form-group js-service-group js-service-group-0">
                        <div class="form-row js-form-service">
                            <div class="form-field _3-4">
                                <label class="form-label" for="service-name-${index}">Nom des service(s)*</label>
                                <input class="js-form-input required form-input" type="text" id="service-name-${index}" placeholder="Nom du service">
                            </div>
                            <div class="form-field _1-4">
                                <label class="form-label" for="service-hours-${index}">Nombre d'heure(s)*</label>
                                <input class="js-form-input js-form-input-hours-sum-${index} required form-input" type="number" id="service-hours-${index}" placeholder="0">
                            </div>
                        </div>
                        <div class="form-services js-form-service-detail-0"></div>
                        <buton class="button _border js-service-detail-add-${index}">
                            <span class="button__label">Ajouter un détail</span>
                            <svg class="button__icon" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.9286 7.07143H7.28571C7.16738 7.07143 7.07143 7.16738 7.07143 7.28571V10.9286C7.07143 11.5203 6.59169 12 6 12C5.40831 12 4.92857 11.5203 4.92857 10.9286V7.28571C4.92857 7.16738 4.83262 7.07143 4.71429 7.07143H1.07143C0.479736 7.07143 0 6.59169 0 6C0 5.40831 0.479736 4.92857 1.07143 4.92857H4.71429C4.83262 4.92857 4.92857 4.83262 4.92857 4.71429V1.07143C4.92857 0.479736 5.40831 -1.19209e-07 6 -1.19209e-07C6.59169 -1.19209e-07 7.07143 0.479736 7.07143 1.07143V4.71429C7.07143 4.83262 7.16738 4.92857 7.28571 4.92857H10.9286C11.5203 4.92857 12 5.40831 12 6C12 6.59169 11.5203 7.07143 10.9286 7.07143Z"/>
                            </svg>
                        </buton>
                    </div>`
        }else{
            return `<div class="form-group js-service-group js-service-group-${index}">
                        <div class="form-row js-form-service">
                            <div class="form-field _3-4">
                                <label class="form-label" for="service-name-${index}">Nom des service(s)*</label>
                                <input class="js-form-input required form-input" type="text" id="service-name-${index}" placeholder="Nom du service">
                            </div>
                            <div class="form-field _1-4">
                                <label class="form-label" for="service-hours-${index}">Nombre d'heure(s)*</label>
                                <input class="js-form-input js-form-input-hours-sum-${index} required form-input" type="number" id="service-hours-${index}" placeholder="0">
                            </div>
                        </div>
                        <div class="form-services js-form-service-detail-${index}"></div>
                        <buton class="button _border js-service-detail-add-${index}">
                            <span class="button__label">Ajouter un détail</span>
                            <svg class="button__icon" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.9286 7.07143H7.28571C7.16738 7.07143 7.07143 7.16738 7.07143 7.28571V10.9286C7.07143 11.5203 6.59169 12 6 12C5.40831 12 4.92857 11.5203 4.92857 10.9286V7.28571C4.92857 7.16738 4.83262 7.07143 4.71429 7.07143H1.07143C0.479736 7.07143 0 6.59169 0 6C0 5.40831 0.479736 4.92857 1.07143 4.92857H4.71429C4.83262 4.92857 4.92857 4.83262 4.92857 4.71429V1.07143C4.92857 0.479736 5.40831 -1.19209e-07 6 -1.19209e-07C6.59169 -1.19209e-07 7.07143 0.479736 7.07143 1.07143V4.71429C7.07143 4.83262 7.16738 4.92857 7.28571 4.92857H10.9286C11.5203 4.92857 12 5.40831 12 6C12 6.59169 11.5203 7.07143 10.9286 7.07143Z"/>
                            </svg>
                        </buton>
                        <buton class="js-service-group-remove-${index} remove _big"></buton>
                    </div>`
        }
    }


    /* Details */

    details(index){
        let countItem = 0
        this.$button = document.querySelector(`.js-service-detail-add-${index}`);
        this.$button.addEventListener('click', ()=>{
            this.createDetail(index, countItem)
            this.removeDetail(index, countItem)
            this.hoursSum(index)
            countItem++
        })
    }

    createDetail(index, countItem){
        this.$detail = document.querySelector(`.js-form-service-detail-${index}`);

        const template = document.createElement("template")
        template.innerHTML=this.templateDetail(index, countItem)
        this.$detail.append(template.content)
    }

    removeDetail(index, countItem){
        const $buttonRemove = document.querySelector(`.js-service-detail-remove-${index}-${countItem}`);

        const $detailGroup = document.querySelector(`.js-service-detail-${index}-${countItem}`);
        $buttonRemove.addEventListener('click', ()=>{
            $detailGroup.remove()
            this.setHoursSum(index)
        })
    }

    hoursSum(index){
        const $parent   = document.querySelector(`.js-form-service-detail-${index}`);
        const $inputs   = $parent.querySelectorAll(".js-form-input-hours");

        $inputs.forEach( input =>{
            input.addEventListener('input', ()=>{
                this.setHoursSum(index)
            })
        })
    }

    setHoursSum(index){
        let $sum        = document.querySelector(`.js-form-input-hours-sum-${index}`);
        const $parent   = document.querySelector(`.js-form-service-detail-${index}`);
        const $inputs   = $parent.querySelectorAll(".js-form-input-hours");


        let valueSum    = 0
        $inputs.forEach( item =>{
            valueSum += item.value ? parseFloat( item.value ) : 0
        })

        $sum.value = valueSum
    }

    templateDetail(index, countItem){
        if(countItem === 0){
            return `<div class="form-row js-service-detail js-service-detail-${index}-${countItem}">
                        <div class="form-field _3-4">
                            <label class="form-label">Nom du détail*</label>
                            <input class="js-form-input required form-input" type="text" placeholder="Nom du détail">
                        </div>
                        <div class="form-field _1-4">
                            <label class="form-label">Nombre d'heure(s)*</label>
                            <input class="js-form-input required form-input js-form-input-hours" type="number" placeholder="0">
                        </div>
                        <button class="js-service-detail-remove-${index}-${countItem} remove"></button>
                    </div>`
        }else{
            return `<div class="form-row js-service-detail js-service-detail-${index}-${countItem}">
                        <div class="form-field _3-4">
                            <input class="js-form-input required form-input" type="text" placeholder="Nom du service">
                        </div>
                        <div class="form-field _1-4">
                            <input class="js-form-input required form-input js-form-input-hours" type="number" placeholder="0">
                        </div>
                        <button class="js-service-detail-remove-${index}-${countItem} remove"></button>
                    </div>`
        }
    }
}


