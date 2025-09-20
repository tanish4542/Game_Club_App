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
import com.sher.game_club.model.TransactionModel;
import com.sher.game_club.dto.TransactionDTO;
import com.sher.game_club.exceptions.IdNotPresentException;
import com.sher.game_club.services.TransactionService;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
    @Autowired
    private TransactionService transactionService;

    @PostMapping
    public ResponseEntity<TransactionModel> create(@RequestBody TransactionModel transaction) throws IdNotPresentException {
        TransactionModel savedTransaction = transactionService.create(transaction);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTransaction);
    }

    @GetMapping
    public ResponseEntity<List<TransactionModel>> findAll() {
        List<TransactionModel> transactions = transactionService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(transactions);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<TransactionModel> findById(@PathVariable String id) throws IdNotPresentException {
        TransactionModel transaction = transactionService.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(transaction);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<TransactionModel> update(@PathVariable String id, @RequestBody TransactionModel transaction) throws IdNotPresentException {
        TransactionModel updatedTransaction = transactionService.updateTransaction(id, transaction);
        return ResponseEntity.status(HttpStatus.OK).body(updatedTransaction);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) throws IdNotPresentException {
        transactionService.deleteTransaction(id);
        return ResponseEntity.noContent().build();
    }
    
    // Get all transactions with member and game names
    @GetMapping(path = "/with-names")
    public ResponseEntity<List<TransactionDTO>> findAllWithNames() {
        List<TransactionDTO> transactions = transactionService.findAllWithNames();
        return ResponseEntity.status(HttpStatus.OK).body(transactions);
    }
    
    // Get transactions by member ID with names
    @GetMapping(path = "/member/{memberId}/with-names")
    public ResponseEntity<List<TransactionDTO>> findByMemberIdWithNames(@PathVariable String memberId) {
        List<TransactionDTO> transactions = transactionService.findByMemberIdWithNames(memberId);
        return ResponseEntity.status(HttpStatus.OK).body(transactions);
    }
}
