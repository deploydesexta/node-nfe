import { Ambiente, ConsultaPorLote, NFE } from "./types";
import SoapClient from "./soap";
import routes from "./ambientes";

const ambientes = {
  1: 'production',
  2: 'homologation',
};

class NFEService implements NFE {
  
  private readonly soapClient: SoapClient;

  constructor() {
    this.soapClient = new SoapClient();
  }

  private route(ambiente: Ambiente, estado: string): string {
    return routes.production.consulta_lote.sp.url;
  }

  async consultaPorLote({ ambiente, certificate, cnpj, estado, recibo }: ConsultaPorLote): Promise<string> {
    const data = `<?xml version="1.0" encoding="utf-8"?><Envelope xmlns="http://www.w3.org/2003/05/soap-envelope"><Header/><Body><nfeDadosMsg xmlns="http://www.portalfiscal.inf.br/nfe/wsdl/NFeRetAutorizacao4"><consReciNFe xmlns="http://www.portalfiscal.inf.br/nfe" versao="4.00"><tpAmb>${ambiente}</tpAmb><nRec>${recibo}</nRec></consReciNFe></nfeDadosMsg></Body></Envelope>`;

    try {
      const route = this.route(ambiente, estado);

      const responseBody = await this.soapClient.call({
        cnpj,
        certificate,
        url: route,
        data,
      });

      console.log(responseBody);
      return responseBody;
    } catch (err: any) {
      console.error(err);
      return err;
    }
  }

  consultaPorChave(chave: string): void {
    throw new Error("Method not implemented.");
  }

}

export default NFEService;
