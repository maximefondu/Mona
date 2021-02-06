import pdf from "./utils/pdf"
import formNavigation from "./utils/form-navigation"
import formServices from "./utils/form-services"

export default {

    init(){
        new pdf()
        new formNavigation()
        new formServices()
    }
}
