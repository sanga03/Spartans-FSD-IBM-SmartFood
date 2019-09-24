package com.example.service;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
 

@Service
public class EmailServiceImpl {
   
	    @Autowired
	    private JavaMailSender sender;
//	    @ResponseBody
	    public void sendEmail(String email,String otp) throws Exception{
	    	System.out.println("s == "+otp);
	    	String body="<html><body>Dear user, <br/> This email is a verifictaion step to register with our application. Kindly enter this otp in registration page to complete successful registration! <br/><b>"+otp+"</b><br/><br/>With love,<br/>SmartFood Team :)</body></html>";
	    	MimeMessage message = sender.createMimeMessage();
	        message.setText(body,"UTF-8", "html");
	        MimeMessageHelper helper = new MimeMessageHelper(message);
	        helper.setTo(email);
	        helper.setSubject("Account verification - SmartFood");
	         
	        sender.send(message);
	    }
}
