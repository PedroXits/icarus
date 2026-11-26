package br.com.icarus.icarus.service;

import br.com.icarus.icarus.dto.request.ClienteRequest;
import br.com.icarus.icarus.dto.response.ClienteResponse;
import br.com.icarus.icarus.entity.Cliente;
import br.com.icarus.icarus.repository.ClienteRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    // Cadastrar cliente

    @Transactional
    public ClienteResponse cadastrar(ClienteRequest request) {

        String cpf = normalizarCpf(request.cpf());

        if(cpf != null && clienteRepository.existsByCpf(cpf)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "CPF já cadastrado"
            );
        }

        Cliente cliente = new Cliente();

        cliente.setNomeCompleto(request.nomeCompleto());
        cliente.setCpf(cpf);
        cliente.setTelefone(request.telefone());
        cliente.setEmail(request.email());
        cliente.setObservacoes(request.observacoes());

        Cliente clienteSalvo = clienteRepository.save(cliente);

        return converterParaResponse(clienteSalvo);
    }

    // Buscar por ID

    @Transactional(readOnly = true)
    public ClienteResponse buscarPorId(Integer id) {

        Cliente cliente = buscarEntidadePorId(id);

        return converterParaResponse(cliente);
    }

    // Buscar por CPF

    @Transactional(readOnly = true)
    public ClienteResponse buscarPorCpf(String cpf) {

        String cpfNormalizado = normalizarCpf(cpf);

        if (cpfNormalizado == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Informe um CPF"
            );
        }

        Cliente cliente = clienteRepository.findByCpf(cpfNormalizado)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Cliente não encontrado"
                ));

        return converterParaResponse(cliente);
    }

    // Buscar por nome

    @Transactional(readOnly = true)
    public List<ClienteResponse> buscarPorNome(String nome) {

        if (nome == null || nome.isBlank()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Informe um nome para pesquisa"
            );
        }

        return clienteRepository
                .findByNomeCompletoContainingIgnoreCase(nome.trim())
                .stream()
                .map(this::converterParaResponse)
                .toList();
    }

    // Buscar por período

    @Transactional(readOnly = true)
    public List<ClienteResponse> buscarPorPeriodo(
            LocalDate dataInicio,
            LocalDate dataFim
    ) {

        if (dataInicio == null || dataFim == null ||
                dataInicio.isAfter(dataFim)) {

            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Período informado é inválido"
            );
        }

        ZoneId zona = ZoneId.of("America/Sao_Paulo");

        Instant inicio = dataInicio
                .atStartOfDay(zona)
                .toInstant();

        Instant fim = dataFim
                .plusDays(1)
                .atStartOfDay(zona)
                .toInstant();

        return clienteRepository
                .findByCriadoEmGreaterThanEqualAndCriadoEmLessThan(
                        inicio, fim
                )
                .stream()
                .map(this::converterParaResponse)
                .toList();
    }

    // Listar todos

    @Transactional(readOnly = true)
    public List<ClienteResponse> listarTodos() {

        return clienteRepository.findAll()
                .stream()
                .map(this::converterParaResponse)
                .toList();
    }

    // Atualizar

    @Transactional
    public ClienteResponse atualizar(
            Integer id,
            ClienteRequest request
    ) {

        Cliente cliente = buscarEntidadePorId(id);

        String cpf = normalizarCpf(request.cpf());

        if (cpf != null &&
                !cpf.equals(cliente.getCpf()) &&
                clienteRepository.existsByCpf(cpf)) {

            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "CPF já cadastrado"
            );
        }

        cliente.setNomeCompleto(request.nomeCompleto());
        cliente.setCpf(cpf);
        cliente.setTelefone(request.telefone());
        cliente.setEmail(request.email());
        cliente.setObservacoes(request.observacoes());

        Cliente clienteAtualizado = clienteRepository.save(cliente);

        return converterParaResponse(clienteAtualizado);
    }

    private Cliente buscarEntidadePorId(Integer id) {

        return clienteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Cliente não encontrado"
                ));
    }

    private String normalizarCpf(String cpf) {

        if (cpf == null || cpf.isBlank()) {
            return null;
        }

        return cpf.trim();
    }

    private ClienteResponse converterParaResponse(Cliente cliente) {

        return new ClienteResponse(
                cliente.getId(),
                cliente.getNomeCompleto(),
                cliente.getCpf(),
                cliente.getTelefone(),
                cliente.getEmail(),
                cliente.getObservacoes(),
                cliente.getCriadoEm(),
                cliente.getAtualizadoEm()
        );
    }

}
