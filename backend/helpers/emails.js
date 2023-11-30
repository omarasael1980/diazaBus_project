import nodemailer  from 'nodemailer' 

export const emailRecoverPassword = async(userData)=>{
    //console.log(userData)
    const {email, name, token}= userData
    //console.log(userData)
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port:  process.env.EMAIL_PORT,
        auth: {
          user:  process.env.EMAIL_USER,
          pass:  process.env.EMAIL_PASS
        }
         
         
    })
// Email information
const info =  await   transport.sendMail({
    from: '"DiazaBus - Servicios Turisticos" <cuentas@diazabus.com>',
    to: email,
    subject : 'DiazaBus - Reestablece tu password',
    text: 'Reestablece tu password',
    html: `<p>Hola: ${name}, \n Has solicitado reestablecer tu password</p>
    <p>Da clic en el siguiente enlace para escribir tu nuevo password:</p>
    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a>
    <p>Si tu no solicitaste cambio de password,  ignora este mensaje</p>`,

})
}
  
