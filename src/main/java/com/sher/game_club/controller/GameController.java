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
import com.sher.game_club.model.GameModel;
import com.sher.game_club.exceptions.IdNotPresentException;
import com.sher.game_club.services.GameService;

@RestController
@RequestMapping("/games")
public class GameController {
    @Autowired
    private GameService gameService;

    @PostMapping
    public ResponseEntity<GameModel> create(@RequestBody GameModel game) {
        GameModel savedGame = gameService.create(game);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedGame);
    }

    @GetMapping
    public ResponseEntity<List<GameModel>> findAll() {
        List<GameModel> games = gameService.findAll();
        return ResponseEntity.status(HttpStatus.OK).body(games);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<GameModel> findById(@PathVariable String id) throws IdNotPresentException {
        GameModel game = gameService.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(game);
    }

    @PutMapping(path = "/{id}")
    public ResponseEntity<GameModel> update(@PathVariable String id, @RequestBody GameModel game) throws IdNotPresentException {
        GameModel updatedGame = gameService.updateGame(id, game);
        return ResponseEntity.status(HttpStatus.OK).body(updatedGame);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) throws IdNotPresentException {
        gameService.deleteGame(id);
        return ResponseEntity.noContent().build();
    }
}