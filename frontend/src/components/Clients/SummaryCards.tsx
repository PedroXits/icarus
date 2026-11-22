import { Users, UserPlus, UserCheck, UserX } from "lucide-react";
import type { Client } from "./Client";

import "./SummaryCards.css";

interface SummaryCardsProps {
    clients: Client[];
}

// verifica se a data de cadastro pertence ao mês e ano atuais
function isRegisteredThisMonth(date: string, today: Date) {
    const [day, month, year] = date.split("/").map(Number);

    if (!day || !month || !year) {
        return false;
    }

    const registeredDate = new Date(year, month - 1, day);

    // verifica se a data é válida
    const isValidDate =
        registeredDate.getDate() === day &&
        registeredDate.getMonth() === month - 1 &&
        registeredDate.getFullYear() === year;

    if (!isValidDate) {
        return false;
    }

    return (
        registeredDate.getMonth() === today.getMonth() &&
        registeredDate.getFullYear() === today.getFullYear()
    );
}

export default function SummaryCards({ clients }: SummaryCardsProps) {

    // quantidade de clientes ativos e inativos
    const activeClients = clients.filter(
        (client) => client.status === "active"
    ).length;

    const inactiveClients = clients.filter(
        (client) => client.status === "inactive"
    ).length;

     // quantidade de clientes cadastrados nesse mês
    const today = new Date();

    const newClientsThisMonth = clients.filter(
        (client) => isRegisteredThisMonth(client.registeredAt, today)
    ).length;

    // indicadores calculados a partir da lista de clientes
    const summaryItems = [
        {
            title: "Total de clientes",
            value: clients.length,
            icon: Users,
        },
        {
            title: "Novos no mês",
            value: newClientsThisMonth,
            icon: UserPlus,
        },
        {
            title: "Clientes ativos",
            value: activeClients,
            icon: UserCheck,
        },
        {
            title: "Clientes inativos",
            value: inactiveClients,
            icon: UserX,
        }
    ];
    
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