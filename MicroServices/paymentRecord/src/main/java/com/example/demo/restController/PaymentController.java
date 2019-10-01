package com.example.demo.restController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.PaymentRecordDto;
import com.example.demo.entity.CustomerAccount;

import com.example.demo.entity.PaymentRecord;
import com.example.demo.entity.Restaurant;
import com.example.demo.repository.CustomerAccountRepository;
import com.example.demo.repository.PaymentRepository;
import com.example.demo.repository.RestaurantRepository;
import com.example.demo.requestAndResponseModel.RequestModel;
import com.example.demo.requestAndResponseModel.ResponseModel;
import com.example.demo.service.PaymentService;

@RestController
public class PaymentController {
  
	@Autowired 
	private PaymentService paymentService;
	@Autowired
	private RestaurantRepository restaurantRepository;
	@Autowired
	private CustomerAccountRepository customerAccountRepository;
	@Autowired
	private PaymentRepository paymentRepository;
	private ModelMapper mapper;
	   @Autowired
		public PaymentController(PaymentService paymentService) {
			super();
			this.mapper = new ModelMapper();
			this.mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
			
		}
	   
	   @PostMapping("/payment")
	   public ResponseEntity<ResponseModel> insertPaymentDetail(@RequestBody RequestModel requestModel)
	   {  
		   Optional<Restaurant> restaurant = restaurantRepository.findByResId(requestModel.getResId());
	      Optional<CustomerAccount> customerAccount = customerAccountRepository.findByUid(requestModel.getUuid());
		   PaymentRecordDto paymentDto = new PaymentRecordDto(requestModel.getAmount());
		   paymentDto.setCustomerAccount(customerAccount.get());
		   paymentDto.setRestaurant(restaurant.get());
           paymentDto = paymentService.insertPaymentRecord(paymentDto);
		   ResponseModel responseModel = new ResponseModel();
		   responseModel.setP_uuid(paymentDto.getPUuid());
		   responseModel.setAmount(paymentDto.getAmount());
		   responseModel.setUserName(paymentDto.getCustomerAccount().getName());
		   responseModel.setRestaurantName(paymentDto.getRestaurant().getName());
		                
		          
		
		   return ResponseEntity.ok(responseModel);
	   }
	   @GetMapping("/payment/{uuid}")
	   public ResponseEntity<ResponseModel> findByUUID(@PathVariable("uuid") String uuid)
	   {
		   PaymentRecordDto paymentRecordDto = paymentService.findByPUUID(uuid);
		   if(paymentRecordDto==null)
		   {
			   return (ResponseEntity<ResponseModel>) ResponseEntity.notFound();
		   }
		   else
		   {
			   ResponseModel responseModel = mapper.map(paymentRecordDto, ResponseModel.class);
			   return ResponseEntity.ok(responseModel);
		   }
	   }
	   
	   @GetMapping("/payment/byCustomer/{cuuid}")
	   public ResponseEntity<List<ResponseModel>> findCustomerTrackByCustomer(@PathVariable("cuuid") String s)
	   {
		   
		   Optional<CustomerAccount> tempCustomer = customerAccountRepository.findByUid(s);
		   List<PaymentRecord> paymentList = paymentRepository.findAllByCustomerAccount(tempCustomer.get());
		   List<ResponseModel> responseModelList = new ArrayList<ResponseModel>();
		   for(PaymentRecord paymentRecord:paymentList)
		   {
			   responseModelList.add(new ResponseModel(paymentRecord.getPUuid(), paymentRecord.getRestaurant().getName(), paymentRecord.getCustomerAccount().getName(), paymentRecord.getAmount()));
		   }
		  
		   return ResponseEntity.ok(responseModelList);
		   
	   }
//	   @GetMapping("/customerTrack/byCustomer/{cId}")
//	   public ResponseEntity<ResponseModel> findCustomerTrackByCustomer(@PathVariable("cId") String s)
//	   {
//		   int cId = Integer.parseInt(s);
//		   Optional<Customer> tempCustomer = customerRepository.findById(cId);
//		   Optional<CustomerTrack> cDetail = customerTrackRepository.findByCustomer(tempCustomer.get());
//		   ResponseModel responseModel = mapper.map(cDetail.get(), ResponseModel.class);
//		   return ResponseEntity.ok(responseModel);
//		   
//	   }
//	   @PutMapping("/customerTrack/{uuid}")
//	   public ResponseEntity<ResponseModel> customerTrack(@RequestBody RequestModel requestModel,@PathVariable("uuid") String uuid)
//	   {
//		   CustomerTrackDto customerTrackDto = new CustomerTrackDto(requestModel.getTackingDate(), requestModel.getMealTime(),requestModel.getCalories());
//		   customerTrackDto.setUtUuid(uuid);
//		   customerTrackDto=customerTrackService.updateCustomerTrack(customerTrackDto);
//		   ResponseModel responseModel = mapper.map(customerTrackDto, ResponseModel.class);
//		   return ResponseEntity.ok(responseModel);
//	   }
//	   
//	   @DeleteMapping("/physicalDetails/{uuid}")
//	   public ResponseEntity<String> deleteByUUID(@PathVariable("uuid") String uuid)
//	   {
//		  customerTrackService.deleteByUUID(uuid);
//		  
//		  return ResponseEntity.ok("Deleted");
//	   }
//		
}
