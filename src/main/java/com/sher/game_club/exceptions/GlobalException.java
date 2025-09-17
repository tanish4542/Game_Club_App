package com.sher.game_club.exceptions;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalException {
    @ExceptionHandler(BusinessException.class)
    public String handleBusinessException(BusinessException ex){
        return ex.getMessage();
    }

    @ExceptionHandler(IdNotPresentException.class)
    public String handleIdNotPresentException(IdNotPresentException ex){
        return ex.getMessage();
    }
    
}
