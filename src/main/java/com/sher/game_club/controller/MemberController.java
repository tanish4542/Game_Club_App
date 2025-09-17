package com.sher.game_club.controller;
import java.util.List;
import java.util.Optional;
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
import com.sher.game_club.repository.MemberRepository;

@RestController
@RequestMapping("/members")
public class MemberController {
    @Autowired
    private MemberRepository memberRepository;

    @PostMapping
    public MemberModel create(@RequestBody MemberModel member) {
        member.setId(null);
        return memberRepository.save(member);
    }

    @GetMapping
    public List<MemberModel> getAll() {
        return memberRepository.findAll();
    }

    @GetMapping(path = "/{id}")
    public MemberModel findById(@PathVariable String id) {
        return memberRepository.findById(id).orElse(null);
    }

    @PutMapping(path = "/{id}")
    public MemberModel update(@PathVariable String id, @RequestBody MemberModel updatedMember) {
        MemberModel oldmember = memberRepository.findById(id).get();
        oldmember.setName(updatedMember.getName());
        oldmember.setBalance(updatedMember.getBalance());
        oldmember.setPhone(updatedMember.getPhone());
        MemberModel savedMember = memberRepository.save(oldmember);
        return savedMember;
    }

    @DeleteMapping(path = "/{id}")
    public void delete(@PathVariable String id) {
        memberRepository.deleteById(id);
    }
}
