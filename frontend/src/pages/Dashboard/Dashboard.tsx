import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";

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

            </main>
        </div>
    );
}