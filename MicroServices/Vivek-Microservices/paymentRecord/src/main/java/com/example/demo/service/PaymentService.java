package com.example.demo.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.PaymentRecordDto;

import com.example.demo.entity.PaymentRecord;

import com.example.demo.repository.PaymentRepository;

@Service
public class PaymentService {
	private PaymentRepository paymentRepository; 
	private ModelMapper mapper;
   
	@Autowired
     public PaymentService(PaymentRepository paymentRepository) {
	super();
	this.paymentRepository = paymentRepository;
	 this.mapper = new ModelMapper();
	this.mapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
   }
   public PaymentRecordDto insertPaymentRecord(PaymentRecordDto paymentRecordDto)
   {
	  
   	PaymentRecord paymentRecord = mapper.map( paymentRecordDto , PaymentRecord.class);
   	paymentRepository.save(paymentRecord);
   	paymentRecordDto = mapper.map(paymentRecord, PaymentRecordDto.class);
    return paymentRecordDto;
   }
   
   public PaymentRecordDto findByPUUID(String uuid)
   {     PaymentRecordDto paymentRecordDto;
	   Optional<PaymentRecord> paymentRecord = paymentRepository.findByPUuid(uuid);
	   if(paymentRecord.isPresent())
	   {
		   paymentRecordDto = mapper.map(paymentRecord.get(), PaymentRecordDto.class);
		   
	   }
	   else
	   {
		   paymentRecordDto = null;
	   }
	   
	   return paymentRecordDto;
   }
   public void deleteByUUID(String uuid)
   {  
      Optional<PaymentRecord> paymentRecord = paymentRepository.findByPUuid(uuid);
     if(paymentRecord.isPresent())
     {
    	 paymentRepository.delete(paymentRecord.get());
     }  
   }
   
   public PaymentRecordDto updatePaymentRecord(PaymentRecordDto paymentRecordDto)
   {   
	   Optional<PaymentRecord> paymentRecord = paymentRepository.findByPUuid(paymentRecordDto.getPUuid());
	   if(paymentRecord.isPresent())
	   {  
		  PaymentRecord tempPaymentRecord = paymentRecord.get();
		  PaymentRecord pRecord = mapper.map(paymentRecordDto, PaymentRecord.class);
		  pRecord.setId(tempPaymentRecord.getId());
		  pRecord = paymentRepository.save(pRecord);
		  paymentRecordDto = mapper.map(pRecord, PaymentRecordDto.class);
		  return paymentRecordDto;
	   }
	   
	   return null;
   }
}
