import { useEffect, useState } from "react";
import { CalendarDays, ArrowRight, CalendarClock } from "lucide-react";

import "./UpcomingHearings.css";

// mock de audiências
const hearings = [
    {
        day: "13",
        month: "JAN",
        title: "Ação de Cobrança – Proc. nº 4002-8922",
        time: "14:00",
        location: "Fórum Central",
    },
];

export default function UpcomingHearings() {
    // controla a exibição da notificação
    const [showAgendaToast, setShowAgendaToast] = useState(false);

    // faz a notificação desaparecer após 4 segundos
    useEffect(() => {
        if (!showAgendaToast) return;

        const timeoutId = window.setTimeout(() => {
            setShowAgendaToast(false);
        }, 4000);

        // limpa o temporizador quando o efeito é encerrado.
        return () => window.clearTimeout(timeoutId);
    }, [showAgendaToast]);

    return (
        <section className="upcoming-hearings-card">

            {/* cabeçalho do painel */}
            <div className="upcoming-hearings-header">

                <h2>
                    <CalendarDays size={25} strokeWidth={1.8} />
                    Próximas audiências
                </h2>

                {/* botão de ver agenda (para notificação) */}
                <button
                    type="button"
                    className="view-agenda"
                    onClick={() => setShowAgendaToast(true)}
                >
                    Ver agenda
                    <ArrowRight size={17} />
                </button>

            </div>

            {/* lista de audiências */}
            <div className="hearings-list">

                {hearings.map((hearing) => (
                    <article className="hearing-item" key={`${hearing.day}-${hearing.title}`}
                    >
                    
                        {/* data da audiência */}
                        <div className="hearing-date">
                            <strong>{hearing.day}</strong>
                            <span>{hearing.month}</span>
                        </div>

                        {/* informações do processo */}
                        <div className="hearing-details">

                            <p className="hearing-title">
                                {hearing.title}
                            </p>

                            <p className="hearing-info">
                                {hearing.time} · {hearing.location}
                            </p>

                        </div>
                        
                    </article>
                ))}
                
            </div>

            {/* notificação temporária da agenda */}
            {showAgendaToast && (
                <div className="agenda-toast" role="status" aria-live="polite">
                    <CalendarClock
                        size={25}
                        strokeWidth={1.8}
                        className="agenda-toast-icon"
                    />

                    <div className="agenda-toast-content">

                        <strong>Agenda completa</strong>

                        <p>
                            Essa função estará disponível em breve.
                        </p>

                    </div>

                </div>

            )}
            
        </section>
    );
}