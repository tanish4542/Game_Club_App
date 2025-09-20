package com.sher.game_club.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sher.game_club.exceptions.IdNotPresentException;
import com.sher.game_club.model.AdminUserModel;
import com.sher.game_club.repository.AdminUserRepository;

@Service
public class AdminUserService {
    
    @Autowired
    AdminUserRepository adminUserRepository;

    // Create
    public AdminUserModel create(AdminUserModel adminUser) {
        adminUser.setId(null); 
        return adminUserRepository.save(adminUser);
    }

    // Read
    public List<AdminUserModel> findAll() {
        return adminUserRepository.findAll();
    }

    public AdminUserModel findById(String idString) throws IdNotPresentException {
        Optional<AdminUserModel> adminUser = adminUserRepository.findById(idString);
        if(adminUser.isEmpty()) {
            throw new IdNotPresentException("AdminUser with ID " + idString + " not found.");
        }
        return adminUser.get();
    }

    public AdminUserModel findByPhone(String phone) throws IdNotPresentException {
        AdminUserModel adminUser = adminUserRepository.findByPhone(phone);
        if(adminUser == null) {
            throw new IdNotPresentException("AdminUser with phone " + phone + " not found.");
        }
        return adminUser;
    }

    // Update
    public AdminUserModel updateAdminUser(String idString, AdminUserModel updatedAdminUser) throws IdNotPresentException {
        Optional<AdminUserModel> existingAdminUserOpt = adminUserRepository.findById(idString);
        if(existingAdminUserOpt.isEmpty()) {
            throw new IdNotPresentException("AdminUser with ID " + idString + " not found.");
        }
        AdminUserModel existingAdminUser = existingAdminUserOpt.get();
        existingAdminUser.setUsername(updatedAdminUser.getUsername());
        existingAdminUser.setPassword(updatedAdminUser.getPassword());
        existingAdminUser.setPhone(updatedAdminUser.getPhone());
        return adminUserRepository.save(existingAdminUser);
    }

    // Delete
    public void deleteAdminUser(String idString) throws IdNotPresentException {
        Optional<AdminUserModel> adminUser = adminUserRepository.findById(idString);
        if(adminUser.isEmpty()) {
            throw new IdNotPresentException("AdminUser with ID " + idString + " not found.");
        }
        adminUserRepository.deleteById(idString);
    }
    
}
