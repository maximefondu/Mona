import formServicesSale from "./components/sale/form-services-sale"
import formServicesExternalSale from "./components/sale/form-services-external-sale"
import listingSale from "./components/sale/listing-sale"

import formProductsPurchase from "./components/purchase/form-products-purchase"
import listingPurchase from "./components/purchase/listing-purchase"

import formSubmitClient from "./components/clients/form-submit-client"
import selectClient from "./components/clients/select-client"
import listingClient from "./components/clients/listing-client"

import formNavigation from "./components/form-navigation"
import exportData from "./components/export-data"
import importData from "./components/import-data"
import admin from "./components/admin"
import home from "./components/home"
export default {

    init(){
        new formNavigation()
        new formServicesSale()
        new formServicesExternalSale()
        new exportData()
        new importData()
        new listingSale()
        new admin()
        new home()
        new formProductsPurchase()
        new listingPurchase()
        new formSubmitClient()
        new selectClient()
        new listingClient()
    }
}
