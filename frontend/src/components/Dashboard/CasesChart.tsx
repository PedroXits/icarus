import { ChartPie } from "lucide-react";

import "./CasesChart.css";

// mock dados dos casos por status
const caseStatuses = [
    {
        title: "Em andamento",
        percentage: 50,
        color: "in-progress",
    },
    {
        title: "Aguardando ação",
        percentage: 30,
        color: "waiting",
    },
    {
        title: "Concluídos",
        percentage: 20,
        color: "completed",
    },
];

export default function CasesChart() {
    return (
        <section className="cases-chart-card">

            {/* título do painel */}
            <h2 className="cases-chart-title">
                <ChartPie size={24} strokeWidth={1.8} />
                Casos por status
            </h2>

            <div className="cases-chart-content">

                {/* gráfico circular */}
                <div
                    className="cases-chart-donut"
                    role="img"
                    aria-label="16 casos: 50% em andamento, 30% aguardando ação e 20% concluídos"
                >
                    {/* informações exibidas no centro do gráfico */}
                    <div className="cases-chart-center">
                        <strong>16</strong>
                        <span>Casos</span>
                    </div>
                </div>

                {/* legenda do gráfico */}
                <ul className="cases-chart-legend">
                    {caseStatuses.map((status) => (
                        <li key={status.title}>

                            <span
                                className={`cases-chart-dot ${status.color}`}
                            ></span>

                            <span className="cases-chart-label">
                                {status.title} ({status.percentage}%)
                            </span>

                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}