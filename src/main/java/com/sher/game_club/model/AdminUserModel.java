package com.sher.game_club.model;
import java.util.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "admin_users")
public class AdminUserModel {
    @Id
    private String id;
    private String username;
    private String password;
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public AdminUserModel(String id, String username, String password) {
        this.id = id;
        this.username = username;
        this.password = password;
    }
    public AdminUserModel() {
    }
    @Override
    public String toString() {
        return "AdminUserModel [id=" + id + ", username=" + username + ", password=" + password + "]";
    }
    
    
    
}
