import { CircleDollarSign, CreditCard, Wallet, FileText } from "lucide-react";

import "./SummaryCards.css";

// mock indicadores do financeiro
const summaryItems = [
    {
        title: "Receitas no mês",
        value: "R$ 24.500,00",
        icon: CircleDollarSign,
    },
    {
        title: "Despesas no mês",
        value: "R$ 6.750,00",
        icon: CreditCard,
    },
    {
        title: "Saldo do mês",
        value: "R$ 17.750,00",
        icon: Wallet,
    },
    {
        title: "Total de lançamentos",
        value: "42",
        icon: FileText,
    }
];

export default function SummaryCards() {
    return (
        <section className="financial-summary-cards">

            {/* percorre os indicadores e cria um cartão para cada um */}
            {summaryItems.map((item) => {
                const Icon = item.icon;

                return (
                    <div className="financial-summary-card" key={item.title}>

                        {/* ícone e título do indicador */}
                        <div className="financial-summary-card-header">
                            <Icon
                                className="financial-summary-card-icon"
                                size={37}
                                strokeWidth={1.8}
                            />

                            <span className="financial-summary-card-title">
                                {item.title}
                            </span>
                        </div>

                        {/* valor do indicador */}
                        <strong className="financial-summary-card-value">
                            {item.value}
                        </strong>

                        {/* ícone decorativo de fundo */}
                        <Icon
                            className="financial-summary-card-decoration"
                            size={75}
                            strokeWidth={2}
                            aria-hidden="true"
                        />
                    </div>
                );

            })}
            
        </section>
    );
}