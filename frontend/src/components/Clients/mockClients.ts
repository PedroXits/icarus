import type { Client } from "./Client";

export const mockClients: Client[] = [
    {
        id: 1,
        name: "João Santos",
        cpf: "123.456.789-01",
        phone: "(11) 94002-0922",
        email: "joao@email.com",
        processCount: 3,
        status: "active",
        registeredAt: "02/02/1998",
        observations: "Prefere receber contatos por telefone.",
        updatedAt: "12/02/2026"
    },
    {
        id: 2,
        name: "Carla Souza",
        cpf: "123.456.789-02",
        phone: "(11) 94002-0923",
        email: "ricardo@email.com",
        processCount: 2,
        status: "active",
        registeredAt: "04/04/1999",
        observations: "Prefere receber contatos via E-mail.",
        updatedAt: "16/04/2026"
    },
    {
        id: 3,
        name: "Lucas Ferreira",
        cpf: "123.456.789-03",
        phone: "(11) 94002-0924",
        email: "juliana@email.com",
        processCount: 1,
        status: "inactive",
        registeredAt: "06/06/1996",
        observations: "Prefere receber contatos por mensagem.",
        updatedAt: "18/06/2026"
    },
    {
        id: 4,
        name: "Luísa Almeida",
        cpf: "123.456.789-04",
        phone: "(11) 94002-0925",
        email: "marcelo@email.com",
        processCount: 4,
        status: "active",
        registeredAt: "08/08/1994",
        observations: "Prefere receber contatos por telefone.",
        updatedAt: "20/08/2026"
    },
    {
        id: 5,
        name: "Elouise Brandão",
        cpf: "123.456.789-05",
        phone: "(11) 94002-0926",
        email: "elouise@email.com",
        processCount: 0,
        status: "active",
        registeredAt: "10/10/1992",
        observations: "Prefere receber contatos via E-mail.",
        updatedAt: "24/10/2026"
    },
    {
        id: 6,
        name: "Robson Alves",
        cpf: "123.456.789-06",
        phone: "(11) 94002-0927",
        email: "robson@email.com",
        processCount: 2,
        status: "inactive",
        registeredAt: "12/12/1990",
        observations: "Prefere receber contatos por mensagem.",
        updatedAt: "26/12/2026"
    },
];