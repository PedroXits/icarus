import { Users, Folder, Scale, CircleDollarSign } from "lucide-react";

import "./SummaryCards.css";

// mock indicadores do dash
const summaryItems = [
    {
        title: "Clientes ativos",
        value: "26",
        icon: Users,
    },
    {
        title: "Casos em andamento",
        value: "14",
        icon: Folder,
    },
    {
        title: "Audiências no mês",
        value: "4",
        icon: Scale,
    },
    {
        title: "Receitas no mês",
        value: "R$ 30.500,00",
        icon: CircleDollarSign,
    },
];

export default function SummaryCards() {
    return (
        <section className="summary-cards">

            {/* percorre os indicadores e cria um cartão para cada um */}
            {summaryItems.map((item) => {
                const Icon = item.icon;

                return (
                    <div className="summary-card" key={item.title}>
                        
                        {/* ícone e nome do indicador */}
                        <div className="summary-card-header">
                            <Icon
                                className="summary-card-icon"
                                size={37}
                                strokeWidth={1.8}
                            />

                            <span className="summary-card-title">
                                {item.title}
                            </span>
                        </div>

                        {/* valor do indicador */}
                        <strong className="summary-card-value">
                            {item.value}
                        </strong>
                    </div>
                );

            })}

        </section>
    );
};