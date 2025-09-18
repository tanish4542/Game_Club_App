package com.sher.game_club.model;
import java.util.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "recharges")
public class RechargeModel {
    @Id
    private String id;
    private String memberId;
    private Double amount;
    private Date dateTime;
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getMemberId() {
        return memberId;
    }
    public void setMemberId(String memberId) {
        this.memberId = memberId;
    }
    public Double getAmount() {
        return amount;
    }
    public void setAmount(Double amount) {
        this.amount = amount;
    }
    public Date getDateTime() {
        return dateTime;
    }
    public void setDateTime(Date dateTime) {
        this.dateTime = dateTime;
    }
    public RechargeModel(String id, String memberId, Double amount, Date dateTime) {
        this.id = id;
        this.memberId = memberId;
        this.amount = amount;
        this.dateTime = dateTime;
    }
    public RechargeModel() {
    }
    @Override
    public String toString() {
        return "RechargeModel [id=" + id + ", memberId=" + memberId + ", amount=" + amount + ", dateTime=" + dateTime + "]";
    }
    
    
    
}
