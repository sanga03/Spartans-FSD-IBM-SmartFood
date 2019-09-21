package com.mycompany.entity;

//import java.util.Date;
import java.util.List;
import java.util.UUID;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;



@Entity
public class UserOrder {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long u_id;
	private Long r_id;
	private String date;
	UUID uuid = UUID.randomUUID();
	
	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
	private List<Food> food;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn
	private Customer customer;
	
	
	
	
	public UserOrder(Long r_id, String date, List<Food> food, Customer customer) {
		super();
		this.r_id = r_id;
		this.date = date;
		this.food = food;
		this.customer = customer;
	}
	public Long getU_id() {
		return u_id;
	}
	public void setU_id(Long u_id) {
		this.u_id = u_id;
	}
	public Long getR_id() {
		return r_id;
	}
	public void setR_id(Long r_id) {
		this.r_id = r_id;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public UUID getUuid() {
		return uuid;
	}
	public void setUuid(UUID uuid) {
		this.uuid = uuid;
	}
	public List<Food> getFood() {
		return food;
	}
	public void setFood(List<Food> food) {
		this.food = food;
	}
	
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
	}
	public UserOrder() {
		super();
		// TODO Auto-generated constructor stub
	}



	@Override
	public int hashCode() {
		// TODO Auto-generated method stub
		return u_id != null ? u_id.hashCode() : 0;
	}
	@Override
	public boolean equals(Object o) {
		// TODO Auto-generated method stub
		if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserOrder order = (UserOrder) o;

        return u_id != null ? u_id.equals(order.u_id) : order.u_id == null;
	}
	@Override
	public String toString() {
		return "UserOrder [u_id=" + u_id + ", r_id=" + r_id + ", date=" + date + ", uuid=" + uuid + ", food=" + food
				+ ", customer=" + customer + "]";
	}
	
	
	
	

}
