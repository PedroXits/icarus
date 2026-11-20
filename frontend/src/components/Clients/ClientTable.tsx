import { Eye, Pencil, Trash2 } from "lucide-react";
import type { ClientStatusFilter } from "./ClientToolbar";

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
    {
        id: 2,
        name: "Carla Souza",
        cpf: "123.456.789-02",
        phone: "(11) 94002-0923",
        email: "ricardo@email.com",
        processCount: 2,
        status: "active",
        registeredAt: "04/04/1999",
    },
    {
        id: 3,
        name: "Lucas Ferreira",
        cpf: "123.456.789-03",
        phone: "(11) 94002-0924",
        email: "juliana@email.com",
        processCount: 1,
        status: "inactive",
        registeredAt: "06/06/1996",
    },
    {
        id: 4,
        name: "Luísa Almeida",
        cpf: "123.456.789-04",
        phone: "(11) 94002-0925",
        email: "marcelo@email.com",
        processCount: 4,
        status: "active",
        registeredAt: "08/08/1994",
    },
    {
        id: 5,
        name: "Elouise Brandão",
        cpf: "123.456.789-05",
        phone: "(11) 94002-0926",
        email: "elouise@email.com",
        processCount: 0,
        status: "active",
        registeredAt: "10/10/1992",
    },
    {
        id: 6,
        name: "Robson Alves",
        cpf: "123.456.789-06",
        phone: "(11) 94002-0927",
        email: "robson@email.com",
        processCount: 2,
        status: "inactive",
        registeredAt: "12/12/1990",
    },
];

// propriedades recebidas da página de clientes
interface ClientTableProps {
    searchTerm: string;
    statusFilter: ClientStatusFilter;
}

export default function ClientTable({
    searchTerm,
    statusFilter,
}: ClientTableProps) {

    // padroniza a pesquisa, removendo espaços extras, maiúsculas e acentos.
    const normalizedSearch = searchTerm
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    // permite pesquisar CPF e telefone mesmo sem pontuação.
    const searchNumbers = searchTerm.replace(/\D/g, "");

    // filtra os clientes pela pesquisa e pela situação.
    const filteredClients = mockClients.filter((client) => {
        
        const normalizedName = client.name
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        const matchesNameOrEmail =
            normalizedName.includes(normalizedSearch) ||
            client.email.toLowerCase().includes(normalizedSearch);

        const matchesCpfOrPhone =
            searchNumbers.length > 0 &&
            (
                client.cpf.replace(/\D/g, "").includes(searchNumbers) ||
                client.phone.replace(/\D/g, "").includes(searchNumbers)
            );

        // verifica se o cliente corresponde ao texto pesquisado.
        const matchesSearch =
            normalizedSearch.length === 0 ||
            matchesNameOrEmail ||
            matchesCpfOrPhone;

        // verifica se o cliente corresponde ao filtro de situação selecionado.
        const matchesStatus =
            statusFilter === "all" ||
            client.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    return (
        <section className="client-table-card">

            {/* título e quantidade de registros */}
            <div className="client-table-header">
                <h2>Lista de clientes</h2>

                <span>
                    {filteredClients.length}{" "}
                    {filteredClients.length === 1 ? "registro" : "registros"}
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
                        {/* percorre os clientes filtrados e cria uma linha para cada um */}
                        {filteredClients.length > 0 ? (
                            filteredClients.map((client) => (
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
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="client-empty-state">
                                    Nenhum cliente encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>

        </section>
    );
}