package com.example.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.clients.CustomFoodInterface;
import com.example.clients.FoodInterface;
import com.example.clients.RestaurantInterface;
import com.example.models.Category;
import com.example.models.CategoryRepo;
import com.example.models.CustomFoodDetailResponseModel;
import com.example.models.RatingModel;
import com.example.models.ResponseModel;

@RestController
@RequestMapping("/")
public class RestaurantController {
	
	private RestaurantInterface ri;
	private FoodInterface fi;
	private CustomFoodInterface cfi;
	private CategoryRepo cr;
	
	
	@Autowired
	public RestaurantController(CategoryRepo cr,RestaurantInterface ri, FoodInterface fi, CustomFoodInterface cfi) {
		super();
		this.ri = ri;
		this.fi = fi;
		this.cfi = cfi;
		this.cr = cr;
	}

	//filter by rating
	@PostMapping("/restaurant/rating")
	public List<ResponseModel> filterRating(@RequestBody RatingModel rm){
		double min = rm.getMin();
		double max = rm.getMax();
		List<ResponseModel> listnew = new ArrayList<ResponseModel>();
		List<ResponseModel> list = setPrice();
		for(ResponseModel l:list)
		{
			if(l.getRating() <= max && l.getRating() >= min)
				listnew.add(l);		
		}
		return listnew;
	}
	
	//filter by location
	@GetMapping("/restaurant/location/{location}")
	public List<ResponseModel> filterLocation(@PathVariable String location){
		List<ResponseModel> list = setPrice();
		List<ResponseModel> listnew = new ArrayList<ResponseModel>();
		if(list.isEmpty())
		{
			System.out.println("null");
			return null;
		}
		else
		{
			for(ResponseModel l:list)
			{
				//System.out.println(l.getLocation()+location);
				if(l.getLocation().equalsIgnoreCase(location))
					listnew.add(l);
			}
					
			return listnew;
		}
	}
	
	//filter by price range
	@PostMapping("/restaurant/price")
	public List<ResponseModel> filterPrice(@RequestBody RatingModel rm){
		double min = rm.getMin();
		double max = rm.getMax();
		List<ResponseModel> list = setPrice();
		List<ResponseModel> listnew = new ArrayList<ResponseModel>();
		for(ResponseModel l:list)
		{
			if(l.getPrice() <= max && l.getPrice() >= min)
				{
				listnew.add(l);		
				}
		}
		return listnew;
	}
	
	//filter by veg/non veg
	@PostMapping("/restaurant/category")
	public List<ResponseModel> filterCategory(@RequestParam("a") String a){
		int ab = Integer.parseInt(a);
		List<ResponseModel> list = setPrice();
		List<ResponseModel> listnew = new ArrayList<ResponseModel>();
		List<Category> listC = cr.findAll();
		List<Category> listCat = new ArrayList<Category>();
		for(Category c:listC)
		{
			if(c.getCategory() == ab)
				listCat.add(c);
		}
		for(Category c:listCat)
		{
			for(ResponseModel l:list)
			{
				if(l.getResId().equals(c.getResId()))
				{
					    System.out.println("check");
						listnew.add(l);	
						System.out.println(l.getName());
				}
			}
		}
		return listnew;

	}
	
	//plain old display
	@GetMapping("/restaurant/display")
	public List<ResponseModel> setPrice(){
		List<ResponseModel> list = ri.getRestaurants();
		for(ResponseModel l:list)
		{
			double price=0;
			int count = 0;
			for(CustomFoodDetailResponseModel c:cfi.readAll())
			{
				if(c.getRestaurantUuid().equals(l.getResId()))
				{
					++count;
					price += c.getPrice();
				}
			}
			l.setPrice(price/count);
		}
		return list;
	}
	//Comparator code
	class SortByRating implements java.util.Comparator<ResponseModel>{
		public int compare(ResponseModel r1,ResponseModel r2){
			return (int) (r2.getRating() - r1.getRating());
		}
	}
	
	class SortByPriceD implements java.util.Comparator<ResponseModel>{
		public int compare(ResponseModel r1,ResponseModel r2){
			return (int) (r2.getPrice() - r1.getPrice());
		}
	}
	class SortByPriceA implements java.util.Comparator<ResponseModel>{
		public int compare(ResponseModel r1,ResponseModel r2){
			return (int) (r1.getPrice() - r2.getPrice());
		}
	}
	class SortByNameA implements java.util.Comparator<ResponseModel>{
		public int compare(ResponseModel r1,ResponseModel r2){
			return r1.getName().compareToIgnoreCase(r2.getName()); 
		}
	}
	class SortByNameD implements java.util.Comparator<ResponseModel>{
		public int compare(ResponseModel r1,ResponseModel r2){
			return r1.getName().compareToIgnoreCase(r2.getName()); 
		}
	}
	//End of Comparator code

	
	//sort by price - ascend
	@GetMapping("/sortPriceA")
	public List<ResponseModel> sortPriceA(){
		List<ResponseModel> list = setPrice();
		Collections.sort(list, new SortByPriceA());
		return list;
	}
	
	//sort by price - descend
	@GetMapping("/sortPriceD")
	public List<ResponseModel> sortPriceD(){
		List<ResponseModel> list = setPrice();
		Collections.sort(list, new SortByPriceD());
		return list;
	}
	
	
	//sort by rating - descend
	@GetMapping("/sortRating")
	public List<ResponseModel> sortRating(){
		List<ResponseModel> list = setPrice();
		Collections.sort(list, new SortByRating());
		return list;
	}
	
	

	
	

}
