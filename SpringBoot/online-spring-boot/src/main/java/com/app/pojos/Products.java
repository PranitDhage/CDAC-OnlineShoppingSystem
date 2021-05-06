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
@Table(name = "product")
public class Products {
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prod_id")
    @JsonProperty("prod_id")
    private Integer prodId;

    @Column(name = "prod_title")
    @JsonProperty("prod_title")
    private String prodTitle;

    @Column(name = "prod_description")
    @JsonProperty("prod_description")
    private String prodDescription;

    @Column(name = "prod_price")
    @JsonProperty("prod_price")
    private Float prodPrice;

    @Column(name = "prod_qty")
    @JsonProperty("prod_qty")
    private Integer prodQty;

    @Column(name = "photo")
    private String photo;

    @JoinColumn(name = "user_id", nullable = false)
    @ManyToOne(optional = false)
    private Users user;
    
    @JoinColumn(name = "cat_id", nullable = false)
    @ManyToOne(optional = false)
    private Category category;

    @JoinColumn(name = "comp_id", nullable = false)
    @ManyToOne(optional = false)
    private Company company;







    public Company getCompany() {
        return company;
    }

    public void setCompany(Company company) {
        this.company = company;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public Integer getProdId() {
        return this.prodId;
    }

    public void setProdId(Integer prodId) {
        this.prodId = prodId;
    }

    public String getProdTitle() {
        return this.prodTitle;
    }

    public void setProdTitle(String prodTitle) {
        this.prodTitle = prodTitle;
    }

    public String getProdDescription() {
        return this.prodDescription;
    }

    public void setProdDescription(String prodDescription) {
        this.prodDescription = prodDescription;
    }

    public Float getProdPrice() {
        return this.prodPrice;
    }

    public void setProdPrice(Float prodPrice) {
        this.prodPrice = prodPrice;
    }

    public Integer getProdQty() {
        return this.prodQty;
    }

    public void setProdQty(Integer prodQty) {
        this.prodQty = prodQty;
    }

    public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	public String getPhoto() {
        return this.photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

	@Override
	public String toString() {
		return "Products [prodId=" + prodId + ", prodTitle=" + prodTitle + ", prodDescription=" + prodDescription
				+ ", prodPrice=" + prodPrice + ", prodQty=" + prodQty + ", photo=" + photo + ", seller=" + user + "]";
	}

}
