require('dotenv').config();

const nodemailer = require('nodemailer');


const sendStayHealthyEmail = (email,receiver, filename,selectedDate)=>{

const log = console.log;
// Step 1
let transporter = nodemailer.createTransport({
     service: 'hotmail',
    //  port:""
        auth: {
        user: "ferhatagostinis@hotmail.de", // TODO: your gmail account
        pass: "IY506xdlx456" // TODO: your gmail password
    }
});

// Step 2
let mailOptions = {
    from: 'ferhatagostinis@hotmail.de', // TODO: email sender
    to: email, // TODO: email receiver
    subject: `Deine Geästeliste für den ${selectedDate}`,
    text: `
        Hallo  ${receiver}, 
        im Anhang findest du die gewünschte Liste.
        
        Mit freundlichem Gruß Ferhat von Appinho`,
    attachments: [
        {   // utf-8 string as an attachment
            filename: `${filename}.pdf`,
            path:`pdFKit/documents/${filename}.pdf`
        },
    ]
};

// Step 3
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return log(err);
    }
    return log('Email sent!!!');
});

}

module.exports= {sendStayHealthyEmail}