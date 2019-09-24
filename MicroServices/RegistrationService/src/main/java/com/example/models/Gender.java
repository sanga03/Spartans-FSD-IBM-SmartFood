package com.example.models;



public enum Gender { 
	MALE(0),
	FEMALE(1);
	private int code;
	
	
	
	private Gender() {
	}

	private Gender(int code) {
		this.code = code;
	}

	public void setGender(int code)
	{
		this.code = code;
	}
	
	public int getGender()
	{
		return this.code;
	}
	
	

}