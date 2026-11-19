import { Eye, Pencil, Trash2 } from "lucide-react";

import "./ClientTable.css";

// estrutura dos dados de um cliente
interface Client {
    id: number;
    name: string;
    cpf: string;
    phone: string;
    email: string;
    processCount: number;
    status: "active" | "inactive";
    registeredAt: string;
}

// mock dos clientes
const mockClients: Client[] = [
    {
        id: 1,
        name: "João Santos",
        cpf: "123.456.789-01",
        phone: "(11) 94002-0922",
        email: "joao@email.com",
        processCount: 3,
        status: "active",
        registeredAt: "02/02/1998",
    },
];

export default function ClientTable() {
    return (
        <section className="client-table-card">

            {/* título e quantidade de registros */}
            <div className="client-table-header">
                <h2>Lista de clientes</h2>

                <span>
                    {mockClients.length}{" "}
                    {mockClients.length === 1 ? "registro" : "registros"}
                </span>
            </div>

            {/* tabela de clientes */}
            <div className="client-table-wrapper">
                <table className="client-table">

                    <thead>
                        <tr>
                            <th>Cliente</th>
                            <th>Contato</th>
                            <th>Processos</th>
                            <th>Situação</th>
                            <th>Cadastro</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* percorre os clientes e cria uma linha para cada um */}
                        {mockClients.map((client) => (
                            <tr key={client.id}>

                                {/* nome e CPF */}
                                <td>
                                    <div className="client-name-cell">
                                        <strong>{client.name}</strong>
                                        <span>{client.cpf}</span>
                                    </div>
                                </td>

                                {/* telefone e e-mail */}
                                <td>
                                    <div className="client-contact-cell">
                                        <span>{client.phone}</span>
                                        <span>{client.email}</span>
                                    </div>
                                </td>

                                {/* quantidade de processos */}
                                <td>
                                    {client.processCount}{" "}
                                    {client.processCount === 1
                                        ? "processo"
                                        : "processos"}
                                </td>

                                {/* situação do cliente */}
                                <td>
                                    <span className={`client-status-badge ${client.status}`}>
                                        {client.status === "active"
                                            ? "Ativo"
                                            : "Inativo"}
                                    </span>
                                </td>

                                {/* data de cadastro */}
                                <td>{client.registeredAt}</td>

                                {/* ações */}
                                <td>
                                    <div className="client-actions">
                                        <button
                                            type="button"
                                            title="Visualizar cliente"
                                        >
                                            <Eye size={17} />
                                        </button>

                                        <button
                                            type="button"
                                            title="Editar cliente"
                                        >
                                            <Pencil size={17} />
                                        </button>

                                        <button
                                            type="button"
                                            title="Excluir cliente"
                                        >
                                            <Trash2 size={17} />
                                        </button>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>

        </section>
    );
}