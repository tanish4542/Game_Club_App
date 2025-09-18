package com.sher.game_club.model;
import java.util.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "collections")
public class CollectionModel {
    @Id
    private String id;
    private Date date;
    private Double amount;
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public Date getDate() {
        return date;
    }
    public void setDate(Date date) {
        this.date = date;
    }
    public Double getAmount() {
        return amount;
    }
    public void setAmount(Double amount) {
        this.amount = amount;
    }
    public CollectionModel(String id, Date date, Double amount) {
        this.id = id;
        this.date = date;
        this.amount = amount;
    }
    public CollectionModel() {
    }
    @Override
    public String toString() {
        return "CollectionModel [id=" + id + ", date=" + date + ", amount=" + amount + "]";
    }
    
    
    
}
