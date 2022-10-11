const fs = require("fs");
const PDFDocument = require("./pdfkit-tables");

const createPDF=(guests,companyName,selectedDate,fileName)=>{

        // Create The PDF document
        const doc = new PDFDocument();

        // Pipe the PDF into a patient file
        doc.pipe(fs.createWriteStream(`pdFKit/documents/${fileName}.pdf`));

        // Add the header - https://pspdfkit.com/blog/2019/generate-invoices-pdfkit-node/
        doc
            .text(`GästeListe von${selectedDate}.`, 110, 57)
            .fontSize(14)
            .text("725 Fowler Avenue", 200, 65, { align: "right" })
            .text("Chamblee, GA 30341", 200, 80, { align: "right" })
            .moveDown();

        // Create the table - https://www.andronio.me/2017/09/02/pdfkit-tables/
        const table = {
            headers: ["Name", "Vorname", "Straße","PLZ","Stadt","Telefon","Email"],
            rows: []
        };

        for (const guest of guests){
            table.rows.push([guest.familyName,guest.givenName,guest.street,guest.postCode,guest.city,guest.phone,guest.email])
        }
        // Draw the table
        doc.moveDown().table(table, 10, 100, { width: 600 });

        // Finalize the PDF and end the stream
        doc.end();
    
}

module.exports={createPDF}