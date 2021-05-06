package com.app.pojos;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id")
    @JsonProperty("cart_id")
    private Integer cartId;

    @Column(name = "cart_quantity")
    @JsonProperty("cart_quantity")
    private Integer cartQuantity;

    // userId column
    @JoinColumn(name = "user_id", nullable = false)
    @ManyToOne(optional = false)
    private Users user;

    @JoinColumn(name = "prod_id", nullable = false)
    @ManyToOne(optional = false)
    private Products product;














    public Products getProduct() {
        return product;
    }

    public void setProduct(Products product) {
        this.product = product;
    }

    public Users getUser() {
        return user;
    }
    public void setUser(Users user) {
        this.user = user;
    }
    public Integer getCartId() {
        return this.cartId;
    }
    public void setCartId(Integer cartId) {
        this.cartId = cartId;
    }
    public Integer getCartQuantity() {
        return this.cartQuantity;
    }
    public void setCartQuantity(Integer cartQuantity) {
        this.cartQuantity = cartQuantity;
    }

	@Override
	public String toString() {
		return "Cart [cartId=" + cartId + ", cartQuantity=" + cartQuantity + ", user=" + user + ", product=" + product
				+ "]";
	}
    
}
