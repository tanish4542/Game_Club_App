package com.sher.game_club.model;
import java.util.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document(collection = "games")
public class GameModel {
    @Id
    private String id;
    private String name;
    private String description;
    private float price;
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public float getPrice() {
        return price;
    }
    public void setPrice(float price) {
        this.price = price;
    }
    public GameModel(String id, String name, String description, float price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }
    public GameModel() {
    }
    @Override
    public String toString() {
        return "GameModel [id=" + id + ", name=" + name + ", description=" + description + ", price=" + price + "]";
    }
    
    
    
}
