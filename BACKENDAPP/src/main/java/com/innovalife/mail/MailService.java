package com.innovalife.mail;

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

    public void sendMail(String email, MailStructure mailStructure) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setFrom(fromMail);
        simpleMailMessage.setSubject(mailStructure.getSubject());
        simpleMailMessage.setText(mailStructure.getBody());
        simpleMailMessage.setTo(email);
        mailSender.send(simpleMailMessage);
    }

    public void sendSetPasswordMail(String email) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage);
        mimeMessageHelper.setTo(email);
        mimeMessageHelper.setSubject("Recupera tu contraseña");
        mimeMessageHelper.setText("<div>\n" +
                "        <h2>Recuperación de contraseña</h2>\n" +
                "        <p>Hola,</p>\n" +
                "        <p>Recibimos una solicitud para restablecer tu contraseña. Si realizaste esta solicitud, haz clic en el siguiente enlace para cambiar tu contraseña:</p>\n" +
                "        <a href='http://localhost:8080/usuario/set-password'>Restablecer contraseña</a>\n" +
                "        <p>Si no solicitaste un cambio de contraseña, puedes ignorar este correo.</p>\n" +
                "        <p>Gracias,</p>\n" +
                "        <p>El equipo de SIGESME</p>\n" +
                "        <div>\n" +
                "            <p>Si tienes problemas para hacer clic en el botón de <b>Restablecer contraseña</b>, copia y pega el siguiente enlace en tu navegador:</p>\n" +
                "            <p>http://localhost:8080/usuario/set-password</p>\n" +
                "        </div>\n" +
                "    </div>", true);
        mailSender.send(mimeMessage);
    }
}
