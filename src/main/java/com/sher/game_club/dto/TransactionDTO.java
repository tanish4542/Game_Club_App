package com.sher.game_club.dto;

import java.util.Date;

public class TransactionDTO {
    private String id;
    private String memberId;
    private String memberName;
    private String gameId;
    private String gameName;
    private Double amount;
    private Date dateTime;

    public TransactionDTO() {}

    public TransactionDTO(String id, String memberId, String memberName, String gameId, String gameName, Double amount, Date dateTime) {
        this.id = id;
        this.memberId = memberId;
        this.memberName = memberName;
        this.gameId = gameId;
        this.gameName = gameName;
        this.amount = amount;
        this.dateTime = dateTime;
    }

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

    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }

    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public String getGameName() {
        return gameName;
    }

    public void setGameName(String gameName) {
        this.gameName = gameName;
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

    @Override
    public String toString() {
        return "TransactionDTO [id=" + id + ", memberId=" + memberId + ", memberName=" + memberName + 
               ", gameId=" + gameId + ", gameName=" + gameName + ", amount=" + amount + ", dateTime=" + dateTime + "]";
    }
}
