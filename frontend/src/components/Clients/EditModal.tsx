import { useEffect, useState, type SubmitEvent } from "react";
import { X, Phone, Mail, CalendarDays, BriefcaseBusiness } from "lucide-react";

import type { Client } from "./Client";

import "./EditModal.css";

interface EditModalProps {
    client: Client;
    onClose: () => void;
    onSave: (updatedClient: Client) => void;
}

// gera as iniciais do cliente para o avatar
function getInitials(name: string) {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
}

export default function EditModal({
    client,
    onClose,
    onSave,
}: EditModalProps) {

    // guarda os dados que estão sendo editados
    const [formData, setFormData] = useState<Client>(client);

    // atualiza os dados do formulário quando outro cliente for selecionado
    useEffect(() => {
        setFormData(client);
    }, [client]);

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

    // atualiza os campos do formulário
    function handleChange(
        field: "name" | "cpf" | "phone" | "email" | "observations",
        value: string
    ) {
        setFormData((current) => ({
            ...current,
            [field]: value,
        }));
    }

    // salva as alterações do cliente
    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        onSave(formData);
    }

    return (
        <div
            className="client-edit-overlay"
            onClick={onClose}
        >
            <section
                className="client-edit-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="client-edit-title"
                onClick={(event) => event.stopPropagation()}
            >

                {/* cabeçalho do modal */}
                <div className="client-edit-header">
                    <div>
                        <span>CADASTRO DE CLIENTE</span>

                        <h2 id="client-edit-title">
                            Editar cliente
                        </h2>
                    </div>

                    <button
                        type="button"
                        className="client-edit-close"
                        onClick={onClose}
                        aria-label="Fechar edição"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* identificação do cliente */}
                <div className="client-edit-profile">
                    <div className="client-edit-avatar">
                        {getInitials(formData.name)}
                    </div>

                    <div>
                        <strong>{formData.name || "Nome do cliente"}</strong>
                        <span>CPF: {formData.cpf || "Não informado"}</span>
                    </div>
                </div>

                {/* formulário de edição */}
                <form onSubmit={handleSubmit}>

                    {/* dados pessoais e contato */}
                    <div className="client-edit-section">
                        <h3>Dados do cliente</h3>

                        <div className="client-edit-grid">

                            <div className="client-edit-field">
                                <label htmlFor="client-edit-name">
                                    Nome completo
                                </label>

                                <input
                                    id="client-edit-name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(event) =>
                                        handleChange("name", event.target.value)
                                    }
                                    placeholder="Digite o nome completo"
                                    required
                                />
                            </div>

                            <div className="client-edit-field">
                                <label htmlFor="client-edit-cpf">
                                    CPF
                                </label>

                                <input
                                    id="client-edit-cpf"
                                    type="text"
                                    value={formData.cpf}
                                    onChange={(event) =>
                                        handleChange("cpf", event.target.value)
                                    }
                                    placeholder="000.000.000-00"
                                    required
                                />
                            </div>

                            <div className="client-edit-field">
                                <label htmlFor="client-edit-phone">
                                    Telefone
                                </label>

                                <div className="client-edit-input-icon">
                                    <Phone size={17} />

                                    <input
                                        id="client-edit-phone"
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

                            <div className="client-edit-field">
                                <label htmlFor="client-edit-email">
                                    E-mail
                                </label>

                                <div className="client-edit-input-icon">
                                    <Mail size={17} />

                                    <input
                                        id="client-edit-email"
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
                    <div className="client-edit-section">
                        <h3>Situação do cliente</h3>

                        <div className="client-edit-status-options">

                            <label
                                className={formData.status === "active" ? "selected" : ""}
                            >
                                <input
                                    type="radio"
                                    name="client-status"
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
                                    name="client-status"
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
                    <div className="client-edit-section">
                        <h3>Observações</h3>

                        <div className="client-edit-field">
                            <label htmlFor="client-edit-observations">
                                Informações adicionais
                            </label>

                            <textarea
                                id="client-edit-observations"
                                value={formData.observations}
                                onChange={(event) =>
                                    handleChange("observations", event.target.value)
                                }
                                placeholder="Digite observações sobre o cliente..."
                                rows={3}
                            />
                        </div>
                    </div>

                    {/* informações que não podem ser editadas */}
                    <div className="client-edit-section">
                        <h3>Informações do cadastro</h3>

                        <div className="client-edit-readonly-grid">

                            <div>
                                <CalendarDays size={17} />

                                <span>
                                    Cadastro: <strong>{formData.registeredAt}</strong>
                                </span>
                            </div>

                            <div>
                                <BriefcaseBusiness size={17} />

                                <span>
                                    Processos: <strong>{formData.processCount}</strong>
                                </span>
                            </div>

                        </div>
                    </div>

                    {/* botões */}
                    <div className="client-edit-footer">
                        <button
                            type="button"
                            className="client-edit-cancel"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="client-edit-save"
                        >
                            Salvar alterações
                        </button>
                    </div>

                </form>

            </section>
        </div>
    );
}