export function saveData(){
    
    let datas = localStorage.getItem("bill-sell") ? JSON.parse( localStorage.getItem("bill-sell") ) : []

    datas.push(
        {
            "name": getValue("name"),
            "forename": getValue("forename"),
            "company": getValue("company"),
            "tva": getValue("tva"),
            "address": getValue("address"),
            "address-number": getValue("address-number"),
            "zipcode": getValue("zipcode"),
            "city": getValue("city"),
            "land": getValue("land"),
            "date": getDate(),
            "services": getServices()
        }
    )

    localStorage.setItem('bill-sell', JSON.stringify(datas));

    return false
}

function getItemById(id){
    return document.querySelector(`#${id}`)
}

function getValue(id){
    return getItemById(id).value
}

function getDate(){
    const date = new Date()
    return date.toLocaleDateString('fr-FR', {
        day: 'numeric', month: 'long', year: 'numeric'
    })
}

function getServices(){
    const $serviceDescription    = document.querySelectorAll(".js-form-service-description")
    const $serviceHours          = document.querySelectorAll(".js-form-service-hours")
    let data = []

    for (let i = 0; i < $serviceDescription.length; i++) {
        data.push( {
            "service": $serviceDescription[i].value,
            "hours": $serviceHours[i].value,
        } )
    }

    return data
}

