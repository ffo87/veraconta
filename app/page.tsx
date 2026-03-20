"use client";

import Image from "next/image";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = null as any;

const cards = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3fa66a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
    title: "Visão do caixa futuro",
    desc: "Veja tudo que vai entrar organizado por contrato, parcela e cliente. Sem planilha, sem chute.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3fa66a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    title: "Conselheiro de proposta",
    desc: "Antes de fechar um contrato, o Veraconta avisa se você pode dar prazo — ou precisa cobrar mais agora.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3fa66a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    title: "Contratos organizados",
    desc: "Parcelas, pagamentos fracionados, recebimentos pendentes. Tudo num lugar só, sempre atualizado.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3fa66a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
      </svg>
    ),
    title: "Alertas inteligentes",
    desc: "Receba avisos antes de vencimentos e pagamentos atrasados. Nunca mais seja pego de surpresa.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3fa66a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: "Saúde financeira",
    desc: "Um índice único que resume seu momento: crescendo, estável ou em risco. Acompanhe mês a mês.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3fa66a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/>
      </svg>
    ),
    title: "Projeção de renda",
    desc: "Com base nos seus contratos ativos, projeta quanto você deve receber nos próximos meses.",
  },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    const { error } = await supabase
      .from("early_access")
      .insert([{ email }]);

    if (error) {
      if (error.code === "23505") {
        // Email já cadastrado
        setSubmitted(true);
      } else {
        setError("Algo deu errado. Tenta de novo.");
      }
    } else {
      setSubmitted(true);
    }

    setLoading(false);
  };

  return (
    <main style={{
      minHeight: "100vh",
      backgroundColor: "#ffffff",
      fontFamily: "system-ui, -apple-system, sans-serif",
      display: "flex",
      flexDirection: "column",
    }}>

      {/* NAV */}
      <nav style={{
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "20px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #f0f0f0",
      }}>
        <Image
          src="/images/logo.svg"
          alt="Veraconta"
          width={200}
          height={50}
          priority
          style={{ height: "44px", width: "auto" }}
        />
        <a href="#early-access" style={{
          fontSize: "14px",
          fontWeight: 600,
          color: "#ffffff",
          backgroundColor: "#094e42",
          padding: "11px 24px",
          borderRadius: "999px",
          textDecoration: "none",
        }}>
          Quero acesso antecipado
        </a>
      </nav>

      {/* HERO */}
      <section style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px 60px",
        textAlign: "center",
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: "#f0faf5",
          border: "1px solid #c8e6d8",
          borderRadius: "999px",
          padding: "6px 18px",
          marginBottom: "36px",
        }}>
          <span style={{ width: "7px", height: "7px", borderRadius: "50%", backgroundColor: "#3fa66a", display: "inline-block" }} />
          <span style={{ color: "#094e42", fontSize: "13px", fontWeight: 500, letterSpacing: "0.02em" }}>
            Early access aberto — vagas limitadas
          </span>
        </div>

        <h1 style={{
          fontSize: "clamp(2rem, 5vw, 4rem)",
          fontWeight: 900,
          color: "#094e42",
          lineHeight: 1.1,
          maxWidth: "780px",
          margin: "0 auto 24px",
          letterSpacing: "-0.02em",
        }}>
          Saiba o que vai entrar antes de fechar o próximo contrato.
        </h1>

        <p style={{
          fontSize: "clamp(1rem, 2vw, 1.15rem)",
          color: "#555",
          maxWidth: "560px",
          lineHeight: 1.75,
          margin: "0 auto 52px",
        }}>
          O Veraconta organiza seus recebimentos futuros e te avisa
          se você pode dar prazo — ou se precisa cobrar mais agora.{" "}
          <strong style={{ color: "#094e42" }}>
            Para freelancers e MEIs que cansaram de fechar mês no vermelho.
          </strong>
        </p>

        {/* FORM */}
        <div id="early-access" style={{ width: "100%", maxWidth: "460px", margin: "0 auto" }}>
          {!submitted ? (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                style={{
                  width: "100%",
                  padding: "16px 20px",
                  borderRadius: "12px",
                  border: "2px solid #e5e5e5",
                  backgroundColor: "#fafafa",
                  color: "#094e42",
                  fontSize: "16px",
                  fontWeight: 500,
                  outline: "none",
                }}
              />
              {error && (
                <p style={{ color: "#e05555", fontSize: "14px", margin: 0 }}>{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "16px 24px",
                  backgroundColor: "#094e42",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "16px",
                  border: "none",
                  borderRadius: "12px",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Salvando..." : "Quero acesso antecipado →"}
              </button>
            </form>
          ) : (
            <div style={{
              backgroundColor: "#f0faf5",
              border: "2px solid #3fa66a",
              borderRadius: "16px",
              padding: "32px",
              textAlign: "center",
            }}>
              <div style={{
                width: "48px", height: "48px",
                borderRadius: "50%",
                backgroundColor: "#3fa66a",
                color: "#fff",
                fontSize: "22px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px",
              }}>✓</div>
              <p style={{ fontWeight: 700, fontSize: "18px", margin: "0 0 6px", color: "#094e42" }}>
                Você está na lista!
              </p>
              <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
                Avisamos quando abrir o acesso com desconto de early adopter.
              </p>
            </div>
          )}
          <p style={{ color: "#bbb", fontSize: "12px", marginTop: "14px" }}>
            Sem spam. Você recebe só quando o produto estiver pronto.
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "64px 32px 96px",
        borderTop: "1px solid #f0f0f0",
      }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{
            fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
            fontWeight: 800,
            color: "#094e42",
            margin: "0 0 12px",
            letterSpacing: "-0.02em",
          }}>
            Tudo que você precisa para parar de adivinhar.
          </h2>
          <p style={{ color: "#888", fontSize: "15px", maxWidth: "480px", margin: "0 auto", lineHeight: 1.6 }}>
            Simples o suficiente para usar todo dia. Inteligente o suficiente para te proteger.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}>
          {cards.map((card, i) => (
            <div key={i} style={{
              backgroundColor: "#ffffff",
              border: "1px solid #ebebeb",
              borderRadius: "16px",
              padding: "28px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}>
              <div style={{
                width: "52px", height: "52px",
                borderRadius: "14px",
                backgroundColor: "#f0faf5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                {card.icon}
              </div>
              <h3 style={{ fontWeight: 700, color: "#094e42", fontSize: "17px", margin: 0, lineHeight: 1.3 }}>
                {card.title}
              </h3>
              <p style={{ color: "#666", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{
        backgroundColor: "#094e42",
        padding: "72px 24px",
        textAlign: "center",
      }}>
        <h2 style={{
          fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
          fontWeight: 800,
          color: "#ffffff",
          margin: "0 auto 16px",
          maxWidth: "600px",
          lineHeight: 1.2,
          letterSpacing: "-0.02em",
        }}>
          Chega de fechar mês no vermelho sem entender por quê.
        </h2>
        <p style={{
          color: "rgba(255,255,255,0.7)",
          fontSize: "15px",
          margin: "0 auto 36px",
          maxWidth: "420px",
          lineHeight: 1.6,
        }}>
          Entre na lista de early access e seja um dos primeiros a usar o Veraconta com desconto exclusivo.
        </p>
        <a href="#early-access" style={{
          display: "inline-block",
          padding: "16px 36px",
          backgroundColor: "#3fa66a",
          color: "#ffffff",
          fontWeight: 700,
          fontSize: "16px",
          borderRadius: "12px",
          textDecoration: "none",
        }}>
          Quero acesso antecipado →
        </a>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid #f0f0f0", padding: "24px 32px", textAlign: "center" }}>
        <p style={{ color: "#ccc", fontSize: "12px", margin: 0 }}>
          © 2026 Veraconta - veraconta.app
        </p>
      </footer>

    </main>
  );
}