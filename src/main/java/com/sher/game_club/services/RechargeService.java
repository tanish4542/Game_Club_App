package com.sher.game_club.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sher.game_club.exceptions.IdNotPresentException;
import com.sher.game_club.model.RechargeModel;
import com.sher.game_club.model.MemberModel;
import com.sher.game_club.repository.RechargeRepository;
import com.sher.game_club.dto.RechargeDTO;

@Service
public class RechargeService {
    
    @Autowired
    RechargeRepository rechargeRepository;
    
    @Autowired
    MemberService memberService;
    
    @Autowired
    CollectionService collectionService;

    // Create
    public RechargeModel create(RechargeModel recharge) throws IdNotPresentException {
        recharge.setId(null);
        if(recharge.getDateTime() == null) {
            recharge.setDateTime(new Date());
        }
        RechargeModel savedRecharge = rechargeRepository.save(recharge);
        
        // Update member balance
        MemberModel member = memberService.findById(recharge.getMemberId());
        member.setBalance(member.getBalance() + recharge.getAmount());
        memberService.updateMember(member.getId(), member);
        
        // Recompute and persist daily collection for this date
        collectionService.computeDailyCollection(recharge.getDateTime());
        return savedRecharge;
    }

    // Read
    public List<RechargeModel> findAll() {
        return rechargeRepository.findAll();
    }

    public RechargeModel findById(String idString) throws IdNotPresentException {
        Optional<RechargeModel> recharge = rechargeRepository.findById(idString);
        if(recharge.isEmpty()) {
            throw new IdNotPresentException("Recharge with ID " + idString + " not found.");
        }
        return recharge.get();
    }

    // Update
    public RechargeModel updateRecharge(String idString, RechargeModel updatedRecharge) throws IdNotPresentException {
        Optional<RechargeModel> existingRechargeOpt = rechargeRepository.findById(idString);
        if(existingRechargeOpt.isEmpty()) {
            throw new IdNotPresentException("Recharge with ID " + idString + " not found.");
        }
        RechargeModel existingRecharge = existingRechargeOpt.get();
        existingRecharge.setMemberId(updatedRecharge.getMemberId());
        existingRecharge.setAmount(updatedRecharge.getAmount());
        existingRecharge.setDateTime(updatedRecharge.getDateTime());
        return rechargeRepository.save(existingRecharge);
    }

    // Delete
    public void deleteRecharge(String idString) throws IdNotPresentException {
        Optional<RechargeModel> recharge = rechargeRepository.findById(idString);
        if(recharge.isEmpty()) {
            throw new IdNotPresentException("Recharge with ID " + idString + " not found.");
        }
        rechargeRepository.deleteById(idString);
    }
    
    // Find recharges by member
    public List<RechargeModel> findByMemberId(String memberId) {
        return rechargeRepository.findByMemberId(memberId);
    }
    
    // Helper method to convert RechargeModel to RechargeDTO with member name
    private RechargeDTO convertToDTO(RechargeModel recharge) {
        try {
            MemberModel member = memberService.findById(recharge.getMemberId());
            
            return new RechargeDTO(
                recharge.getId(),
                recharge.getMemberId(),
                member.getName(),
                recharge.getAmount(),
                recharge.getDateTime()
            );
        } catch (IdNotPresentException e) {
            // If member not found, return with "Unknown" name
            return new RechargeDTO(
                recharge.getId(),
                recharge.getMemberId(),
                "Unknown Member",
                recharge.getAmount(),
                recharge.getDateTime()
            );
        }
    }
    
    // Get all recharges with member names
    public List<RechargeDTO> findAllWithNames() {
        List<RechargeModel> recharges = rechargeRepository.findAll();
        return recharges.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Get recharges by member ID with names
    public List<RechargeDTO> findByMemberIdWithNames(String memberId) {
        List<RechargeModel> recharges = rechargeRepository.findByMemberId(memberId);
        return recharges.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
}
