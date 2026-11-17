import { useState } from "react";
import { ChartNoAxesColumn, TrendingUp, TrendingDown, Equal, ChevronDown, Check } from "lucide-react";

import "./FinancialSummary.css";

// mock valores financeiros para cada período
const financialPeriods = {
    currentMonth: {
        label: "Este mês",
        revenue: "R$ 30.500,00",
        expenses: "R$ 4.200,00",
        balance: "R$ 26.300,00"
    },
    previousMonth: {
        label: "Mês anterior",
        revenue: "R$ 21.800,00",
        expenses: "R$ 8.200,00",
        balance: "R$ 13.600,00",
    },
    lastThreeMonths: {
        label: "Últimos 3 meses",
        revenue: "R$ 68.400,00",
        expenses: "R$ 22.150,00",
        balance: "R$ 46.250,00",
    },
    currentYear: {
        label: "Este ano",
        revenue: "R$ 185.000,00",
        expenses: "R$ 65.000,00",
        balance: "R$ 120.000,00",
    }
};

// opções disponíveis no filtro
type PeriodKey = keyof typeof financialPeriods;

const periodOptions: { value: PeriodKey; label: string }[] = [
    { value: "currentMonth", label: "Este mês" },
    { value: "previousMonth", label: "Mês anterior" },
    { value: "lastThreeMonths", label: "Últimos 3 meses" },
    { value: "currentYear", label: "Este ano" }
];

export default function FinancialSummary() {

    const [selectedPeriod, setSelectedPeriod] =
        useState<PeriodKey>("currentMonth");

    const [isPeriodOpen, setIsPeriodOpen] = useState(false);

    const currentData = financialPeriods[selectedPeriod];

    const financialItems = [
        {
            title: "Receitas",
            value: currentData.revenue,
            icon: TrendingUp,
            color: "income",
        },
        {
            title: "Despesas",
            value: currentData.expenses,
            icon: TrendingDown,
            color: "expense",
        },
        {
            title: "Saldo",
            value: currentData.balance,
            icon: Equal,
            color: "balance",
        },
    ];

    return (
        <section className="financial-summary-card">

            {/* cabeçalho do painel */}
            <div className="financial-summary-header">

                <h2>
                    <ChartNoAxesColumn size={25} strokeWidth={1.8} />
                    Resumo financeiro
                </h2>

                {/* filtro de período */}
                <div className="financial-period-wrapper">

                    <button
                        type="button"
                        className="financial-period"
                        onClick={() => setIsPeriodOpen((previous) => !previous)}
                        aria-expanded={isPeriodOpen}
                    >
                        {currentData.label}

                        <ChevronDown
                            size={17}
                            className={isPeriodOpen ? "period-arrow-open" : ""}
                        />
                    </button>

                    {/* opções do filtro */}
                    {isPeriodOpen && (
                        <div className="financial-period-menu">

                            {periodOptions.map((period) => (
                                <button
                                    type="button"
                                    key={period.value}
                                    className={`financial-period-option ${
                                        selectedPeriod === period.value ? "selected" : ""
                                    }`}
                                    onClick={() => {
                                        setSelectedPeriod(period.value);
                                        setIsPeriodOpen(false);
                                    }}
                                >
                                    <span>{period.label}</span>

                                    {/* marca a opção selecionada */}
                                    {selectedPeriod === period.value && (
                                        <Check size={17} />
                                    )}
                                </button>
                            ))}
                        </div>
                    )}

                </div>
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