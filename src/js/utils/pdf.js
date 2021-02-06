import { jsPDF } from "jspdf";

export default class pdf {

    constructor() {

        this.doc = new jsPDF()

        /*document.querySelector(".js-input").addEventListener('blur', ()=>{
            this.generatePdf()
        })*/

    }

    generatePdf(){
        this.doc.text(document.querySelector(".js-input").value, 10, 10);
        this.doc.save("a4.pdf");
    }
}
