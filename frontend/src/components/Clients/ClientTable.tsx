import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, ChevronLeft, ChevronRight, Phone, Mail } from "lucide-react";

import type { Client } from "./Client";
import type { ClientStatusFilter } from "./ClientToolbar";
import ClientDetailsModal from "./ClientDetailsModal";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import NewClientModal from "./NewClientModal";

import "./ClientTable.css";

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
        observations: "Prefere receber contatos por telefone.",
        updatedAt: "12/02/2026"
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
        observations: "Prefere receber contatos via E-mail.",
        updatedAt: "16/04/2026"
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
        observations: "Prefere receber contatos por mensagem.",
        updatedAt: "18/06/2026"
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
        observations: "Prefere receber contatos por telefone.",
        updatedAt: "20/08/2026"
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
        observations: "Prefere receber contatos via E-mail.",
        updatedAt: "24/10/2026"
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
        observations: "Prefere receber contatos por mensagem.",
        updatedAt: "26/12/2026"
    },
];

// propriedades recebidas da página de clientes
interface ClientTableProps {
    searchTerm: string;
    statusFilter: ClientStatusFilter;
    isNewClientModalOpen: boolean;
    onCloseNewClientModal: () => void;
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
    isNewClientModalOpen,
    onCloseNewClientModal,
}: ClientTableProps) {

    const [currentPage, setCurrentPage] = useState(1);

    // guarda o cliente selecionado para visualizar seus detalhes
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);

    const [clients, setClients] = useState<Client[]>(mockClients);

    // guarda o cliente selecionado para edição
    const [editingClient, setEditingClient] = useState<Client | null>(null);

    // guarda o cliente selecionado para exclusão
    const [deletingClient, setDeletingClient] = useState<Client | null>(null);

    // padroniza a pesquisa, removendo espaços extras, maiúsculas e acentos.
    const normalizedSearch = searchTerm
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

    // pesquisar CPF e telefone mesmo sem pontuação.
    const searchNumbers = searchTerm.replace(/\D/g, "");

    // filtra os clientes pela pesquisa e pela situação.
    const filteredClients = clients.filter((client) => {

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

    // cadastra um novo cliente na lista
    function handleCreateClient(newClient: Omit<Client, "id">) {

        // gera um ID para o novo cliente
        setClients((currentClients) => {
            const nextId = currentClients.reduce(
                (highestId, client) => Math.max(highestId, client.id),
                0
            ) + 1;

            return [
                {
                    ...newClient,
                    id: nextId,
                },
                ...currentClients,
            ];
        });

        onCloseNewClientModal();
        setCurrentPage(1);
    }

    // salva as alterações realizadas no cadastro do cliente
    function handleSaveClient(updatedClient: Client) {

        // atualiza a data da última alteração
        const clientUpdated = {
            ...updatedClient,
            updatedAt: new Date().toLocaleDateString("pt-BR"),
        };

        // atualiza os dados do cliente na lista
        setClients((currentClients) =>
            currentClients.map((client) =>
                client.id === clientUpdated.id ? clientUpdated : client
            )
        );

        setEditingClient(null);
        setCurrentPage(1);
    }

    // exclui o cliente selecionado da lista
    function handleDeleteClient() {
        if (!deletingClient) return;

        setClients((currentClients) =>
            currentClients.filter((client) => client.id !== deletingClient.id)
        );

        setDeletingClient(null);
        setCurrentPage(1);
    }

    return (
        <>
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
                                                    onClick={() => setSelectedClient(client)}
                                                >
                                                    <Eye size={19} />
                                                </button>

                                                <button
                                                    type="button"
                                                    title="Editar cliente"
                                                    aria-label={`Editar ${client.name}`}
                                                    onClick={() => setEditingClient(client)}
                                                >
                                                    <Pencil size={19} />
                                                </button>

                                                <button
                                                    type="button"
                                                    title="Excluir cliente"
                                                    aria-label={`Excluir ${client.name}`}
                                                    onClick={() => setDeletingClient(client)}
                                                >
                                                    <Trash2 size={19} />
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

            {/* modal para cadastrar um novo cliente */}
            {isNewClientModalOpen && (
                <NewClientModal
                    onClose={onCloseNewClientModal}
                    onSave={handleCreateClient}
                />
            )}

            {/* modal com os detalhes do cliente */}
            {selectedClient && (
                <ClientDetailsModal
                    client={selectedClient}
                    onClose={() => setSelectedClient(null)}
                />
            )}

            {/* modal para editar os dados do cliente */}
            {editingClient && (
                <EditModal
                    client={editingClient}
                    onClose={() => setEditingClient(null)}
                    onSave={handleSaveClient}
                />
            )}

            {/* modal para confirmar a exclusão do cliente */}
            {deletingClient && (
                <DeleteModal
                    client={deletingClient}
                    onClose={() => setDeletingClient(null)}
                    onConfirm={handleDeleteClient}
                />
            )}
            
        </>
    );
}