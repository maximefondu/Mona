export function saveData(){

    // Init array with local storage
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
            "date": getDate()
        }
    )

    localStorage.setItem('bill-sell', JSON.stringify(datas));

    return true
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

