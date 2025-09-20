package com.sher.game_club.controller;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.sher.game_club.model.AdminUserModel;
import com.sher.game_club.exceptions.IdNotPresentException;
import com.sher.game_club.services.AdminUserService;

@RestController
@RequestMapping("/admin_users")
public class AdminUserController {
    @Autowired
    private AdminUserService adminUserService;

    @PostMapping
    public ResponseEntity<AdminUserModel> create(@RequestBody AdminUserModel adminUser) {
        AdminUserModel savedAdminUser = adminUserService.create(adminUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAdminUser);
    }

    @GetMapping
    public ResponseEntity<List<AdminUserModel>> findAll() {
        List<AdminUserModel> adminUsers = adminUserService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(adminUsers);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<AdminUserModel> findById(@PathVariable String id) throws IdNotPresentException {
        AdminUserModel adminUser = adminUserService.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(adminUser);
    }

    @GetMapping(path = "/phone/{phone}")
    public ResponseEntity<AdminUserModel> findByPhone(@PathVariable String phone) throws IdNotPresentException {
        AdminUserModel adminUser = adminUserService.findByPhone(phone);
        return ResponseEntity.status(HttpStatus.OK).body(adminUser);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<AdminUserModel> update(@PathVariable String id, @RequestBody AdminUserModel adminUser) throws IdNotPresentException {
        AdminUserModel updatedAdminUser = adminUserService.updateAdminUser(id, adminUser);
        return ResponseEntity.status(HttpStatus.OK).body(updatedAdminUser);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) throws IdNotPresentException {
        adminUserService.deleteAdminUser(id);
        return ResponseEntity.noContent().build();
    }
}
