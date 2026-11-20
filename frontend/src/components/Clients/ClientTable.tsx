import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, ChevronLeft, ChevronRight, Phone, Mail } from "lucide-react";
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

// quantidade de clientes exibidos por página
const ITEMS_PER_PAGE = 5;

// gera iniciais do cliente
function getInitials(name: string) {
    return name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join("")
        .toUpperCase();
}

export default function ClientTable({
    searchTerm,
    statusFilter,
}: ClientTableProps) {

    const [currentPage, setCurrentPage] = useState(1);

    // padroniza a pesquisa, removendo espaços extras, maiúsculas e acentos.
    const normalizedSearch = searchTerm
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    // pesquisar CPF e telefone mesmo sem pontuação.
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

    // volta para a primeira página quando a pesquisa ou o filtro mudam.
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, statusFilter]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredClients.length / ITEMS_PER_PAGE)
    );

    const firstIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    const currentClients = filteredClients.slice(
        firstIndex,
        firstIndex + ITEMS_PER_PAGE
    );

    const firstItem = filteredClients.length === 0 ? 0 : firstIndex + 1;

    const lastItem = Math.min(
        currentPage * ITEMS_PER_PAGE,
        filteredClients.length
    );

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
                        {currentClients.length > 0 ? (
                            currentClients.map((client) => (
                                <tr key={client.id}>

                                    {/* iniciais, nome e CPF */}
                                    <td>
                                        <div className="client-name-cell">
                                            <div className="client-avatar">
                                                {getInitials(client.name)}
                                            </div>

                                            <div className="client-name-info">
                                                <strong>{client.name}</strong>
                                                <span>{client.cpf}</span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* telefone e e-mail */}
                                    <td>
                                        <div className="client-contact-cell">
                                            <div>
                                                <Phone size={15} />
                                                <span>{client.phone}</span>
                                            </div>

                                            <div>
                                                <Mail size={15} />
                                                <span>{client.email}</span>
                                            </div>
                                        </div>
                                    </td>

                                    {/* quantidade de processos */}
                                    <td>
                                        <span className="client-process-count">
                                            {client.processCount}{" "}
                                            {client.processCount === 1
                                                ? "processo"
                                                : "processos"}
                                        </span>
                                    </td>

                                    {/* situação do cliente */}
                                    <td>
                                        <span
                                            className={`client-status-badge ${client.status}`}
                                        >
                                            <span className="client-status-dot" />

                                            {client.status === "active"
                                                ? "Ativo"
                                                : "Inativo"}
                                        </span>
                                    </td>

                                    {/* data de cadastro */}
                                    <td>
                                        <span className="client-register-date">
                                            {client.registeredAt}
                                        </span>
                                    </td>

                                    {/* ações */}
                                    <td>
                                        <div className="client-actions">
                                            <button
                                                type="button"
                                                title="Visualizar cliente"
                                                aria-label={`Visualizar ${client.name}`}
                                            >
                                                <Eye size={18} />
                                            </button>

                                            <button
                                                type="button"
                                                title="Editar cliente"
                                                aria-label={`Editar ${client.name}`}
                                            >
                                                <Pencil size={18} />
                                            </button>

                                            <button
                                                type="button"
                                                title="Excluir cliente"
                                                aria-label={`Excluir ${client.name}`}
                                            >
                                                <Trash2 size={18} />
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

            {/* rodapé e paginação */}
            <div className="client-table-footer">

                <span className="client-table-showing">
                    Mostrando {firstItem}–{lastItem} de{" "}
                    {filteredClients.length} clientes
                </span>

                {filteredClients.length > 0 && (
                    <div className="client-pagination">

                        <button
                            type="button"
                            className="client-page-arrow"
                            onClick={() =>
                                setCurrentPage((page) => Math.max(1, page - 1))
                            }
                            disabled={currentPage === 1}
                            aria-label="Página anterior"
                        >
                            <ChevronLeft size={17} />
                        </button>

                        {/* números das páginas */}
                        {Array.from(
                            { length: totalPages },
                            (_, index) => index + 1
                        ).map((page) => (
                            <button
                                key={page}
                                type="button"
                                className={`client-page-number ${
                                    currentPage === page ? "active" : ""
                                }`}
                                onClick={() => setCurrentPage(page)}
                                aria-current={
                                    currentPage === page ? "page" : undefined
                                }
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            type="button"
                            className="client-page-arrow"
                            onClick={() =>
                                setCurrentPage((page) =>
                                    Math.min(totalPages, page + 1)
                                )
                            }
                            disabled={currentPage === totalPages}
                            aria-label="Próxima página"
                        >
                            <ChevronRight size={17} />
                        </button>

                    </div>
                )}
            </div>

        </section>
    );
}