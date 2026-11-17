import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

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
                    userName="Fernanda Mendes"
                    userRole="Advogada"
                />

                <section className="clients-content">


                </section>
            </main>

        </div>
    );
}