import { useEffect, useRef, useState } from "react";
import { CalendarDays, ChevronDown, Check } from "lucide-react";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import SummaryCards from "../../components/Financial/SummaryCards";
import FlowChart from "../../components/Financial/FlowChart";

import "./Financial.css";

// opções de mês e ano para consulta financeira
const currentDate = new Date();

const monthOptions = Array.from({ length: 12 }, (_, index) => {

    const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - index,
        1
    );

    const month = date.toLocaleDateString("pt-BR", {
        month: "long",
    });

    const formattedMonth =
        month.charAt(0).toUpperCase() + month.slice(1);

    return {
        value: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`,
        label: `${formattedMonth}/${date.getFullYear()}`,
    };
});

export default function Financial() {

    const [selectedPeriod, setSelectedPeriod] = useState(monthOptions[0].value);

    const [isPeriodOpen, setIsPeriodOpen] = useState(false);

    const periodRef = useRef<HTMLDivElement>(null);

    // identifica o período selecionado
    const selectedPeriodLabel = monthOptions.find(
        (option) => option.value === selectedPeriod
    )?.label ?? monthOptions[0].label;

     useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                periodRef.current &&
                !periodRef.current.contains(event.target as Node)
            ) {
                setIsPeriodOpen(false);
            }
        }

        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsPeriodOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

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

                    {/* filtro de mês e ano */}
                    <div className="financial-period-bar">

                        <div
                            className="financial-month-filter-wrapper"
                            ref={periodRef}
                        >

                            {/* botão do período selecionado */}
                            <button
                                type="button"
                                className="financial-month-button"
                                onClick={() =>
                                    setIsPeriodOpen((previous) => !previous)
                                }
                                aria-haspopup="menu"
                                aria-expanded={isPeriodOpen}
                            >
                                <CalendarDays size={17} />

                                <span>{selectedPeriodLabel}</span>

                                <ChevronDown
                                    size={16}
                                    className={
                                        isPeriodOpen
                                            ? "financial-month-arrow-open"
                                            : ""
                                    }
                                />
                            </button>

                            {/* opções do período */}
                            {isPeriodOpen && (
                                <div
                                    className="financial-month-menu"
                                    role="menu"
                                >

                                    {monthOptions.map((option) => {
                                        const isSelected =
                                            selectedPeriod === option.value;

                                        return (
                                            <button
                                                type="button"
                                                key={option.value}
                                                role="menuitemradio"
                                                aria-checked={isSelected}
                                                className={`financial-month-option ${
                                                    isSelected ? "selected" : ""
                                                }`}
                                                onClick={() => {
                                                    setSelectedPeriod(option.value);
                                                    setIsPeriodOpen(false);
                                                }}
                                            >
                                                <span>{option.label}</span>

                                                {/* marca a opção selecionada */}
                                                {isSelected && (
                                                    <Check size={16} />
                                                )}
                                            </button>
                                        );
                                    })}

                                </div>
                            )}

                        </div>
                    </div>

                    {/* cards de resumo financeiro */}
                    <SummaryCards />

                    {/* gráfico de fluxo financeiro */}
                    <div className="financial-charts">
                        <FlowChart />
                    </div>

                </section>
            </main>

        </div>
    );
}