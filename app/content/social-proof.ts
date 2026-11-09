/**
 * Publicar somente relatos e marcas de clientes reais, com fonte e uso confirmados.
 * A ausência de conteúdo não renderiza seção nem espaços vazios na página.
 * Não preencher com clientes de outras empresas do grupo, números ou exemplos fictícios.
 */
export type ClientStory = {
  name: string;
  role: string;
  company: string;
  quote: string;
  source: string;
};
export type ClientBrand = {
  name: string;
  image: string;
  source: string;
};
export const clientStories: ClientStory[] = [];
export const clientBrands: ClientBrand[] = [];
