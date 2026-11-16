import { ChartNoAxesColumn, TrendingUp, TrendingDown, Equal, ChevronDown } from "lucide-react";

import "./FinancialSummary.css";

// mock valores financeiros do resumo
const financialItems = [
    {
        title: "Receitas",
        value: "R$ 30.500,00",
        icon: TrendingUp,
        color: "income",
    },
    {
        title: "Despesas",
        value: "R$ 4.200,00",
        icon: TrendingDown,
        color: "expense",
    },
    {
        title: "Saldo",
        value: "R$ 10.400,00",
        icon: Equal,
        color: "balance",
    },
];

export default function FinancialSummary() {
    return (
        <section className="financial-summary-card">

            {/* cabeçalho do painel */}
            <div className="financial-summary-header">

                <h2>
                    <ChartNoAxesColumn size={25} strokeWidth={1.8} />
                    Resumo financeiro
                </h2>

                <span className="financial-period">
                    Este mês
                    <ChevronDown size={17} />
                </span>
            </div>

            {/* indicadores financeiros */}
            <div className="financial-summary-content">

                {financialItems.map((item) => {
                    const Icon = item.icon;
                    
                    return (
                        <div className="financial-item" key={item.title}
                        >
                            {/* ícone e nome */}
                            <div className="financial-item-title">
                                <Icon
                                    size={20}
                                    strokeWidth={2.5}
                                    className={item.color}
                                />

                                <span>{item.title}</span>
                            </div>

                            {/* valor financeiro */}
                            <strong className="financial-item-value">
                                {item.value}
                            </strong>

                        </div>
                    );

                })}

            </div>
        </section>
    );
}