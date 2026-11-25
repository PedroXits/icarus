import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import SummaryCards from "../../components/Financial/SummaryCards";

import "./Financial.css";

export default function Financial() {

    return (
        <div className="financial-layout">

            <Sidebar />

            {/* área principal */}
            <main className="financial-main">

                <Header
                    title="Financeiro"
                    subtitle="Controle suas receitas, despesas e saldo do escritório."
                    userName="Larissa Mendes"
                    userRole="Advogada"
                />

                <section className="financial-content">

                    {/* cards de resumo financeiro */}
                    <SummaryCards />

                </section>
            </main>

        </div>
    );
}