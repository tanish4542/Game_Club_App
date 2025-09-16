package com.sher.game_club.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.sher.game_club.model.GameModel;
import org.springframework.stereotype.Repository;
@Repository
public interface GameRepository extends MongoRepository<GameModel, String> {

}
