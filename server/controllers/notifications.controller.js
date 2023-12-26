import { OAuth2Client } from "google-auth-library";
import nodemailer from 'nodemailer';
import { mensaje2 } from "../assets/index.js";

const oauth2Client = new OAuth2Client({
    clientId:"469081136823-59el17u5d6h8386mtjpud63ioj5bl0t6.apps.googleusercontent.com",
    clientSecret:"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",
    redirectUri: "https://developers.google.com/oauthplayground",
  });
  
   oauth2Client.setCredentials({
     refresh_token:"1//04G--DPBzwHgVCgYIARAAGAQSNwF-L9IrLQklVJbltu4eYXMygoJpoWnXR2lyIiFjxAt9hwUEigF3W_biRGZtBHY7ozYgii6Nd_M"
   });
  
  
  // Función para enviar notificación
  const sendNotification = async (email) => {
  
    try {
      const accessToken = await oauth2Client.getAccessToken();
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user:"henrucciwebsite@gmail.com",
          clientId:"469081136823-59el17u5d6h8386mtjpud63ioj5bl0t6.apps.googleusercontent.com",
          clientSecret:"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",
          refreshToken: "1//04G--DPBzwHgVCgYIARAAGAQSNwF-L9IrLQklVJbltu4eYXMygoJpoWnXR2lyIiFjxAt9hwUEigF3W_biRGZtBHY7ozYgii6Nd_M",
          accessToken: accessToken,
        },
        tls: {
          rejectUnauthorized: false
        }
      });
  
  
      const mailOptions = {
        from:"henrucciwebsite@gmail.com",
        to: email,
        subject: 'Bienvenido a tu aplicación',
        text: undefined,
        html: mensaje2
      };
  
       await transporter.sendMail(mailOptions);
      console.log('Correo de notificación enviado:');
    } catch (error) {
      console.error('Error al enviar el correo de notificación:', error);
    }
  };
  
  export default sendNotification