
package br.com.icarus.icarus.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // ERROS DE REGRAS DE NEGÓCIO
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ProblemDetail> tratarErroDeNegocio(
            ResponseStatusException exception
    ) {

        ProblemDetail problema = ProblemDetail.forStatusAndDetail(
                exception.getStatusCode(),
                exception.getReason() != null
                        ? exception.getReason()
                        : "Não foi possível processar a solicitação"
        );

        problema.setTitle("Erro na solicitação");

        return ResponseEntity
                .status(exception.getStatusCode())
                .body(problema);
    }

    // ERROS DE VALIDAÇÃO DOS DTOs
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ProblemDetail> tratarErroDeValidacao(
            MethodArgumentNotValidException exception
    ) {

        Map<String, String> erros = new LinkedHashMap<>();

        exception.getBindingResult()
                .getFieldErrors()
                .forEach(erro -> erros.putIfAbsent(
                        erro.getField(),
                        erro.getDefaultMessage() != null
                                ? erro.getDefaultMessage()
                                : "Valor inválido"
                ));

        ProblemDetail problema = ProblemDetail.forStatusAndDetail(
                HttpStatus.BAD_REQUEST,
                "Existem campos inválidos na requisição"
        );

        problema.setTitle("Erro de validação");
        problema.setProperty("campos", erros);

        return ResponseEntity
                .badRequest()
                .body(problema);
    }
}
