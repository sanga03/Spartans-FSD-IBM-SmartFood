package com.example.demo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;

@RestController
public class PaypalController {

	@Autowired
	PaypalService service;

	public static final String SUCCESS_URL = "pay/success";
	public static final String CANCEL_URL = "pay/cancel";

	@GetMapping("/")
	public String home() {
	return	"home";
	}

	@GetMapping("/pay")
	public ResponseEntity<?> payment() {
		try {
			Payment payment = service.createPayment(1.0, "INR", "paypal",
					"sale", "testing", "http://localhost:9090/" + CANCEL_URL,
					"http://localhost:9090/" + SUCCESS_URL);
			for(Links link:payment.getLinks()) {
				if(link.getRel().equals("approval_url")) {
					System.out.println(link.getHref());
					return ResponseEntity.status(HttpStatus.CREATED).body(new ErrorMessage(link.getHref()));
				}
			}
			
		} catch (PayPalRESTException e) {
		
			e.printStackTrace();
		}
		return ResponseEntity.status(HttpStatus.CREATED).body("error");
	}
	
	 @GetMapping(value = CANCEL_URL)
	    public String cancelPay() {
	        return "cancel";
	    }

	    @GetMapping(value = SUCCESS_URL)
	    public String successPay(@RequestParam("paymentId") String paymentId, @RequestParam("PayerID") String payerId) {
	        try {
	            Payment payment = service.executePayment(paymentId, payerId);
	            System.out.println(payment.toJSON());
	            if (payment.getState().equals("approved")) {
	                return "success";
	            }
	        } catch (PayPalRESTException e) {
	         System.out.println(e.getMessage());
	        }
	        return "redirect:/";
	    }

}