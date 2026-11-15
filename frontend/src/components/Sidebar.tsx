import { NavLink, useNavigate } from "react-router-dom";
import { House, Users, Landmark, LogOut } from "lucide-react";
import logoIcarus from "../assets/images/logo-icarus-branco.png";

import "./Sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  // itens que aparecem no menu lateral
  const menuItems = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: House,
    },
    {
        title: "Clientes",
        path: "/clients",
        icon: Users,
    },
    {
        title: "Financeiro",
        path: "/financial",
        icon: Landmark,
    },
  ];

  // botão de sair só volta para o login; passará a encerrar sessão quando houver uma integração
  function handleLogout() {
    navigate("/");
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <img src={logoIcarus} alt="Icarus Gestão Jurídica" className="sidebar-logo" />
      </div>

      {/* menu de navegação */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => { const Icon = item.icon;

          return (
            <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={27} strokeWidth={1.8} />

              <span>{item.title}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* botão de voltar p/ login */}
      <button
        type="button" className="sidebar-logout" onClick={handleLogout}
      >
        <LogOut size={25} strokeWidth={1.8} />
        <span>Sair</span>
      </button>
    </aside>
  );
}
