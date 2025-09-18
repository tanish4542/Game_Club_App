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
import org.springframework.web.bind.annotation.PathVariable;
import java.util.Date;
import java.text.SimpleDateFormat;
import com.sher.game_club.model.CollectionModel;
import com.sher.game_club.exceptions.IdNotPresentException;
import com.sher.game_club.services.CollectionService;

@RestController
@RequestMapping("/collections")
public class CollectionController {
    @Autowired
    private CollectionService collectionService;

    @PostMapping
    public ResponseEntity<CollectionModel> create(@RequestBody CollectionModel collection) {
        CollectionModel savedCollection = collectionService.create(collection);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedCollection);
    }

    @GetMapping
    public ResponseEntity<List<CollectionModel>> findAll() {
        List<CollectionModel> collections = collectionService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(collections);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<CollectionModel> findById(@PathVariable String id) throws IdNotPresentException {
        CollectionModel collection = collectionService.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(collection);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<CollectionModel> update(@PathVariable String id, @RequestBody CollectionModel collection) throws IdNotPresentException {
        CollectionModel updatedCollection = collectionService.updateCollection(id, collection);
        return ResponseEntity.status(HttpStatus.OK).body(updatedCollection);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) throws IdNotPresentException {
        collectionService.deleteCollection(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping(path = "/date/{timestamp}")
    public ResponseEntity<CollectionModel> computeByDate(@PathVariable Long timestamp) {
        Date date = new Date(timestamp);
        CollectionModel daily = collectionService.computeDailyCollection(date);
        return ResponseEntity.status(HttpStatus.OK).body(daily);
    }
    
    @GetMapping(path = "/day/{dateStr}")
    public ResponseEntity<CollectionModel> getByDay(@PathVariable String dateStr) {
        try {
            Date date = new SimpleDateFormat("yyyy-MM-dd").parse(dateStr);
            CollectionModel daily = collectionService.getDailyByDay(date);
            return ResponseEntity.status(HttpStatus.OK).body(daily);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}
