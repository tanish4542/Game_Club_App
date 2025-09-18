package com.sher.game_club.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.sher.game_club.model.RechargeModel;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Date;
@Repository
public interface RechargeRepository extends MongoRepository<RechargeModel, String> {
    List<RechargeModel> findByMemberId(String memberId);
    List<RechargeModel> findByDateTimeBetween(Date startDate, Date endDate);
}
