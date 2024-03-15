import { IEmailService } from "./IEmailService";
import { transporter } from "./Mailer";


export class EmailService implements IEmailService {
    async run(user: any): Promise<void> {
        const opcionesCorreo = {
            from: '213497@ids.upchiapas.edu.mx', // Debe ser el mismo email usado en la autenticación del transporter
            to: user.email,
            subject: 'Activacion de Cuenta', // Asunto del correo
            text: user.activationToken, // Cuerpo del correo en texto plano
            html: `<h1>Tu token de activación es: ${user.activationToken}.</h1>`, 
        };
        try {
            // Enviar el correo
            const info = await transporter.sendMail(opcionesCorreo);
            console.log('Correo enviado con éxito: %s', info.messageId);
        } catch (error) {
            console.error('Error al enviar el correo:', error);
        }    
    }

    async sendInvitation(email: string, surveyTitle: string, invitationLink: string): Promise<any> {
        try {
            const mailOptions = {
                from: '213497@ids.upchiapas.edu.mx',
                to: email,
                subject: `Invitación a participar en la encuesta: ${surveyTitle}`,
                html: `<p>Haz clic en el siguiente enlace para participar en la encuesta: <a href="${invitationLink}">${invitationLink}</a></p>`
            };
            await transporter.sendMail(mailOptions);
            return { success:true };
        } catch (error) {
            return {
                status: false,
                error: error
            };
        }
    }

    async sendAwards(data:any[], surveyUuid:string):Promise<boolean> {
        try {
            const promises: any[] = [];
            data.forEach((participant) => {
                console.log(participant.award);
                const mailOptions = {
                    from: '213497@ids.upchiapas.edu.mx',
                    to: participant.email,
                    subject: `Felicitaciones, ganaste un premio al contestar una encuesta con el uuuid: ${surveyUuid}`,
                    html: `<p>Ganaste un ${participant.award.awardName} que sirve para ${participant.award.awardDescription}</p>`
                };
                promises.push(transporter.sendMail(mailOptions));
            })
            await Promise.allSettled(promises);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
}