package br.com.icarus.icarus.dto.response;

import java.time.Instant;

public record ClienteResponse(

        Integer id,
        String nomeCompleto,
        String cpf,
        String telefone,
        String email,
        String observacoes,
        Instant criadoEm,
        Instant atualizadoEm
) {}

