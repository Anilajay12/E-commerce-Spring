package com.vastra.shopping.model;

import javax.persistence.*;

@Entity
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;
    private Long userId;
    private String title;
    @Column(precision=5, scale=2)
    private Double price;
    private String description;
    private int quantity;
    @Column(precision=8, scale=2)
    private Double total;
    private boolean status;

    public Long getId() {
        return orderId;
    }

    public void setId(Long id) {
        this.orderId = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getProductName() {
        return title;
    }

    public void setProductName(String productName) {
        this.title = productName;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Double getTotal() {
        return total;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public Orders(){

    }

    public Orders(Long userId, String title, Double price, String description, int quantity, Double total, boolean status) {
        this.userId = userId;
        this.title = title;
        this.price = price;
        this.description = description;
        this.quantity = quantity;
        this.total = total;
        this.status = status;
    }
}
