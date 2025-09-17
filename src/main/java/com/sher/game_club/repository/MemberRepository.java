package com.sher.game_club.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.sher.game_club.model.MemberModel;
import org.springframework.stereotype.Repository;
@Repository
public interface MemberRepository extends MongoRepository<MemberModel, String> {
    MemberModel findByPhone(String phone);
}
