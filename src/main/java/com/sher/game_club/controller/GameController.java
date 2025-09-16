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
import com.sher.game_club.model.GameModel;
import com.sher.game_club.repository.GameRepository;

@RestController
@RequestMapping("/games")
public class GameController {
    @Autowired
    private GameRepository gameRepository;

    @PostMapping
    public GameModel create(@RequestBody GameModel game) {
        game.setId(null);
        return gameRepository.save(game);
    }

    @GetMapping
    public List<GameModel> getAll() {
        return gameRepository.findAll();
    }

    @GetMapping(path = "/{id}")
    public GameModel findById(@PathVariable String id) {
        return gameRepository.findById(id).orElse(null);
    }

    @PutMapping(path = "/{id}")
    public GameModel update(@PathVariable String id, @RequestBody GameModel updatedGame) {
        GameModel oldgame = gameRepository.findById(id).get();
        oldgame.setName(updatedGame.getName());
        oldgame.setDescription(updatedGame.getDescription());
        oldgame.setPrice(updatedGame.getPrice());
        GameModel savedGame = gameRepository.save(oldgame);
        return savedGame;
    }

    @DeleteMapping(path = "/{id}")
    public void delete(@PathVariable String id) {
        gameRepository.deleteById(id);
    }
}