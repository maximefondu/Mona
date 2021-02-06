import pdf from "./utils/pdf"
import formServices from "./utils/form-services"
import formValidation from "./utils/form-validation"

export default {

    init(){
        new pdf()
        new formServices()
        new formValidation()
    }
}
