import { useEffect, useRef, useState } from "react";
import { Search, Plus, ListFilter, ChevronDown, Check } from "lucide-react";

import "./ClientToolbar.css";

// opções de filtro
export type ClientStatusFilter = "all" | "active" | "inactive";

const statusOptions: {
    value: ClientStatusFilter;
    label: string;
}[] = [
    { value: "all", label: "Todos os status" },
    { value: "active", label: "Ativos" },
    { value: "inactive", label: "Inativos" },
];

interface ClientToolbarProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    statusFilter: ClientStatusFilter;
    onStatusFilterChange: (value: ClientStatusFilter) => void;
    onNewClientClick: () => void;
}

export default function ClientToolbar ({
    searchTerm,
    onSearchChange,
    statusFilter,
    onStatusFilterChange,
    onNewClientClick,
}: ClientToolbarProps) {

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const filterRef = useRef<HTMLDivElement>(null);

     const selectedStatus = statusOptions.find(
        (option) => option.value === statusFilter
    )?.label ?? "Todos os status";

    // fecha o menu ao clicar fora dele ou pressionar Esc
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                filterRef.current &&
                !filterRef.current.contains(event.target as Node)
            ) {
                setIsFilterOpen(false);
            }
        }

        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setIsFilterOpen(false);
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
        <div className="client-toolbar">

            {/* campo de pesquisa */}
            <div className="client-search">
                <Search
                    className="client-search-icon"
                    size={19}
                    strokeWidth={1.8}
                />

                <input
                    type="text"
                    placeholder="Pesquisar cliente por nome, CPF ou telefone..."
                    value={searchTerm}
                    onChange={(event) => onSearchChange(event.target.value)}
                    aria-label="Pesquisar clientes"
                />
            </div>

            {/* filtro ativo ou inativo */}
            <div className="client-status-filter" ref={filterRef}>

                {/* botão que abre a caixinha do menu */}
                <button
                    className="client-status-filter-button"
                    type="button"
                    onClick={() => setIsFilterOpen((current) => !current)}
                    aria-haspopup="menu"
                    aria-expanded={isFilterOpen}
                >
                    <ListFilter
                        size={18}
                        strokeWidth={1.8}
                    />

                    <span>{selectedStatus}</span>

                    <ChevronDown
                        className={`client-filter-arrow ${
                            isFilterOpen ? "filter-arrow-open" : ""
                        }`}
                        size={17}
                    />
                </button>

                {/* opções do filtro */}
                {isFilterOpen && (
                    <div className="client-status-filter-menu" role="menu">

                        {statusOptions.map((option) => {
                            const isSelected = statusFilter === option.value;

                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    role="menuitemradio"
                                    aria-checked={isSelected}
                                    className={`client-status-option ${
                                        isSelected ? "selected" : ""
                                    }`}
                                    onClick={() => {
                                        onStatusFilterChange(option.value);
                                        setIsFilterOpen(false);
                                    }}
                                >
                                    <span>{option.label}</span>

                                    {isSelected && (
                                        <Check size={16} />
                                    )}
                                </button>
                            );
                        })}

                    </div>
                )}
            </div>

            {/* botão para cadastrar novo cliente */}
            <button
                className="client-new-button"
                type="button"
                onClick={onNewClientClick}
            >
                <Plus size={20} strokeWidth={2} />
                <span>Novo cliente</span>
            </button>

        </div>
    );
}