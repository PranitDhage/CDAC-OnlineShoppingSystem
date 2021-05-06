package com.app.pojos;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "orderdetails")
public class Orderdetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "orderdetails_id")
	private Integer orderdetailsId;

	@Column(name = "price")
	private Float price;

	@Column(name = "quantity")
	private Integer quantity;

	@Column(name = "rating")
	private Integer rating;

	@Column(name = "comment")
	private String comment;

	@JsonIgnore
	@JoinColumn(name = "myorder_id", nullable = false)
	@OneToOne(cascade = CascadeType.ALL, optional = false, orphanRemoval = true)
	private Myorder myorder;

	@JoinColumn(name = "prod_id", nullable = false)
	@ManyToOne(optional = false)
	private Products product;

	public Products getProduct() {
		return product;
	}

	public void setProduct(Products product) {
		this.product = product;
	}

	public Myorder getMyorder() {
		return myorder;
	}

	public void setMyorder(Myorder myorder) {
		this.myorder = myorder;
	}

	public Integer getOrderdetailsId() {
		return this.orderdetailsId;
	}

	public void setOrderdetailsId(Integer orderdetailsId) {
		this.orderdetailsId = orderdetailsId;
	}

	public Float getPrice() {
		return this.price;
	}

	public void setPrice(Float price) {
		this.price = price;
	}

	public Integer getQuantity() {
		return this.quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Integer getRating() {
		return this.rating;
	}

	public void setRating(Integer rating) {
		this.rating = rating;
	}

	public String getComment() {
		return this.comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	@Override
	public String toString() {
		return "Orderdetails [orderdetailsId=" + orderdetailsId + ", price=" + price + ", quantity=" + quantity
				+ ", rating=" + rating + ", comment=" + comment + ", product=" + product + "]";
	}

}
