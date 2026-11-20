// estrutura dos dados de um cliente
export interface Client {
    id: number;
    name: string;
    cpf: string;
    phone: string;
    email: string;
    processCount: number;
    status: "active" | "inactive";
    registeredAt: string;
    observations: string;
    updatedAt: string;
}