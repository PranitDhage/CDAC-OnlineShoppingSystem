package com.app.pojos;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "company")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comp_id")
    @JsonProperty("comp_id")
    private Integer compId;

    @Column(name = "comp_title")
    @JsonProperty("comp_title")
    private String compTitle;

    @Column(name = "comp_description")
    @JsonProperty("comp_description")
    private String compDescription;

    @JsonIgnore
	@OneToMany(mappedBy = "company", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Products> products;
    
    public List<Products> getProducts() {
		return products;
	}

	public void setProducts(List<Products> products) {
		this.products = products;
	}

	public Integer getCompId() {
        return this.compId;
    }

    public void setCompId(Integer compId) {
        this.compId = compId;
    }

    public String getCompTitle() {
        return this.compTitle;
    }

    public void setCompTitle(String compTitle) {
        this.compTitle = compTitle;
    }

    public String getCompDescription() {
        return this.compDescription;
    }

    public void setCompDescription(String compDescription) {
        this.compDescription = compDescription;
    }

	@Override
	public String toString() {
		return "Company [compId=" + compId + ", compTitle=" + compTitle + ", compDescription=" + compDescription + "]";
	}
    
}
