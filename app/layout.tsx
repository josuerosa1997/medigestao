import type { Metadata } from "next";
import { sitePath } from "../lib/site-path";
import { siteUrl } from "../lib/site-url";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl("/")),
  title: "Medigestão | Contabilidade e Licitações",
  description: "Abra sua empresa, troque de contador e prepare-se para participar de licitações com a Medigestão. Diagnóstico inicial gratuito e proposta para o seu negócio.",
  alternates: { canonical: siteUrl("/") },
  openGraph: {
    title: "Medigestão | Contabilidade e Licitações",
    description: "Abertura de empresa, contabilidade e assessoria em licitações. Escolha seu objetivo e receba uma proposta da Medigestão.",
    siteName: "Medigestão", locale: "pt_BR", type: "website", url: siteUrl("/"),
    images: [{ url: siteUrl("/images/medigestao-atendimento.png"), width: 1254, height: 1254, alt: "Medigestão — Contabilidade e Licitações; imagem ilustrativa de atendimento" }],
  },
  icons: {
    icon: sitePath("/images/medigestao-simbolo-original.png"),
    shortcut: sitePath("/images/medigestao-simbolo-original.png"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
