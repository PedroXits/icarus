import { TrendingUp } from "lucide-react";

import "./FlowChart.css";

// mock do fluxo financeiro
const chartData = [
    { month: "Jun", revenue: 14000, expenses: 5000 },
    { month: "Jul", revenue: 18000, expenses: 6500 },
    { month: "Ago", revenue: 15500, expenses: 6000 },
    { month: "Set", revenue: 23000, expenses: 9500 },
    { month: "Out", revenue: 21000, expenses: 8000 },
    { month: "Nov", revenue: 38000, expenses: 8500 },
];

// limites e posições do gráfico
const chartTop = 30;
const chartBottom = 190;
const chartMaxValue = 40000;

// posições horizontais dos meses
const chartPositions = [90, 196, 302, 408, 514, 620];

// posições e valores das linhas horizontais
const chartTicks = [4, 3, 2, 1, 0].map((level) => ({
    value: 10000 * level,
    y: chartTop + ((4 - level) / 4) * (chartBottom - chartTop),
}));

// converte os valores financeiros em posições verticais
function getY(value: number) {
    return chartBottom - (
        (value / chartMaxValue) * (chartBottom - chartTop)
    );
}

export default function FlowChart() {

    // pontos das receitas e despesas
    const revenuePoints = chartData.map((item, index) => ({
        x: chartPositions[index],
        y: getY(item.revenue),
    }));

    const expensePoints = chartData.map((item, index) => ({
        x: chartPositions[index],
        y: getY(item.expenses),
    }));

    // conecta os pontos para formar as linhas do gráfico
    const revenueLine = revenuePoints
        .map((point) => `${point.x},${point.y}`)
        .join(" ");

    const expenseLine = expensePoints
        .map((point) => `${point.x},${point.y}`)
        .join(" ");

    // cria a área preenchida abaixo da linha de receitas
    const revenueArea = [
        `M ${revenuePoints[0].x} ${chartBottom}`,
        ...revenuePoints.map((point) => `L ${point.x} ${point.y}`),
        `L ${revenuePoints[revenuePoints.length - 1].x} ${chartBottom}`,
        "Z",
    ].join(" ");

    return (
        <section className="flow-chart-card">

            {/* cabeçalho do gráfico */}
            <div className="flow-chart-header">

                <h2 className="flow-chart-title">
                    <TrendingUp size={24} strokeWidth={1.8} />
                    Fluxo financeiro
                </h2>

                {/* legenda do gráfico */}
                <div className="flow-chart-legend">

                    <div>
                        <span className="flow-chart-dot income" />
                        <span>Receitas</span>
                    </div>

                    <div>
                        <span className="flow-chart-dot expenses" />
                        <span>Despesas</span>
                    </div>

                </div>
            </div>

            {/* gráfico de receitas e despesas */}
            <div className="flow-chart-content">

                <svg
                    className="flow-chart-graphic"
                    viewBox="0 0 660 235"
                    role="img"
                    aria-label="Gráfico demonstrativo de receitas e despesas entre junho e novembro."
                >
                    <defs>
                        <linearGradient
                            id="flow-revenue-gradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="0%"
                                stopColor="#C8974B"
                                stopOpacity="0.18"
                            />

                            <stop
                                offset="100%"
                                stopColor="#C8974B"
                                stopOpacity="0.01"
                            />
                        </linearGradient>
                    </defs>

                    {/* linhas horizontais do gráfico */}
                    <g className="flow-chart-grid">
                        {chartTicks.map((tick, index) => (
                            <line
                                key={index}
                                x1="70"
                                y1={tick.y}
                                x2="645"
                                y2={tick.y}
                            />
                        ))}
                    </g>

                    {/* valores do eixo vertical */}
                    <g className="flow-chart-axis-label">
                        {chartTicks.map((tick, index) => (
                            <text
                                key={index}
                                x="65"
                                y={tick.y + 4}
                            >
                                R$ {tick.value.toLocaleString("pt-BR")}
                            </text>
                        ))}
                    </g>

                    {/* área preenchida das receitas */}
                    <path
                        className="flow-chart-revenue-area"
                        d={revenueArea}
                    />

                    {/* linha das receitas */}
                    <polyline
                        className="flow-chart-line income"
                        points={revenueLine}
                    />

                    {/* linha das despesas */}
                    <polyline
                        className="flow-chart-line expenses"
                        points={expenseLine}
                    />

                    {/* pontos das receitas */}
                    {revenuePoints.map((point, index) => (
                        <circle
                            key={`revenue-${index}`}
                            className="flow-chart-point income"
                            cx={point.x}
                            cy={point.y}
                            r="4.5"
                        />
                    ))}

                    {/* pontos das despesas */}
                    {expensePoints.map((point, index) => (
                        <circle
                            key={`expenses-${index}`}
                            className="flow-chart-point expenses"
                            cx={point.x}
                            cy={point.y}
                            r="4.5"
                        />
                    ))}

                    {/* meses do eixo horizontal */}
                    <g className="flow-chart-month-label">
                        {chartData.map((item, index) => (
                            <text
                                key={item.month}
                                x={chartPositions[index]}
                                y="222"
                            >
                                {item.month}
                            </text>
                        ))}
                    </g>

                </svg>
            </div>

        </section>
    );
}