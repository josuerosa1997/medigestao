import type { Metadata } from "next";
import { sitePath } from "../../lib/site-path";
import { siteUrl } from "../../lib/site-url";
export const metadata: Metadata = {
  title: "Privacidade | Medigestão",
  description: "Saiba como funcionam as opções de contato no site da Medigestão.",
  alternates: { canonical: siteUrl("/privacidade/") },
  openGraph: {
    title: "Privacidade | Medigestão",
    description: "Saiba como funcionam as opções de contato no site da Medigestão.",
    siteName: "Medigestão", locale: "pt_BR", type: "website",
    url: siteUrl("/privacidade/"),
    images: [{ url: siteUrl("/images/medigestao-atendimento.png"), width: 1254, height: 1254, alt: "Medigestão — Contabilidade e Licitações; imagem ilustrativa de atendimento" }],
  },
};
export default function PrivacyPage() {
  return <main className="privacy-page">
    <a className="brand" href={sitePath("/")} aria-label="Medigestão — voltar ao site"><span className="brand-logo-window"><img src={sitePath("/images/medigestao-logo-transparente-clara.png")} alt="MediGestão" width="1683" height="935" /></span><span className="brand-descriptor">CONTABILIDADE & LICITAÇÕES</span></a>
    <h1>Privacidade e contato</h1>
    <p>Este site apresenta os serviços da Medigestão e oferece caminhos para contato pelo WhatsApp, telefone e e-mail.</p>
    <h2>Suas escolhas nesta página</h2>
    <p>Suas escolhas no diagnóstico — objetivo, momento da empresa e nome opcional — são usadas somente para preparar uma mensagem no navegador. Esses campos não são salvos em uma base de dados deste site. O site não possui cadastro nem envia automaticamente essa mensagem à Medigestão.</p>
    <h2>WhatsApp, telefone e e-mail</h2>
    <p>Ao escolher o WhatsApp, você abre esse serviço com a mensagem preparada e pode revisá-la antes de confirmar o envio. O botão de e-mail abre seu aplicativo de correio com assunto e texto sugeridos. O botão de telefone permite iniciar uma ligação no seu dispositivo.</p>
    <p>Informações enviadas por esses canais passam a ser tratadas durante o atendimento e estão sujeitas também às condições e políticas dos serviços utilizados. Os links para Instagram abrem a plataforma externa.</p>
    <h2>Navegação</h2>
    <p>Esta versão do site não inclui ferramentas de publicidade ou análise de audiência adicionadas pela Medigestão. O provedor de hospedagem pode processar dados técnicos necessários à operação e à segurança do serviço.</p>
    <h2>Fale com a Medigestão</h2>
    <p>Para conversar sobre informações compartilhadas durante o atendimento, escreva para <a href="mailto:medigestaocontabil@gmail.com">medigestaocontabil@gmail.com</a> ou entre em contato pelo telefone <a href="tel:+5594992326657">(94) 99232-6657</a>.</p>
    <p className="privacy-updated">Atualizado em 8 de novembro de 2026.</p><p><a href={sitePath("/")}>Voltar ao site</a></p>
  </main>;
}
