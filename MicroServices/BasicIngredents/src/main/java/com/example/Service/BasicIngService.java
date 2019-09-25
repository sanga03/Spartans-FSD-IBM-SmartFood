package com.example.Service;

import java.util.List;
import java.util.Random;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Model.ReqModel;
import com.example.Model.ResponceModel;
import com.example.Repo.BasicRepo;
import com.example.entity.BasicIng;

@Service
public class BasicIngService {
	@Autowired
private BasicRepo basicRepo;
	public boolean pushBasic(ReqModel basicIng) {
		ModelMapper mapper = new ModelMapper();
		
		try {
		 BasicIng basicIng2= mapper.map(basicIng,BasicIng.class);	
			String createBuuid = createBuuidz(basicIng);
			basicIng2.setBUuid(createBuuid);
			basicRepo.save(basicIng2);
			return true;
		}catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}
	private String createBuuidz(ReqModel basicIng) {
		Random rand = new Random();
		int n = rand.nextInt(50);
		return "BI"+basicIng.getName()+n;
	}
	public List<BasicIng> getList(){
		return basicRepo.findAll();
	}
	public ResponceModel getByName(String name){
		ModelMapper mapper = new ModelMapper();
		ResponceModel responceModel = mapper.map(basicRepo.findAllByName(name).get(0),ResponceModel.class);
		return responceModel;
	}
	public ResponceModel getBybUUid(String bUuid){
		ModelMapper mapper = new ModelMapper();
		ResponceModel responceModel = mapper.map(basicRepo.findAllByBUuid(bUuid).get(0),ResponceModel.class);
		return responceModel;
	}
}
