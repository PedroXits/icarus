import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Clients from "./pages/Clients/Clients";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

// página temporária para o financeiro
function ModulePlaceholder({title} : {title: string}) {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <main className="dashboard-main">
        <Header
          title={title}
          subtitle="área desenvolvida em breve..."
        />
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/financial" element={<ModulePlaceholder title="Financeiro" />} />

          {/* endereço não encontrado */}
          <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;