import formNavigation from "./components/form-navigation"
import formServicesSale from "./components/sale/form-services-sale"
import formProductsBuy from "./components/buy/form-products-buy"
import exportData from "./components/export-data"
import importData from "./components/import-data"
import listingSale from "./components/listing-sale"
import admin from "./components/admin"
import home from "./components/home"
export default {

    init(){
        new formNavigation()
        new formServicesSale()
        new exportData()
        new importData()
        new listingSale()
        new admin()
        new home()
        new formProductsBuy()
    }
}
