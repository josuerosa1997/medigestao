"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, Calculator, CalendarDays, Camera, Check, ClipboardCheck, FileCheck2, FileText, Handshake, Landmark, Mail, Menu, MessageCircle, Phone, Plus, ShieldCheck, Users, X } from "lucide-react";
import { clientStories, clientBrands } from "./content/social-proof";
import { sitePath } from "../lib/site-path";

const INSTAGRAM = "https://www.instagram.com/medigestao.consultoria/";
const PHONE = "+5594992326657";
const PHONE_DISPLAY = "(94) 99232-6657";
const EMAIL = "medigestaocontabil@gmail.com";
function whatsappLink(message = "Olá! Vim pelo site da Medigestão e gostaria de conversar sobre os serviços de contabilidade e licitações.") {
  return "https://wa.me/5594992326657?text=" + encodeURIComponent(message);
}

const goals = [
  { id: "abrir_empresa", label: "Abrir minha empresa", topic: "abertura de empresa", icon: Building2 },
  { id: "trocar_contador", label: "Trocar de contador", topic: "troca de contador", icon: Calculator },
  { id: "licitacoes", label: "Participar de licitações", topic: "licitações e contratos", icon: Landmark },
  { id: "contabilidade_licitacoes", label: "Contabilidade e licitações", topic: "contabilidade e licitações", icon: Handshake },
] as const;
type GoalId = typeof goals[number]["id"];
const offers: { id: GoalId; label: string; title: string; description: string; icon: typeof Building2; items: string[]; cta: string; note: string }[] = [
  {
    id: "abrir_empresa", label: "PARA TIRAR SEU NEGÓCIO DO PAPEL", title: "Abrir empresa",
    description: "Comece seu CNPJ com orientação e entenda o que sua atividade precisa para funcionar.",
    icon: Building2, items: ["Orientação para a formalização", "Organização dos documentos", "Preparação da rotina contábil"],
    cta: "Quero abrir minha empresa", note: "Atendimento desde os primeiros passos.",
  },
  {
    id: "trocar_contador", label: "PARA QUEM JÁ TEM EMPRESA", title: "Trocar de contador",
    description: "Conheça um atendimento contábil próximo e organize a mudança com acompanhamento.",
    icon: Calculator, items: ["Planejamento da transição", "Rotina contábil, fiscal e de folha", "Orientação para a gestão"],
    cta: "Quero trocar de contador", note: "Uma proposta para a sua realidade.",
  },
  {
    id: "licitacoes", label: "PARA ENTRAR NO MERCADO PÚBLICO", title: "Participar de licitações",
    description: "Prepare sua empresa para disputar oportunidades e vender para o governo.",
    icon: Landmark, items: ["Análise de editais", "Documentação e propostas", "Acompanhamento de contratos"],
    cta: "Quero começar a licitar", note: "Do preparo à execução do contrato.",
  },
];
const deliverables = [
  { icon: FileText, title: "Contabilidade e fiscal", text: "Organização dos registros e acompanhamento das obrigações da empresa." },
  { icon: Users, title: "Folha de pagamento", text: "Apoio às rotinas de admissões, férias, folha e desligamentos." },
  { icon: CalendarDays, title: "Prazos e documentos", text: "Acompanhamento das demandas para uma rotina mais organizada." },
  { icon: Calculator, title: "Informações para decidir", text: "Orientação para compreender os números e planejar os próximos passos." },
];
const advantages = [
  { icon: MessageCircle, title: "Contato direto", text: "Converse com a Medigestão pelo WhatsApp, telefone ou e-mail." },
  { icon: ClipboardCheck, title: "Proposta clara", text: "Conheça os serviços, as responsabilidades e os valores antes de contratar." },
  { icon: Handshake, title: "Duas áreas, uma parceria", text: "Contabilidade e licitações, juntas ou em atendimentos separados." },
  { icon: ShieldCheck, title: "Seu negócio como ponto de partida", text: "O atendimento começa pelo que sua empresa realmente precisa." },
];
const questions = [
  { q: "O diagnóstico inicial é gratuito?", a: "Sim. A primeira conversa serve para entender o momento da empresa, o serviço de interesse e os próximos passos. Se fizer sentido seguir, você recebe uma proposta. A contratação é uma decisão posterior." },
  { q: "Quanto custa abrir uma empresa ou contratar a contabilidade?", a: "O valor depende da atividade, da rotina e dos serviços necessários. A proposta apresenta os honorários e o escopo. O diagnóstico inicial é gratuito; os serviços de abertura, o atendimento contínuo e eventuais taxas são tratados na proposta." },
  { q: "Já tenho contador. Como começo a mudança?", a: "Converse com a Medigestão sobre sua rotina e o que deseja melhorar. A partir disso, são alinhados os serviços, os documentos e as etapas para organizar a transição do atendimento contábil." },
  { q: "Minha empresa nunca participou de licitações. Vocês podem ajudar?", a: "Sim. A assessoria pode começar pela análise do perfil da empresa, da documentação e das exigências das oportunidades de interesse. Assim, você entende o que precisa preparar antes de participar." },
  { q: "Posso contratar licitações e continuar com meu contador?", a: "Sim. Contabilidade e licitações podem ser contratadas separadamente. A proposta define o trabalho da Medigestão e as informações necessárias para o atendimento." },
  { q: "Como recebo minha proposta?", a: "Escolha o serviço de interesse e inicie a conversa pelo WhatsApp ou e-mail. Depois de entender sua necessidade, a Medigestão apresenta uma proposta com serviços, responsabilidades, valores e condições." },
];

function Wordmark() {
  return <span className="brand-logo-window"><img src={sitePath("/images/medigestao-logo-transparente-clara.png")} alt="MediGestão" width="1683" height="935" /></span>;
}
function CheckList({ items }: { items: string[] }) {
  return <ul className="check-list">{items.map(item => <li key={item}><Check size={17} aria-hidden="true" /><span>{item}</span></li>)}</ul>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [goal, setGoal] = useState<GoalId>("abrir_empresa");
  const [businessStage, setBusinessStage] = useState("Estou começando meu negócio");
  const [businessName, setBusinessName] = useState("");
  const [diagnosticVisible, setDiagnosticVisible] = useState(false);
  const diagnosticRef = useRef<HTMLElement>(null);
  const selectedGoal = goals.find(item => item.id === goal)!;
  const message = "Olá! Vim pelo site da Medigestão e quero solicitar um diagnóstico gratuito e uma proposta.\n\nMeu objetivo: " + selectedGoal.label + ".\nMomento da empresa: " + businessStage + "." + (businessName.trim() ? "\nMeu nome ou empresa: " + businessName.trim() + "." : "") + "\n\nPodemos conversar?";
  const emailLink = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Proposta Medigestão — " + selectedGoal.topic) + "&body=" + encodeURIComponent(message);
  function selectGoal(id: GoalId) {
    setGoal(id);
    setBusinessStage(id === "abrir_empresa" ? "Estou começando meu negócio" : "Minha empresa já está em atividade");
    setMenuOpen(false);
  }
  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menuOpen]);
  useEffect(() => {
    const section = diagnosticRef.current;
    if (!section || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setDiagnosticVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <header className="site-header">
      <div className="header-inner container">
        <a className="brand" href="#inicio" aria-label="Medigestão — início" onClick={() => setMenuOpen(false)}><Wordmark /></a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          <a href="#servicos">Serviços</a><a href="#licitacoes">Licitações</a><a href="#investimento">Quanto custa?</a><a href="#como-funciona">Como funciona</a>
        </nav>
        <a className="button button-primary button-small header-contact" href="#comecar">Falar com a Medigestão</a>
        <button className="menu-button" id="menu-toggle" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={24} /> : <Menu size={24} />}</button>
      </div>
      {menuOpen && <nav className="mobile-nav" id="mobile-navigation" aria-label="Navegação móvel">
        {offers.map(offer => <a key={offer.id} href="#comecar" onClick={() => selectGoal(offer.id)}>{offer.title}</a>)}
        <a href="#investimento" onClick={() => setMenuOpen(false)}>Quanto custa?</a><a href="#como-funciona" onClick={() => setMenuOpen(false)}>Como funciona</a><a href="#comecar" onClick={() => setMenuOpen(false)}>Receber proposta</a>
      </nav>}
    </header>

    <main id="conteudo">
      <section className="sales-hero" id="inicio" aria-labelledby="hero-title">
        <div className="container sales-hero-grid">
          <div className="sales-hero-copy">
            <p className="eyebrow">CONTABILIDADE E LICITAÇÕES</p>
            <h1 id="hero-title"><em>Seu negócio cresce.</em><br />A Medigestão cuida<br className="desktop-break" /> da contabilidade.</h1>
            <p className="sales-hero-description">Abra sua empresa, troque de contador ou prepare-se para vender ao governo. Atendimento próximo, serviços claros e uma proposta feita para o seu momento.</p>
            <div className="hero-paths">
              <a className="button button-primary" href="#comecar" onClick={() => selectGoal("abrir_empresa")}>Abrir minha empresa</a>
              <a className="button button-outline" href="#comecar" onClick={() => selectGoal("trocar_contador")}>Trocar de contador</a>
              <a className="hero-tender-link" href="#licitacoes">Quer vender para o governo? Conheça nossa assessoria.</a>
            </div>
            <p className="hero-reassurance"><Check size={16} aria-hidden="true" />Diagnóstico inicial gratuito e sem compromisso.</p>
          </div>
          <div className="sales-hero-visual"><span className="hero-orbit" aria-hidden="true" /><div className="hero-image-wrap">
            <img className="sales-hero-image" src={sitePath("/images/medigestao-atendimento.png")} alt="Imagem ilustrativa de uma profissional com tablet em um ambiente de atendimento empresarial" width="1254" height="1254" fetchPriority="high" /></div><div className="hero-badge"><ShieldCheck size={20} aria-hidden="true" /><span>Mais clareza.<br /><strong>Novas possibilidades.</strong></span></div>
            <div className="hero-service-card"><span><MessageCircle size={24} aria-hidden="true" /></span><div><strong>De pessoa para pessoa.</strong><p>Converse com a Medigestão pelo WhatsApp.</p></div></div>
          </div>
        </div>
      </section>

      <div className="assurance-strip"><div className="container assurance-grid">
        <div><MessageCircle size={23} aria-hidden="true" /><p><strong>Atendimento próximo</strong><span>Contato direto pelo WhatsApp</span></p></div>
        <div><ClipboardCheck size={23} aria-hidden="true" /><p><strong>Escopo e valores claros</strong><span>Você conhece a proposta antes de contratar</span></p></div>
        <div><Handshake size={23} aria-hidden="true" /><p><strong>Contabilidade + licitações</strong><span>Soluções juntas ou separadas</span></p></div>
      </div></div>

      <section className="section services-section" id="servicos" aria-labelledby="services-title"><div className="container">
        <div className="section-heading centered"><p className="eyebrow">ESCOLHA POR ONDE COMEÇAR</p><h2 id="services-title">Seu próximo passo merece<br /><em>o apoio certo.</em></h2><p>Três caminhos para você avançar com orientação e um atendimento alinhado ao seu momento.</p></div>
        <div className="service-offers">{offers.map(offer => <article className={"service-offer" + (offer.id === "licitacoes" ? " is-featured" : "")} key={offer.id}>
          <span className="offer-label">{offer.label}</span><div className="offer-icon"><offer.icon size={29} strokeWidth={1.6} aria-hidden="true" /></div>
          <h3>{offer.title}</h3><p>{offer.description}</p><CheckList items={offer.items} />
          <a className={"button " + (offer.id === "licitacoes" ? "button-primary" : "button-outline")} href="#comecar" onClick={() => selectGoal(offer.id)}>{offer.cta}</a><small>{offer.note}</small>
        </article>)}</div>
      </div></section>

      <section className="proposal-banner" aria-labelledby="proposal-title"><div className="container proposal-banner-inner">
        <div><p className="eyebrow">DIAGNÓSTICO GRATUITO</p><h2 id="proposal-title">Menos dúvidas. Mais tempo para empreender.</h2><p>Uma conversa pode esclarecer o próximo passo da sua empresa. Comece pelo diagnóstico gratuito.</p></div>
        <a className="button button-light" href="#comecar">Quero meu diagnóstico gratuito</a>
      </div></section>

      <section className="service-detail-section section" id="contabilidade" aria-labelledby="accounting-title"><div className="container service-detail-grid">
        <div className="detail-copy"><p className="eyebrow">CONTABILIDADE PARA SUA ROTINA</p><h2 id="accounting-title">Cuide do seu negócio.<br /><em>A contabilidade fica com a gente.</em></h2><p>Abrindo sua empresa ou buscando um novo contador? Tenha apoio para organizar as obrigações e entender o que os números dizem sobre o seu negócio.</p><CheckList items={["Abertura, regularização e transição contábil", "Serviços definidos conforme sua necessidade", "Orientação para o momento da sua empresa"]} /><a className="button button-primary" href="#comecar" onClick={() => selectGoal("trocar_contador")}>Quero conhecer o atendimento contábil</a></div>
        <div className="deliverables-grid">{deliverables.map(item => <article key={item.title}><item.icon size={27} strokeWidth={1.6} aria-hidden="true" /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </div></section>

      <section className="tender-section section" id="licitacoes" aria-labelledby="tender-title"><div className="container tender-grid">
        <div className="tender-visual"><img src={sitePath("/images/medigestao-office.png")} alt="Imagem ilustrativa de um ambiente de negócios com documentos e notebook" width="1536" height="1024" loading="lazy" /><div className="tender-visual-note"><Landmark size={27} aria-hidden="true" /><div><strong>Licitações e contratos</strong><span>Preparo para atuar no mercado público.</span></div></div></div>
        <div className="tender-copy"><p className="eyebrow">SUA EMPRESA NO MERCADO PÚBLICO</p><h2 id="tender-title">Quer vender para o governo?<br /><em>Comece pela preparação.</em></h2><p>A Medigestão ajuda você a entender as oportunidades e a organizar cada etapa da participação em licitações.</p>
          <ol className="tender-steps"><li><span>01</span><div><strong>Entenda a oportunidade</strong><p>Análise dos requisitos, prazos e condições do edital.</p></div></li><li><span>02</span><div><strong>Prepare a participação</strong><p>Organização de documentos, habilitação e proposta.</p></div></li><li><span>03</span><div><strong>Acompanhe a execução</strong><p>Apoio às demandas administrativas e aos prazos contratuais.</p></div></li></ol>
          <a className="button button-primary" href="#comecar" onClick={() => selectGoal("licitacoes")}>Quero preparar minha empresa para licitar</a>
        </div>
      </div></section>

      <section className="pricing-section section" id="investimento" aria-labelledby="pricing-title"><div className="container pricing-grid">
        <div className="pricing-copy"><p className="eyebrow">INVESTIMENTO</p><h2 id="pricing-title">Uma proposta que<br /><em>faz sentido para você.</em></h2><p>O valor acompanha a atividade, a rotina e os serviços que sua empresa precisa. Na primeira conversa, entendemos sua demanda para apresentar uma proposta com escopo e condições definidos.</p><p>Você pode contratar contabilidade, assessoria em licitações ou as duas soluções.</p></div>
        <div className="pricing-card"><p className="kicker">O PRIMEIRO PASSO É GRATUITO</p><h3>Vamos entender<br />o seu negócio?</h3><p className="price-highlight">Gratuito<span>diagnóstico inicial</span></p><CheckList items={["Conversa sobre sua necessidade", "Orientação sobre os próximos passos", "Proposta com serviços e valores definidos"]} /><a className="button button-primary" href="#comecar">Solicitar diagnóstico e proposta</a><small>Sem compromisso de contratação. Os serviços são orçados conforme o escopo.</small></div>
      </div></section>

      <section className="advantages-section section" id="medigestao" aria-labelledby="advantages-title"><div className="container">
        <div className="section-heading centered"><p className="eyebrow">POR QUE MEDIGESTÃO?</p><h2 id="advantages-title">Atendimento próximo.<br /><em>Clareza desde o primeiro contato.</em></h2><p>Uma parceria que começa pelo entendimento da sua empresa.</p></div>
        <div className="advantages-grid">{advantages.map(item => <article key={item.title}><item.icon size={29} strokeWidth={1.6} aria-hidden="true" /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </div></section>

      {(clientStories.length > 0 || clientBrands.length > 0) && <section className="section social-proof-section container" id="clientes" aria-labelledby="clients-title">
        <div className="section-heading centered"><p className="eyebrow">EXPERIÊNCIAS COM A MEDIGESTÃO</p><h2 id="clients-title">Quem vive essa parceria conta.</h2></div>
        {clientBrands.length > 0 && <div className="client-brand-list">{clientBrands.map(brand => <div key={brand.name}><img src={sitePath(brand.image)} alt={brand.name} width={180} height={80} loading="lazy" /></div>)}</div>}
        {clientStories.length > 0 && <div className="client-story-list">{clientStories.map(story => <figure key={story.name}><blockquote>{story.quote}</blockquote><figcaption><strong>{story.name}</strong><span>{story.role} · {story.company}</span></figcaption></figure>)}</div>}
      </section>}

      <section className="process-section section" id="como-funciona" aria-labelledby="process-title"><div className="container">
        <div className="section-heading centered"><p className="eyebrow">SIMPLES PARA COMEÇAR</p><h2 id="process-title">Da sua necessidade à proposta,<br /><em>em três passos.</em></h2></div>
        <ol className="process-grid"><li className="process-step"><span className="step-number">01</span><h3>Escolha o serviço</h3><p>Abrir empresa, trocar de contador ou participar de licitações. Comece pelo seu objetivo.</p></li><li className="process-step"><span className="step-number">02</span><h3>Converse com a gente</h3><p>Conte o momento do negócio e os pontos que precisam de atenção.</p></li><li className="process-step"><span className="step-number">03</span><h3>Receba sua proposta</h3><p>Conheça os serviços, os valores e as condições para decidir como seguir.</p></li></ol>
      </div></section>

      <section className="diagnostic-section section" id="comecar" aria-labelledby="diagnostic-title" ref={diagnosticRef}><div className="container diagnostic-grid">
        <div className="diagnostic-copy"><p className="eyebrow">VAMOS COMEÇAR?</p><h2 id="diagnostic-title">Vamos tirar seus planos<br /><em>do papel?</em></h2><p>Escolha o serviço e converse com a Medigestão. O diagnóstico inicial é gratuito e ajuda a definir o atendimento ideal para sua empresa.</p>
          <CheckList items={["Contato direto com a Medigestão", "Proposta conforme sua necessidade", "Você decide depois de conhecer as condições"]} />
          <div className="direct-contact"><span>PREFERE FALAR DIRETAMENTE?</span><a href={whatsappLink()} target="_blank" rel="noopener noreferrer"><MessageCircle size={20} aria-hidden="true" />{PHONE_DISPLAY}</a><a href={"mailto:" + EMAIL}><Mail size={17} aria-hidden="true" />{EMAIL}</a></div>
        </div>
        <div className="diagnostic-card"><p className="form-eyebrow"><ShieldCheck size={17} aria-hidden="true" />DIAGNÓSTICO GRATUITO</p><h3>Qual é o seu objetivo?</h3><p className="form-intro">Prepare sua conversa em poucos passos.</p>
          <fieldset className="goal-options"><legend className="visually-hidden">Seu objetivo</legend>{goals.map(item => <label key={item.id} className={goal === item.id ? "goal-selected" : ""}><input type="radio" name="goal" checked={goal === item.id} onChange={() => selectGoal(item.id)} value={item.id} /><item.icon size={20} aria-hidden="true" /><span>{item.label}</span><span className="goal-radio" aria-hidden="true" /></label>)}</fieldset>
          <div className="form-row"><div className="field"><label htmlFor="business-stage">Momento da empresa</label><select id="business-stage" value={businessStage} onChange={event => setBusinessStage(event.target.value)}><option>Estou começando meu negócio</option><option>Minha empresa já está em atividade</option><option>Quero avaliar uma oportunidade</option></select></div><div className="field"><label htmlFor="business-name">Seu nome ou empresa <span>(opcional)</span></label><input id="business-name" name="business-name" type="text" autoComplete="name" maxLength={80} placeholder="Como podemos chamar você?" value={businessName} onChange={event => setBusinessName(event.target.value)} /></div></div>
          <a className="button button-primary diagnostic-cta" href={whatsappLink(message)} target="_blank" rel="noopener noreferrer"><MessageCircle size={20} aria-hidden="true" />Continuar pelo WhatsApp</a><p className="privacy-note">O WhatsApp abrirá com a mensagem preparada. Você pode revisar antes de enviar.</p><a className="email-alternative" href={emailLink}>Prefiro solicitar por e-mail</a>
        </div>
      </div></section>

      <section className="faq-section section container" id="duvidas" aria-labelledby="faq-title"><div className="faq-grid"><div><p className="eyebrow">DÚVIDAS FREQUENTES</p><h2 id="faq-title">O que você precisa saber para começar.</h2><p className="section-intro">Ficou com alguma dúvida sobre o seu caso? Fale com a Medigestão.</p><a className="button button-outline" href={whatsappLink("Olá! Estou no site da Medigestão e gostaria de esclarecer uma dúvida sobre os serviços.")} target="_blank" rel="noopener noreferrer">Conversar pelo WhatsApp</a></div><div className="faq-list">{questions.map(item => <details key={item.q} name="frequent-questions"><summary><span>{item.q}</span><Plus size={20} aria-hidden="true" /></summary><p>{item.a}</p></details>)}</div></div></section>
    </main>

    <footer className="site-footer"><div className="container footer-grid">
      <div className="footer-brand"><a className="brand" href="#inicio" aria-label="Medigestão — voltar ao início"><Wordmark /></a><span className="brand-descriptor">CONTABILIDADE E LICITAÇÕES</span><p>Do primeiro CNPJ<br />às novas oportunidades.</p></div>
      <div className="footer-links"><h3>Como podemos ajudar</h3>{offers.map(offer => <a key={offer.id} href="#comecar" onClick={() => selectGoal(offer.id)}>{offer.title}</a>)}<a href="#investimento">Solicitar uma proposta</a></div>
      <div className="footer-contact"><h3>Fale com a Medigestão</h3><a href={"tel:" + PHONE}><Phone size={16} aria-hidden="true" />{PHONE_DISPLAY}</a><a href={"mailto:" + EMAIL}><Mail size={16} aria-hidden="true" />{EMAIL}</a><a href={INSTAGRAM} target="_blank" rel="noopener noreferrer"><Camera size={16} aria-hidden="true" />@medigestao.consultoria</a></div>
    </div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Medigestão. Todos os direitos reservados.</span><a href={sitePath("/privacidade/")}>Privacidade</a></div></footer>

    <a className={"floating-contact" + (diagnosticVisible || menuOpen ? " floating-contact-hidden" : "")} aria-label="Falar com a Medigestão pelo WhatsApp" href={whatsappLink()} target="_blank" rel="noopener noreferrer" inert={diagnosticVisible || menuOpen}><MessageCircle size={22} aria-hidden="true" /><span>Fale com a gente</span></a>
    <div className={"mobile-contact" + (diagnosticVisible || menuOpen ? " mobile-contact-hidden" : "")} inert={diagnosticVisible || menuOpen}><a className="button button-primary" href="#comecar"><MessageCircle size={18} aria-hidden="true" />Receber minha proposta</a></div>
  </>;
}
