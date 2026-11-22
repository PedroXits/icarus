import { useState } from "react";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import SummaryCards from "../../components/Clients/SummaryCards";
import ClientToolbar, { type ClientStatusFilter, } from "../../components/Clients/ClientToolbar";
import ClientTable from "../../components/Clients/ClientTable";

import "./Clients.css";

export default function Clients() {

    const [searchTerm, setSearchTerm] = useState("");

    const [statusFilter, setStatusFilter] =
        useState<ClientStatusFilter>("all");

    const [isNewClientModalOpen, setIsNewClientModalOpen] = useState(false);

    return (
        <div className="clients-layout">

            <Sidebar />

            {/* área principal */}
            <main className="clients-main">

                <Header
                    title="Clientes"
                    subtitle="Gerencie os clientes do escritório."
                    userName="Larissa Mendes"
                    userRole="Advogada"
                />

                <section className="clients-content">

                    {/* cards de resumo dos clientes */}
                    <SummaryCards />

                    {/* pesquisa, filtro e cadastro de clientes */}
                    <ClientToolbar
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        statusFilter={statusFilter}
                        onStatusFilterChange={setStatusFilter}
                        onNewClientClick={() => setIsNewClientModalOpen(true)}
                    />

                    {/* tabela de clientes */}
                    <ClientTable 
                        searchTerm={searchTerm}
                        statusFilter={statusFilter}
                        isNewClientModalOpen={isNewClientModalOpen}
                        onCloseNewClientModal={() => setIsNewClientModalOpen(false)}
                    />
                </section>
            </main>

        </div>
    );
}