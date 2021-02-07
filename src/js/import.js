import pdf from "./utils/pdf"
import formServices from "./components/form-services"
import formValidation from "./components/form-validation"
import listingSale from "./components/listing-sale"

export default {

    init(){
        new pdf()
        new formServices()
        new formValidation()
        new listingSale()
    }
}
