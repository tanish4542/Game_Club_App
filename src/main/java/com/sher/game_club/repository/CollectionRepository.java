package com.sher.game_club.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.sher.game_club.model.CollectionModel;
import org.springframework.stereotype.Repository;
import java.util.Date;
import java.util.List;
@Repository
public interface CollectionRepository extends MongoRepository<CollectionModel, String> {
    List<CollectionModel> findByDateBetween(Date start, Date end);
}
