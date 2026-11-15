import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import SummaryCards from "../../components/Dashboard/SummaryCards";
import CasesChart from "../../components/Dashboard/CasesChart";

import "./Dashboard.css";

export default function Dashboard() {
    return (
        <div className="dashboard-layout">

            {/* menu lateral */}
            <Sidebar />

            {/* área principal */}
            <main className="dashboard-main">

                {/* cabeçalho */}
                <Header
                    title="Dashboard"
                    subtitle="Bem-vinda, Dra. Larissa!"
                    userName="Larissa Mendes"
                    userRole="Advogada"
                />

                <section className="dashboard-content">
                    {/* cards indicadores */}
                    <SummaryCards />

                    {/* gráfico de casos por status */}
                    <CasesChart />
                </section>

            </main>
        </div>
    );
}