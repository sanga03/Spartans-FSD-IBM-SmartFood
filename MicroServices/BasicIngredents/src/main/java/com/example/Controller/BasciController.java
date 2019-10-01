package com.example.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.Model.ReqModel;
import com.example.Model.ResponceModel;
import com.example.Service.BasicIngService;
import com.example.entity.BasicIng;

@RestController
@RequestMapping("/")
public class BasciController {
	@Autowired
	private BasicIngService basicIngService;

	@GetMapping("/list")
	public List<BasicIng> getList() {
		return basicIngService.getList();
	}
	@PostMapping("/push")
	public boolean pushIng(@RequestBody ReqModel rbasicIng) {
		return basicIngService.pushBasic(rbasicIng);
	}
	@GetMapping("/getByName/{name}")
	public ResponceModel gByName(@PathVariable String name) {
		return basicIngService.getByName(name);
	}
	@GetMapping("getBybUuid/{bUuid}")
	public ResponceModel byBuuid(@PathVariable("bUuid") String bUuid) {
		return basicIngService.getBybUUid(bUuid);
	}
}
