package com.sher.game_club.model;
import java.util.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "transactions")
public class TransactionModel {
    @Id
    private String id;
    private String memberId;
    private String gameId;
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
    public String getGameId() {
        return gameId;
    }
    public void setGameId(String gameId) {
        this.gameId = gameId;
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
    public TransactionModel(String id, String memberId, String gameId, Double amount, Date dateTime) {
        this.id = id;
        this.memberId = memberId;
        this.gameId = gameId;
        this.amount = amount;
        this.dateTime = dateTime;
    }
    public TransactionModel() {
    }
    @Override
    public String toString() {
        return "TransactionModel [id=" + id + ", memberId=" + memberId + ", gameId=" + gameId + ", amount=" + amount + ", dateTime=" + dateTime + "]";
    }
    
    
    
}
