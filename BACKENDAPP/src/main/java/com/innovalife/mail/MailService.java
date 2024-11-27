package com.innovalife.mail;

import com.innovalife.utils.Propiedades;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromMail;

    public void sendSetPasswordMail(String email) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setSubject("Recupera tu contraseña");
        mimeMessageHelper.setText(Propiedades.getProperty("CUERPO_RECUPERACION_CLAVE"), true);
        mailSender.send(mimeMessage);
    }

    public void sendAssignementMail(String email, String nombre, String servicio, String fecha) throws MessagingException {
        String cuerpoEmail = "<!DOCTYPE html><html lang=\"es\"><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><title>Confirmación de Cita</title><style>body {font-family: Arial, sans-serif;background-color: #f4f4f4;margin: 0;padding: 0;}.email-container {width: 100%;max-width: 600px;margin: 0 auto;background-color: #ffffff;padding: 20px;border-radius: 8px;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);}h1 {color: #4CAF50;font-size: 24px;margin-bottom: 10px;}p {font-size: 16px;color: #333333;}.details {background-color: #f9f9f9;padding: 15px;border-radius: 8px;margin-top: 20px;}.details p {margin: 5px 0;}.cta-button {display: inline-block;background-color: #4CAF50;color: white;padding: 10px 20px;text-decoration: none;border-radius: 5px;margin-top: 20px;}</style></head><body><div class=\"email-container\"><h1>¡Tu cita ha sido agendada con éxito!</h1><p>Hola, <strong>"+nombre+"</strong></p><p>Nos complace informarte que tu cita ha sido agendada correctamente. A continuación, encontrarás los detalles de tu cita:</p><div class='details'><p><strong>Fecha:</strong> <span>"+fecha+"</span></p><p><strong>Servicio:</strong> <span>"+servicio+"</span></p><p><strong>Ubicación:</strong> <span>[Ubicación]</span></p></p></div><p>Si necesitas hacer algún cambio o cancelar tu cita, haz clic en el siguiente botón:</p><a href='#' class='cta-button'>Gestionar mi Cita</a><p>Gracias por elegir nuestros servicios. ¡Nos vemos pronto!</p></div></body></html>";
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setSubject("Tu cita ha sido agendada con éxito");
        mimeMessageHelper.setText(cuerpoEmail, true);
        mailSender.send(mimeMessage);
    }

    public void sendUpdateMail(String email, String nombre, String servicio, String fecha, String servicioNuevo, String fechaNueva) throws MessagingException {
        String cuerpoEmail = "<!DOCTYPE html><html lang='es'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Actualización de Cita</title><style>body{font-family:Arial,sans-serif;background-color:#f4f4f4;margin:0;padding:0}.email-container{width:100%;max-width:600px;margin:0 auto;background-color:#fff;padding:20px;border-radius:8px;box-shadow:0 4px 8px rgba(0,0,0,0.1)}h1{color:#FF9800;font-size:24px;margin-bottom:10px}p{font-size:16px;color:#333}.details{background-color:#f9f9f9;padding:15px;border-radius:8px;margin-top:20px}.details p{margin:5px 0}.cta-button{display:inline-block;background-color:#FF9800;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;margin-top:20px}.old-details{background-color:#e3e3e3;padding:15px;margin-top:20px;border-radius:8px}.old-details p{color:#666;text-decoration:line-through}</style></head><body><div class='email-container'><h1>¡Tu cita ha sido actualizada exitosamente!</h1><p>Hola, "+nombre+"</p><p>Te informamos que tu cita ha sido actualizada con los cambios realizados. A continuación, puedes ver los detalles antes y después de la actualización:</p><div class='old-details'><h3>Detalles anteriores:</h3><p><strong>Fecha:</strong> "+fecha+"</p><p><strong>Servicio:</strong> "+servicio+"</p><p><strong>Ubicación:</strong> [Ubicación Anterior]</p></div><div class='details'><h3>Detalles actuales:</h3><p><strong>Fecha:</strong> "+fechaNueva+"</p><p><strong>Servicio:</strong> "+servicioNuevo+"</p><p><strong>Ubicación:</strong> [Ubicación Nueva]</p></div><p>Si necesitas realizar más cambios o cancelar tu cita, puedes hacerlo a través del siguiente enlace:</p><a href='#' class='cta-button'>Gestionar mi Cita</a><p>Gracias por mantener tu cita con nosotros. ¡Nos vemos pronto!</p></div></body></html>\n";
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setSubject("Tu cita ha sido actualizada!");
        mimeMessageHelper.setText(cuerpoEmail, true);
        mailSender.send(mimeMessage);
    }
}
