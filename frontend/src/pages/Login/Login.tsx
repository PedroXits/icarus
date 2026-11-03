import { useState } from "react";
import type { SubmitEvent } from "react";

import { Mail, LockKeyhole, Eye, EyeOff, } from "lucide-react"; //icones
import logoIcarus from "../../assets/images/logo-icarus.png";

import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log({
      email,
      senha,
      lembrar,
    });
  }

  return (
    <main className="login-page">
      {/* lado esquerdo - logo */}
      <section className="login-brand">
        <img
          src={logoIcarus}
          alt="Icarus Gestão Jurídica"
          className="login-logo"
        />
      </section>

      {/* lado direito - formulário */}
      <section className="login-content">
        <div className="login-form-container">
          <h1>Acesse sua conta</h1>

          <p className="login-description">
            Entre para continuar gerenciando os clientes,
            <br />
            casos e financeiro do escritório.
          </p>

          <form onSubmit={handleSubmit}>
            {/* e-mail */}
            <div className="login-input-group">
              <Mail size={22} />

              <input
                type="email"
                placeholder="seuemail@escritório.com"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                required
              />
            </div>

            {/* senha */}
            <div className="login-input-group">
              <LockKeyhole size={22} />

              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Sua senha"
                value={senha}
                onChange={(event) =>
                  setSenha(event.target.value)
                }
                required
              />

              <button
                type="button"
                className="password-toggle" //icone de olho da senha
                onClick={() =>
                  setMostrarSenha(!mostrarSenha)
                }
                aria-label={
                  mostrarSenha
                    ? "Ocultar senha"
                    : "Mostrar senha"
                }
              >
                {mostrarSenha ? (
                  <EyeOff size={22} />
                ) : (
                  <Eye size={22} />
                )}
              </button>
            </div>

            {/* opções do login */}
            <div className="login-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={lembrar}
                  onChange={(event) =>
                    setLembrar(event.target.checked)
                  }
                />

                <span>Lembrar de mim</span>
              </label>

              <button
                type="button"
                className="forgot-password"
              >
                Esqueceu a senha?
              </button>
            </div>

            {/* botão de entrar */}
            <button
              type="submit"
              className="login-button"
            >
              ENTRAR
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}