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

@Entity
@Table(name = "payment")
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pay_id")
    private Integer payId;

    @Column(name = "pay_amount")
    private Float payAmount;

    @Column(name = "pay_date")
    private String payDate;

    @Column(name = "pay_type")
    private Integer payType;

    @JoinColumn(name = "user_id", nullable = false)
    @ManyToOne(optional = false)
    private Users user;

    @JoinColumn(name = "myorder_id", nullable = false)
    @OneToOne(cascade = CascadeType.ALL, optional = false, orphanRemoval = true)
    private Myorder myorder;









    public Myorder getMyorder() {
        return myorder;
    }

    public void setMyorder(Myorder myorder) {
        this.myorder = myorder;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public Integer getPayId() {
        return this.payId;
    }

    public void setPayId(Integer payId) {
        this.payId = payId;
    }

    public Float getPayAmount() {
        return this.payAmount;
    }

    public void setPayAmount(Float payAmount) {
        this.payAmount = payAmount;
    }

    public String getPayDate() {
        return this.payDate;
    }

    public void setPayDate(String payDate) {
        this.payDate = payDate;
    }

    public Integer getPayType() {
        return this.payType;
    }

    public void setPayType(Integer payType) {
        this.payType = payType;
    }
}
