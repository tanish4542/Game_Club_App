package com.sher.game_club.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sher.game_club.exceptions.IdNotPresentException;
import com.sher.game_club.model.CollectionModel;
import com.sher.game_club.model.RechargeModel;
import com.sher.game_club.repository.CollectionRepository;
import com.sher.game_club.repository.RechargeRepository;

@Service
public class CollectionService {
    
    @Autowired
    CollectionRepository collectionRepository;
    
    @Autowired
    RechargeRepository rechargeRepository;

    // Create
    public CollectionModel create(CollectionModel collection) {
        collection.setId(null); 
        return collectionRepository.save(collection);
    }

    // Read
    public List<CollectionModel> findAll() {
        return collectionRepository.findAll();
    }

    public CollectionModel findById(String idString) throws IdNotPresentException {
        Optional<CollectionModel> collection = collectionRepository.findById(idString);
        if(collection.isEmpty()) {
            throw new IdNotPresentException("Collection with ID " + idString + " not found.");
        }
        return collection.get();
    }
    
    public CollectionModel computeDailyCollection(Date date) {
        // Build start and end of day
        Date start = new Date(date.getYear(), date.getMonth(), date.getDate(), 0, 0, 0);
        Date end = new Date(date.getYear(), date.getMonth(), date.getDate(), 23, 59, 59);
        // Sum all recharges for the day
        List<RechargeModel> recharges = rechargeRepository.findByDateTimeBetween(start, end);
        double total = 0.0;
        for (RechargeModel r : recharges) {
            total += r.getAmount();
        }
        // Upsert a single collection document for the day
        List<CollectionModel> existing = collectionRepository.findByDateBetween(start, end);
        CollectionModel collection;
        if (!existing.isEmpty()) {
            collection = existing.get(0);
            collection.setAmount(total);
            collection.setDate(date);
        } else {
            collection = new CollectionModel();
            collection.setDate(date);
            collection.setAmount(total);
        }
        return collectionRepository.save(collection);
    }
    
    public CollectionModel getDailyByDay(Date date) {
        Date start = new Date(date.getYear(), date.getMonth(), date.getDate(), 0, 0, 0);
        Date end = new Date(date.getYear(), date.getMonth(), date.getDate(), 23, 59, 59);
        List<CollectionModel> existing = collectionRepository.findByDateBetween(start, end);
        if(!existing.isEmpty()) {
            return existing.get(0);
        }
        return computeDailyCollection(date);
    }

    // Update
    public CollectionModel updateCollection(String idString, CollectionModel updatedCollection) throws IdNotPresentException {
        Optional<CollectionModel> existingCollectionOpt = collectionRepository.findById(idString);
        if(existingCollectionOpt.isEmpty()) {
            throw new IdNotPresentException("Collection with ID " + idString + " not found.");
        }
        CollectionModel existingCollection = existingCollectionOpt.get();
        existingCollection.setDate(updatedCollection.getDate());
        existingCollection.setAmount(updatedCollection.getAmount());
        return collectionRepository.save(existingCollection);
    }

    // Delete
    public void deleteCollection(String idString) throws IdNotPresentException {
        Optional<CollectionModel> collection = collectionRepository.findById(idString);
        if(collection.isEmpty()) {
            throw new IdNotPresentException("Collection with ID " + idString + " not found.");
        }
        collectionRepository.deleteById(idString);
    }
    
}
