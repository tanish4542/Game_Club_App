package com.sher.game_club.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.sher.game_club.model.TransactionModel;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Date;
@Repository
public interface TransactionRepository extends MongoRepository<TransactionModel, String> {
    List<TransactionModel> findByMemberId(String memberId);
    List<TransactionModel> findByDateTimeBetween(Date startDate, Date endDate);
}
