import formNavigation from "./components/form-navigation"
import formServices from "./components/form-services"
import exportData from "./components/export-data"
import importData from "./components/import-data"
import listingSale from "./components/listing-sale"
export default {

    init(){
        new formNavigation()
        new formServices()
        new exportData()
        new importData()
        new listingSale()
    }
}
