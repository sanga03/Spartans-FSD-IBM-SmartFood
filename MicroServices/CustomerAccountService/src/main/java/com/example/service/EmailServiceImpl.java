package com.example.service;
import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
 

@Service
public class EmailServiceImpl {
   
	    @Autowired
	    private JavaMailSender sender;
//	    @ResponseBody
	    public String sendEmail(@RequestParam String email) throws Exception{
	    	String str=String.valueOf(Math.round(Math.random()*1000000));
	    	String body="<html><body>Dear user, <br/> This email is a verifictaion step to register with our application. Kindly enter this otp in registration page to complete successful registration! <br/><b>"+str+"</b><br/><br/>With love,<br/>SmartFood Team :)</body></html>";
	    	MimeMessage message = sender.createMimeMessage();
	        message.setText(body,"UTF-8", "html");
	        MimeMessageHelper helper = new MimeMessageHelper(message);
	        helper.setTo(email);
	        helper.setSubject("Account verification - SmartFood");
	         
	        sender.send(message);
	        return str;
	    }
	    
	    public String sendEmailPassword(@RequestParam String email) throws Exception{
	    	String str=String.valueOf(Math.round(Math.random()*1000000));
	    	String body="<html><body>Dear user, <br/> This email is a verifictaion step to change your password. Kindly enter this otp to successfully update your password~ <br/><b>"+str+"</b><br/><br/>With love,<br/>SmartFood Team :)</body></html>";
	    	MimeMessage message = sender.createMimeMessage();
	        message.setText(body,"UTF-8", "html");
	        MimeMessageHelper helper = new MimeMessageHelper(message);
	        helper.setTo(email);
	        helper.setSubject("Password change - SmartFood"); 
	        sender.send(message);
	        return str;
	    }
}
