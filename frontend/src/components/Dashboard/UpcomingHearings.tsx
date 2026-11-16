import { CalendarDays, ArrowRight } from "lucide-react";

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
    return (
        <section className="upcoming-hearings-card">

            {/* cabeçalho do painel */}
            <div className="upcoming-hearings-header">

                <h2>
                    <CalendarDays size={25} strokeWidth={1.8} />
                    Próximas audiências
                </h2>

                {/* botão de ver agenda */}
                <span className="view-agenda">
                    Ver agenda
                    <ArrowRight size={17} />
                </span>
            </div>

            {/* lista de audiências */}
            <div className="hearings-list">

                {hearings.map((hearing) => (
                    <article className="hearing-item" key={hearing.day}>
                    
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
            
        </section>
    );
}