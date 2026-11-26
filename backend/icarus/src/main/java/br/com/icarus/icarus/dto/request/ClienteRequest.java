
package br.com.icarus.icarus.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ClienteRequest(

        @NotBlank(message = "O nome é obrigatório")
        @Size(max = 150)
        String nomeCompleto,

        @Pattern(
                regexp = "\\d{11}",
                message = "O CPF deve conter 11 dígitos"
        )
        String cpf,

        @Size(max = 20)
        String telefone,

        @Email(message = "E-mail inválido")
        @Size(max = 254)
        String email,

        String observacoes

) {}
