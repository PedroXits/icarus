package br.com.icarus.icarus.repository;

import br.com.icarus.icarus.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface ClienteRepository extends JpaRepository<Cliente, Integer> {

    Optional<Cliente> findByCpf(String cpf);

    boolean existsByCpf(String cpf);

    List<Cliente> findByNomeCompletoContainingIgnoreCase(String nome);

    List<Cliente> findByCriadoEmGreaterThanEqualAndCriadoEmLessThan(
            Instant inicio,
            Instant fim
    );
}
