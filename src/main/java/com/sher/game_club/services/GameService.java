package com.sher.game_club.services;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sher.game_club.exceptions.IdNotPresentException;
import com.sher.game_club.model.GameModel;
import com.sher.game_club.repository.GameRepository;

@Service
public class GameService {
    
    @Autowired
    GameRepository gameRepository;

    // Create
    public GameModel create(GameModel game) {
        game.setId(null); 
        return gameRepository.save(game);
    }

    // Read
    public List<GameModel> findAll() {
        return gameRepository.findAll();
    }

    public GameModel findById(String idString) throws IdNotPresentException {
        Optional<GameModel> game = gameRepository.findById(idString);
        if(game.isEmpty()) {
            throw new IdNotPresentException("Game with ID " + idString + " not found.");
        }
        return game.get();
    }

    // Update
    public GameModel updateGame(String idString, GameModel updatedGame) throws IdNotPresentException {
        Optional<GameModel> existingGameOpt = gameRepository.findById(idString);
        if(existingGameOpt.isEmpty()) {
            throw new IdNotPresentException("Game with ID " + idString + " not found.");
        }
        GameModel existingGame = existingGameOpt.get();
        existingGame.setName(updatedGame.getName());
        existingGame.setDescription(updatedGame.getDescription());
        existingGame.setPrice(updatedGame.getPrice());
        return gameRepository.save(existingGame);
    }

    // Delete
    public void deleteGame(String idString) throws IdNotPresentException {
        Optional<GameModel> game = gameRepository.findById(idString);
        if(game.isEmpty()) {
            throw new IdNotPresentException("Game with ID " + idString + " not found.");
        }
        gameRepository.deleteById(idString);
    }
    
}
