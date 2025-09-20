package com.sher.game_club.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.sher.game_club.model.AdminUserModel;
import org.springframework.stereotype.Repository;
@Repository
public interface AdminUserRepository extends MongoRepository<AdminUserModel, String> {
    AdminUserModel findByPhone(String phone);
}
