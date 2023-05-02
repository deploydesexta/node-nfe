import NFEService, { NFE } from '@sefazjs/nfe';

export type Options = {
  input: Array<string>
  flags: {
    certificado: string | undefined
    senha: string | undefined
  },
};

export default async function main({ input, flags }: Options) {
  const [documento, operacao] = input;
  const { certificado, senha } = flags;

  console.log(`
    Documento: ${documento}
    Operação: ${operacao}
    Certificado: ${certificado}
    Senha: ${senha}
  `)
  // dependencies across child packages
  const nfe: NFE = new NFEService();
  const out = await nfe.consultaPorChave('ASD');
  return out;
}