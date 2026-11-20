import { useEffect } from "react";
import { X, Trash2, AlertTriangle } from "lucide-react";

import type { Client } from "./Client";

import "./DeleteModal.css";

interface DeleteModalProps {
    client: Client;
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteModal({
    client,
    onClose,
    onConfirm,
}: DeleteModalProps) {

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
            className="client-delete-overlay"
            onClick={onClose}
        >
            <section
                className="client-delete-modal"
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="client-delete-title"
                aria-describedby="client-delete-description"
                onClick={(event) => event.stopPropagation()}
            >

                {/* cabeçalho do modal */}
                <div className="client-delete-header">
                    <span>EXCLUSÃO DE CADASTRO</span>

                    <button
                        type="button"
                        className="client-delete-close"
                        onClick={onClose}
                        aria-label="Fechar confirmação de exclusão"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* ícone e mensagem de confirmação */}
                <div className="client-delete-content">

                    <div className="client-delete-icon">
                        <AlertTriangle size={27} />
                    </div>

                    <h2 id="client-delete-title">
                        Excluir cliente?
                    </h2>

                    <p id="client-delete-description">
                        Tem certeza de que deseja excluir este cliente?
                        O cadastro será removido da lista do escritório.
                    </p>

                </div>

                {/* identificação do cliente */}
                <div className="client-delete-profile">
                    <div className="client-delete-avatar">
                        {client.name
                            .split(" ")
                            .filter(Boolean)
                            .slice(0, 2)
                            .map((part) => part[0])
                            .join("")
                            .toUpperCase()}
                    </div>

                    <div>
                        <strong>{client.name}</strong>
                        <span>CPF: {client.cpf}</span>
                    </div>
                </div>

                {/* botões */}
                <div className="client-delete-footer">

                    <button
                        type="button"
                        className="client-delete-cancel"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>

                    <button
                        type="button"
                        className="client-delete-confirm"
                        onClick={onConfirm}
                    >
                        <Trash2 size={16} />
                        Excluir cliente
                    </button>

                </div>

            </section>
        </div>
    );
}