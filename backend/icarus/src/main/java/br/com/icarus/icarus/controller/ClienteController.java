
package br.com.icarus.icarus.controller;

import br.com.icarus.icarus.dto.request.ClienteRequest;
import br.com.icarus.icarus.dto.response.ClienteResponse;
import br.com.icarus.icarus.service.ClienteService;

import jakarta.validation.Valid;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    // CADASTRAR CLIENTE

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ClienteResponse cadastrar(
            @Valid @RequestBody ClienteRequest request
    ) {
        return clienteService.cadastrar(request);
    }

    // LISTAR TODOS OS CLIENTES

    @GetMapping
    public List<ClienteResponse> listarTodos() {
        return clienteService.listarTodos();
    }

    // BUSCAR CLIENTE POR ID

    @GetMapping("/{id}")
    public ClienteResponse buscarPorId(
            @PathVariable Integer id
    ) {
        return clienteService.buscarPorId(id);
    }

    // BUSCAR CLIENTE POR CPF

    @GetMapping("/cpf/{cpf}")
    public ClienteResponse buscarPorCpf(
            @PathVariable String cpf
    ) {
        return clienteService.buscarPorCpf(cpf);
    }

    // BUSCAR CLIENTES POR NOME

    @GetMapping("/buscar")
    public List<ClienteResponse> buscarPorNome(
            @RequestParam String nome
    ) {
        return clienteService.buscarPorNome(nome);
    }

    // BUSCAR CLIENTES POR PERÍODO DE CADASTRO

    @GetMapping("/periodo")
    public List<ClienteResponse> buscarPorPeriodo(
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate inicio,

            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate fim
    ) {
        return clienteService.buscarPorPeriodo(inicio, fim);
    }

    // ATUALIZAR CLIENTE

    @PutMapping("/{id}")
    public ClienteResponse atualizar(
            @PathVariable Integer id,
            @Valid @RequestBody ClienteRequest request
    ) {
        return clienteService.atualizar(id, request);
    }
}

