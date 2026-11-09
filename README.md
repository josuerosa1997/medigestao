# Medigestão — GitHub Pages

Exportação estática do site de contabilidade e licitações da Medigestão, preservando React, o visual, as imagens, as fontes locais e os fluxos de contato. Esta cópia é independente do projeto hospedado em Sites.

## Compilar

Requer Node.js 22.13 ou superior e as dependências declaradas em `package.json`.

```sh
npm install
npm run build
npm run verify:export
```

O comando usa Next 16.3.4 com `output: "export"` e gera `out/`. Não requer servidor Node.js na hospedagem. O menu móvel e as seleções de objetivo, momento e nome são hidratados no navegador pelo React.

Na preparação inicial desta cópia, `node_modules` é um link local para as dependências já instaladas no projeto original. O link está ignorado pelo Git e não deve ser distribuído. Nenhum pacote foi instalado durante a preparação. Em um checkout independente, executar a instalação acima e versionar o lockfile resultante.

## Endereço de publicação

Padrões desta versão:

- `NEXT_PUBLIC_BASE_PATH=/medigestao`
- `SITE_URL=https://josuerosa1997.github.io/medigestao/`

`SITE_URL` deve conter a URL completa da raiz do site, incluindo o caminho do repositório quando aplicável. Essas configurações são usadas na compilação. Se o nome do repositório mudar, atualizar as duas variáveis e recompilar. Para publicação na raiz de um domínio próprio, definir `NEXT_PUBLIC_BASE_PATH` como uma string vazia e `SITE_URL` como a raiz efetiva do domínio.

Exemplo explícito:

```sh
NEXT_PUBLIC_BASE_PATH=/medigestao SITE_URL=https://josuerosa1997.github.io/medigestao/ npm run build
npm run verify:export
```

## Publicar por uma pasta do repositório

Depois de compilar e verificar:

```sh
npm run prepare:docs
```

Isso substitui somente a pasta gerada `docs/` pela versão atual de `out/`. No repositório destinado ao site, versionar as fontes e `docs/`. Configurar GitHub Pages para publicar a branch escolhida a partir de `/docs`. A raiz da publicação inclui `.nojekyll`, a página inicial, `privacidade/index.html`, os recursos de `_next/` e as imagens.

Também é possível publicar o conteúdo de `out/` por um workflow de GitHub Pages. Não publicar a pasta `.next/` como site nem usar o comando de build Vinext/Worker do projeto original.

## Contatos e comportamento

- WhatsApp: `https://wa.me/5594992326657`
- Telefone: `+5594992326657`
- E-mail: `medigestaocontabil@gmail.com`
- Instagram: `https://www.instagram.com/medigestao.consultoria/`

O visitante escolhe um objetivo e abre o WhatsApp ou e-mail com a mensagem preparada. O envio é confirmado no aplicativo escolhido. Este site não possui API, cadastro, banco de dados ou armazenamento de leads.

## Recursos

Os caminhos públicos passam por `lib/site-path.ts`. Os metadados absolutos usam `lib/site-url.ts`. As três fontes foram colocadas em `app/fonts/` e são empacotadas pelo Next a partir de URLs relativos no CSS; os nomes de família e a aparência foram mantidos. As licenças estão em `FONT-LICENSES.txt` e acompanham a exportação.

As imagens de atendimento e escritório são ilustrativas; não representam uma equipe ou sede real. A marca fornecida pelo usuário está preservada. Não há clientes ou depoimentos fictícios: a configuração de provas sociais permanece vazia.

## Visual comercial atualizado

Direção visual solicitada a partir de senhorcontabil.com.br: azul institucional, branco e cinza-prata, abertura com fotografia em moldura orgânica, botões arredondados, faixas de contraste e diagnóstico orientado ao WhatsApp. Marca, imagens ilustrativas, serviços e contatos próprios da Medigestão. Sem preços, avaliações, prêmios ou condições comerciais da referência. As escolhas de serviço continuam preenchendo o WhatsApp e o e-mail; não há envio automático de dados.
