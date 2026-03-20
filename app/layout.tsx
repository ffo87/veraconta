import type { Metadata } from "next";
//import "./globals.css";

export const metadata: Metadata = {
  title:
    "Veraconta — Saiba o que vai entrar antes de fechar o próximo contrato",
  description:
    "O Veraconta organiza seus recebimentos futuros e te avisa se você pode dar prazo — ou se precisa cobrar mais agora. Para freelancers e MEIs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, padding: 0, minHeight: "100vh" }}>
        {children}
      </body>
    </html>
  );
}
