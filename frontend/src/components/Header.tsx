import { Bell, ChevronDown } from "lucide-react";

import "./Header.css";

// para aut
interface HeaderProps {
    title: string;
    subtitle: string;
    userName?: string;
    userRole?: string;
}

export default function Header({
    title,
    subtitle,
    userName = "Larissa Mendes",
    userRole = "Advogada",
}: HeaderProps) {

    // iniciais com base no nome exibido no perfil
    const initials = userName
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((name) => name[0])
        .join("")
        .toUpperCase();

        return (
            <header className="dashboard-header">
                {/* título e mensagem */}
                <div className="header-title">
                    <h1>{title}</h1>
                    <p>{subtitle}</p>
                </div>

                {/* notificações e perfil*/}
                <div className="header-actions">

                {/* botão visual de notificações */}
                <div
                    className="header-notifications"
                    aria-label="Notificações"
                >
                    <Bell size={25} strokeWidth={1.8} />
                    <span className="notification-dot"></span>
                </div>

                <div className="header-divider"></div>

                {/* perfil usuário */}
                <div className="header-profile">
                    <div className="profile-avatar">
                        {initials}
                    </div>

                    <div className="profile-info">
                        <strong>{userName}</strong>
                        <span>{userRole}</span>
                    </div>

                    <ChevronDown size={22} />
                </div>
            </div>
        </header>
    );
}