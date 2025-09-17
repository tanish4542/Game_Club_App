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
import com.sher.game_club.model.MemberModel;
import com.sher.game_club.exceptions.IdNotPresentException;
import com.sher.game_club.services.MemberService;

@RestController
@RequestMapping("/members")
public class MemberController {
    @Autowired
    private MemberService memberService;

    @PostMapping
    public ResponseEntity<MemberModel> create(@RequestBody MemberModel member) {
        MemberModel savedMember = memberService.create(member);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMember);
    }

    @GetMapping
    public ResponseEntity<List<MemberModel>> findAll() {
        List<MemberModel> members = memberService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(members);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<MemberModel> findById(@PathVariable String id) throws IdNotPresentException {
        MemberModel member = memberService.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(member);
    }

    @GetMapping(path = "/phone/{phone}")
    public ResponseEntity<MemberModel> findByPhone(@PathVariable String phone) throws IdNotPresentException {
        MemberModel member = memberService.findByPhone(phone);
        return ResponseEntity.status(HttpStatus.OK).body(member);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<MemberModel> update(@PathVariable String id, @RequestBody MemberModel member) throws IdNotPresentException {
        MemberModel updatedMember = memberService.updateMember(id, member);
        return ResponseEntity.status(HttpStatus.OK).body(updatedMember);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) throws IdNotPresentException {
        memberService.deleteMember(id);
        return ResponseEntity.noContent().build();
    }
}
