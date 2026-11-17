import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import SummaryCards from "../../components/Clients/SummaryCards";

import "./Clients.css";

export default function Clients() {
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
                </section>
            </main>

        </div>
    );
}