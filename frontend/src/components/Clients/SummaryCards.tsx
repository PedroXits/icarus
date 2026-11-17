import { Users, UserPlus, UserCheck, UserX } from "lucide-react";

import "./SummaryCards.css";

// mock indicadores da tela clientes
const summaryItems = [
    {
        title: "Total de clientes",
        value: "133",
        icon: Users,
    },
    {
        title: "Novos no mês",
        value: "6",
        icon: UserPlus,
    },
    {
        title: "Clientes ativos",
        value: "125",
        icon: UserCheck,
    },
    {
        title: "Clientes inativos",
        value: "8",
        icon: UserX,
    }
];

export default function SummaryCards() {
    return (
        <section className="client-summary-cards">

            {/* percorre os indicadores e cria um cartão para cada um */}
            {summaryItems.map((item) => {
                const Icon = item.icon;
                
                return (
                    <div className="client-summary-card" key={item.title}>

                        {/* ícone e nome do indicador */}
                        <div className="client-summary-card-header">
                            <Icon
                                className="client-summary-card-icon"
                                size={37}
                                strokeWidth={1.8}
                            />

                            <span className="client-summary-card-title">
                                {item.title}
                            </span>
                        </div>

                        {/* valor do indicador */}
                        <strong className="client-summary-card-value">
                            {item.value}
                        </strong>

                        {/* ícone decorativo de fundo */}
                        <Icon
                            className="client-summary-card-decoration"
                            size={75}
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                    </div>
                );
            })}
        </section>
    );
};