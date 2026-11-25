import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

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

                </section>
            </main>

        </div>
    );
}