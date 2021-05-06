package com.app.pojos;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "myorder")
public class Myorder {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "myorder_id")
	@JsonProperty("myorder_id")
	private Integer myorderId;

	@Column(name = "orderDate")
	private String orderDate;

	@Column(name = "status", columnDefinition ="int default 0")
	@JsonProperty("status")
	private Integer status = 0;

	@Column(name = "total_price")
	private Float totalPrice;

	// userId col
	@JoinColumn(name = "user_id", nullable = false)
	@ManyToOne(optional = false)
	private Users user;

	// addId col
	@JoinColumn(name = "add_id", nullable = false)
	@ManyToOne(optional = false)
	private Address address;

	@OneToMany(mappedBy = "myorder", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Orderdetails> orderDetails;

	public List<Orderdetails> getOrderDetails() {
		return orderDetails;
	}

	public void setOrderDetails(List<Orderdetails> orderDetails) {
		this.orderDetails = orderDetails;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	public Integer getMyorderId() {
		return this.myorderId;
	}

	public void setMyorderId(Integer myorderId) {
		this.myorderId = myorderId;
	}

	public String getOrderDate() {
		return this.orderDate;
	}

	public void setOrderDate(String orderDate) {
		this.orderDate = orderDate;
	}

	public Integer getStatus() {
		return this.status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Float getTotalPrice() {
		return this.totalPrice;
	}

	public void setTotalPrice(Float totalPrice) {
		this.totalPrice = totalPrice;
	}

	@Override
	public String toString() {
		return "Myorder [myorderId=" + myorderId + ", orderDate=" + orderDate + ", status=" + status + ", totalPrice="
				+ totalPrice + ", user=" + user + ", address=" + address + ", orderDetails=" + orderDetails + "]";
	}


}
