import { useEffect, useState, type SubmitEvent } from "react";
import { X, Phone, Mail } from "lucide-react";

import type { Client } from "./Client";

import "./NewClientModal.css";

// dados preenchidos no formulário
type NewClientData = Pick<
    Client,
    "name" | "cpf" | "phone" | "email" | "status" | "observations"
>;

interface NewClientModalProps {
    onClose: () => void;
    onSave: (newClient: Omit<Client, "id">) => void;
}

export default function NewClientModal({
    onClose,
    onSave,
}: NewClientModalProps) {

    // guarda os dados preenchidos no form
    const [formData, setFormData] = useState<NewClientData>({
        name: "",
        cpf: "",
        phone: "",
        email: "",
        status: "active",
        observations: "",
    });

    // fecha o modal ao pressionar a tecla Esc
    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        }

        window.addEventListener("keydown", handleEscape);

        return () => {
            window.removeEventListener("keydown", handleEscape);
        };
    }, [onClose]);

    // atualiza os campos do form
    function handleChange(
        field: "name" | "cpf" | "phone" | "email" | "observations",
        value: string
    ) {
        setFormData((current) => ({
            ...current,
            [field]: value,
        }));
    }

    // cadastra o novo cliente
    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        // define automaticamente as datas do cadastro
        const today = new Date().toLocaleDateString("pt-BR");

        onSave({
            ...formData,
            processCount: 0,
            registeredAt: today,
            updatedAt: today,
        });
    }

    return (
        <div
            className="client-create-overlay"
            onClick={onClose}
        >
            <section
                className="client-create-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="client-create-title"
                onClick={(event) => event.stopPropagation()}
            >

                {/* cabeçalho */}
                <div className="client-create-header">
                    <div>
                        <span>NOVO CADASTRO</span>

                        <h2 id="client-create-title">
                            Novo cliente
                        </h2>
                    </div>

                    <button
                        type="button"
                        className="client-create-close"
                        onClick={onClose}
                        aria-label="Fechar cadastro"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* formulário de cadastro */}
                <form onSubmit={handleSubmit}>

                    <div className="client-create-section">
                        <h3>Dados do cliente</h3>

                        <div className="client-create-grid">

                            <div className="client-create-field">
                                <label htmlFor="client-create-name">
                                    Nome completo
                                </label>

                                <input
                                    id="client-create-name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(event) =>
                                        handleChange("name", event.target.value)
                                    }
                                    placeholder="Digite o nome completo"
                                    required
                                />
                            </div>

                            <div className="client-create-field">
                                <label htmlFor="client-create-cpf">
                                    CPF
                                </label>

                                <input
                                    id="client-create-cpf"
                                    type="text"
                                    value={formData.cpf}
                                    onChange={(event) =>
                                        handleChange("cpf", event.target.value)
                                    }
                                    placeholder="000.000.000-00"
                                    required
                                />
                            </div>

                            <div className="client-create-field">
                                <label htmlFor="client-create-phone">
                                    Telefone
                                </label>

                                <div className="client-create-input-icon">
                                    <Phone size={17} />

                                    <input
                                        id="client-create-phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(event) =>
                                            handleChange("phone", event.target.value)
                                        }
                                        placeholder="(00) 00000-0000"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="client-create-field">
                                <label htmlFor="client-create-email">
                                    E-mail
                                </label>

                                <div className="client-create-input-icon">
                                    <Mail size={17} />

                                    <input
                                        id="client-create-email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(event) =>
                                            handleChange("email", event.target.value)
                                        }
                                        placeholder="email@exemplo.com"
                                        required
                                    />
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* situação do cliente (ativo ou inativo) */}
                    <div className="client-create-section">
                        <h3>Situação do cliente</h3>

                        <div className="client-create-status-options">

                            <label
                                className={formData.status === "active" ? "selected" : ""}
                            >
                                <input
                                    type="radio"
                                    name="new-client-status"
                                    value="active"
                                    checked={formData.status === "active"}
                                    onChange={() =>
                                        setFormData((current) => ({
                                            ...current,
                                            status: "active",
                                        }))
                                    }
                                />

                                Ativo
                            </label>

                            <label
                                className={formData.status === "inactive" ? "selected" : ""}
                            >
                                <input
                                    type="radio"
                                    name="new-client-status"
                                    value="inactive"
                                    checked={formData.status === "inactive"}
                                    onChange={() =>
                                        setFormData((current) => ({
                                            ...current,
                                            status: "inactive",
                                        }))
                                    }
                                />

                                Inativo
                            </label>

                        </div>
                    </div>

                    {/* observações do cliente */}
                    <div className="client-create-section">
                        <h3>Observações</h3>

                        <div className="client-create-field">
                            <label htmlFor="client-create-observations">
                                Informações adicionais
                            </label>

                            <textarea
                                id="client-create-observations"
                                value={formData.observations}
                                onChange={(event) =>
                                    handleChange("observations", event.target.value)
                                }
                                placeholder="Digite observações sobre o cliente..."
                                rows={3}
                            />
                        </div>
                    </div>

                    {/* botões */}
                    <div className="client-create-footer">
                        <button
                            type="button"
                            className="client-create-cancel"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="client-create-save"
                        >
                            Cadastrar cliente
                        </button>
                    </div>

                </form>

            </section>
        </div>
    );
}