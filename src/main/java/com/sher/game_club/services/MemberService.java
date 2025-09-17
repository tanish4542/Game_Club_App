package com.sher.game_club.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sher.game_club.exceptions.IdNotPresentException;
import com.sher.game_club.model.MemberModel;
import com.sher.game_club.repository.MemberRepository;

@Service
public class MemberService {
    @Autowired
    MemberRepository memberRepository;


    public MemberModel create(MemberModel member) {
        member.setId(null);
        return memberRepository.save(member);
    }


    public List<MemberModel> findAll() {
        return memberRepository.findAll();
    }

    public MemberModel findById(String idString) throws IdNotPresentException {
        Optional<MemberModel> member = memberRepository.findById(idString);
        if(member.isEmpty()) {
            throw new IdNotPresentException("Member with ID " + idString + " not found.");
        }
        return member.get();
    }

    public MemberModel findByPhone(String phone) throws IdNotPresentException {
        MemberModel member = memberRepository.findByPhone(phone);
        if(member == null) {
            throw new IdNotPresentException("Member with phone " + phone + " not found.");
        }
        return member;
    }

    public MemberModel updateMember(String idString, MemberModel updatedMember) throws IdNotPresentException {
        Optional<MemberModel> existingMemberOpt = memberRepository.findById(idString);
        if(existingMemberOpt.isEmpty()) {
            throw new IdNotPresentException("Member with ID " + idString + " not found.");
        }
        MemberModel existingMember = existingMemberOpt.get();
        existingMember.setName(updatedMember.getName());
        existingMember.setBalance(updatedMember.getBalance());
        existingMember.setPhone(updatedMember.getPhone());
        return memberRepository.save(existingMember);
    }

    public void deleteMember(String idString) throws IdNotPresentException {
        Optional<MemberModel> member = memberRepository.findById(idString);
        if(member.isEmpty()) {
            throw new IdNotPresentException("Member with ID " + idString + " not found.");
        }
        memberRepository.deleteById(idString);
    }
}


