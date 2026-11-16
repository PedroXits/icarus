import { useEffect, useState } from "react";
import { Clock3, FileText, Scale, ArrowRight } from "lucide-react";

import "./RecentActivities.css";

// mock atividades do sistema
const activities = [
    {
        id: 1,
        title: "Novo cliente cadastrado: João Santos",
        date: "Hoje, 13:13",
        icon: FileText,
    },
    {
        id: 2,
        title: "Caso atualizado: Revisão Contratual",
        date: "Hoje, 09:24",
        icon: Scale,
    },
];

export default function RecentActivities() {
    const [showActivitiesToast, setShowActivitiesToast] = useState(false);

    // faz a notificação desaparecer após 4 segundos
    useEffect(() => {
        if (!showActivitiesToast) return;

        const timeoutId = window.setTimeout(() => {
            setShowActivitiesToast(false);
        }, 4000);

        return () => window.clearTimeout(timeoutId);
    }, [showActivitiesToast]);

    return (
        <section className="recent-activities-card">

            {/* cabeçalho do painel */}
            <div className="recent-activities-header">

                <h2>
                    <Clock3 size={25} strokeWidth={1.8} />
                    Atividades recentes
                </h2>

                {/* botão para consultar todas as atividades */}
                <button
                    type="button"
                    className="view-activities"
                    onClick={() => setShowActivitiesToast(true)}
                >
                    Ver todas
                    <ArrowRight size={17} />
                </button>

            </div>

            {/* lista de atividades */}
            <div className="activities-list">

                {activities.map((activity) => {
                    const Icon = activity.icon;

                    return(
                        <article
                            className="activity-item"
                            key={activity.id}
                        >
                            {/* ícone da atividade */}
                            <div className="activity-icon">
                                <Icon size={25} strokeWidth={1.8} />
                            </div>

                            {/* descrição e horário */}
                            <div className="activity-details">
                                <p>{activity.title}</p>
                            </div>

                            <span className="activity-date">
                                {activity.date}
                            </span>

                        </article>

                    );
                })}
            </div>

            {/* notificação temporária */}
            {showActivitiesToast && (
                <div className="activities-toast" role="status" aria-live="polite">
                    <Clock3
                        size={25}
                        className="activities-toast-icon"
                    />

                    <div>
                        <strong>Atividades recentes</strong>

                        <p>
                            Essa função estará disponível futuramente.
                        </p>
                    </div>
                </div>
            )}

        </section>
    );
}