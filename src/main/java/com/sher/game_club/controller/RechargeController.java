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
import com.sher.game_club.model.RechargeModel;
import com.sher.game_club.dto.RechargeDTO;
import com.sher.game_club.exceptions.IdNotPresentException;
import com.sher.game_club.services.RechargeService;

@RestController
@RequestMapping("/recharges")
public class RechargeController {
    @Autowired
    private RechargeService rechargeService;

    @PostMapping
    public ResponseEntity<RechargeModel> create(@RequestBody RechargeModel recharge) throws IdNotPresentException {
        RechargeModel savedRecharge = rechargeService.create(recharge);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRecharge);
    }

    @GetMapping
    public ResponseEntity<List<RechargeModel>> findAll() {
        List<RechargeModel> recharges = rechargeService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(recharges);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<RechargeModel> findById(@PathVariable String id) throws IdNotPresentException {
        RechargeModel recharge = rechargeService.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(recharge);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<RechargeModel> update(@PathVariable String id, @RequestBody RechargeModel recharge) throws IdNotPresentException {
        RechargeModel updatedRecharge = rechargeService.updateRecharge(id, recharge);
        return ResponseEntity.status(HttpStatus.OK).body(updatedRecharge);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) throws IdNotPresentException {
        rechargeService.deleteRecharge(id);
        return ResponseEntity.noContent().build();
    }
    
    // Get all recharges with member names
    @GetMapping(path = "/with-names")
    public ResponseEntity<List<RechargeDTO>> findAllWithNames() {
        List<RechargeDTO> recharges = rechargeService.findAllWithNames();
        return ResponseEntity.status(HttpStatus.OK).body(recharges);
    }
    
    // Get recharges by member ID with names
    @GetMapping(path = "/member/{memberId}/with-names")
    public ResponseEntity<List<RechargeDTO>> findByMemberIdWithNames(@PathVariable String memberId) {
        List<RechargeDTO> recharges = rechargeService.findByMemberIdWithNames(memberId);
        return ResponseEntity.status(HttpStatus.OK).body(recharges);
    }
}
