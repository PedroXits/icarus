import { useEffect } from "react";
import { X, Phone, Mail, CalendarDays, Clock3, ClipboardList } from "lucide-react";

import type { Client } from "./Client";

import "./ClientDetailsModal.css";

interface ClientDetailsModalProps {
    client: Client;
    onClose: () => void;
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

export default function ClientDetailsModal({
    client,
    onClose,
}: ClientDetailsModalProps) {

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

    return (
        <div
            className="client-modal-overlay"
            onClick={onClose}
        >
            <section
                className="client-details-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="client-details-title"
                onClick={(event) => event.stopPropagation()}
            >

                {/* cabeçalho do modal */}
                <div className="client-details-header">
                    <div>
                        <span>FICHA DO CLIENTE</span>
                        <h2 id="client-details-title">
                            Informações do cliente
                        </h2>
                    </div>

                    <button
                        type="button"
                        className="client-modal-close"
                        onClick={onClose}
                        aria-label="Fechar detalhes do cliente"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* identificação do cliente */}
                <div className="client-details-profile">

                    <div className="client-details-avatar">
                        {getInitials(client.name)}
                    </div>

                    <div className="client-details-name">
                        <h3>{client.name}</h3>
                        <span>CPF: {client.cpf}</span>
                    </div>

                    <span className={`client-details-status ${client.status}`}>
                        <span className="client-status-dot" />

                        {client.status === "active" ? "Ativo" : "Inativo"}
                    </span>

                </div>

                {/* informações de contato */}
                <div className="client-details-section">
                    <h3>Informações de contato</h3>

                    <div className="client-details-grid">

                        <div className="client-detail-item">
                            <span>Telefone</span>

                            <div>
                                <Phone size={17} />
                                <strong>{client.phone}</strong>
                            </div>
                        </div>

                        <div className="client-detail-item">
                            <span>E-mail</span>

                            <div>
                                <Mail size={17} />
                                <strong>{client.email}</strong>
                            </div>
                        </div>

                    </div>
                </div>

                {/* observações do cliente */}
                <div className="client-details-section">
                    <h3>Observações</h3>

                    <div className="client-observations">
                        <ClipboardList size={19} />

                        <p>
                            {client.observations ||
                                "Nenhuma observação registrada para este cliente."}
                        </p>
                    </div>
                </div>

                {/* histórico do cadastro */}
                <div className="client-details-section">
                    <h3>Histórico do cadastro</h3>

                    <div className="client-details-grid">

                        <div className="client-detail-item">
                            <span>Cadastro realizado em</span>

                            <div>
                                <CalendarDays size={17} />
                                <strong>{client.registeredAt}</strong>
                            </div>
                        </div>

                        <div className="client-detail-item">
                            <span>Última atualização</span>

                            <div>
                                <Clock3 size={17} />
                                <strong>{client.updatedAt}</strong>
                            </div>
                        </div>

                    </div>
                </div>

                {/* rodapé do modal */}
                <div className="client-details-footer">
                    <button
                        type="button"
                        onClick={onClose}
                    >
                        Fechar
                    </button>
                </div>

            </section>
        </div>
    );
}