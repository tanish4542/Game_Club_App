package com.sher.game_club.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sher.game_club.exceptions.IdNotPresentException;
import com.sher.game_club.model.TransactionModel;
import com.sher.game_club.model.MemberModel;
import com.sher.game_club.model.GameModel;
import com.sher.game_club.repository.TransactionRepository;
import com.sher.game_club.dto.TransactionDTO;

@Service
public class TransactionService {
    
    @Autowired
    TransactionRepository transactionRepository;
    
    @Autowired
    MemberService memberService;
    
    @Autowired
    GameService gameService;

    // Create
    public TransactionModel create(TransactionModel transaction) throws IdNotPresentException {
        transaction.setId(null);
        if(transaction.getDateTime() == null) {
            transaction.setDateTime(new Date());
        }
        // Set amount automatically from game price
        GameModel game = gameService.findById(transaction.getGameId());
        double gamePrice = (double) game.getPrice();
        transaction.setAmount(gamePrice);
        TransactionModel savedTransaction = transactionRepository.save(transaction);
        
        // Update member balance
        MemberModel member = memberService.findById(transaction.getMemberId());
        member.setBalance(member.getBalance() - gamePrice);
        memberService.updateMember(member.getId(), member);
        
        return savedTransaction;
    }

    // Read
    public List<TransactionModel> findAll() {
        return transactionRepository.findAll();
    }

    public TransactionModel findById(String idString) throws IdNotPresentException {
        Optional<TransactionModel> transaction = transactionRepository.findById(idString);
        if(transaction.isEmpty()) {
            throw new IdNotPresentException("Transaction with ID " + idString + " not found.");
        }
        return transaction.get();
    }

    // Update
    public TransactionModel updateTransaction(String idString, TransactionModel updatedTransaction) throws IdNotPresentException {
        Optional<TransactionModel> existingTransactionOpt = transactionRepository.findById(idString);
        if(existingTransactionOpt.isEmpty()) {
            throw new IdNotPresentException("Transaction with ID " + idString + " not found.");
        }
        TransactionModel existingTransaction = existingTransactionOpt.get();
        existingTransaction.setMemberId(updatedTransaction.getMemberId());
        existingTransaction.setGameId(updatedTransaction.getGameId());
        existingTransaction.setAmount(updatedTransaction.getAmount());
        existingTransaction.setDateTime(updatedTransaction.getDateTime());
        return transactionRepository.save(existingTransaction);
    }

    // Delete
    public void deleteTransaction(String idString) throws IdNotPresentException {
        Optional<TransactionModel> transaction = transactionRepository.findById(idString);
        if(transaction.isEmpty()) {
            throw new IdNotPresentException("Transaction with ID " + idString + " not found.");
        }
        transactionRepository.deleteById(idString);
    }
    
    // Find transactions by member
    public List<TransactionModel> findByMemberId(String memberId) {
        return transactionRepository.findByMemberId(memberId);
    }
    
    // Find transactions by date range
    public List<TransactionModel> findByDateRange(Date startDate, Date endDate) {
        return transactionRepository.findByDateTimeBetween(startDate, endDate);
    }
    
    // Helper method to convert TransactionModel to TransactionDTO with names
    private TransactionDTO convertToDTO(TransactionModel transaction) {
        try {
            MemberModel member = memberService.findById(transaction.getMemberId());
            GameModel game = gameService.findById(transaction.getGameId());
            
            return new TransactionDTO(
                transaction.getId(),
                transaction.getMemberId(),
                member.getName(),
                transaction.getGameId(),
                game.getName(),
                transaction.getAmount(),
                transaction.getDateTime()
            );
        } catch (IdNotPresentException e) {
            // If member or game not found, return with "Unknown" names
            return new TransactionDTO(
                transaction.getId(),
                transaction.getMemberId(),
                "Unknown Member",
                transaction.getGameId(),
                "Unknown Game",
                transaction.getAmount(),
                transaction.getDateTime()
            );
        }
    }
    
    // Get all transactions with member and game names
    public List<TransactionDTO> findAllWithNames() {
        List<TransactionModel> transactions = transactionRepository.findAll();
        return transactions.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Get transactions by member ID with names
    public List<TransactionDTO> findByMemberIdWithNames(String memberId) {
        List<TransactionModel> transactions = transactionRepository.findByMemberId(memberId);
        return transactions.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    // Get transactions by date range with names
    public List<TransactionDTO> findByDateRangeWithNames(Date startDate, Date endDate) {
        List<TransactionModel> transactions = transactionRepository.findByDateTimeBetween(startDate, endDate);
        return transactions.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
}
