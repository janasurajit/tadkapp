const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port:465,
    auth:{
        user: 'janajit136@gmail.com',
        pass: 'keauzfkosjnqzxyq'

    }
})

export const sendMail = async (to,subject,msg) =>{
    await transporter.sendMail({
        to: to,
        subject: subject,
        html: msg
    })
    console.log('mail send successfully')
}

const pin = Math.floor(100000 + Math.random() * 900000);
sendMail(
    'sjana9333@gmail.com',
    'Test mail',
    `<div> <h3> this is maild send my node js</h3> <p> the pin is ${pin}</p></div>`
)