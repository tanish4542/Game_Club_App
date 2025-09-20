package com.sher.game_club.dto;

import java.util.Date;

public class RechargeDTO {
    private String id;
    private String memberId;
    private String memberName;
    private Double amount;
    private Date dateTime;

    public RechargeDTO() {}

    public RechargeDTO(String id, String memberId, String memberName, Double amount, Date dateTime) {
        this.id = id;
        this.memberId = memberId;
        this.memberName = memberName;
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
        return "RechargeDTO [id=" + id + ", memberId=" + memberId + ", memberName=" + memberName + 
               ", amount=" + amount + ", dateTime=" + dateTime + "]";
    }
}
